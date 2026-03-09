"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const topFeatures = [
  {
    bg: "bg-yellow-400",
    title: "AI SEO SUITE",
    desc: "Advanced metadata generation that bypasses the noise and puts your content directly in front of your ideal audience.",
    iconFill: "#FFD700",
    iconBg: "bg-black",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
  },
  {
    bg: "bg-red-600",
    title: "AUDIENCE IQ",
    desc: "Semantic intelligence that understands the \"why\" behind every click. Identify intent triggers before you film.",
    textWhite: true,
    iconBg: "bg-white",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#E82D2D"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
  },
];

const bottomFeatures = [
  {
    bg: "bg-white",
    title: "THUMBNAIL AI",
    desc: "Rapid testing for high-CTR visuals. Predictive scoring based on 500M+ data points.",
    iconBg: "bg-black",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700"><path d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zm0 16H3V5h18v14zm-10-7l-3 3.72L6 13l-3 4h18l-5-6.53z"/></svg>,
  },
  {
    bg: "bg-green-500",
    title: "REVENUE HUB",
    desc: "RPM maximizing technology. Focus on high value advertiser segments to double your payout per view.",
    textWhite: true,
    iconBg: "bg-black",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>,
  },
  {
    bg: "bg-white",
    title: "PREDICTIVE VIRALITY",
    desc: "The holy grail. Algorithm forecasting that tells you exactly when a topic is about to explode.",
    badge: "EARLY BETA",
    iconBg: "bg-black",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700"><path d="M13 2.05V4.05C17.39 4.59 20.5 8.58 19.96 12.97C19.5 16.61 16.64 19.5 13 19.93V21.93C18.5 21.38 22.5 16.5 21.95 11C21.5 6.25 17.73 2.5 13 2.05M11 2.06C9.05 2.25 7.19 3 5.67 4.26L7.1 5.74C8.22 4.84 9.57 4.26 11 4.06V2.06M4.26 5.67C3 7.19 2.25 9.04 2.05 11H4.05C4.24 9.58 4.8 8.23 5.69 7.1L4.26 5.67M2.06 13C2.26 14.96 3.03 16.81 4.27 18.33L5.69 16.9C4.81 15.77 4.24 14.42 4.06 13H2.06M7.1 18.37L5.67 19.74C7.18 21 9.04 21.79 11 22V20C9.58 19.82 8.23 19.25 7.1 18.37M12 9L9.5 13.5H11V17L14.5 12.5H13V9H12Z"/></svg>,
  },
];

export default function CoreFeatures() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="core-features" className="bg-white py-16 px-10 border-b-2 border-black">
      <div className="max-w-5xl mx-auto">
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "52px", letterSpacing: "3px" }} className="mb-1">
          CORE FEATURES
        </h2>
        <p className="text-sm text-gray-500 mb-10">DescendUp provides everything you need to dominate the YouTube algorithm.</p>

        <div ref={ref} className="grid grid-cols-2 gap-5 mb-5">
          {topFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${f.bg} border-2 border-black p-7`}
              style={{ boxShadow: "5px 5px 0 #000" }}
            >
              <div className={`w-9 h-9 ${f.iconBg} flex items-center justify-center mb-4`}>{f.icon}</div>
              <h3 className={`${f.textWhite ? "text-white" : "text-black"} mb-2`}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "26px", letterSpacing: "2px" }}>
                {f.title}
              </h3>
              <p className={`text-xs leading-relaxed ${f.textWhite ? "text-white opacity-90" : "text-gray-600"}`}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {bottomFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`${f.bg} border-2 border-black p-7 relative`}
              style={{ boxShadow: "5px 5px 0 #000" }}
            >
              {f.badge && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-extrabold tracking-widest uppercase px-2 py-0.5 border border-black">
                  {f.badge}
                </div>
              )}
              <div className={`w-9 h-9 ${f.iconBg} flex items-center justify-center mb-4`}>{f.icon}</div>
              <h3 className={`${f.textWhite ? "text-white" : "text-black"} mb-2`}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: "1.5px" }}>
                {f.title}
              </h3>
              <p className={`text-xs leading-relaxed ${f.textWhite ? "text-white opacity-90" : "text-gray-600"}`}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
