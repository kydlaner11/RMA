import { Button, Drawer, Space } from "antd";
import React from "react";

const UserDrawer = ({ openDrawer, setOpenDrawer }) => {
  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Drawer
      title="Drawer with extra actions"
      className="user-drawer"
      placement={"right"}
      width={500}
      open={openDrawer}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
export default UserDrawer;
