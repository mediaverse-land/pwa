import http from "./http";

export const URL = "https://api.mediaverse.land/v2"

export const getMostViewedImages = async () => {
    const url = `${URL}/images/most-viewed`;
    return fetch(url, { cache: 'no-store' });
};
export const getMostViewedText = async () => {
    const url = `${URL}/texts/most-viewed`;
    return fetch(url, { cache: 'no-store' });
};

export const getMostViewedVideos = () => {
    const url = `${URL}/videos/most-viewed`;
    return http.get(url);
};

export const getMostViewedSongs = () => {
    const url = `${URL}/audios/most-viewed`;
    return http.get(url);
};

export const getTerms = () => {
    const url = `${URL}/terms`;
    return http.get(url);
}

export const getPrivacy = () => {
    const url = `${URL}/privacy`;
    return http.get(url);
}
export const getLives = async () => {
    const url = `${URL}/lives`;
    return fetch(url, { cache: 'no-store' });
};
export const getFAQ = () => {
    const url = `${URL}/faq`;
    return fetch(url, { cache: 'no-store' });
}