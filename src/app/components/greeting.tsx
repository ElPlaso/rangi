"use client";

const getTime = () => {
  const date = new Date();
  const hours = date.getHours();

  return hours;
};

export default function Greeting() {
  const time = getTime();
  return time ?
    <h1 className="font-semibold lg:text-3xl md:text-2xl sm:text-lg max-sm:text-lg">
      Good{" "}
      {time >= 6 && time < 12 ? (
        <>morning</>
      ) : time >= 12 && time < 18 ? (
        <>afternoon</>
      ) : time >= 18 && time < 24 ? (
        <>evening</>
      ) : (
        <>night</>
      )}
    </h1> : <></>
}
