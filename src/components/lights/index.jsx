import React from "react";
import { Avatar, Card, Collapse } from "antd";
import { BulbFilled } from "@ant-design/icons";
import styles from "./index.module.scss";
import "antd/dist/antd.css";
const { Meta } = Card;
const { Panel } = Collapse;
const Lights = ({ lightsArr }) => {
  console.log(lightsArr);
  return (
    <div>
      <Collapse bordered={false}>
        {/* <label className={styles.Card}>Lights Found:</label> */}
        <Panel
          className={styles.Panel}
          header={`Lights found: ${lightsArr.length}`}
        >
          {lightsArr.map((item) => (
            <Card
              key={item?.id}
              bordered={false}
              className={styles.Card}
              style={{ backgroundColor: "transparent" }}
            >
              <Meta
                avatar={
                  <Avatar
                    className={styles.Avatar}
                    icon={<BulbFilled style={{ color: "yellow" }} />}
                  />
                }
                title={`${item?.label}`}
              />
            </Card>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Lights;
