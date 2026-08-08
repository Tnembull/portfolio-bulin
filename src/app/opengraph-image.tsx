import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const name = "Muhammad Nur Ashiddiqi";
  const role = "DevOps & Backend Engineer";
  const bio = "Kubernetes • CI/CD Pipelines • Cloud Infrastructure (AWS/GCP) • Terraform • High Availability System Architecture";
  const domain = "https://bulindev.tech";
  const initials = "MNA";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#19131a",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Mint Glow in Top-Right Corner */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(72, 182, 133, 0.25) 0%, rgba(25, 19, 26, 0) 70%)",
          }}
        />

        {/* Ambient Subtle Mint Glow in Bottom-Left */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(72, 182, 133, 0.12) 0%, rgba(25, 19, 26, 0) 70%)",
          }}
        />

        {/* Top Bar: Monogram Logo & System Status Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Monogram Badge */}
            <div
              style={{
                width: "64px",
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                backgroundColor: "rgba(72, 182, 133, 0.15)",
                border: "1.5px solid rgba(72, 182, 133, 0.5)",
              }}
            >
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: "900",
                  color: "#48b685",
                  fontFamily: "monospace",
                }}
              >
                {initials}
              </div>
            </div>

            <div
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#48b685",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                backgroundColor: "rgba(72, 182, 133, 0.1)",
                border: "1px solid rgba(72, 182, 133, 0.3)",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              01 // DEVOPS PORTFOLIO MATRIX
            </div>
          </div>

          <div
            style={{
              fontSize: "13px",
              fontFamily: "monospace",
              color: "#48b685",
              fontWeight: 700,
              backgroundColor: "rgba(72, 182, 133, 0.1)",
              border: "1px solid rgba(72, 182, 133, 0.3)",
              padding: "8px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#48b685",
              }}
            />
            ONLINE // SYSTEM_STABLE
          </div>
        </div>

        {/* Middle Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              color: "#e7e9db",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            {name}
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#48b685",
              letterSpacing: "-0.5px",
              fontFamily: "monospace",
            }}
          >
            {role}
          </div>

          <div
            style={{
              fontSize: "19px",
              color: "#a392a3",
              maxWidth: "920px",
              lineHeight: 1.5,
              marginTop: "4px",
            }}
          >
            {bio}
          </div>
        </div>

        {/* Bottom Bar: Domain Link & Region */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "24px",
            borderTop: "1px solid #483145",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#48b685",
              fontWeight: 700,
            }}
          >
            {domain}
          </div>

          <div
            style={{
              fontSize: "15px",
              fontFamily: "monospace",
              color: "#a392a3",
              fontWeight: 600,
            }}
          >
            INDONESIA // ASIA-SOUTHEAST
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
