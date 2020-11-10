import React from "react";
import { Avatar, Card, Collapse } from "antd";
import { BulbFilled } from "@ant-design/icons";
import styles from "./index.module.scss";
import "antd/dist/antd.css";
const { Meta } = Card;
const { Panel } = Collapse;
const Lights = ({ lightsArr, onToggle, darkMute, lightMute }) => {
  return (
    <div>
      <Collapse bordered={false}>
        <Panel
          className={styles.Panel}
          style={{ backgroundColor: darkMute }}
          header={
            <label style={{ color: lightMute }}>
              {`Lights found: ${lightsArr.length}`}
            </label>
          }
        >
          {lightsArr.map((item) => (
            <Card
              key={item?.id}
              bordered={false}
              className={styles.Card}
              style={{ backgroundColor: darkMute }}
            >
              <Meta
                avatar={
                  <Avatar
                    className={styles.Avatar}
                    icon={
                      item?.isOn === "on" ? (
                        <BulbFilled
                          style={{ color: "yellow" }}
                          onClick={() => onToggle(item?.id)}
                        />
                      ) : (
                        <BulbFilled
                          style={{ color: "grey" }}
                          onClick={() => onToggle(item?.id)}
                        />
                      )
                    }
                  />
                }
                title={
                  <label style={{ color: lightMute }}>{`${item?.label}`}</label>
                }
              />
            </Card>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Lights;
