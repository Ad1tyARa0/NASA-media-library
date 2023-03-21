import { BASE_URL } from "./../utils/constants/url";
import { AxiosInstance } from "./index";

export const getSearchResults = async (payload: {
  searchTerm?: string;
  nasa_id?: string;
}) => {
  const res = await AxiosInstance({
    method: "GET",
    baseURL: BASE_URL,
    url: "search",
    params: {
      q: payload.searchTerm,
      media_type: "image",
      nasa_id: payload.nasa_id,
    },
  });

  return res.data;
};

export const fetchAsset = async (payload: { nasa_id: string }) => {
  const res = await AxiosInstance({
    method: "GET",
    baseURL: BASE_URL,
    url: `asset/${payload.nasa_id}`,
  });

  return res.data;
};

export const fetchMetaData = async (payload: { nasa_id: string }) => {
  const res = await AxiosInstance({
    method: "GET",
    baseURL: BASE_URL,
    url: `metadata/${payload.nasa_id}`,
  });

  return res.data;
};

export const fetchCaptions = async (payload: { nasa_id: string }) => {
  const res = await AxiosInstance({
    method: "GET",
    baseURL: BASE_URL,
    url: `captions/${payload.nasa_id}`,
  });

  return res.data;
};
