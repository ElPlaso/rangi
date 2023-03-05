import { Inter } from "@next/font/google";
import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import Link from "next/link";
import AlbumAppearanceResult from "./components/album_appearance_result";

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
    <>
      <div className={styles.description}>
        <Link href={`/`}>
          <p>
            <Image
              className={styles.logo}
              src="/samplify.svg"
              alt="Samplify X Logo"
              width={150}
              height={20}
              priority
            />
          </p>
        </Link>
      </div>
      {albumData && (
        <div
          style={{
            display: "flex",
            margin: "1rem",
          }}
        >
          <Image
            src={albumData["cover_art_url"]}
            alt={"Album Art"}
            width={100}
            height={100}
            style={{
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <div style={{ paddingLeft: "1rem" }}>
            <h1 className={inter.className}>{albumData["name"]}</h1>
            {albumData["artist"]["name"] && (
              <h2 className={inter.className}>{albumData["artist"]["name"]}</h2>
            )}
          </div>
        </div>
      )}
      <div>
        {songs?.map((song) => {
          return (
            <AlbumAppearanceResult
              key={song.id}
              songData={song}
            />
          );
        })}
      </div>
    </>
  );
}
