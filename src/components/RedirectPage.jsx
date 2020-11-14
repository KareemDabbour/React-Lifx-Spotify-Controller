import { useEffect } from "react";
import { getTokens } from "../utils/api";
import { useHistory } from "react-router-dom";

const RedirectPage = () => {
  const history = useHistory();

  const getCodeUrl = (url) => {
    return new URL(url).searchParams.get("code");
  };
  useEffect(() => {
    try {
      const code = getCodeUrl(window.location.href);
      const fetchData = async () => {
        const tokens = await getTokens(code);
        if (tokens) {
          sessionStorage.setItem(
            "tokens",
            JSON.stringify({
              access_token: tokens?.access_token,
              refresh_token: tokens?.refresh_token,
            })
          );
          history.push("/dashboard");
        }
      };
      fetchData();
    } catch (error) {
      history.push("/");
    }
  });
  return null;
};
export default RedirectPage;
