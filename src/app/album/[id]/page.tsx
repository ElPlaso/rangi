import "@/styles/styles.css";
import AlbumAppearanceResult from "@/components/album/album_appearance_result";
import AlbumTitle from "@/components/album/album_title";
import Result from "@/types/result";
import { getAlbumAppearances, getAlbumData } from "@/lib/utils/album-utils";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const albumData = await getAlbumData(params.id);
  if (!albumData) {
    return {
      title: "Album",
    };
  }
  return {
    title: albumData.title,
    description: `Samples used in ${albumData.title} by ${albumData.artist}`,
    twitter: {
      card: "summary",
      site: "@rangi",
    },
    openGraph: {
      description: `Samples used in ${albumData.title} by ${albumData.artist}`,
      type: "website",
      url: `https://rangi.beatbotanica.com/album/${params.id}`,
    },
  };
}

export default async function AlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const songs: Array<Result> = await getAlbumAppearances(params.id);

  const albumData: Result | null = await getAlbumData(params.id);

  return (
    <>
      {albumData && <AlbumTitle album={albumData} />}

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
