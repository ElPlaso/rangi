import CompareView from "@/app/components/compare/compare_view";
import Modal from "@/app/components/modal/modal";
import { getSongs } from "@/app/compare/[songId]/[sampleId]/utils";

export default async function CompareModal({
  params,
}: {
  params: { songId: string; sampleId: string };
}) {
  const [song, sample] = await getSongs(params.songId, params.sampleId);

  return (
    <Modal>
      <CompareView song={song} sample={sample} />
    </Modal>
  );
}
