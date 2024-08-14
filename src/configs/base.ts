import { Locale } from "@/types/dictionary-types";

export const baseURL = process.env.BASE_URL;

export const websiteTitle = process.env.NEXT_PUBLIC_APP_TITLE;
export const blogURL = process.env.NEXT_PUBLIC_BLOG_URL;
export const swaggerURL = process.env.NEXT_PUBLIC_SWAGGER_URL;
export const webAppDeepLink = process.env.NEXT_PUBLIC_DEEP_LINK;
export const playStoreLink = process.env.NEXT_PUBLIC_PLAY_STORE_LINK;

export const activeLocales = (process.env.NEXT_PUBLIC_ACTIVE_LOCALES?.split(',') || ["en"]) as Locale[];

export const logoURL = "/images/logo.png";

export const imagePlaceHolders = {
  image: "/images/No-Image.png",
  video: "/images/No-Video.png",
  audio: "/images/No-Sound.png",
  text: "/images/No-Text.png",
  account: "/images/no-account-image.png",
} as const;
