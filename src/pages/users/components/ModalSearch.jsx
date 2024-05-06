import { Button, Drawer, Space } from "antd";
import React from "react";

const ModalSearch = ({ openModal, setOpenModal }) => {
  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <Drawer
      title="Drawer with extra actions" 
      className="user-drawer"
      placement={"right"}
      width={500}
      open={openModal}
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
export default ModalSearch;
