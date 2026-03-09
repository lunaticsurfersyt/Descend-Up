import CoreFeatures from "@/components/CoreFeatures";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FoundingCreator from "@/components/FoundingCreator";
import Hero from "@/components/Hero";
import TheFlow from "@/components/TheFlow";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <TheFlow />
      <CoreFeatures />
      <FoundingCreator />
      <FAQ />
      <Footer />
    </>
  );
}
