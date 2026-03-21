import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SlimCore Belt - Hide Your Belly Instantly";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background:
          "linear-gradient(135deg, #0B1628 0%, #0C3DC4 50%, #00B5A3 100%)",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -120,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(0,181,163,0.15)",
        }}
      />

      {/* Left content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          width: "55%",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 50,
            padding: "10px 24px",
            marginBottom: 32,
          }}
        >
          <span style={{ color: "#00B5A3", fontSize: 18, fontWeight: 700 }}>
            +1200 Orders in Morocco
          </span>
        </div>

        {/* Brand */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 8,
            letterSpacing: -2,
          }}
        >
          SlimCore
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 40,
            letterSpacing: -0.5,
          }}
        >
          Slim Belt for Men
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #1554E8, #00B5A3)",
              borderRadius: 16,
              padding: "14px 36px",
              fontSize: 36,
              fontWeight: 800,
              color: "white",
            }}
          >
            199 MAD
          </div>
          <div
            style={{
              background: "rgba(0,181,163,0.2)",
              borderRadius: 50,
              padding: "10px 24px",
              fontSize: 18,
              fontWeight: 700,
              color: "#00B5A3",
            }}
          >
            FREE Shipping
          </div>
        </div>
      </div>

      {/* Right - product placeholder */}
      <div
        style={{
          width: "45%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: 32,
            background: "rgba(255,255,255,0.08)",
            border: "2px solid rgba(255,255,255,0.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              letterSpacing: -1,
            }}
          >
            SC
          </div>
          <div
            style={{
              width: 60,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #1554E8, #00B5A3)",
              marginTop: 16,
              marginBottom: 16,
            }}
          />
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 600,
            }}
          >
            COD Available
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
