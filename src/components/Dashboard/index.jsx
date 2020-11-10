import React, { useState, useEffect } from "react";
import Header from "../Header/index";
import Lights from "../Lights/index";
import { get, get_lifx, post_lifx } from "../../utils/api";
import { Card, Avatar } from "antd";
import { usePalette } from "react-palette";
import styles from "./index.module.scss";
import "antd/dist/antd.css";

const { Meta } = Card;

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [trackUrl, setTrackUrl] = useState("");
  const [trackName, setTrackName] = useState("");
  const [artist, setArtist] = useState("");
  const [avUrl, setAvUrl] = useState("");
  const [lights, setLights] = useState([]);

  const getTest = async () => {
    const allData = await get("/me/player/currently-playing?market=ES");
    if (allData) {
      if (imgUrl !== allData?.item.album.images[0].url) {
        setImgUrl(allData.item.album.images[0].url);

        setTrackUrl(allData.item.uri);
        getTrackInfo(allData.item.id);
      }
    }
    return allData;
  };

  const { data } = usePalette(imgUrl);

  const getTrackInfo = async (id) => {
    const trackData = await get(`/tracks/${id}`);
    if (trackData && trackData?.name !== trackName) {
      setTrackName(trackData.name);
      getArtistInfo(trackData.artists[0].id);
    }
    return trackData;
  };
  const getArtistInfo = async (id) => {
    const artistData = await get(`/artists/${id}`);
    if (artistData) {
      setAvUrl(artistData?.images[0].url);
      setArtist(artistData);
    }
  };
  const getLights = async () => {
    const lightData = await get_lifx("/lights/all");
    const dataArr = [];
    if (lightData !== null) {
      lightData?.forEach((element) => {
        dataArr.push({
          label: element?.product.name,
          id: element?.id,
          isOn: element?.power,
        });
      });
      setLights(dataArr);
    }
  };

  const getUser = async () => {
    const userData = await get(`/me`);

    setUser({
      image: userData?.images[0].url,
      name: userData?.display_name,
      url: userData?.external_urls.spotify,
    });
  };

  //TODO
  const lightEffect = async () => {
    const d = {
      color: "#ff0000",
      period: 0.5,
      cycles: 5,
      persist: true,
      power_on: false,
      peak: 1,
    };
    await post_lifx("/all/effects/breathe", d);
  };
  const toggle = async (id) => {
    await post_lifx(`/id:${id}/toggle`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      lightEffect();
      getTest();
      getLights();
    }, 2500);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackName]);

  useEffect(() => {
    getTest();
    getLights();
    getUser();
    lightEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  document.body.style.backgroundColor = data.darkMuted;

  return (
    <>
      <Header userImg={user?.image} userName={user?.name} userUrl={user?.url} />
      <div>
        {artist?.name ? (
          <Card
            bordered={false}
            className={styles.Card}
            style={{ backgroundColor: data.vibrant }}
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
              title={
                <label style={{ color: data.darkMuted }}>
                  {`Artist: ${artist?.name}`}
                </label>
              }
              description={
                <label style={{ color: data.darkMuted }}>
                  {`Now Playing: ${trackName}`}
                </label>
              }
              style={{ backgroundColor: data.vibrant }}
            />
          </Card>
        ) : (
          <Card
            bordered={false}
            className={styles.Card}
            style={{ backgroundColor: "#7f7f7f" }}
          >
            <Meta
              title={
                <label style={{ color: "#444444" }}>
                  Nothing is being played :/
                </label>
              }
              description={
                <label style={{ color: "#444444" }}>
                  Play something on Spotify to get started!
                </label>
              }
              style={{ backgroundColor: "#7f7f7f" }}
            />
          </Card>
        )}
        <Lights
          lightsArr={lights}
          onToggle={toggle}
          darkMute={data?.darkMuted || "#444444"}
          lightMute={data?.lightVibrant || "#bcbcbc"}
        ></Lights>
      </div>
    </>
  );
};

export default Dashboard;
