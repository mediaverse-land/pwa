import { PostCommentData } from "@/types";
import { TFullLocales } from "@/types/dictionary-types";

export const URL = process.env.BASE_URL ?? "https://api.mediaverse.land/v2";

const fetchInstance = (url: string, lang?: TFullLocales) => {
  if (process.env.NODE_ENV === "production")
    return fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "Accept-Language": lang || "en-US",
        accept: "application/json",
        "x-app": "_Web",
      },
    });
  else
    return fetch(url, {
      cache: "no-store",
      headers: {
        "Accept-Language": lang || "en-US",
        accept: "application/json",
        "x-app": "_Web",
      },
    });
};

export const getMostViewedImages = async (lang: TFullLocales) => {
  const url = `${URL}/images/most-viewed`;
  return fetchInstance(url, lang);
};
export const getRecentlyImages = async () => {
  const url = `${URL}/images/newest`;
  return fetchInstance(url);
};
export const getRecommendedImages = async () => {
  const url = `${URL}/images/daily-recommended`;
  return fetchInstance(url);
};
export const getSingleImage = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  const url = `${URL}/images/${id}`;
  return token
    ? fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
          accept: "application/json",
          "x-app": "_Web",
          Authorization: `Bearer ${token}`,
        },
      })
    : fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
          accept: "application/json",
          "x-app": "_Web",
        },
      });
};
export const getSingleVideo = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  const url = `${URL}/videos/${id}`;
  return token
    ? fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
          accept: "application/json",
          "x-app": "_Web",
          Authorization: `Bearer ${token}`,
        },
      })
    : fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
          accept: "application/json",
          "x-app": "_Web",
        },
      });
};
export const getSingleText = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  const url = `${URL}/texts/${id}`;
  return token
    ? fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
          accept: "application/json",
          "x-app": "_Web",
          Authorization: `Bearer ${token}`,
        },
      })
    : fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
          accept: "application/json",
          "x-app": "_Web",
        },
      });
};
export const getSingleAudio = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  const url = `${URL}/audios/${id}`;
  return token
    ? fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
          accept: "application/json",
          "x-app": "_Web",
          Authorization: `Bearer ${token}`,
        },
      })
    : fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
          accept: "application/json",
          "x-app": "_Web",
        },
      });
};
export const getMostViewedText = async (lang: TFullLocales) => {
  const url = `${URL}/texts/most-viewed`;
  return fetchInstance(url, lang);
};
export const getRecentlyTexts = async () => {
  const url = `${URL}/texts/newest`;
  return fetchInstance(url);
};
export const getRecommendedTexts = async () => {
  const url = `${URL}/texts/daily-recommended`;
  return fetchInstance(url);
};

export const getMostViewedVideos = (lang: TFullLocales) => {
  const url = `${URL}/videos/most-viewed`;
  return fetchInstance(url, lang);
};
export const getRecentlyVideos = () => {
  const url = `${URL}/videos/newest`;
  return fetchInstance(url);
};
export const getRecommendedVideos = () => {
  const url = `${URL}/videos/daily-recommended`;
  return fetchInstance(url);
};

