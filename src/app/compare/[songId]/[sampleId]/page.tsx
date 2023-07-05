import CompareView from "@/app/components/compare/compare_view";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function ComparePage({
  params,
}: {
  params: { songId: string; sampleId: string };
}) {
  return (
    <div>
      <h1 className={inter.className}>Compare</h1>
      <div style={{ marginTop: "2rem" }}>
        <CompareView id={params.songId} sampleId={params.sampleId} />
      </div>
    </div>
  );
}
