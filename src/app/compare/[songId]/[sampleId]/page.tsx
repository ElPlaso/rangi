import CompareView from "@/app/components/compare/compare_view";

import { getSongs } from "./utils";

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
    description: `Compare ${song.title} by ${song.artist_names} to ${sample.title} by ${sample.artist_names}`,
    twitter: {
      card: "summary",
      site: "@samplify",
    },
    openGraph: {
      description: `Compare ${song.title} by ${song.artist_names} to ${sample.title} by ${sample.artist_names}`,
      type: "website",
      url: `https://samplify.vercel.app/compare/${params.songId}/${params.sampleId}`,
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
      <h1 className="font-semibold text-2xl">Compare</h1>
      <div style={{ marginTop: "2rem" }}>
        <CompareView song={song} sample={sample} />
      </div>
    </div>
  );
}
