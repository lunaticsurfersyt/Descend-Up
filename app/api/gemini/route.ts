import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const prompt = `
You are an elite YouTube growth strategist.

Channel Context:
${JSON.stringify(body.context, null, 2)}

User Question:
${body.message}

Rules:
- Use ONLY the provided channel data.
- Reference actual video titles whenever relevant.
- Reference actual metrics whenever relevant.
- Give specific recommendations.
- Never give generic advice like:
  - upload consistently
  - improve thumbnails
  - make better content
- Explain WHY your recommendation makes sense.
- Be concise but insightful.
`;

  const res = await fetch(
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
                text: prompt,
              },
            ],
          },
        ],
      }),
    },
  );

  const json = await res.json();

  return NextResponse.json({
    reply:
      json?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Unable to generate a response.",
  });
}
