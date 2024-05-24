import "server-only";
import { DicProperties, Locale } from "./types/dictionary-types";

export type Dictionary = {
  en: () => Promise<DicProperties>;
  fr: () => Promise<DicProperties>;
  de: () => Promise<DicProperties>;
  fa: () => Promise<DicProperties>;
  ar: () => Promise<DicProperties>;
};
const dictionaries: Dictionary = {
  en: () =>
    import("@/dictionaries/en-US.json").then((module) => module.default),
  fr: () =>
    import("@/dictionaries/fr-FR.json").then((module) => module.default),
  de: () =>
    import("@/dictionaries/de-DE.json").then((module) => module.default),
  fa: () =>
    import("@/dictionaries/fa-IR.json").then((module) => module.default),
  ar: () =>
    import("@/dictionaries/ar-SA.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
