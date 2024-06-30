/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getSongData } from "@/lib/utils/song-utils";

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
  const songData = await getSongData(params.id);

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
        {songData ? (
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
              src={songData.imgUrl}
              alt="Cover art"
              width={300}
              height={300}
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
