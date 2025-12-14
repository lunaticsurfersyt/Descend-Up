"use client";

import { Check, Copy, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface OptimizationResultsProps {
  show: boolean;
}

export function OptimizationResults({ show }: OptimizationResultsProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!show) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12">
        <div className="text-center">
          <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">
            Enter your video details and click analyze to get AI-powered
            suggestions
          </p>
        </div>
      </div>
    );
  }

  const suggestions = {
    titles: [
      "How to 10X Your YouTube Views in 2024 (Proven Strategy)",
      "10X Your YouTube Views: The Ultimate 2024 Growth Guide",
      "YouTube Algorithm Secrets: Get 10X More Views in 2024",
    ],
    description: `🚀 Ready to explode your YouTube views in 2024? In this video, I reveal the exact strategies that helped me 10X my channel growth...

⏰ Timestamps:
0:00 - Introduction
2:15 - Strategy #1: Thumbnail Optimization
5:30 - Strategy #2: Title Formula
8:45 - Strategy #3: Algorithm Hacks

🔔 Subscribe for more growth tips!

#YouTube #YouDESCENDUP #ContentCreator`,
    keywords: [
      { keyword: "youtube growth", score: 95 },
      { keyword: "get more views", score: 88 },
      { keyword: "youtube algorithm", score: 82 },
      { keyword: "content creator tips", score: 76 },
      { keyword: "youtube 2024", score: 71 },
    ],
    tips: [
      "Add a compelling hook in the first 5 seconds",
      "Use pattern interrupts every 30 seconds",
      "Include a clear call-to-action at the end",
      "Optimize thumbnail with high contrast colors",
    ],
  };

  return (
    <div className="space-y-6">
      {/* Title Suggestions */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Optimized Title Suggestions
        </h3>
        <div className="space-y-3">
          {suggestions.titles.map((title, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
            >
              <span className="text-sm text-foreground">{title}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => copyToClipboard(title, `title-${i}`)}
              >
                {copied === `title-${i}` ? (
                  <Check className="h-4 w-4 text-neon-green" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Description */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            SEO-Optimized Description
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              copyToClipboard(suggestions.description, "description")
            }
          >
            {copied === "description" ? (
              <>
                <Check className="mr-2 h-4 w-4 text-neon-green" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
        <pre className="whitespace-pre-wrap rounded-lg border border-border bg-secondary/30 p-4 text-sm text-foreground">
          {suggestions.description}
        </pre>
      </div>

      {/* Keyword Analysis */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Keyword Density Analysis
        </h3>
        <div className="space-y-3">
          {suggestions.keywords.map((item) => (
            <div key={item.keyword} className="flex items-center gap-4">
              <span className="w-40 text-sm text-foreground">
                {item.keyword}
              </span>
              <div className="flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
              <Badge variant="secondary" className="w-12 justify-center">
                {item.score}%
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* CTR Tips */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          CTR Improvement Tips
        </h3>
        <ul className="space-y-3">
          {suggestions.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                {i + 1}
              </div>
              <span className="text-sm text-muted-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
