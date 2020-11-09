import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import Header from "../Header/index";
const LifxLogin = (props) => {
  const {
    REACT_APP_LIFX_CLIENT_ID,
    REACT_APP_LIFX_AUTH_URL,
    REACT_APP_LIFX_REDIRECT_URL,
  } = process.env;
  const SCOPE = "remote_control:all";
  const handleLogin = () => {
    window.location = `${REACT_APP_LIFX_AUTH_URL}?client_id=${REACT_APP_LIFX_CLIENT_ID}&redirect_uri=${REACT_APP_LIFX_REDIRECT_URL}&response_type=code&scope=${SCOPE}&state=loooool`;
  };
  return (
    <div className="login">
      <Header />
      <Button onClick={handleLogin}>Login to LifX</Button>
    </div>
  );
};
export default connect()(LifxLogin);
