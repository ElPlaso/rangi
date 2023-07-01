export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
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

  const results = await fetch(
    `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${q}&per_page=${num}&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => data["hits"])
    .catch((error) => {
      return new Response(error.message, { status: 500 });
    });

  const extractedResults = results.map((result: any) => ({
    id: result.result.id,
    title: result.result.title,
    artist: result.result.artist_names,
    year: result.result.release_date_components
      ? result.result.release_date_components.year
      : "-",
    imgUrl: result.result.song_art_image_thumbnail_url,
  }));

  return new Response(JSON.stringify(extractedResults), {
    headers: { "content-type": "application/json" },
  });
}
