"use client";

import { useState, useEffect, useRef, RefObject } from "react";

const beforePoints = [
  "بطن بارز وواسع",
  "الملابس ما تجيش كيف خصصت",
  "ثقة في النفس قليلة",
];

const afterPoints = [
  "بطن مسطح فوراً من أول لبسة",
  "شكل أنحف نحت الملابس",
  "ثقة أكبر بالنفس طول اليوم",
];

function useInView(
  threshold = 0.2,
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function BeforeCard({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 24,
        overflow: "hidden",
        border: "1.5px solid #fca5a5",
        background: "#fff",
        transform: visible
          ? "translateX(0) rotate(-1deg)"
          : "translateX(-60px)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s ease",
        transitionDelay: "0.1s",
        position: "relative",
      }}
    >
      {/* Image Area */}
      <div
        style={{
          position: "relative",
          height: 320,
          background:
            "linear-gradient(160deg, #fee2e2 0%, #fecaca 60%, #fca5a5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Before image */}
        <img
          src="/images/before.webp"
          alt="قبل"
          width={320}
          height={320}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Label */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "#ef4444",
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
            padding: "6px 18px",
            borderRadius: 50,
            fontFamily: "Tajawal, Cairo, sans-serif",
            letterSpacing: 0.5,
            boxShadow: "0 2px 12px rgba(239,68,68,0.3)",
          }}
        >
          قبل
        </div>

        {/* Zigzag lines on belly */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 32,
            overflow: "hidden",
          }}
        >
          <svg
            width="100%"
            height="32"
            viewBox="0 0 400 32"
            preserveAspectRatio="none"
          >
            <path
              d="M0,16 L20,4 L40,28 L60,4 L80,28 L100,4 L120,28 L140,4 L160,28 L180,4 L200,28 L220,4 L240,28 L260,4 L280,28 L300,4 L320,28 L340,4 L360,28 L380,4 L400,16 L400,32 L0,32Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 20px 24px", direction: "rtl" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            fontFamily: "Tajawal, Cairo, sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: "#dc2626",
          }}
        >
          <span style={{ fontSize: 22 }}>✕</span>
          بدون حزام SlimCore
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {beforePoints.map((pt, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                opacity: visible ? 1 : 0,
                transition: `transform 0.5s ease, opacity 0.5s ease`,
                transitionDelay: `${0.3 + i * 0.1}s`,
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#fee2e2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 13,
                  color: "#dc2626",
                  fontWeight: 700,
                }}
              >
                ✕
              </div>
              <span
                style={{
                  fontFamily: "Tajawal, Cairo, sans-serif",
                  fontSize: 14,
                  color: "#6b7280",
                  lineHeight: 1.5,
                }}
              >
                {pt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AfterCard({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 24,
        overflow: "hidden",
        border: "2px solid #14b8a6",
        background: "#fff",
        transform: visible ? "translateX(0) rotate(1deg)" : "translateX(60px)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s ease",
        transitionDelay: "0.2s",
        position: "relative",
        boxShadow: "0 8px 40px rgba(20,184,166,0.15)",
      }}
    >
      {/* Image Area */}
      <div
        style={{
          position: "relative",
          height: 320,
          background:
            "linear-gradient(160deg, #ccfbf1 0%, #99f6e4 60%, #5eead4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* After image */}
        <img
          src="/images/after.webp"
          alt="بعد"
          width={320}
          height={320}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Sparkle effects */}
        {[
          { top: 24, left: 24, size: 18, delay: 0.6 },
          { top: 60, left: 14, size: 12, delay: 0.8 },
          { top: 48, right: 28, size: 14, delay: 0.7 },
          { top: 90, right: 16, size: 10, delay: 0.9 },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              right: s.right,
              width: s.size,
              height: s.size,
              opacity: visible ? 0.8 : 0,
              transition: `opacity 0.4s ease ${s.delay}s`,
            }}
          >
            <svg viewBox="0 0 20 20" width="100%" height="100%">
              <path
                d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5Z"
                fill="#0d9488"
              />
            </svg>
          </div>
        ))}

        {/* Label */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "#0d9488",
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
            padding: "6px 18px",
            borderRadius: 50,
            fontFamily: "Tajawal, Cairo, sans-serif",
            letterSpacing: 0.5,
            boxShadow: "0 2px 12px rgba(13,148,136,0.35)",
          }}
        >
          بعد
        </div>

        {/* Wave bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 32,
            overflow: "hidden",
          }}
        >
          <svg
            width="100%"
            height="32"
            viewBox="0 0 400 32"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 Q50,4 100,18 Q150,32 200,16 Q250,2 300,18 Q350,32 400,14 L400,32 L0,32Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 20px 24px", direction: "rtl" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            fontFamily: "Tajawal, Cairo, sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: "#0d9488",
          }}
        >
          <span style={{ fontSize: 22 }}>✓</span>
          مع حزام SlimCore
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {afterPoints.map((pt, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                transform: visible ? "translateX(0)" : "translateX(20px)",
                opacity: visible ? 1 : 0,
                transition: `transform 0.5s ease, opacity 0.5s ease`,
                transitionDelay: `${0.35 + i * 0.1}s`,
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#ccfbf1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 13,
                  color: "#0d9488",
                  fontWeight: 700,
                }}
              >
                ✓
              </div>
              <span
                style={{
                  fontFamily: "Tajawal, Cairo, sans-serif",
                  fontSize: 14,
                  color: "#374151",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {pt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [ref, visible] = useInView(0.15);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap"
        rel="stylesheet"
      />
      <section
        ref={ref}
        style={{
          padding: "80px 20px",
          background: "#f8fafc",
          direction: "rtl",
          fontFamily: "Tajawal, Cairo, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
        className="before-after-section"
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "#ccfbf1",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "#fee2e2",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 48,
              transform: visible ? "translateY(0)" : "translateY(-30px)",
              opacity: visible ? 1 : 0,
              transition: "transform 0.6s ease, opacity 0.6s ease",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fef3c7",
                border: "1.5px solid #fbbf24",
                color: "#92400e",
                fontWeight: 700,
                fontSize: 13,
                padding: "6px 16px",
                borderRadius: 50,
                marginBottom: 16,
                letterSpacing: 0.3,
              }}
            >
              ⚡ الفرق واضح
            </div>

            <h2
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: "#111827",
                margin: "0 0 12px",
                lineHeight: 1.3,
              }}
            >
              شوف الفرق بعينيك
              <span style={{ color: "#0d9488" }}> — قبل وبعد</span>
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "#6b7280",
                margin: 0,
                fontWeight: 500,
              }}
            >
              نتائج حقيقية من أول استعمال
            </p>
          </div>

          {/* Cards */}
          <div className="cards-container">
            <BeforeCard visible={visible} />

            {/* VS divider */}
            <div className={`vs-divider ${visible ? "visible" : ""}`}>
              <div className="divider-line" />
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#fff",
                  border: "2px solid #e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#374151",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                VS
              </div>
              <div className="divider-line" />
            </div>

            <AfterCard visible={visible} />
          </div>

          {/* Bottom CTA teaser */}
          <div
            style={{
              textAlign: "center",
              marginTop: 40,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              opacity: visible ? 1 : 0,
              transition: "transform 0.6s ease, opacity 0.6s ease",
              transitionDelay: "0.6s",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#fff",
                border: "1.5px solid #d1d5db",
                borderRadius: 50,
                padding: "10px 24px",
                fontSize: 14,
                color: "#374151",
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: 18 }}>🔥</span>
              +2,400 زبون راضي عن النتيجة
              <span
                style={{
                  background: "#0d9488",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: 50,
                }}
              >
                جرب الآن
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
