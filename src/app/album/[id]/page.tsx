import { Inter } from "@next/font/google";
import "@/app/styles/styles.css";
import AlbumAppearanceResult from "./components/album_appearance_result";
import AlbumTitle from "./components/album_title";
import Result from "@/app/types/result";
import { getAlbumAppearances, getAlbumData } from "./utils";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: any) {
  const albumData: any = await getAlbumData(params.id);
  if (!albumData) {
    return {
      title: "Album",
    };
  }
  return {
    title: albumData["name"],
    description: `Samples used in ${albumData["name"]} by ${albumData["artist"]["name"]}`,
  };
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
