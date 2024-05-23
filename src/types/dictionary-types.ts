export type Locale = "en" | "fr" | "de" | "fa";
export type TFullLocales = "en-US" | "fr-FR" | "de-DE" | "fa-IR";
export const FullLocaleNames: {
  [key in Locale]: TFullLocales;
} = {
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  fa: "fa-IR"
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
    whatIs: string;
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
    appNews: string;
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
    connectToStripe: string;
    notConnetToStripe: string;
    completeInfo: string;
    clickHere: string;
  };
  generalApp: {
    viewAll: string;
    dailyRecommended: string;
    recently: string;
    bestInMonth: string;
    search: string;
    signUp: string;
    login: string;
    logout: string;
    webApp: string;
    tag: string;
    searchIn: string;
    searchInMore: string;
  };
  setting: {
    account: string;
    message: string;
    wallet: string;
    analytics: string;
    shareAccount: string;
    messages: string;
    noMessage: string;
    generalInforamtion: string;
    signIns: string;
    sessions: string;
  };
  auth: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    cellPhone: string;
    edit: string;
    confirmLogout: string;
    yes: string;
    no: string;
  };
  login: {
    signUpWithApple: string,
    signUpWithGoogle: string,
    signUpWithFacebook: string,
    signUpWithX: string,
    or: string,
    noAccount: string,
    signUp: string,
    signInWithPassQ: string,
    signInWithOtpQ: string,
  }
};
