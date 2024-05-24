import {Locale} from "@/types/dictionary-types";

export const baseURL = process.env.BASE_URL;
export const blogURL = "https://blog.mediaverse.land/api";
export const swaggerURL = "https://swagger.mediaverse.land";
export const websiteTitle = "MediaVerse";
// logo url relative to public folder
export const logoURL = "/images/media-verse-logo.png";
export const webAppDeepLink = "mediaverse://media.verse";

export const activeLocales = ["en", "fr", "de"] as Locale[];
