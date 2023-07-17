import { ImageResponse } from "next/server";

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
export default async function Image() {
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
          backgroundColor: "#2563EB",
        }}
      >
        <img
          src={`${process.env.URL}/rangi.png`}
          alt="Rangi Logo"
          width={500}
          height={100}
          style={{ filter: "invert(1)" }}
        />
        <img
          src={`${process.env.URL}/bird.png`}
          alt="Bird Logo"
          width={150}
          height={150}
          style={{ filter: "invert(1)" }}
        />
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
