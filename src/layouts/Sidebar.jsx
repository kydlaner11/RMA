import { Grid, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const { useBreakpoint } = Grid;

const Sidebar = () => {
  const screens = useBreakpoint();
  const location = useLocation();
  const { app } = useSelector((state) => state);

  return (
    <Sider
      style={{
        padding: screens.md ? "0 5px" : "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      theme="light"
      breakpoint="lg"
      collapsedWidth={screens.md ? 60 : 0}
      collapsible={true}
      zeroWidthTriggerStyle={{
        top: 115,
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        style={{
          marginTop: "6px",
          height: "calc(100% - 6px)",
          borderRight: 0,
        }}
        selectedKeys={location.pathname.split("/")[1]}
        items={!app.loading && app.page.list}
      />
    </Sider>
  );
};

export default Sidebar;
