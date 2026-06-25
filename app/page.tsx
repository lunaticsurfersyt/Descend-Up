import CoreFeatures from "@/components/CoreFeatures";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FoundingCreator from "@/components/FoundingCreator";
import Hero from "@/components/Hero";
import TheFlow from "@/components/TheFlow";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const user = await getUser();

  if (user) {
    redirect("http://localhost:3001");
  }
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
