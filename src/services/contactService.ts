import {baseURL, blogURL} from "@/configs/base";
import { PostCommentData } from "@/types";
import { TFullLocales } from "@/types/dictionary-types";

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
  const url = `${baseURL}/images/most-viewed`;
  return fetchInstance(url, lang);
};
export const getRecentlyImages = async () => {
  const url = `${baseURL}/images/newest`;
  return fetchInstance(url);
};
export const getRecommendedImages = async () => {
  const url = `${baseURL}/images/daily-recommended`;
  return fetchInstance(url);
};
export const getSingleImage = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  const url = `${baseURL}/images/${id}`;
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
  const url = `${baseURL}/videos/${id}`;
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
  const url = `${baseURL}/texts/${id}`;
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
  const url = `${baseURL}/audios/${id}`;
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
  const url = `${baseURL}/texts/most-viewed`;
  return fetchInstance(url, lang);
};
export const getRecentlyTexts = async () => {
  const url = `${baseURL}/texts/newest`;
  return fetchInstance(url);
};
export const getRecommendedTexts = async () => {
  const url = `${baseURL}/texts/daily-recommended`;
  return fetchInstance(url);
};

export const getMostViewedVideos = (lang: TFullLocales) => {
  const url = `${baseURL}/videos/most-viewed`;
  return fetchInstance(url, lang);
};
export const getRecentlyVideos = () => {
  const url = `${baseURL}/videos/newest`;
  return fetchInstance(url);
};
export const getRecommendedVideos = () => {
  const url = `${baseURL}/videos/daily-recommended`;
  return fetchInstance(url);
};

export const getMostViewedSongs = (lang: TFullLocales) => {
  const url = `${baseURL}/audios/most-viewed`;
  return fetchInstance(url, lang);
};
export const getRecentlySongs = () => {
  const url = `${baseURL}/audios/newest`;
  return fetchInstance(url);
};
export const getRecommendedSongs = () => {
  const url = `${baseURL}/audios/daily-recommended`;
  return fetchInstance(url);
};
export const getProfileStatics = (token: string) => {
  const url = `${baseURL}/profile/statics`;
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
  const url = `${baseURL}/notifications`;
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
export const getUserApiTokens = ({ token }: { token: string }) => {
  const url = `${baseURL}/api-tokens`;
  return fetch(url, {
    next: { revalidate: 0 },
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
  status,
}: {
  token: string;
  id: string;
  status: 2 | 3;
}) => {
  const url = `${baseURL}/notifications/${id}`;
  return fetch(url, {
    next: { revalidate: process.env.NODE_ENV === "production" ? 10 : 0 },
    method: "PATCH",
    headers: {
      "Accept-Language": "en-US",
      accept: "application/json",
      "Content-Type": "application/json",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status,
    }),
  });
};

export const getTerms = ({ lang }: { lang: TFullLocales }) => {
  const url = `${baseURL}/terms`;
  return fetchInstance(url, lang);
};

export const getPrivacy = (lang: TFullLocales) => {
  const url = `${baseURL}/privacy`;
  return fetchInstance(url, lang);
};
export const getLives = async ({
  params,
  lang,
}: {
  params?: string;
  lang: TFullLocales;
}) => {
  const url = `${baseURL}/channels${params}`;
  return fetchInstance(url, lang);
};
export const getFAQ = (lang: TFullLocales) => {
  const url = `${baseURL}/faq`;
  return fetchInstance(url, lang);
};
export const getHome = (lang: TFullLocales) => {
  const url = `${baseURL}/home`;
  return fetchInstance(url, lang);
};
export const getAboutUs = (lang: TFullLocales) => {
  const url = `${baseURL}/about-us`;
  return fetchInstance(url, lang);
};
export const getSearch = (params: string) => {
  const url = `${baseURL}/search?${params}`;
  return fetchInstance(url);
};
export const getSubscribeAssets = ({
  params,
  token,
}: {
  params: string;
  token: string;
}) => {
  const url = `${baseURL}/profile/subscriptions${params}`;
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
  const url = `${baseURL}/profile${params}`;
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
  const url = `${baseURL}/stripe/balance`;
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
  const url = `${baseURL}/stripe/account`;
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
  const url = `${baseURL}/profile`;
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
  const url = `${baseURL}/assets/${id}/buy`;
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
  const url = `${baseURL}/stripe/connect`;
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
  const url = `${baseURL}/stripe/gateway`;
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
  const url = `${baseURL}/profile`;
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
  const url = `${baseURL}/assets/${id}/comments`;
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
  const url = `${baseURL}/assets/comments`;
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
  const url = `${baseURL}/sign-ins`;
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
  const url = `${baseURL}/sessions`;
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
  const url = `${blogURL}/posts?page=${page}`;
  return fetchInstance(url, lang);
};

export const getBlog = ({ id, lang }: { id: string; lang: TFullLocales }) => {
  const url = `${blogURL}/posts/${id}`;
  return fetchInstance(url, lang);
};

export const requestOTP = async (data: any) => {
  const url = `${baseURL}/auth/otp/request`;
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
  const url = `${baseURL}/auth/otp/submit`;
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
  const url = `${baseURL}/auth/sign-up-completion`;
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
  const url = `${baseURL}/auth/sign-in`;
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
  const url = `${baseURL}/sitemap`;
  return fetchInstance(url);
};
export const getBlogsSitemap = () => {
  const url = `${blogURL}/sitemap`;
  return fetchInstance(url);
};
