import { Locale } from "@/types/dictionary-types";

export const baseURL = process.env.BASE_URL;
export const blogURL = process.env.BLOG_URL;
export const swaggerURL = process.env.SWAGGER_URL;
export const websiteTitle = process.env.APP_TITLE;
// logo url relative to public folder
export const logoURL = "/images/logo.png";
export const webAppDeepLink = process.env.DEEP_LINK;
export const playStoreLink = process.env.PLAY_STORE_LINK;

export const activeLocales = ["de", "en", "fr"] as Locale[];

export const imagePlaceHolders = {
  image: "/images/No-Image.png",
  video: "/images/No-Video.png",
  audio: "/images/No-Sound.png",
  text: "/images/No-Text.png",
  account: "/images/no-account-image.png",
} as const;
