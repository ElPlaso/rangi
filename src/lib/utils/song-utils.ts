import { Song } from "@/types/song";
import SampleRelation from "@/types/sample-relation";

export async function getSongData(id: string): Promise<Song | null> {
  try {
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
    const result = await fetch(
      "https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=" + id,
      options
    )
      .then((response) => response.json())
      .then((data) => data["song"])
      .catch((err) => console.error(err));

    const samples = result["song_relationships"]["0"]["songs"];
    const sampledBy = result["song_relationships"]["1"]["songs"];

    const parsedSamples: Array<Song> = samples.map((sample: Record<string, string | Record<string, string> | null>) => ({
      id: sample.id,
      title: sample.title,
      artist: sample['artist_names'],
      year: sample['release_date_components']
        ? (sample['release_date_components'] as Record<string, string>).year
        : "-",
      imgUrl: sample['song_art_image_thumbnail_url'],
      youtubeUrl: sample["youtube_url"],
    }));

    const parsedSampledBy: Array<Song> = sampledBy.map((sample: Record<string, string | Record<string, string>>) => ({
      id: sample.id,
      title: sample.title,
      artist: sample['artist_names'],
      year: sample['release_date_components']
        ? (sample['release_date_components'] as Record<string, string>).year
        : "-",
      imgUrl: sample['song_art_image_thumbnail_url'],
      youtubeUrl: sample["youtube_url"],
    }));

    return {
      id,
      title: result["title"],
      fullTitle: result["full_title"],
      artist: result["artist_names"],
      year: result["release_date_components"]
        ? result["release_date_components"]["year"]
        : "-",
      imgUrl: result["song_art_image_thumbnail_url"],
      samples: parsedSamples,
      sampledBy: parsedSampledBy,
      youtubeUrl: result["youtube_url"],
    }
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

export function alreadyStarred(
  items: Array<SampleRelation>,
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
  const songData = await getSongData(id);
  const sampleData = await getSongData(sampleId);

  return [songData, sampleData];
});