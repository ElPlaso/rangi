import CompareView from "@/app/components/compare/compare_view";
import { getSongData } from "@/app/samples/[id]/utils";
import { Inter } from "@next/font/google";
import { cache } from "react";

const inter = Inter({ subsets: ["latin"] });

export const getSongs = cache(async (id: string, sampleId: string) => {
  const songData: any = await getSongData(id);
  const sampleData: any = await getSongData(sampleId);

  return [songData, sampleData];
});

export default async function ComparePage({
  params,
}: {
  params: { songId: string; sampleId: string };
}) {
  const [song, sample] = await getSongs(params.songId, params.sampleId);

  return (
    <div>
      <h1 className={inter.className}>Compare</h1>
      <div style={{ marginTop: "2rem" }}>
        <CompareView song={song} sample={sample} />
      </div>
    </div>
  );
}
