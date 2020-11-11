import axios from "axios";
import { setAuthHeader } from "./functions";

const { REACT_APP_LIFX_CLIENT_ID } = process.env;
export const get_lifx = async (urlExt) => {
  const result = await fetch(`https://api.lifx.com/v1${urlExt}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + REACT_APP_LIFX_CLIENT_ID },
  });

  const data = result;
  switch (data.status) {
    case 200:
      const d = data.json();
      return d;

    default:
      return null;
  }
};

export const get = async (urlExt) => {
  const token = JSON.parse(localStorage.getItem("tokens")).access_token;

  const result = await fetch(`https://api.spotify.com/v1${urlExt}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result;
  switch (data.status) {
    case 200:
      // If the get request was successfull, pass on the data that was recieved
      const d = data.json();
      return d;
    case 401:
      // When the current client access token expires, we refresh it.
      refreshToken()
        .then((ref_data) => {
          const refresh_token = JSON.parse(localStorage.getItem("tokens"))
            .refresh_token;
          localStorage.setItem(
            "tokens",
            JSON.stringify({
              access_token: ref_data.access_token,
              refresh_token: refresh_token,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
      return null;
    default:
      // Return null if the get request was not successfull for any reason (other than a 401 status code, see above)
      return null;
  }
};

export const post = async (url, params) => {
  setAuthHeader();
  const result = await axios.get(url, params);

  return result.data;
};

export const post_lifx = async (urlExt, bodyData) => {
  const result = await fetch(`https://api.lifx.com/v1/lights${urlExt}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + REACT_APP_LIFX_CLIENT_ID,
      "content-type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  // const data = await result;
  //   console.log(data.status);

  // const d = data.json();
  // return d;
};

export const getTokens = async (code) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_CLIENT_SECRET,
    REACT_APP_REDIRECT_URL,
  } = process.env;

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
  const data = result;
  switch (data.status) {
    case 200:
      const d = data.json();
      return d;
    default:
      return null;
  }
};

export const refreshToken = async () => {
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
  const refresh_token = JSON.parse(localStorage.getItem("tokens"))
    .refresh_token;
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

    body: encodeURI(`refresh_token=${refresh_token}&grant_type=refresh_token`),
  });
  if (result.status === 200) {
    const data = result.json();
    return data;
  }
};
