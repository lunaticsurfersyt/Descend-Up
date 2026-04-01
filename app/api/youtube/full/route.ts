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
  let channelId = searchParams.get("channelId");

  const key = process.env.YOUTUBE_API_KEY;

  let url = "";

  if (channelId?.startsWith("UC")) {
    url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${key}`;
  } else {
    url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${channelId?.replace("@", "")}&key=${key}`;
  }

  const channelRes = await fetch(url);
  const channel = await channelRes.json();
  const stats: ChannelStatistics = channel.items[0].statistics;

  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channel.items[0].id}&part=snippet,id&order=date&maxResults=20`,
  );
  const searchData = await searchRes.json();

  const videoIds: string = searchData.items
    .map((v: any) => v.id.videoId)
    .join(",");

  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${key}&id=${videoIds}&part=statistics,snippet`,
  );
  const videosData = await videosRes.json();

  const videos: Video[] = videosData.items.map((v: any) => ({
    title: v.snippet.title,
    views: Number(v.statistics.viewCount),
    date: v.snippet.publishedAt,
  }));

  const avgViews: number = Math.floor(
    videos.reduce((a, b) => a + b.views, 0) / videos.length,
  );

  const trend = videos.map((v) => ({
    date: v.date.slice(0, 10),
    views: v.views,
  }));

  const uploads = Object.values(
    videos.reduce((acc: any, v) => {
      const d = v.date.slice(0, 7);
      acc[d] = acc[d] || { date: d, count: 0 };
      acc[d].count++;
      return acc;
    }, {}),
  );

  const topVideos: Video[] = [...videos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return Response.json({
    stats,
    analytics: { avgViews, trend, uploads, topVideos },
    insights: ["Improve consistency", "Focus on top content style"],
  });
}
