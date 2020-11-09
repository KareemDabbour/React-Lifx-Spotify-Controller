import axios from "axios";

export const getParamUrl = (url) => {
  return url
    .slice(1)
    .split("&")
    .reduce((prev, curr) => {
      const [title, val] = curr.split("=");
      prev[title] = val;
      return prev;
    }, {});
};

export const setAuthHeader = () => {
  try {
    const params = JSON.parse(localStorage.getItem("params"));
    // console.log(params.access_token);
    if (params) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${params.access_token}`;
      //   console.log(params.access_token);
    }
  } catch (error) {
    console.log("Error with setting token", error);
  }
};
