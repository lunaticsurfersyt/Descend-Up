import { NextResponse } from "next/server";

interface Video {
  title: string;
  views: number;
  date: string;
}

interface ChannelStatistics {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const channelId = searchParams.get("channelId");

  if (!channelId) {
    return NextResponse.json({ error: "Channel ID required" }, { status: 400 });
  }

  const youtubeKey = process.env.YOUTUBE_API_KEY;

  let channelUrl = "";

  if (channelId.startsWith("UC")) {
    channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${youtubeKey}`;
  } else {
    channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${channelId.replace("@", "")}&key=${youtubeKey}`;
  }

  const channelRes = await fetch(channelUrl);
  const channelJson = await channelRes.json();

  if (!channelJson.items?.length) {
    return NextResponse.json({ error: "Channel not found" }, { status: 404 });
  }

  const channel = channelJson.items[0];

  const stats: ChannelStatistics = channel.statistics;

  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet,id&channelId=${channel.id}&order=date&maxResults=20&type=video&key=${youtubeKey}`,
  );

  const searchJson = await searchRes.json();

  const videoIds = searchJson.items
    .map((item: any) => item.id.videoId)
    .filter(Boolean)
    .join(",");

  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${youtubeKey}`,
  );

  const videosJson = await videosRes.json();

  const videos: Video[] = videosJson.items.map((video: any) => ({
    title: video.snippet.title,
    views: Number(video.statistics.viewCount),
    date: video.snippet.publishedAt,
  }));

  const avgViews =
    videos.length > 0
      ? Math.floor(
          videos.reduce((sum, video) => sum + video.views, 0) / videos.length,
        )
      : 0;

  const trend = [...videos]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((video) => ({
      date: video.date.slice(0, 10),
      views: video.views,
    }));

  const uploads = Object.values(
    videos.reduce((acc: any, video) => {
      const month = video.date.slice(0, 7);

      if (!acc[month]) {
        acc[month] = {
          date: month,
          count: 0,
        };
      }

      acc[month].count++;

      return acc;
    }, {}),
  );

  const topVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 5);

  // ------------------------
  // Gemini Insight Generation
  // ------------------------

  let insights: string[] = [];

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are an elite YouTube strategist.

Analyze this channel.

Rules:
- Give EXACTLY 5 insights.
- Use actual video titles.
- Use actual view counts.
- Identify content themes.
- Identify winning formats.
- Identify opportunities.
- Do NOT give generic advice.
- Every insight must be evidence-based.

Channel:
${channel.snippet.title}

Subscribers:
${stats.subscriberCount}

Average Views:
${avgViews}

Top Videos:
${topVideos
  .map(
    (v) => `
Title: ${v.title}
Views: ${v.views}
Date: ${v.date}
`,
  )
  .join("\n")}

Recent Videos:
${videos
  .map(
    (v) => `
Title: ${v.title}
Views: ${v.views}
Date: ${v.date}
`,
  )
  .join("\n")}

Return ONLY JSON:

{
  "insights": [
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
}
`,
                },
              ],
            },
          ],
        }),
      },
    );

    const geminiJson = await geminiRes.json();

    const text = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    insights = JSON.parse(cleaned).insights;
  } catch (error) {
    console.error("Gemini insight generation failed:", error);

    insights = [
      `Top performer: ${topVideos[0]?.title ?? "N/A"}`,
      `Average views per upload: ${avgViews.toLocaleString("en-US")}`,
      `Analyzed ${videos.length} recent uploads`,
      `Strongest content themes appear in top-performing videos`,
      `Additional insights unavailable`,
    ];
  }

  return NextResponse.json({
    stats,
    analytics: {
      avgViews,
      trend,
      uploads,
      topVideos,
    },
    insights,
  });
}
