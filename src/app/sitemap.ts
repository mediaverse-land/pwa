import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: process.env.NEXTAUTH_URL + "",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: process.env.NEXTAUTH_URL + "/blogs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: process.env.NEXTAUTH_URL + "/terms",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: process.env.NEXTAUTH_URL + "/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: process.env.NEXTAUTH_URL + "/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: process.env.NEXTAUTH_URL + "/about-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: process.env.NEXTAUTH_URL + "/app/assets/sitemap.xml",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: process.env.NEXTAUTH_URL + "/blogs/sitemap.xml",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
