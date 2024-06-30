import CompareView from "@/components/compare/compare_view";
import { getSongs } from "@/lib/utils/song-utils";

export async function generateMetadata({
  params,
}: {
  params: { songId: string; sampleId: string };
}) {
  const [song, sample] = await getSongs(params.songId, params.sampleId);

  if (!song || !sample) {
    return {
      title: "Compare Songs",
    };
  }

  return {
    title: `${song.title} & ${sample.title}`,
    description: `Compare ${song.title} by ${song.artist} to ${sample.title} by ${sample.artist}`,
    twitter: {
      card: "summary",
      site: "@rangi",
    },
    openGraph: {
      description: `Compare ${song.title} by ${song.artist} to ${sample.title} by ${sample.artist}`,
      type: "website",
      url: `https://rangi.beatbotanica.com/compare/${params.songId}/${params.sampleId}`,
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: { songId: string; sampleId: string };
}) {
  const [song, sample] = await getSongs(params.songId, params.sampleId);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Compare</h1>
      <div style={{ marginTop: "2rem" }}>
        {song && sample ? (
          <CompareView song={song} sample={sample} />
        ) : (
          <div className="flex items-center justify-center p-4">
            <p>Something went wrong</p>
          </div>
        )}
      </div>
    </div>
  );
}
