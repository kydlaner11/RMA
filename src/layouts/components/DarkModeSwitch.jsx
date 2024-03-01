import { Button, theme } from "antd";
import React from "react";
import { MoonIcon } from "../../assets/svg/moonSvg";
import { SunIcon } from "../../assets/svg/sunSvg";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/actions/appAction";

const { useToken } = theme;

const DarkModeSwitch = () => {
  const dispatch = useDispatch();
  const { app } = useSelector((state) => state);
  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgLayout,
        display: "flex",
        borderRadius: "6px",
        padding: "3px",
        gap: "2px",
      }}
    >
      <Button
        icon={
          <SunIcon
            stroke={app.darkMode ? "rgba(255,255,255,1)" : "rgba(0,0,0,.8)"}
            style={{
              opacity: app.darkMode ? 0.5 : 1,
            }}
          />
        }
        type="primary"
        size="middle"
        style={{
          backgroundColor: app.darkMode
            ? token.colorBgLayout
            : token.colorBgElevated,
          boxShadow: app.darkMode ? "none" : "0 2px 0 rgba(60, 80, 250, 0.1)",
          zIndex: app.darkMode ? 1 : 2,
        }}
        onClick={() => dispatch(toggleDarkMode(false))}
      />
      <Button
        icon={
          <MoonIcon
            stroke={
              app.darkMode
                ? "rgba(255, 255, 255, 0.8)"
                : token.colorTextSecondary
            }
            style={{
              opacity: app.darkMode ? 1 : 0.5,
            }}
          />
        }
        type="primary"
        size="middle"
        style={{
          backgroundColor: app.darkMode
            ? token.colorBgContainer
            : token.colorBgLayout,
          boxShadow: app.darkMode ? "0 2px 0 rgba(60, 80, 250, 0.1)" : "none",
          zIndex: app.darkMode ? 2 : 1,
        }}
        onClick={() => dispatch(toggleDarkMode(true))}
      />
    </div>
  );
};

export default DarkModeSwitch;
