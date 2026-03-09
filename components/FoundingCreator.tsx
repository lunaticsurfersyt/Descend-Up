"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function FoundingCreator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="early-access-program"
      style={{
        background: "#F5F5E8",
        borderTop: "3px solid #000",
        borderBottom: "3px solid #000",
      }}
      className="py-16 px-10"
    >
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block bg-black text-white text-xs font-extrabold tracking-widest uppercase px-3 py-1 mb-5"
        >
          Limited Early Access
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-black uppercase mb-4"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(60px,9vw,104px)",
            lineHeight: 0.88,
            letterSpacing: "2px",
          }}
        >
          BECOME A<br />
          FOUNDING
          <br />
          CREATOR
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-gray-600 mb-8"
        >
          Skip the waitlist. Get priority access to DescendUp's AI engine before
          the public launch
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="bg-white border-2 border-black p-8 grid grid-cols-2 gap-12 items-start"
          style={{ boxShadow: "6px 6px 0 #000" }}
        >
          {/* Perks */}
          <div>
            <ul className="mb-5 space-y-3">
              {[
                "Zero commissions on revenue",
                "No setup or hidden fees",
                "Priority feature access",
              ].map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3 text-sm font-semibold"
                >
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  {perk}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 leading-relaxed">
              We are opening our doors to a select group of creators to
              stress-test our infrastructure. In exchange for your feedback, you
              get full access to the suite for free.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-end gap-4">
            <div className="bg-yellow-400 text-black text-xs font-extrabold tracking-widest uppercase px-3 py-1 border-2 border-black">
              FREE DURING PILOT
            </div>
            <a
              href="#"
              className="bg-red-600 text-white px-8 py-4 text-sm font-extrabold tracking-widest uppercase border-2 border-black no-underline whitespace-nowrap transition-transform hover:-translate-x-1 hover:-translate-y-1"
              style={{ boxShadow: "5px 5px 0 #000" }}
            >
              CLAIM EARLY ACCESS
            </a>
            <p className="text-xs text-gray-500 text-center">
              Selection based on channel eligibility
            </p>
            <p className="text-xs font-bold text-green-600 text-center">
              ● 6 channels remaining
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
