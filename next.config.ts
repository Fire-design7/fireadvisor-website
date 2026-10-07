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
      // Old WordPress sitemap URL still listed in Search Console.
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      // Old blog posts replaced by the rewritten articles.
      { source: "/blog/simvoli-za-evakuatsia-iso-7010", destination: "/blog/protivopozharni-znaci-iso-7010", permanent: true },
      { source: "/blog/znaci-za-evakuatsia-iso-16069", destination: "/blog/znaci-po-patya-za-evakuatsia", permanent: true },
      { source: "/en/blog/simvoli-za-evakuatsia-iso-7010", destination: "/en/blog/protivopozharni-znaci-iso-7010", permanent: true },
      { source: "/en/blog/znaci-za-evakuatsia-iso-16069", destination: "/en/blog/znaci-po-patya-za-evakuatsia", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
