import React, { useState, useEffect } from "react";
import Header from "../Header/index";
import Lights from "../Lights/index";
import { get, get_lifx } from "../../utils/api";
import { Card, Avatar, Image } from "antd";
import styles from "./index.module.scss";
import "antd/dist/antd.css";

const { Meta } = Card;

const Dashboard = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [trackUrl, setTrackUrl] = useState("");
  const [trackName, setTrackName] = useState("");
  const [artist, setArtist] = useState("");
  const [avUrl, setAvUrl] = useState("");
  const [lights, setLights] = useState([]);

  const getTest = async () => {
    const data = await get("/me/player/currently-playing?market=ES");
    // console.log(data);
    if (data) {
      if (imgUrl !== data.item.album.images[0].url) {
        setImgUrl(data.item.album.images[0].url);
        setTrackUrl(data.item.uri);
        getTrackInfo(data.item.id);
      }
    }
    return data;
  };

  const getTrackInfo = async (id) => {
    const data = await get(`/tracks/${id}`);
    // console.log(data);
    if (data) {
      setTrackName(data.name);
      getArtistInfo(data.artists[0].id);
    }
    return data;
  };
  const getArtistInfo = async (id) => {
    const data = await get(`/artists/${id}`);
    if (data) {
      //   console.log(data.images[0].url);
      setAvUrl(data.images[data.images.length - 1].url);
      //   console.log(typeof data);
      setArtist(data);
    }
  };
  const getLights = async () => {
    const data = await get_lifx("/lights/all");
    console.log(data);
    const dataArr = [];

    data.forEach((element, index) => {
      console.log(index);
      dataArr.push({
        label: element?.product.name,
        id: element?.id,
      });
    });
    setLights(dataArr);
  };

  const lightEffect = async () => {};

  useEffect(() => {
    getTest();
    getLights();
    const interval = setInterval(() => {
      getTest();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div>
        <Card
          bordered={false}
          className={styles.Card}
          style={{ backgroundColor: "transparent" }}
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
            avatar={<Avatar className={styles.Avatar} src={avUrl} />}
            title={`Artist: ${artist?.name}`}
            description={`Now Playing: ${trackName}`}
          />
        </Card>
        <Lights lightsArr={lights}></Lights>
      </div>
    </>
  );
};

export default Dashboard;
