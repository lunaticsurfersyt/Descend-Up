"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const suggestedPrompts = [
  "What content should I post next?",
  "What trends are rising in my niche?",
  "How can I increase CTR on my latest video?",
  "Analyze my best performing videos",
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your AI growth assistant. I've analyzed your channel data and I'm ready to help you with content strategy, trend analysis, and growth recommendations. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (content: string = input) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const responses: Record<string, string> = {
      "What content should I post next?": `Based on your channel analytics and current trends, I recommend creating content around:

1. **"YouTube Shorts vs Long-Form in 2024"** - This topic is trending in your niche with a 45% increase in searches.

2. **"AI Tools for Content Creators"** - Your audience has shown 3x more engagement with tech-related content.

3. **"Behind the Scenes: My Video Production Setup"** - Personal content performs 25% better for channels your size.

Would you like me to generate optimized titles and descriptions for any of these topics?`,
      "What trends are rising in my niche?": `Here are the rising trends in the Tech/Creator niche based on the last 30 days:

📈 **Hot Topics:**
- AI video editing tools (+120% search volume)
- YouTube automation strategies (+85%)
- Faceless YouTube channels (+67%)

🎯 **Audience Interests:**
- Your viewers are 40% more likely to watch productivity content
- Tutorial-style videos get 2x watch time vs. vlogs

💡 **Recommendation:** Create a video about "AI Tools That Run My YouTube Channel" - it combines multiple trending topics relevant to your audience.`,
      "How can I increase CTR on my latest video?": `I analyzed your latest video "5 Mistakes New YouTubers Make" and here's how to boost CTR:

**Current Performance:**
- CTR: 5.4% (industry average: 4-5%)
- Impressions: 892K

**Improvement Suggestions:**

1. **Thumbnail:** Add a surprised face expression - videos with emotional faces get 30% higher CTR

2. **Title Optimization:** Try "5 YouTuber Mistakes That KILLED My Channel (Don't Do This!)" - negative hooks perform 20% better

3. **First 3 Seconds:** Your hook takes 8 seconds - trim it to under 3 seconds

Want me to generate alternative thumbnails or titles?`,
      "Analyze my best performing videos": `Here's an analysis of your top 5 videos by watch time:

**Common Success Patterns:**

✅ **Title Length:** 50-60 characters perform best
✅ **Thumbnail Style:** High contrast + text overlay
✅ **Video Length:** 12-18 minutes optimal for your audience
✅ **Upload Time:** Tuesdays & Thursdays at 2 PM EST

**Content Themes That Work:**
1. "How to" tutorials (45% of top videos)
2. Mistakes/Problems (30%)
3. Comparisons (25%)

**Key Insight:** Videos with numbered lists in titles get 35% more clicks than those without.

Would you like a detailed breakdown of any specific video?`,
    }

    const response =
      responses[content] ||
      "I've analyzed your question and here are my insights based on your channel data. Your content strategy is showing positive trends, with a 15% increase in engagement over the last month. Would you like me to dive deeper into any specific area?"

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">AI Growth Assistant</h1>
        <p className="text-muted-foreground">Get personalized insights based on your channel data</p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback
                    className={
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }
                  >
                    {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl bg-secondary px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          {messages.length === 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent"
                  onClick={() => handleSend(prompt)}
                >
                  <Sparkles className="mr-1.5 h-3 w-3 text-primary" />
                  {prompt}
                </Button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about trends, content strategy, or analytics..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
