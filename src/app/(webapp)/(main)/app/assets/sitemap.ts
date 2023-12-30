import { getSitemap } from "@/services/contactService";
import { MetadataRoute } from "next";

export default async function assets_sitemap(): Promise<MetadataRoute.Sitemap> {
    const d = await getSitemap()

    const data = await d.json()

    return [
        {
            url: process.env.NEXTAUTH_URL + "/app/explore",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        ...data.images.map((x: any, i: any) => ({
            url: `${process.env.NEXTAUTH_URL}/app/assets/image/${x.name.replaceAll(' ', '-')}?id=${x.id}`,
            lastModified: x.updated_at,
            changeFrequency: "weekly",
            priority: 1,
        })),
        ...data.videos.map((x: any, i: any) => ({
            url: `${process.env.NEXTAUTH_URL}/app/assets/video/${x.name.replaceAll(' ','-')}?id=${x.id}`,
            lastModified: x.updated_at,
            changeFrequency: "weekly",
            priority: 1,
        })),
        ...data.audio.map((x: any, i: any) => ({
            url: `${process.env.NEXTAUTH_URL}/app/assets/audio/${x.name.replaceAll(' ','-')}?id=${x.id}`,
            lastModified: x.updated_at,
            changeFrequency: "weekly",
            priority: 1,
        })),
        ...data.text.map((x: any, i: any) => ({
            url: `${process.env.NEXTAUTH_URL}/app/assets/text/${x.name.replaceAll(' ','-')}?id=${x.id}`,
            lastModified: x.updated_at,
            changeFrequency: "weekly",
            priority: 1,
        }))

    ];
}
