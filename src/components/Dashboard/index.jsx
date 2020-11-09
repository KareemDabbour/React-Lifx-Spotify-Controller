import React, { useState, useEffect } from "react";
import Header from "../Header/index";
import { get1 } from "../../utils/api";
import { Card, Avatar, Image } from "antd";
import styles from "./index.module.scss";

const { Meta } = Card;

const Dashboard = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [trackUrl, setTrackUrl] = useState("");
  const [trackName, setTrackName] = useState("");
  const [artist, setArtist] = useState("");
  const [avUrl, setAvUrl] = useState("");

  const getTest = async () => {
    const data = await get1("/me/player/currently-playing?market=ES");
    console.log(data);
    if (data) {
      setImgUrl(data.item.album.images[0].url);
      setTrackUrl(data.item.uri);
      getTrackInfo(data.item.id);
    }
    return data;
  };

  const getTrackInfo = async (id) => {
    const data = await get1(`/tracks/${id}`);
    // console.log(data);
    if (data) {
      setTrackName(data.name);
      getArtistInfo(data.artists[0].id);
    }
    return data;
  };
  const getArtistInfo = async (id) => {
    const data = await get1(`/artists/${id}`);
    if (data) {
      console.log(data.images[0].url);
      setAvUrl(data.images[data.images.length - 1].url);
      setArtist(data);
    }
  };

  useEffect(() => {
    getTest();
    const interval = setInterval(() => {
      getTest();
    }, 20000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div>
        <Card
          className={styles.Card}
          cover={
            <img
              className={styles.img}
              hoverable="true"
              src={imgUrl}
              alt=""
              onClick={() => window.open(trackUrl)}
            />
          }
        >
          <Meta
            avatar={
              <Avatar
                // className={styles.Avatar}
                size="small"
                src={<Image src={avUrl} />}
                style={{ backgroundColor: "white", verticalAlign: "middle" }}
              />
            }
            title={
              <label>
                <b>Now Playing: </b> {trackName}
              </label>
            }
            description={
              <label>
                <b>By:</b> {artist.name}
              </label>
            }
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
