import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "./lib/data";

export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [boldData, regularData] = await Promise.all([
    readFile(path.join(process.cwd(), "app/fonts/JetBrainsMono-Bold.ttf")),
    readFile(path.join(process.cwd(), "app/fonts/JetBrainsMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          backgroundColor: "#0a0d10",
          borderTop: "8px solid #5eff84",
          fontFamily: "JetBrains Mono",
          color: "#d6e4cc",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#7a8a7d",
            marginBottom: 28,
          }}
        >
          <span style={{ color: "#5eff84" }}>~/</span>
          <span style={{ color: "#d6e4cc" }}>{profile.handle}</span>
          <span style={{ color: "#7a8a7d" }}>.dev</span>
          <span style={{ marginLeft: 24 }}>$ whoami</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          <span>Mustafa</span>
          <span style={{ display: "flex", color: "#5eff84" }}>Alhelawe.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 30,
            color: "#7a8a7d",
          }}
        >
          <span style={{ color: "#5eff84", marginRight: 16 }}>&gt;</span>
          <span>{profile.role} · full-stack, distributed systems.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 24,
            color: "#4a5550",
          }}
        >
          {profile.location} · github.com/{profile.githubHandle}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "JetBrains Mono",
          data: boldData,
          style: "normal",
          weight: 700,
        },
        {
          name: "JetBrains Mono",
          data: regularData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
