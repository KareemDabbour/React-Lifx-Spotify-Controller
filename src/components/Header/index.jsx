import React from "react";
import { PageHeader, Comment } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import Avatar from "antd/lib/avatar/avatar";

const Header = ({ userImg, userName, userUrl }) => {
  return (
    <div>
      {userImg ? (
        <div className={styles.Header}>
          <PageHeader
            title={
              <label className={styles.title}>Lifx Spotify Controller</label>
            }
          />
          <Comment
            avatar={
              <div
                onClick={() => {
                  window.open(userUrl);
                }}
              >
                <Avatar src={userImg} />
              </div>
            }
            author={
              <label style={{ color: "white", alignContent: "center" }}>
                {userName}
              </label>
            }
            // style={{ }}
          />
        </div>
      ) : (
        <div className={styles.Header}>
          <PageHeader
            title={
              <label className={styles.title}>Lifx Spotify Controller</label>
            }
          />
          <Comment avatar={<Avatar icon={<UserOutlined />} />} />
        </div>
      )}
    </div> //
  );
};

export default Header;
