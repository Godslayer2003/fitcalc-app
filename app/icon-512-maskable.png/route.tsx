import { ImageResponse } from "next/og";

// Manifest "maskable" icon: full-bleed background with the glyph kept in
// the inner ~80% safe zone, per the maskable-icon spec - the OS (Android
// adaptive icons, etc.) applies its own shape mask (circle, squircle,
// rounded square) on top, so this must not pre-crop its own shape.
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#059669",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="230"
          height="230"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        </svg>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
