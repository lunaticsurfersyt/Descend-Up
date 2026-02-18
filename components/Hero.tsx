import React from "react";
import Title from "./Title";
import Image from "next/image";
import Button from "./Button";
import { IoCheckmarkCircle } from "react-icons/io5";

const Hero = () => {
  return (
    <div className="p-10 flex w-full justify-center font-sans">
      <div className="w-5/8">
        <h1 className="border-[3px] border-black px-2 py-1 bg-[#00ff66] uppercase w-fit font-semibold">
          next-gen creator Intelligence
        </h1>
        <Title />
        <h1 className="text-2xl md:text-4xl font-bold mt-4">
          Navigate the Algorithm. Not your creativity.
        </h1>

        <p className="text-lg md:text-2xl mt-4 pr-32">
          The first{" "}
          <span className="font-semibold bg-[#FFD700]">
            SEO & Content Intelligence tool
          </span>{" "}
          built for creators ready to scale. Stop guessing, let DescendUp find
          your growth.
        </p>
        <div className="flex gap-8 mt-4">
          <Button
            text={`Analyse my \n channel`}
            color="#ff0000"
            textStyle="text-white text-2xl"
            px={16}
            py={4}
          />
          <div className="flex items-center justify-center pl-4 pr-16 py-4 font-medium border-dashed border-[3px] rounded-xl">
            <IoCheckmarkCircle className="text-[#00b212] text-3xl mr-2" />
            <p>
              Performance-Based <br />
              Pricing
            </p>
          </div>
        </div>
      </div>
      <div className="w-3/8">
        <Image
          src="/hero.png"
          alt="Hero Image"
          width={500}
          height={500}
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
