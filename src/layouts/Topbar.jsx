import { Divider, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import DarkModeSwitch from "./components/DarkModeSwitch";
import LogoButton from "./components/LogoButton";
import PopoverNotification from "./components/PopoverNotification";
import SearchField from "./components/SearchField";
import UserProfileAvatar from "./components/UserProfileAvatar";

const { useToken } = theme;

const Topbar = () => {
  const { token } = useToken();

  return (
    <Header
      style={{
        padding: "0 10px",
        backgroundColor: token.colorBgContainer,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <LogoButton />

        <SearchField />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <DarkModeSwitch />

        <PopoverNotification />

        <Divider type="vertical" style={{ margin: 0 }} />

        <UserProfileAvatar />
      </div>
    </Header>
  );
};

export default Topbar;
