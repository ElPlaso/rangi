import CompareView from "@/app/components/compare/compare_view";
import Modal from "@/app/components/modal/modal";
import { Suspense } from "react";
import DotsLoader from "@/app/components/dots_loader";

export default function CompareModal({
  params,
}: {
  params: { id: string; compareId: string };
}) {
  return (
    <Modal>
      <Suspense fallback={<DotsLoader />}>
        <CompareView id={params.id} sampleId={params.compareId} />
      </Suspense>
    </Modal>
  );
}
