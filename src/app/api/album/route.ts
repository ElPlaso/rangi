import Result from "@/types/result";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse<Array<Result> | Error>> {
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

  try {
    const appearancesResponse = await fetch(
      "https://genius-song-lyrics1.p.rapidapi.com/album/appearances/?id=" +
      id +
      "&page=1",
      options
    );
    const appearancesData = await appearancesResponse.json();
    const appearances = appearancesData.album_appearances;

    const parsedSongs = appearances.map((appearance: { song: Record<string, string | Record<string, string>> }) => ({
      id: appearance.song.id,
      title: appearance.song.title,
      artist: appearance.song['artist_names'],
      year: appearance.song['release_date_components']
        ? (appearance.song['release_date_components'] as Record<string, string>).year
        : "-",
      imgUrl: appearance.song['song_art_image_thumbnail_url'],
    }));

    return NextResponse.json(parsedSongs);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
