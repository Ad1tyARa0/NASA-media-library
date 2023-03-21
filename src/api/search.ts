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
