import { BellOutlined, SettingOutlined } from "@ant-design/icons";
import { Badge, Button, Popover, Space, Tabs } from "antd";
import React from "react";
import NotificationList from "./NotificationList";

const PopoverNotification = () => {

  const items = [
    {
      label: (
        <Space>
          {" "}
          All <Badge count={100} />{" "}
        </Space>
      ),
      key: 1,
      children: <NotificationList type="all" />,
    },
    {
      label: <Space> General </Space>,
      key: 2,
      children: <NotificationList type="general" />,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: "6px",
      }}
    >
      <Popover
        placement="bottomRight"
        arrow={false}
        title={"Notifications"}
        trigger="click"
        content={
          <Tabs
            size="small"
            tabBarExtraContent={
              <Popover
                placement="bottomRight"
                arrow={false}
                title={<span style={{ fontWeight: 400 }}>Settings</span>}
                trigger={"click"}
              >
                <Button
                  type="default"
                  icon={<SettingOutlined />}
                  size="small"
                />
              </Popover>
            }
            style={{ maxWidth: "75vw", width: "400px" }}
            items={items}
          />
        }
      >
        <Badge count={"100"} offset={[-6, 6]} dot>
          <Button type="text" icon={<BellOutlined />} size={"middle"} />
        </Badge>
      </Popover>
    </div>
  );
};

export default PopoverNotification;
