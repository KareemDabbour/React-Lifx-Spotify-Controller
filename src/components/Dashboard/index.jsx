import React, { useState, useEffect } from "react";
import Header from "../Header/index";
import Lights from "../Lights/index";
import { get, get_lifx, post_lifx } from "../../utils/api";
import { Card, Avatar } from "antd";
import { usePalette } from "react-palette";
import styles from "./index.module.scss";
import "antd/dist/antd.css";
import { flatMap } from "lodash";

const { Meta } = Card;

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [trackUrl, setTrackUrl] = useState("");
  const [trackName, setTrackName] = useState("");
  const [artist, setArtist] = useState("");
  const [avUrl, setAvUrl] = useState("");
  const [lights, setLights] = useState([]);
  const [trackFeatures, setTrackFeatures] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  const getTest = async () => {
    const allData = await get("/me/player/currently-playing?market=ES");
    if (allData) {
      setIsPlaying(allData.is_playing);
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

      getTrackFeatures(id);
    }
    return trackData;
  };

  const getTrackFeatures = async (id) => {
    const features = await get(`/audio-features/${id}`);
    if (features) {
      const { tempo, mode, valence } = features;
      console.log(features);
      setTrackFeatures({ bpm: tempo, isMajor: mode, valence: valence });
    }
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
  //for testing only!
  const lightEffect = async () => {
    const { bpm } = trackFeatures;
    const period = 120 / bpm;
    const cycles = (bpm / 60) * 1.5;
    const d = {
      color: data.lightVibrant,
      from_color: data.darkVibrant,
      period: period,
      cycles: cycles,
      persist: false,
      power_on: false,
      peak: 0.3,
      fast: true,
    };
    const f = {
      power_on: true,
      fast: true,
    };
    const l = {
      period: 5,
      palette: ["blue", "red"],
      power_on: true,
      fast: true,
    };
    // await post_lifx("/all/effects/move", f);
    console.log(isPlaying);
    if (isPlaying) {
      await post_lifx("/all/effects/pulse", d);
    }
    // await post_lifx("/all/effects/morph", l);
  };
  const toggle = async (id) => {
    await post_lifx(`/id:${id}/toggle`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      lightEffect();
      getTest();
      // getLights();
    }, 3000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackName, trackFeatures, isPlaying]);

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
