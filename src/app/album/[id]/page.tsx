import { Inter } from "@next/font/google";
import "@/app/styles/styles.css";
import AlbumAppearanceResult from "./components/album_appearance_result";
import AlbumTitle from "./components/album_title";
import { GET as albumAppearancesAPIGet } from "@/app/api/album/route";
import Result from "@/app/types/result";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: any) {
  const albumData: any = await getAlbumData(params.id);
  if(!albumData) {
    return{
      title: "Album",
    }
  }
  return {
    title: albumData["name"],
    description: `Samples used in ${albumData["name"]} by ${albumData["artist"]["name"]}`,
  };
}

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
  const request = new Request(`${process.env.URL}/api/album?id=${id}`);

  return (await albumAppearancesAPIGet(request)).json();
}

export default async function AlbumPage({ params }: any) {
  const songs: Result[] = await getAlbumAppearances(params.id);

  const albumData: any = await getAlbumData(params.id);

  return (
    <>
      {albumData && <AlbumTitle albumData={albumData} />}

      <div className="container albumSampleList">
        <ol>
          {songs?.map((song) => {
            return (
              <li className={inter.className} key={song.id}>
                <AlbumAppearanceResult song={song} />
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
