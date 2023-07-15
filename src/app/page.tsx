import Splash from "./components/splash";
import "@/app/styles/styles.css";
import Links from "./components/links";
import Greeting from "./components/greeting";
import Image from "next/image";
import InfoCard from "./components/info_card";

export default function Home() {
  return (
    <>
      <div className="container flex flex-col">
        <div className="w-full">
          <Greeting />
        </div>
        <div className="w-full">
          <Splash />
          <div className="md:grid md:grid-cols-3 md:gap-x-3 sm:flex sm:flex-col md:space-y-0 sm:space-y-2 max-sm:space-y-2 mb-8">
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
      <div className="mt-24 fixed bottom-0 p-5 w-full flex justify-center items-center lg:bg-transparent md:dark:bg-black sm:dark:bg-black max-sm:dark:bg-black backdrop-blur-2xl">
        <div className="flex flex-row space-x-2">
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
              className="hover:underline text-blue-600"
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
