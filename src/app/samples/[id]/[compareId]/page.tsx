import CompareView from "./components/compare_view";

export default function ComparePage({
  params,
}: {
  params: { id: string; compareId: string };
}) {
  return <CompareView id={params.id} sampleId={params.compareId} />;
}
