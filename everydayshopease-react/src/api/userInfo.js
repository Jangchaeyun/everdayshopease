import axios from "axios";
import { API_BASE_URL, getHeader } from "./constant";

export const fetchUserDetails = async () => {
  const url = API_BASE_URL + "/api/user/profile";
  try {
    const response = await axios(url, {
      method: "GET",
      headers: getHeader(),
    });
    return response?.data;
  } catch (err) {
    throw new Error(err);
  }
};
