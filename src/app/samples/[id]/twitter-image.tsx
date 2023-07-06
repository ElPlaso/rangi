import OGImage from "./opengraph-image";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  return OGImage({ params });
}
