/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getAlbumData } from "@/lib/utils/album-utils";
import Result from "@/types/result";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Rangi";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const albumData = await getAlbumData(params.id);

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {albumData ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={albumData.imgUrl}
              alt="Cover art"
              width={400}
              height={400}
              style={{ marginBottom: "2rem", boxShadow: "0 0 10px #000" }}
            />

            <img
              src={`${process.env.URL}/rangi.png`}
              alt="Rangi Logo"
              width={250}
              height={50}
            />
          </div>
        ) : (
          <>
            <img
              src={`${process.env.URL}/rangi.png`}
              alt="Rangi Logo"
              width={500}
              height={100}
            />
          </>
        )}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
