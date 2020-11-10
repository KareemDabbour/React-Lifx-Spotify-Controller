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

      getTokens(code)
        .then((data) => {
          console.log(data);
          if (data) {
            localStorage.setItem(
              "tokens",
              JSON.stringify({
                access_token: data?.access_token,
                refresh_token: data?.refresh_token,
              })
            );
            history.push("/dashboard");
          }
        })
        .catch((error) => {
          console.log(error);
          history.push("/");
        });
    } catch (error) {
      history.push("/");
    }
  });
  return null;
};
export default RedirectPage;
