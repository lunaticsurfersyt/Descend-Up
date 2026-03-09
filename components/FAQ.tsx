"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import AnimatedButton from "./Button";

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
    <section id="faq" className="py-20 px-10 bg-black font-sans">
      <div className="w-full flex items-start justify-between mx-auto  gap-20">
        {/* Left */}
        <div className="w-1/2">
          <div className="inline-block bg-[#F0B100] text-black text-[16px] font-bold tracking-widest uppercase px-3 py-1 mb-5">
            FAQ
          </div>
          <h2 className="text-white mb-4 text-[48px] font-bold leading-15">
            Everything you need <br /> to know before you <br /> scale
          </h2>
          <p className="text-[18px] text-[#A1A1A1] leading-7 mb-12">
            Growing on YouTube isn't luck. It's about understanding intent,
            metadata precision, and algorithm timing. Here are the answers to
            the most common questions about how DescendUp helps creators grow
            smarter, faster, and more predictably.
          </p>
          <AnimatedButton
            text="CONTACT US"
            color="white"
            textStyle="text-[16.62px] text-black font-bold tracking-widest uppercase"
            px={8}
            py={3}
            shadowColor="#ff0000"
            onClick={() => {}}
          />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4 w-1/2">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between p-5 text-left gap-4 ${open === i ? "bg-[#F0B100]" : "bg-transparent"}  border-[1.6px] border-[#3A3A3A] cursor-pointer`}
                style={{ boxShadow: "6px 6px 0 #3a3a3a" }}
              >
                <div className="flex items-center gap-3">
                  <p className="h-6 w-6 bg-black border-[1.6px] border-white text-sm font-bold flex items-center justify-center text-white rounded-full">
                    {i + 1}
                  </p>
                  <span
                    className={`text-[20px] font-bold ${open === i ? "text-black" : "text-white"} transition-colors duration-300`}
                  >
                    {faq.q}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all">
                  <div className="relative w-6 h-6">
                    {/* Plus Icon */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: open === i ? 0 : 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FiPlus
                        size={32}
                        strokeWidth={2}
                        color={open === i ? "#000" : "#fff"}
                      />
                    </motion.div>
                    {/* Minus Icon */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: open === i ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FiMinus size={24} color={open === i ? "#000" : "#fff"} />
                    </motion.div>
                  </div>
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
                    className="mt-4 border-[1.6px] border-white"
                  >
                    <p className="text-sm text-[#E5E5E5] leading-relaxed p-4 text-[18px] font-medium font-bdy">
                      {faq.a}
                    </p>
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
