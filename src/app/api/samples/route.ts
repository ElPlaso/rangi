import Result from "@/types/result";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse<Result>> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";

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

  const song = await fetch(
    "https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=" + id,
    options
  )
    .then((response) => response.json())
    .then((data) => data["song"])
    .catch((error) => {
      return new Response(error.message, { status: 500 });
    });

  const samples = song["song_relationships"]["0"]["songs"];

  const parsedSamples = samples.map((sample: Record<string, string | Record<string, string>>) => ({
    id: sample.id,
    title: sample.title,
    artist: sample['artist_names'],
    year: sample['release_date_components']
      ? (sample['release_date_components'] as Record<string, string>).year
      : "-",
    imgUrl: sample['song_art_image_thumbnail_url'],
  }));

  return NextResponse.json(parsedSamples);
}
