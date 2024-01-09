import "server-only";
import { DicProperties, Locale } from "./types/dictionary-types";

export type Dictionary = {
  en: () => Promise<DicProperties>;
  fr: () => Promise<DicProperties>;
  de: () => Promise<DicProperties>;
};
const dictionaries: Dictionary = {
  en: () =>
    import("@/dictionaries/en-US.json").then((module) => module.default),
  fr: () =>
    // @ts-ignore
    import("@/dictionaries/fr-FR.json").then((module) => module.default),
  de: () =>
    // @ts-ignore
    import("@/dictionaries/de-DE.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
