import { LogoutOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popover, theme } from "antd";
import React, {useState} from "react";

import { handleLogout } from "../../services/authServices";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfileUser";

const { useToken } = theme;

const UserProfileAvatar = () => {
  const { token } = useToken();
  const { auth } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditProfile = () => {
    setIsModalVisible(true);
    // Add your logic to open the modal here
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    // Add your logic to close the modal here
  };

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
        content={
          <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            backgroundColor: 'transparent',
            borderRadius: '6px',
            padding: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
            }}
          >
            <div>
              <div
                style={{
                  lineHeight: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                {auth?.user ?? ''}
              </div>
              <div
                style={{ lineHeight: '16px', fontSize: '10px', opacity: 0.7 }}
              >
                {auth?.email ?? ''}
              </div>
            </div>
    
            <Button
              type="default"
              icon={<LogoutOutlined />}
              title="Signout"
              onClick={handleLogout}
            />
          </div>
    
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEditProfile}
            style={{ width: '100%' }}
          >
            Edit Profile
          </Button>
        </div>
        }
        trigger="click"
      >
        <Button
          type="primary"
          icon={<UserOutlined />}
          size={"middle"}
          style={{ backgroundColor: token.colorTextTertiary }}
        />
      </Popover>

      <EditProfile handleModalClose={handleModalClose} isModalVisible={isModalVisible}/>
    </div>
  );
};

export default UserProfileAvatar;
