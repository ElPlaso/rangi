import CompareView from "@/app/components/compare/compare_view";

export default async function ComparePage({
  params,
}: {
  params: { songId: string; sampleId: string };
}) {
  return <CompareView id={params.songId} sampleId={params.sampleId} />;
}
