import CompareView from "@/app/components/compare/compare_view";

export default function ComparePage({
  params,
}: {
  params: { id: string; compareId: string };
}) {
  return <CompareView id={params.id} sampleId={params.compareId} />;
}
