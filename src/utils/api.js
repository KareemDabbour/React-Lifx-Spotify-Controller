import axios from "axios";
import { setAuthHeader } from "./functions";

export const get = async (urlExt) => {
  const token = JSON.parse(localStorage.getItem("params")).access_token;
  const result = await fetch(`https://api.spotify.com/v1${urlExt}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result;
  console.log(data.status);

  const d = data.json();
  return d;
};
export const get1 = async (urlExt) => {
  const token = JSON.parse(localStorage.getItem("params")).access_token;
  const result = await fetch(`https://api.spotify.com/v1${urlExt}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result;
  console.log(data.status);
  switch (data.status) {
    case 200:
      const d = data.json();
      return d;
    case 401:
      return null;
    default:
      return null;
  }

  //   return { data: d, status: data.status };
};

export const post = async (url, params) => {
  setAuthHeader();
  const result = await axios.get(url, params);

  return result.data;
};
