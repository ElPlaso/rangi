import CompareView from "@/app/components/compare/compare_view";
import Modal from "@/app/components/modal/modal";

export default function CompareModal({
  params,
}: {
  params: { id: string; compareId: string };
}) {
  return (
    <Modal>
      <CompareView id={params.id} sampleId={params.compareId} />
    </Modal>
  );
}
