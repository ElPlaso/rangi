import "@/styles/styles.css";
import AlbumAppearanceResult from "@/components/album/album_appearance_result";
import AlbumTitle from "@/components/album/album_title";
import Result from "@/types/result";
import { getAlbumAppearances, getAlbumData } from "@/lib/utils/album-utils";

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
    twitter: {
      card: "summary",
      site: "@rangi",
    },
    openGraph: {
      description: `Samples used in ${albumData["name"]} by ${albumData["artist"]["name"]}`,
      type: "website",
      url: `https://rangi.beatbotanica.com/album/${params.id}`,
    },
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
              <li key={song.id}>
                <AlbumAppearanceResult song={song} />
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
