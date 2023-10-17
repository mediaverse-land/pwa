import http from "./http";

export const URL = "https://api.mediaverse.land/v2"

export const getMostViewedImages = () =>{
    const url = `${URL}/images/most-viewed`;
    return http.get(url);
};
