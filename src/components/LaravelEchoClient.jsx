import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import audiobell from "../assets/audios/Notif_RT.mp3";
import logoDNet from "../assets/images/logo d~net.png";
import "../lib/laravelEcho";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const LaravelEchoClient = () => {
  const dispatch = useDispatch();

  const spawnNotification = ({ title, icon, body, url }) => {
    let options = {
      body,
      icon,
    };

    let n = new Notification(title, options);

    try {
      // if (notify.sound) audioRef.current.play();

      // ? Force play notification sound
      const audio = new Audio(audiobell);
      audio.play();
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.MESSAGE,
        payload: {
          error: error.message,
        },
      });
    }

    n.onclick = (e) => {
      e.preventDefault();

      window.open(url, "_blank");
    };
  };

  useEffect(() => {
    window.Echo.channel("public").listen("PublicEvent", (e) => {
      spawnNotification({
        title: "New Color",
        icon: logoDNet,
        body: e.color,
        url: "https://youtube.com",
      });
    });

  // eslint-disable-next-line
  }, []);

  return <></>;
};

export default LaravelEchoClient;
