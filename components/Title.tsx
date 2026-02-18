"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DescendUpTitle() {
  return (
    <div className="relative flex flex-col items-start gap-2 select-none font-mono">
      {/* DESCENDUP */}
      <h1
        className="text-5xl md:text-8xl font-extrabold italic tracking-tight text-black
        [text-shadow:3px_3px_0px_black]
        [-webkit-text-stroke:0.5px_grey]"
      >
        DESCENDUP
      </h1>

      {/* YOUR TAG IMAGE */}
      <motion.div
        whileHover={{ rotate: -3 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="absolute left-0 top-20 md:left-0 md:top-16 z-10 cursor-pointer"
      >
        <Image
          src="/your.svg" // 👈 replace with your image path
          alt="Your Tag"
          width={450}
          height={100}
          priority
        />
      </motion.div>

      {/* GROWTH */}
      <h1
        className="text-5xl md:text-8xl md:pt-32 font-extrabold italic tracking-tight text-black
        [text-shadow:3px_3px_0px_black]
        [-webkit-text-stroke:0.5px_grey]"
      >
        GROWTH.
      </h1>
    </div>
  );
}
