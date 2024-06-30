/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getSongs } from "@/lib/utils/song-utils";

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
export default async function Image({
  params,
}: {
  params: { songId: string; sampleId: string };
}) {
  const [song, sample] = await getSongs(params.songId, params.sampleId);

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
        {song && sample ? (
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={song["song_art_image_thumbnail_url"]}
                alt="Cover art"
                width={400}
                height={400}
                style={{
                  marginBottom: "2rem",
                  boxShadow: "0 0 10px #000",
                }}
              />
              <img
                src={`${process.env.URL}/play.svg`}
                alt="Play"
                width={100}
                height={100}
                style={{ margin: "2rem" }}
              />
              <img
                src={sample["song_art_image_thumbnail_url"]}
                alt="Cover art"
                width={400}
                height={400}
                style={{ marginBottom: "2rem", boxShadow: "0 0 10px #000" }}
              />
            </div>

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
