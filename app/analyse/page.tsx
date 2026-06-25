"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import Button from "@/components/Button";

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

const formatNumber = (value: string | number) =>
  Number(value).toLocaleString("en-US");

export default function AnalysePage() {
  const [channelId, setChannelId] = useState("");
  const [data, setData] = useState<ChannelData | null>(null);
  const [analysing, setAnalysing] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const fetchChannelData = async () => {
    if (!channelId.trim()) return;

    try {
      setAnalysing(true);

      const res = await fetch(`/api/youtube/full?channelId=${channelId}`);

      const json = await res.json();

      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalysing(false);
    }
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
      {analysing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="flex flex-col items-center gap-6">
            <div className="h-20 w-20 animate-spin rounded-full border-8 border-white border-t-[#DE0000]" />

            <div className="text-3xl font-black uppercase text-white tracking-widest">
              Analysing Channel...
            </div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#DE0000] p-10 border-4 border-black">
          <h1 className="text-5xl font-bold font-title uppercase text-white">
            YouTube <br />
            Intelligence Dashboard
          </h1>
          <div className="flex w-full items-center justify-center p-4 mt-4 border-4 border-black bg-[#E5EEFF] gap-4">
            <div className="p-4 w-5/6 bg-white border-4 border-black">
              <Input
                placeholder="Enter Channel ID or @handle"
                value={channelId}
                className="rounded-none bg-white py-4 border-0 shadow-none ring-0 outline-none focus:border-0 focus:ring-0 focus:outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none"
                onChange={(e) => setChannelId(e.target.value)}
              />
            </div>
            <div className="w-1/6">
              <Button
                text={analysing ? "ANALYSING..." : "ANALYSE MY CHANNEL"}
                color="black"
                onClick={fetchChannelData}
                disabled={analysing}
                textStyle="text-[11.5px] text-white"
              />
            </div>
          </div>
        </div>
        {data && (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4">
              <Stat
                title="SUBSCRIBERS"
                value={formatNumber(data.stats.subscriberCount)}
                bg="bg-[#F7D400]"
              />
              <Stat
                title="TOTAL VIEWS"
                value={formatNumber(data.stats.viewCount)}
                bg="bg-[#DE0000] text-white"
              />
              <Stat
                title="VIDEOS"
                value={formatNumber(data.stats.videoCount)}
                bg="bg-white"
              />
              <Stat
                title="AVG VIEWS"
                value={formatNumber(data.analytics.avgViews)}
                bg="bg-[#00FF66]"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
              <Chart
                title="VIEWS TREND"
                data={data.analytics.trend}
                dataKey="views"
                bg="bg-white"
              />

              <Chart
                title="UPLOADS"
                data={data.analytics.uploads}
                dataKey="count"
                bg="bg-white"
                bar
              />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border-4 border-black bg-black text-white p-6">
                <h2 className="text-2xl font-black uppercase mb-4">
                  TOP VIDEOS
                </h2>

                {data.analytics.topVideos.slice(0, 5).map((v, i) => (
                  <div key={i} className="border-b border-white/20 py-2">
                    <div className="font-bold line-clamp-1">{v.title}</div>
                    <div className="text-sm">
                      {Number(v.views).toLocaleString()} views
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-span-2 border-4 border-black bg-[#F3E06B] p-6">
                <h2 className="text-4xl font-black uppercase mb-4">
                  CHANNEL INSIGHTS
                </h2>

                <ul className="space-y-3">
                  {data.insights.map((insight, i) => (
                    <li key={i} className="font-semibold">
                      • {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}{" "}
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
  bg,
}: {
  title: string;
  value: string | number;
  bg: string;
}) {
  return (
    <div
      className={`${bg} border-4 border-black p-6 min-h-[160px] flex flex-col justify-between`}
    >
      <div className="text-sm font-bold uppercase tracking-widest">{title}</div>

      <div className="text-2xl font-black wrap-break-words">{value}</div>
    </div>
  );
}

function Chart({ title, data, dataKey, bar, bg }: any) {
  return (
    <div className={`${bg} border-4 border-black p-4`}>
      <h2 className="font-black text-2xl uppercase mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height={250}>
        {bar ? (
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#DE0000" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey={dataKey} stroke="#DE0000" strokeWidth={4} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
