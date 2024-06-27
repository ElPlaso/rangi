import Splash from "@/components/home/splash";
import "@/styles/styles.css";
import Links from "@/components/home/links";
import Greeting from "@/components/home/greeting";
import Image from "next/image";
import InfoCard from "@/components/home/info_card";

export default function Home() {
  return (
    <>
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
      <div className="fixed bottom-0 flex items-center justify-center w-full p-5 mt-24 lg:bg-transparent md:dark:bg-black sm:dark:bg-black max-sm:dark:bg-black backdrop-blur-2xl">
        <div className="flex flex-row items-center justify-center space-x-2">
          <Image
            src={"/favicon.ico"}
            alt="BeatBotanica Logo"
            width={28}
            height={28}
          />
          <div>
            Brought to you by{" "}
            <a
              href="https://beatbotanica.com"
              className="text-blue-600 hover:underline"
            >
              {" "}
              beatbotanica.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
