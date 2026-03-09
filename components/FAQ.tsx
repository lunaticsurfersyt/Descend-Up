"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What exactly does DescendUp do?",
    a: "DescendUp is an AI-powered SEO and content intelligence platform for YouTube creators. It deep-scans your channel, identifies revenue leaks and viral opportunities, and generates optimized metadata to help your content reach the right audience at the right time.",
  },
  {
    q: "How to setup?",
    a: "Setup takes under 5 minutes. Connect your YouTube channel via OAuth, and DescendUp immediately begins scanning your library. No plugins, no Chrome extensions — everything runs in the cloud.",
  },
  {
    q: "How can you check your potential?",
    a: "Our AI generates a channel potential score based on your existing content, audience engagement patterns, niche competitiveness, and RPM data. You'll see exactly where you're leaving views and money on the table.",
  },
  {
    q: "Do you change or control my content?",
    a: "Never. DescendUp is a read-and-recommend tool. We analyze your data and provide suggestions, but every decision — what to publish, change, or optimize — is entirely yours. You always remain in full control.",
  },
  {
    q: "How do you make money?",
    a: "During the founding creator pilot, the platform is completely free. Post-launch, we operate on a performance-based pricing model — meaning you only pay when our recommendations generate measurable results for your channel.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ background: "#111" }} className="py-20 px-10">
      <div className="max-w-5xl mx-auto grid gap-20" style={{ gridTemplateColumns: "320px 1fr" }}>
        {/* Left */}
        <div>
          <div className="inline-block bg-yellow-400 text-black text-xs font-extrabold tracking-widest uppercase px-3 py-1 mb-5">
            FAQ
          </div>
          <h2 className="text-white mb-4" style={{ fontFamily: "'Oswald',sans-serif", fontSize: "36px", fontWeight: 700, lineHeight: 1.2 }}>
            Everything you need to know before you scale
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-7">
            Growing on YouTube isn't luck. It's about understanding intent, metadata precision, and algorithm timing.
            Here are the answers to the most common questions about how DescendUp helps creators grow smarter, faster, and more predictably.
          </p>
          <a href="#" className="inline-block border-2 border-white text-white text-xs font-bold tracking-widest uppercase px-5 py-2 no-underline hover:bg-white hover:text-black transition-colors">
            CONTACT US
          </a>
        </div>

        {/* Right */}
        <div className="divide-y divide-gray-800 border-t border-gray-800">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 bg-transparent border-0 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-xs min-w-5">
                    {["①","②","③","④","⑤"][i]}
                  </span>
                  <span className={`text-sm font-semibold ${open === i ? "text-yellow-400" : "text-white"} transition-colors`}>
                    {faq.q}
                  </span>
                </div>
                <div
                  className="w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    borderColor: open === i ? "#FFD700" : "#444",
                    background: open === i ? "#FFD700" : "transparent",
                  }}
                >
                  <motion.svg
                    width="12" height="12" viewBox="0 0 24 24"
                    fill={open === i ? "#000" : "#fff"}
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </motion.svg>
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="text-sm text-gray-400 leading-relaxed pb-5 pl-8">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
