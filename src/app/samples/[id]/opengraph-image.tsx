import { ImageResponse } from "next/server";
import { getSongData } from "./utils";

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
  const songData: any = await getSongData(params.id);

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
              src={songData["song_art_image_thumbnail_url"]}
              alt="Cover art"
              width={200}
              height={200}
              style={{ marginBottom: "2rem", boxShadow: "0 0 10px #000" }}
            />

            <img
              src="https://rangi.beatbotanica.com/rangi.png"
              alt="Rangi Logo"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <>
            <img
              src="https://rangi.beatbotanica.com/rangi.png"
              alt="Rangi Logo"
              width={400}
              height={400}
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
