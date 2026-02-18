"use client";

import { motion } from "framer-motion";
import React from "react";

type AnimatedButtonProps = {
  text: string;
  color?: string;
  textStyle?: string;
  px?: number;
  py?: number;
  onClick?: () => void;
};

export default function AnimatedButton({
  text,
  color = "#FF1F1F",
  textStyle = "",
  px = 4,
  py = 2,
  onClick,
}: AnimatedButtonProps) {
  return (
    <div className="relative inline-block">
      {/* Shadow (Fixed) */}
      <div
        className="absolute inset-0 translate-x-1 translate-y-1 bg-black"
        style={{ border: "3px solid black" }}
      />

      {/* Animated Button */}
      <motion.button
        whileHover={{
          x: -2,
          y: -2,
        }}
        whileTap={{
          x: 2,
          y: 2,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
        }}
        onClick={onClick}
        className={`relative px-${px} py-${py} font-extrabold uppercase tracking-wide border-[3px] border-black ${textStyle}`}
        style={{
          backgroundColor: color,
        }}
      >
        {text.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </motion.button>
    </div>
  );
}
