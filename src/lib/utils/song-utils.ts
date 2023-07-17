export async function getSongData(songID: String) {
  let song: any[];

  let headers = new Headers();
  headers.append(
    "X-RapidAPI-Key",
    process.env.NEXT_PUBLIC_RAPID_API_KEY as string
  );
  headers.append("X-RapidAPI-Host", "genius-song-lyrics1.p.rapidapi.com");

  const options: RequestInit = {
    method: "GET",
    headers: headers,
    cache: "no-store",
  };

  // Get the song data
  song = await fetch(
    "https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=" + songID,
    options
  )
    .then((response) => response.json())
    .then((data) => data["song"])
    .catch((err) => console.error(err));

  return song;
}

import SampleRelation from "@/types/sample-relation";

export function alreadyStarred(
  items: SampleRelation[],
  toStar: SampleRelation
) {
  return items.some((relation) => {
    return (
      toStar.sampler.id === relation.sampler.id &&
      toStar.samplee.id === relation.samplee.id
    );
  });
}

import { cache } from "react";

export const getSongs = cache(async (id: string, sampleId: string) => {
  const songData: any = await getSongData(id);
  const sampleData: any = await getSongData(sampleId);

  return [songData, sampleData];
});