import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/za-nas", permanent: true },
      { source: "/services", destination: "/uslugi", permanent: true },
      { source: "/contact", destination: "/kontakti", permanent: true },
      { source: "/blog-2", destination: "/blog", permanent: true },
      { source: "/archives/:id", destination: "/blog", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
