"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "ANALYZE",
    desc: "We deep-scan your entire library using our proprietary LLMs to identify revenue leaks and dormant viral potential.",
    bg: "bg-white",
    titleColor: "text-black",
    textColor: "text-gray-600",
    label: "STEP 1",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "OPTIMIZE",
    desc: "Apply AI-engineered titles, thumbnails, and SEO tags designed to trigger the algorithm's recommendation engine.",
    bg: "bg-yellow-400",
    titleColor: "text-black",
    textColor: "text-gray-700",
    label: "STEP 2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700">
        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "SCALE",
    desc: "Watch your views and RPM climb. We provide real-time updates to keep the momentum going forever.",
    bg: "bg-red-600",
    titleColor: "text-white",
    textColor: "text-red-100",
    label: "STEP 3",
    iconBg: "bg-white",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#E82D2D">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
      </svg>
    ),
  },
];

export default function TheFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-flow" style={{ background: "#0040FF" }} className="py-16 px-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center text-white mb-16"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "72px", letterSpacing: "4px" }}
      >
        THE FLOW
      </motion.h2>

      <div ref={ref} className="grid grid-cols-3 gap-0 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="px-5"
          >
            <div
              className={`${step.bg} border-2 border-black p-7 relative`}
              style={{ boxShadow: "6px 6px 0 rgba(0,0,0,0.35)" }}
            >
              <div
                className="absolute top-0 right-4 opacity-10"
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "80px", lineHeight: 1, color: "#000" }}
              >
                {step.num}
              </div>
              <div
                className={`w-9 h-9 ${step.iconBg || "bg-black"} flex items-center justify-center mb-4`}
              >
                {step.icon}
              </div>
              <h3
                className={`${step.titleColor} mb-2`}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "40px", letterSpacing: "2px" }}
              >
                {step.title}
              </h3>
              <p className={`${step.textColor} text-xs leading-relaxed`}>{step.desc}</p>
            </div>
            <div
              className="text-white mt-5 pl-0"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "32px", letterSpacing: "3px" }}
            >
              {step.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
