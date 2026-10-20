import type { MetadataRoute } from "next";

// Pre-launch: keep everything out of search engines until the final brand name is chosen.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
