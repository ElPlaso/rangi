import { Inter } from "@next/font/google";
import "@/app/styles/styles.css";
import AlbumAppearanceResult from "./components/album_appearance_result";
import AlbumTitle from "./components/album_title";

const inter = Inter({ subsets: ["latin"] });

async function getAlbumData(id: String) {
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

  return fetch(
    "https://genius-song-lyrics1.p.rapidapi.com/album/details/?id=" + id,
    options
  )
    .then((response) => response.json())
    .then((data) => data["album"])
    .catch((err) => console.error(err));
}

async function getAlbumAppearances(id: String) {
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

  return fetch(
    "https://genius-song-lyrics1.p.rapidapi.com/album/appearances/?id=" +
      id +
      "&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => data["album_appearances"])
    .catch((err) => console.error(err));
}

export default async function AlbumPage({ params }: any) {
  const songs: any[] = await getAlbumAppearances(params.id);

  const albumData: any = await getAlbumData(params.id);

  return (
      <div className="container">
        {albumData && <AlbumTitle albumData={albumData} />}
        <ol>
          {songs?.map((song) => {
            return (
              <li className={inter.className} key={song.id}>
                {" "}
                <AlbumAppearanceResult songData={song} />
              </li>
            );
          })}
        </ol>
      </div>
  );
}
