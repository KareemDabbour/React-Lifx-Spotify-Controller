import { useEffect } from "react";
import _ from "lodash";
import { getTokens } from "../utils/api";
import { useHistory } from "react-router-dom";

const RedirectPage = () => {
  //   const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
  const history = useHistory();

  const getCodeUrl = (url) => {
    return new URL(url).searchParams.get("code");
  };
  useEffect(() => {
    try {
      //   const access_token = getParamUrl(window.location.hash);
      const code = getCodeUrl(window.location.href);

      const data = getTokens(code);
      console.log(data);
      // TODO hanble the tokens and redirect to dashboard
      //   const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
      //   localStorage.setItem("params", JSON.stringify(access_token));
      //   localStorage.setItem("expiry_time", expiryTime);
      //   history.push("/dashboard");
    } catch (error) {
      history.push("/");
    }
  });
  return null;
};
export default RedirectPage;
