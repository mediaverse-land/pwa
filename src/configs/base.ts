import { Locale } from "@/types/dictionary-types";

export const authURL = process.env.AUTH_URL;
export const baseURL = process.env.BASE_URL;

export const websiteTitle = process.env.NEXT_PUBLIC_APP_TITLE;
export const blogURL = process.env.NEXT_PUBLIC_BLOG_URL;
export const swaggerURL = process.env.NEXT_PUBLIC_SWAGGER_URL;
export const webAppDeepLink = process.env.NEXT_PUBLIC_DEEP_LINK;
export const playStoreLink = process.env.NEXT_PUBLIC_PLAY_STORE_LINK;

export const activeLocales = (process.env.NEXT_PUBLIC_ACTIVE_LOCALES?.split(',') || ["en"]) as Locale[];

export const logoURL =  process.env.NEXT_PUBLIC_APP_LOGO;
export const faviconURL =  process.env.NEXT_PUBLIC_APP_FAVICON;
export const backgroundImageURL =  process.env.NEXT_PUBLIC_BACKGROUND_IMAGE_URL;

export const imagePlaceHolders = {
  text: process.env.NEXT_PUBLIC_NO_TEXT_LINK,
  image: process.env.NEXT_PUBLIC_NO_IMAGE_LINK,
  audio: process.env.NEXT_PUBLIC_NO_AUDIO_LINK,
  video: process.env.NEXT_PUBLIC_NO_VIDEO_LINK,
  account: "/images/no-account-image.png",
} as const;
