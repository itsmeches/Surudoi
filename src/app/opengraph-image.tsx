import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Chester Andaya — Working Record";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0c0e",
          color: "#edeee9",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#d65c32",
          }}
        >
          Working Record
        </div>
        <div style={{ display: "flex", fontSize: 76, marginTop: 24, fontWeight: 600 }}>
          Chester Andaya
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 20, color: "#969691", maxWidth: 900 }}>
          Researcher · Engineer · Builder · Leader — ICMCR 2026 Tokyo
        </div>
      </div>
    ),
    { ...size }
  );
}
