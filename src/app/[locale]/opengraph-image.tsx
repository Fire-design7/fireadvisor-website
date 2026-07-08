import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

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
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#f59e0b",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
            }}
          >
            🔥
          </div>
          <div style={{ display: "flex", fontSize: "40px", fontWeight: 700 }}>
            {tMeta("siteName")}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "48px",
            fontSize: "56px",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "920px",
          }}
        >
          {t("heroEyebrow")}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "24px",
            fontSize: "28px",
            color: "#cbd5e1",
            maxWidth: "820px",
          }}
        >
          fireadvisor.eu
        </div>
      </div>
    ),
    { ...size }
  );
}
