import { getBlogsSitemap } from "@/services/contactService";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const d = await getBlogsSitemap()

  const data = await d.json()
  return data.posts.map((x: any, i: any) => ({
    url: `${process.env.NEXTAUTH_URL}/blogs/${x.id}`,
    lastModified: x.updated_at,
    changeFrequency: "weekly",
    priority: 1,
  }))
}
