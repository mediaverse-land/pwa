import axios from "axios";
import http from "./http";

export const URL = "https://api.mediaverse.land/v2"

export const getMostViewedImages = async () => {
    const url = `${URL}/images/most-viewed`;
    const data = await fetch(url, { cache: 'no-store' });
    return data
};
export const getMostViewedText = async () => {
    const url = `${URL}/texts/most-viewed`;
    const data = await fetch(url, { cache: 'no-store' });
    return data;
};

export const getMostViewedVideos = () => {
    const url = `${URL}/videos/most-viewed`;
    return http.get(url);
};

export const getMostViewedSongs = () => {
    const url = `${URL}/audios/most-viewed`;
    return http.get(url);
};
