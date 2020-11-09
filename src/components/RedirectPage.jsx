import { useEffect } from "react";
import _ from "lodash";
import { getParamUrl } from "../utils/functions";
import { useHistory } from "react-router-dom";

const RedirectPage = () => {
  const history = useHistory();
  useEffect(() => {
    try {
      if (_.isEmpty(window.location.hash)) {
        return history.push("/dashboard");
      }
      const access_token = getParamUrl(window.location.hash);
      const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
      localStorage.setItem("params", JSON.stringify(access_token));
      localStorage.setItem("expiry_time", expiryTime);
      history.push("/dashboard");
    } catch (error) {
      history.push("/");
    }
  });
  return null;
};
export default RedirectPage;
