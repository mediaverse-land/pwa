import http from "./http";

export const URL = "https://api.mediaverse.land/v2"

export const getMostViewedImages = () =>{
    const url = `${URL}/images/most-viewed`;
    return http.get(url);
};
export const getMostViewedText = () =>{
    const url = `${URL}/texts/most-viewed`;
    return http.get(url);
};

export const getMostViewedVideos = () =>{
    const url = `${URL}/videos/most-viewed`;
    return http.get(url);
};

export const getMostViewedSongs = () =>{
    const url = `${URL}/audios/most-viewed`;
    return http.get(url);
};
