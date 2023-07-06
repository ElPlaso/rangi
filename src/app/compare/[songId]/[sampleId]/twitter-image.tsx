import OGImage from "./opengraph-image";

export default async function Image({
  params,
}: {
  params: { songId: string; sampleId: string };
}) {
  return OGImage({ params });
}
