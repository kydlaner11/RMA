import { DownOutlined } from "@ant-design/icons";
import { Collapse, Grid, Space, theme } from "antd";
import React, { useEffect, useState } from "react";

const { useBreakpoint } = Grid;
const { useToken } = theme;

const StickyHeader = ({ title, children }) => {
  const screens = useBreakpoint();
  const { token } = useToken();

  const [activeKey, setActiveKey] = useState("");

  const handleCollapse = () => {
    if (activeKey === "") {
      setActiveKey(title);
    } else {
      setActiveKey("");
    }
  };

  useEffect(() => {
    if (screens?.md) setActiveKey("");
  }, [screens]);

  return (
    <Collapse
      style={{
        position: "sticky",
        top: "0px",
        zIndex: 3,
        backgroundColor: token.colorBgContainer + "80",
        color: token.colorText,
        display: "flex",
        fontSize: "19px",
        width: "100%",
        borderRadius: "0px",
        fontWeight: "500",
        letterSpacing: "0.228px",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        padding: "0 17px"
      }}
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? -180 : 0} />
      )}
      activeKey={activeKey}
      expandIconPosition="end"
      collapsible="header"
      bordered={false}
      onChange={handleCollapse}
      items={[
        {
          key: title,
          id: "sticky-header-title",
          label: title,
          children: screens?.md ? (
            <></>
          ) : children !== undefined ? (
            <Space
              size={"middle"}
              style={{ width: "100%", justifyContent: "end" }}
            >
              {children}
            </Space>
          ) : (
            <></>
          ),
          style: { flex: 1 },
          showArrow: screens?.md
            ? false
            : children !== undefined
            ? true
            : false,
          extra: screens?.md ? (
            <Space size={"middle"} style={{ marginLeft: "32px" }} wrap>
              {children}
            </Space>
          ) : (
            <></>
          ),
        },
      ]}
    />
  );
};

export default StickyHeader;
