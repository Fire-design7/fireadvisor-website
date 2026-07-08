import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fire Advisor",
    short_name: "Fire Advisor",
    description: "Проектиране, изграждане и поддръжка на системи за пожарна безопасност.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f0",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
