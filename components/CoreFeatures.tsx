"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function CoreFeatures() {
  const [hovered, setHovered] = useState(false);
  return (
    <section
      id="core-features"
      className="bg-white py-16 px-10 border-b-2 border-black font-sans"
    >
      <div>
        <h1 className="font-title font-bold text-[62.54px] text-black tracking-tight">
          CORE FEATURES
        </h1>
        <p className="text-[24px] text-black mb-10">
          DescendUp provides everything you need to
          <br /> dominate the YouTube algorithm.
        </p>

        <div className="flex gap-5 mb-5">
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{ height: hovered ? 490 : 400 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="bg-[#FFD700] border-[5px] border-black px-12 pt-12 cursor-pointer relative overflow-hidden flex-1"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            {/* Optimization Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-12 right-6 border-[2.32] border-black px-4 py-2 text-[15.5] font-bold bg-[#E5C100]"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              OPTIMIZATION ON
            </motion.div>

            {/* Icon */}
            <div className="w-12 h-12 mb-8 flex items-center justify-center">
              <Image src="/seo.svg" alt="AI SEO SUITE" width={58} height={58} />
            </div>

            {/* Title */}
            <h3 className="text-black mb-2 text-[40.26px] font-bold">
              AI SEO SUITE
            </h3>

            {/* Description */}
            <p className="text-[20.29px] font-medium leading-relaxed text-black">
              Advanced metadata generation that bypasses the noise and puts your
              content directly in front of your ideal audience.
            </p>

            {/* Hover Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hovered ? { opacity: 1, y: 20 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {[
                "#PASSIVEINCOME",
                "#FASTGROWTH",
                "#AI-AUTOMATION",
                "#SCALING",
              ].map((tag) => (
                <div
                  key={tag}
                  className="border-2 border-black w-28 h-7.5 text-[11px] font-bold"
                >
                  <div className="h-full w-full border-2 border-r-[#E5C100] border-b-[#E5C100] border-t-[#B89B00] border-l-[#B89B00] flex items-center justify-center">
                    {tag}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Generating text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hovered ? { opacity: 1, y: 20 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-8 flex gap-4 items-center pl-16"
            >
              <div className="border-2 border-black w-28 h-7.5 flex items-center justify-center text-[11px] font-bold">
                <div className="h-full w-full border-2 border-r-[#E5C100] border-b-[#E5C100] border-t-[#B89B00] border-l-[#B89B00] flex items-center justify-center">
                  #ZEROMILLION
                </div>
              </div>
              <p className="text-[18px] font-bold">Generating tags...</p>
            </motion.div>
          </motion.div>

          <div
            className="bg-[#FF0000] border-5 border-black px-12 pt-12 pb-18 h-[400px] flex-1"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            <div className="w-12 h-12 mb-8 flex items-center justify-center">
              <Image
                src="/audience.svg"
                alt="AUDIENCE IQ"
                width={58}
                height={58}
              />
            </div>
            <h3 className="text-white mb-2 text-[40.26px] font-bold">
              AUDIENCE IQ
            </h3>
            <p className="text-[20.29px] font-medium leading-relaxed text-white">
              Semantic intelligence that understands the "why" behind every
              click. Identify intent triggers before you film.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div
            className="bg-white border-5 border-black px-12 pt-12 pb-18 relative"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            <div className="w-12 h-12 mb-8 flex items-center justify-center">
              <Image
                src="/thumbnail.svg"
                alt="THUMBNAIL AI"
                width={50}
                height={50}
              />
            </div>
            <h3 className="text-black mb-2 text-[30px] font-bold">
              THUMBNAIL AI
            </h3>
            <p className="text-[17.55px] leading-relaxed text-black font-medium">
              Rapid testing for high-CTR visuals. Predictive scoring based on
              500M+ data points.
            </p>
          </div>

          <div
            className="bg-[#00FF66] border-5 border-black px-12 pt-12 pb-18 relative"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            <div className="w-12 h-12 mb-8 flex items-center justify-center">
              <Image
                src="/money.svg"
                alt="REVENUE HUB"
                width={50}
                height={50}
              />
            </div>
            <h3 className="text-white mb-2 text-[30px] font-bold">
              REVENUE HUB
            </h3>
            <p className="text-[17.55px] leading-relaxed text-black font-medium">
              RPM maximizing technology. Focus on high value advertiser segments
              to double your payout per view.
            </p>
          </div>

          <div
            className="bg-black border-5 border-black px-12 pt-12 pb-18 relative"
            style={{ boxShadow: "5px 5px 0 #000" }}
          >
            <div className="absolute top-3 right-3 bg-[#E5C100] text-black text-[10.4px] font-bold tracking-widest uppercase px-2 py-0.5 border border-black">
              EXCLUSIVE FEATURE
            </div>
            <div className="w-12 h-12 mb-8 flex items-center justify-center">
              <Image
                src="/viral.svg"
                alt="PREDICTIVE VIRALITY"
                width={50}
                height={50}
              />
            </div>
            <h3 className="text-white mb-2 text-[30px] font-bold">
              PREDICTIVE VIRALITY
            </h3>
            <p className="text-[17.55px] leading-relaxed text-white font-medium">
              The holy grail. Algorithm forecasting that tells you exactly when
              a topic is about to explode.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
