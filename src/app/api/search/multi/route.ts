import { MultiSearchResult } from "@/types/multi-search-result";
import Result from "@/types/result";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse<MultiSearchResult>> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const num = searchParams.get("num") || "1";

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

  const url = `https://genius-song-lyrics1.p.rapidapi.com/search/multi/?q=${query}&per_page=${num}&page=1`;

  const data = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      return new Response(error.message, { status: 500 });
    });

  const songResults = data.sections[1]["hits"];
  const albumResults = data.sections[4]["hits"];

  const parsedSongResults: Array<Result> = songResults.map((result: { result: Record<string, string | Record<string, string>> }) => ({
    id: result.result.id,
    title: result.result["title"],
    artist: result.result["artist_names"],
    year: result.result["release_date_components"]
      ? (result.result["release_date_components"] as Record<string, string>).year
      : "-",
    imgUrl: result.result["song_art_image_thumbnail_url"],
  }));

  const parsedAlbumResults: Array<Result> = albumResults.map((result: { result: Record<string, string | Record<string, string>> }) => ({
    id: result.result.id,
    title: result.result.name,
    artist: (result.result.artist as Record<string, string>).name,
    year: result.result["release_date_components"]
      ? (result.result["release_date_components"] as Record<string, string>).year
      : "-",
    imgUrl: result.result["cover_art_url"],
  }));

  const response = {
    songs: parsedSongResults,
    albums: parsedAlbumResults,
  };

  return NextResponse.json(response);
}
