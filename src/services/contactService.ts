import http from "./http";

export const URL = "https://api.mediaverse.land/v2"

export const getMostViewedImages = async () =>{
    const mostViewedImages = await http.get(`${URL}/images/most-viewed`);
    return mostViewedImages.data();
};

