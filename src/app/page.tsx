import Splash from "@/components/home/splash";
import "@/styles/styles.css";
import Links from "@/components/home/links";
import Greeting from "@/components/home/greeting";
import Image from "next/image";
import InfoCard from "@/components/home/info_card";

export default function Home() {
  return (
    <div className="container flex flex-col">
      <div className="w-full">
        <Greeting />
      </div>
      <div className="w-full">
        <Splash />
        <div className="mb-8 md:grid md:grid-cols-3 md:gap-x-3 sm:flex sm:flex-col md:space-y-0 sm:space-y-2 max-sm:space-y-2">
          <InfoCard
            title="Discover"
            description="Discover new music through samples used in your favourite songs and albums."
          />
          <InfoCard
            title="Compare"
            description="Compare songs to their samples and the songs that sample them."
          />
          <InfoCard
            title="Explore"
            description="Explore the nearly endless knot of music and samples."
          />
        </div>
        <Links />
      </div>
    </div>
  );
}
