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
        backgroundColor: "#06090b",
        backgroundImage:
          "radial-gradient(50% 60% at 38% 0%, rgba(79,157,255,0.20) 0%, transparent 70%), radial-gradient(50% 60% at 64% 0%, rgba(45,219,192,0.20) 0%, transparent 70%)",
        color: "#ecefec",
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
          color: "#8b938d",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            backgroundColor: "#2ddbc0",
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
          color: "#8b938d",
          fontFamily: "sans-serif",
        }}
      >
        {profile.name}
      </div>
    </div>
  );
}
