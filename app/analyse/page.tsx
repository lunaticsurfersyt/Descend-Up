"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import ReactMarkdown from "react-markdown"; // Add this import for rich text rendering

type Video = {
  title: string;
  views: number;
  date: string;
};

type Analytics = {
  avgViews: number;
  trend: { date: string; views: number }[];
  uploads: { date: string; count: number }[];
  topVideos: Video[];
};

type Stats = {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
};

type ChannelData = {
  stats: Stats;
  analytics: Analytics;
  insights: string[];
};

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export default function AnalysePage() {
  const [channelId, setChannelId] = useState("");
  const [data, setData] = useState<ChannelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const fetchChannelData = async () => {
    setLoading(true);
    const res = await fetch(`/api/youtube/full?channelId=${channelId}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
    console.log(json);
  };

  const handleChat = async () => {
    if (!chatInput) return;

    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({
        message: chatInput,
        context: data,
      }),
    });

    const json = await res.json();

    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: chatInput },
      { role: "bot", text: json.reply },
    ]);

    setChatInput("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">YouTube Intelligence Dashboard</h1>

        <Card>
          <CardContent className="p-4 flex gap-4">
            <Input
              placeholder="Enter Channel ID or @handle"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
            />
            <Button onClick={fetchChannelData}>
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
          </CardContent>
        </Card>

        {data && (
          <div className="grid md:grid-cols-4 gap-4">
            <Stat title="Subscribers" value={data.stats.subscriberCount} />
            <Stat title="Views" value={data.stats.viewCount} />
            <Stat title="Videos" value={data.stats.videoCount} />
            <Stat title="Avg Views" value={data.analytics.avgViews} />
          </div>
        )}

        {data && (
          <div className="grid md:grid-cols-2 gap-6">
            <Chart
              title="Views Trend"
              data={data.analytics.trend}
              dataKey="views"
            />
            <Chart
              title="Uploads"
              data={data.analytics.uploads}
              dataKey="count"
              bar
            />
          </div>
        )}

        {data && (
          <Card className="p-4">
            <h2 className="font-semibold mb-2">Top Videos</h2>
            {data.analytics.topVideos.map((v, i) => (
              <div key={i} className="flex justify-between">
                <span>{v.title}</span>
                <span>{v.views}</span>
              </div>
            ))}
          </Card>
        )}

        {data && (
          <Card className="p-4">
            <h2 className="font-semibold mb-4">AI Chat Assistant</h2>
            <div
              ref={chatContainerRef}
              className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-4"
            >
              {chatHistory.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Start a conversation about your channel analytics...
                </p>
              ) : (
                chatHistory.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-300 text-black"
                      }`}
                    >
                      {message.role === "bot" ? (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown>
                            {message.text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p>{message.text}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Ask about your analytics..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleChat()}
              />
              <Button onClick={handleChat} disabled={!chatInput.trim()}>
                Send
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="border p-4 rounded">
      {title}: {value}
    </div>
  );
}

function Chart({ title, data, dataKey, bar }: any) {
  return (
    <Card className="p-4">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {bar ? (
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey={dataKey} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}
