import React from "react";
import { Button } from "antd";
import Header from "../Header/index";
const Home = (props) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTH_URL,
    REACT_APP_REDIRECT_URL,
    REACT_APP_CLIENT_SECRET,
  } = process.env;
  const SCOPE = "user-read-private user-read-currently-playing";
  const handleLogin = () => {
    window.location = `${REACT_APP_AUTH_URL}?client_id=${REACT_APP_CLIENT_ID}&show_dialog=true&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=code&scope=${SCOPE}`;
  };
  console.log(REACT_APP_CLIENT_SECRET);
  return (
    <div className="login">
      <Header />
      <Button onClick={handleLogin}>Login to spotify</Button>
    </div>
  );
};
export default Home;
