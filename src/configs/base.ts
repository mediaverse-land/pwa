import { Locale } from "@/types/dictionary-types";

export const baseURL = process.env.BASE_URL;
export const blogURL = "https://blog.gibical.app/api";
export const swaggerURL = "https://swagger.gibical.app";
export const websiteTitle = "Gibical";
// logo url relative to public folder
export const logoURL = "/images/logo.png";
export const webAppDeepLink = "gibical://gibical.app";
export const playStoreLink = "https://play.google.com/store/apps/dev?id=5496792530233834443";

export const activeLocales = ["de", "en", "fr"] as Locale[];

export const imagePlaceHolders = {
  image: "/images/No-Image.png",
  video: "/images/No-Video.png",
  audio: "/images/No-Sound.png",
  text: "/images/No-Text.png",
  account: "/images/no-account-image.png",
} as const;
