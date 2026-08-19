import { profile } from "@/lib/profile";

export const ogImageSize = { width: 1200, height: 630 };

// Refined Dark social card — mirrors the site palette.
export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "84px",
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(60% 70% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)",
        color: "#f4f3f1",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 40,
          fontSize: 22,
          textTransform: "uppercase",
          letterSpacing: 8,
          color: "#9c9895",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            backgroundColor: "#f4f3f1",
            display: "flex",
          }}
        />
        {profile.role}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          lineHeight: 1.02,
          maxWidth: 1000,
        }}
      >
        {profile.headline}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          marginTop: 48,
          color: "#9c9895",
          fontFamily: "sans-serif",
        }}
      >
        {profile.name}
      </div>
    </div>
  );
}
