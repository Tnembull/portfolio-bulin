import { ImageResponse } from "next/og";
import { fetchPortfolioFromSupabase } from "@/lib/supabase";

export const runtime = "edge";

export const alt = "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const data = await fetchPortfolioFromSupabase();
  const name = data?.hero?.name || "Muhammad Nur Ashiddiqi";
  const role = data?.hero?.role || "DevOps & Backend Engineer";
  const bio =
    data?.hero?.bio ||
    "Backend Developer turned DevOps Engineer. Experienced in building structured REST APIs, PostgreSQL optimization, Docker containerization, Kubernetes orchestration, and automated CI/CD deployment pipelines.";
  const domain = "bulindev.tech";

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
          backgroundColor: "#0d1013",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Bar: Brand Monogram & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                backgroundColor: "#14181d",
                border: "1px solid #262e37",
                color: "#00d29d",
                fontSize: "20px",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              MNA
            </div>

            <div
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#00d29d",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              ENGINEERING PORTFOLIO
            </div>
          </div>

          <div
            style={{
              fontSize: "13px",
              fontFamily: "monospace",
              color: "#8e98a4",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "6px",
              backgroundColor: "#14181d",
              border: "1px solid #262e37",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#00d29d",
              }}
            />
            AVAILABLE FOR COLLABORATION
          </div>
        </div>

        {/* Middle Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#f0f2f5",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            {name}
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#00d29d",
              letterSpacing: "-0.5px",
              fontFamily: "monospace",
            }}
          >
            {role}
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "#8e98a4",
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
            borderTop: "1px solid #262e37",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#f0f2f5",
              fontWeight: 600,
            }}
          >
            https://{domain}
          </div>

          <div
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#8e98a4",
            }}
          >
            INDONESIA · GMT+7
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
