import React from "react";
import { PageHeader } from "antd";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <div className={styles.Header}>
      <PageHeader
        title={<h1 className={styles.title}>Lifx Spotify Controller</h1>}
      />
    </div>
  );
};

export default Header;
