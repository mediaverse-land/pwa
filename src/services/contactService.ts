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
export const getMostViewedText = async () => {
  const url = `${URL}/texts/most-viewed`;
  return fetchInstance(url);
};

export const getMostViewedVideos = () => {
  const url = `${URL}/videos/most-viewed`;
  return fetchInstance(url);
};

export const getMostViewedSongs = () => {
  const url = `${URL}/audios/most-viewed`;
  return fetchInstance(url);
};

export const getTerms = () => {
  const url = `${URL}/terms`;
  return fetchInstance(url);
};

export const getPrivacy = () => {
  const url = `${URL}/privacy`;
  return fetchInstance(url);
};
export const getLives = async () => {
  const url = `${URL}/lives`;
  return fetchInstance(url);
};
export const getFAQ = () => {
  const url = `${URL}/faq`;
  return fetchInstance(url);
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
