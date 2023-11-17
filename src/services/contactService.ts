export const URL = "https://api.mediaverse.land/v2";

const fetchInstance = (url: string) => {
  if (process.env.NODE_ENV === "production")
    return fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "Accept-Language": "en-US",
        "x-app": "_Web",
      },
    });
  else
    return fetch(url, {
      cache: "no-store",
      headers: {
        "Accept-Language": "en-US",
        "x-app": "_Web",
      },
    });
};

export const getMostViewedImages = async () => {
  const url = `${URL}/images/most-viewed`;
  return fetchInstance(url);
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
          "x-app": "_Web",
          Authorization: `Bearer ${token}`,
        },
      })
    : fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
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
          "x-app": "_Web",
          Authorization: `Bearer ${token}`,
        },
      })
    : fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
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
          "x-app": "_Web",
          Authorization: `Bearer ${token}`,
        },
      })
    : fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
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
          "x-app": "_Web",
          Authorization: `Bearer ${token}`,
        },
      })
    : fetch(url, {
        next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
        headers: {
          "Accept-Language": "en-US",
          "x-app": "_Web",
        },
      });
};
export const getMostViewedText = async () => {
  const url = `${URL}/texts/most-viewed`;
  return fetchInstance(url);
};
export const getRecentlyTexts = async () => {
  const url = `${URL}/texts/newest`;
  return fetchInstance(url);
};
export const getRecommendedTexts = async () => {
  const url = `${URL}/texts/daily-recommended`;
  return fetchInstance(url);
};

export const getMostViewedVideos = () => {
  const url = `${URL}/videos/most-viewed`;
  return fetchInstance(url);
};
export const getRecentlyVideos = () => {
  const url = `${URL}/videos/newest`;
  return fetchInstance(url);
};
export const getRecommendedVideos = () => {
  const url = `${URL}/videos/daily-recommended`;
  return fetchInstance(url);
};

export const getMostViewedSongs = () => {
  const url = `${URL}/audios/most-viewed`;
  return fetchInstance(url);
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
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTerms = () => {
  const url = `${URL}/terms`;
  return fetchInstance(url);
};

export const getPrivacy = () => {
  const url = `${URL}/privacy`;
  return fetchInstance(url);
};
export const getLives = async (args: { params?: string }) => {
  const url = `${URL}/lives${args.params}`;
  return fetchInstance(url);
};
export const getFAQ = () => {
  const url = `${URL}/faq`;
  return fetchInstance(url);
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
    next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
    headers: {
      "Accept-Language": "en-US",
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
    next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
    headers: {
      "Accept-Language": "en-US",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
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
    next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
    headers: {
      "Accept-Language": "en-US",
      "x-app": "_Web",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBlogs = (page: number) => {
  const url = `https://blog.mediaverse.land/api/posts?page=${page}`;
  return fetchInstance(url);
};

export const getBlog = (id: string) => {
  const url = `https://blog.mediaverse.land/api/posts/${id}`;
  return fetchInstance(url);
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
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  } else {
    console.log(data);
    const req = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
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
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  } else {
    console.log(data);
    const req = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
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
        "x-app": "_Web",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return req;
  } else {
    console.log(data);
    const req = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
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
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  } else {
    console.log(data);
    const req = await fetch(url, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept-Language": "en-US",
        "x-app": "_Web",
        "Content-Type": "application/json",
      },
    });
    return req;
  }
};
