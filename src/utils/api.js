import axios from "axios";
import { setAuthHeader } from "./functions";

const { REACT_APP_LIFX_CLIENT_ID } = process.env;
export const get_lifx = async (urlExt) => {
  const result = await fetch(`https://api.lifx.com/v1${urlExt}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + REACT_APP_LIFX_CLIENT_ID },
  });

  const data = await result;
  //   console.log(data.status);

  const d = data.json();
  return d;
};
export const get = async (urlExt) => {
  const token = JSON.parse(localStorage.getItem("params")).access_token;
  const result = await fetch(`https://api.spotify.com/v1${urlExt}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result;
  //   console.log(data.status);
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

export const getTokens = async (code) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_CLIENT_SECRET,
    REACT_APP_REDIRECT_URL,
  } = process.env;

  const form = new FormData();
  form.append("code", code);
  form.append("redirect_uri", REACT_APP_REDIRECT_URL);
  form.append("grant_type", "authorization_code");

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          REACT_APP_CLIENT_ID + ":" + REACT_APP_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: encodeURI(
      `code=${code}&redirect_uri=${REACT_APP_REDIRECT_URL}&grant_type=authorization_code`
    ),
  });
  const data = await result;
  console.log(data);
  switch (data.status) {
    case 200:
      const d = data.json();
      return d;
    case 401:
      return null;
    default:
      return null;
  }
};

export const post = async (url, params) => {
  setAuthHeader();
  const result = await axios.get(url, params);

  return result.data;
};

export const post_lifx = async (urlExt) => {
  const result = await fetch(`https://api.lifx.com/v1${urlExt}`, {
    method: "POST",
    headers: { Authorization: "Bearer " + REACT_APP_LIFX_CLIENT_ID },
  });

  const data = await result;
  //   console.log(data.status);

  const d = data.json();
  return d;
};
