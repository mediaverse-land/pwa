import { Locale } from "@/types/dictionary-types";

export const baseURL = process.env.BASE_URL;
export const blogURL = "https://blog.mediaverse.land/api";
export const swaggerURL = "https://swagger.mediaverse.land";
export const websiteTitle = "MediaVerse";
// logo url relative to public folder
export const logoURL = "/images/media-verse-logo.png";
export const webAppDeepLink = "mediaverse://media.verse";
export const playStoreLink =
  "https://play.google.com/store/apps/dev?id=9075123475680600566";
export const activeLocales = ["en", "fr", "de"] as Locale[];

export const imagePlaceHolders = {
  image: "/images/No-Image.png",
  video: "/images/No-Video.png",
  audio: "/images/No-Sound.png",
  text: "/images/No-Text.png",
};
