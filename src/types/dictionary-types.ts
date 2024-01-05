export type Locale = "en" | "fr" | "de";
export type TFullLocales = "en-US" | "fr-FR" | "de-DE";
export const FullLocaleNames: {
  [key in Locale]: TFullLocales;
} = {
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
};

export type DicProperties = {
  header: {
    slogan: string;
    home: string;
    blog: string;
    terms: string;
    privacy: string;
    api: string;
    faq: string;
    about: string;
  };
  homepage: {
    whatIsMediaverse: string;
    description: string;
    exploreLimitless: string;
    liveTvChannels: string;
    bestVideos: string;
    mostViewedImages: string;
    topTexts: string;
    bestSongs: string;
  };
  footer: {
    haveNotTriedTheAppYet: string;
  };
  blogSection: {
    mediaverseNews: string;
    alwaysBeUpdate: string;
  };
  faqSection: {
    title: string;
  };
  aboutUs: {
    office: string;
    phone: string;
    email: string;
  };
  appSidebar: {
    explore: string;
    account: string;
    wallet: string;
    settings: string;
    logout: string;
  };
  appAccounts: {
    assets: string;
    sales: string;
    volume: string;
    subscribes: string;
    myAssets: string;
    all: string;
    noContentToShow: string;
  };
  appWallet: {
    inventory: string;
    addInventory: string;
  };
};
