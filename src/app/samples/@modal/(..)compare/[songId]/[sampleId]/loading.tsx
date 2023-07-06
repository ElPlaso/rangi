import LoadingIndicator from "@/app/components/loading_indicator";
import Modal from "@/app/components/modal/modal";

export default function Loading() {
  return (
    <Modal>
      <LoadingIndicator />
    </Modal>
  );
}