export const getMostViewedSongs = (lang: TFullLocales) => {
  const url = `${URL}/audios/most-viewed`;
  return fetchInstance(url, lang);
};
export const getRecentlySongs = () => {
  const url = `${URL}/audios/newest`;
  return fetchInstance(url);
};
export const getRecommendedSongs = () => {
  const url = `${URL}/audios/daily-recommended`;
  return fetchInstance(url);
};
export const getProfileStatics = (token: string) => {
  const url = `${URL}/profile/statics`;
  return fetch(url, {
    next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserWallets = (token: string) => {
  const url = `${URL}/wallets`;
  return fetch(url, {
    next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserMessages = (token: string) => {
  const url = `${URL}/notifications`;
  return fetch(url, {
    next: { revalidate: process.env.NODE_ENV === "production" ? 10 : 0 },
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserSingleMessage = ({
  id,
  token,
}: {
  token: string;
  id: string;
}) => {
  const url = `${URL}/notifications/${id}`;
  return fetch(url, {
    next: { revalidate: process.env.NODE_ENV === "production" ? 10 : 0 },
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTerms = ({ lang }: { lang: TFullLocales }) => {
  const url = `${URL}/terms`;
  return fetchInstance(url, lang);
};

export const getPrivacy = (lang: TFullLocales) => {
  const url = `${URL}/privacy`;
  return fetchInstance(url, lang);
};
export const getLives = async ({
  params,
  lang,
}: {
  params?: string;
  lang: TFullLocales;
}) => {
  const url = `${URL}/channels${params}`;
  return fetchInstance(url, lang);
};
export const getFAQ = (lang: TFullLocales) => {
  const url = `${URL}/faq`;
  return fetchInstance(url, lang);
};
export const getHome = (lang: TFullLocales) => {
  const url = `${URL}/home`;
  return fetchInstance(url, lang);
};
export const getAboutUs = (lang: TFullLocales) => {
  const url = `${URL}/about-us`;
  return fetchInstance(url, lang);
};
export const getSearch = (params: string) => {
  const url = `${URL}/search?${params}`;
  return fetchInstance(url);
};
export const getSubscribeAssets = ({
  params,
  token,
}: {
  params: string;
  token: string;
}) => {
  const url = `${URL}/profile/subscriptions${params}`;
  return fetch(url, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 2 : 50,
      tags: ["getSubscribeAssets"],
    },
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getOwnershipAssets = ({
  params,
  token,
}: {
  params: string;
  token: string;
}) => {
  const url = `${URL}/profile${params}`;
  return fetch(url, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 2 : 60,
      tags: ["getOwnershipAssets"],
    },
    method: "GET",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserBalance = ({ token }: { token: string }) => {
  const url = `${URL}/stripe/balance`;
  return fetch(url, {
    next: { revalidate: 0, tags: ["getUserBalance"] },
    // cache: "no-store",
    method: "GET",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserStripeAccount = ({ token }: { token: string }) => {
  const url = `${URL}/stripe/account`;
  return fetch(url, {
    next: { revalidate: 0 },
    method: "GET",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserProfile = ({ token }: { token: string }) => {
  const url = `${URL}/profile`;
  return fetch(url, {
    // next: {
    //   revalidate: process.env.NODE_ENV === "production" ? 0 : 0,
    //   tags: ["getUserProfile"],
    // },
    cache: "no-store",
    method: "GET",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const buyAsset_Fetch = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const url = `${URL}/assets/${id}/buy`;
  return fetch(url, {
    next: { revalidate: 0 },
    method: "PATCH",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const connetToStripe_Fetch = async ({ token }: { token: string }) => {
  const url = `${URL}/stripe/connect`;
  return fetch(url, {
    next: { revalidate: 0, tags: ["connetStripe"] },
    method: "POST",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "Content-Type": "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getStripeGateway = async ({ token }: { token: string }) => {
  const url = `${URL}/stripe/gateway`;
  return fetch(url, {
    next: { revalidate: 0, tags: ["getStripeGateway"] },
    method: "GET",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "Content-Type": "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const putUserProfile = ({
  token,
  data,
}: {
  token: string;
  data: any;
}) => {
  const url = `${URL}/profile`;
  return fetch(url, {
    next: { revalidate: process.env.NODE_ENV === "production" ? 10 : 0 },
    method: "PUT",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const getComments = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const url = `${URL}/assets/${id}/comments`;
  return fetch(url, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const postComment = async ({
  body,
  token,
}: {
  body: PostCommentData;
  token: string;
}) => {
  const url = `${URL}/assets/comments`;
  return fetch(url, {
    next: { revalidate: 0 },
    method: "POST",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "Content-Type": "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
};

export const getSignIns = async ({ token }: { token: string }) => {
  const url = `${URL}/sign-ins`;
  return fetch(url, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 10 : 0,
    },
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getSessions = async ({ token }: { token: string }) => {
  const url = `${URL}/sessions`;
  return fetch(url, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 10 : 0,
    },
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBlogs = ({
  page,
  lang,
}: {
  page: number;
  lang: TFullLocales;
}) => {
  const url = `https://blog.mediaverse.land/api/posts?page=${page}`;
  return fetchInstance(url, lang);
};

export const getBlog = ({ id, lang }: { id: string; lang: TFullLocales }) => {
  const url = `https://blog.mediaverse.land/api/posts/${id}`;
  return fetchInstance(url, lang);
};

export const requestOTP = async (data: any) => {
  const url = `${URL}/auth/otp/request`;
  if (process.env.NODE_ENV === "production") {
    const req = await fetch(url, {
      next: { revalidate: 60 },
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
        accept: "application/json",
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  } else {
    // console.log(data);
    const req = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
        accept: "application/json",
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  }
};
export const submitOTP = async (data: any) => {
  const url = `${URL}/auth/otp/submit`;
  if (process.env.NODE_ENV === "production") {
    const req = await fetch(url, {
      next: { revalidate: 60 },
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
        accept: "application/json",
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  } else {
    // console.log(data);
    const req = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
        accept: "application/json",
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  }
};
export const signUpCompletion = async ({ data, token }: any) => {
  const url = `${URL}/auth/sign-up-completion`;
  if (process.env.NODE_ENV === "production") {
    const req = await fetch(url, {
      next: { revalidate: 60 },
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
        accept: "application/json",
        "x-app": "_Web",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return req;
  } else {
    // console.log(data);
    const req = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
        accept: "application/json",
        "x-app": "_Web",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return req;
  }
};
export const signInWithUsername = async (data: any) => {
  const url = `${URL}/auth/sign-in`;
  if (process.env.NODE_ENV === "production") {
    const req = await fetch(url, {
      next: { revalidate: 60 },
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
        accept: "application/json",
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  } else {
    // console.log(data);
    const req = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
        accept: "application/json",
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  }
};
export const getSitemap = () => {
  const url = `https://api.mediaverse.land/v2/sitemap`;
  return fetchInstance(url);
};
export const getBlogsSitemap = () => {
  const url = `https://blog.mediaverse.land/api/sitemap`;
  return fetchInstance(url);
};
