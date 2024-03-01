import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Popover, theme } from "antd";
import React from "react";

import { handleLogout } from "../../services/authServices";
import { useSelector } from "react-redux";

const { useToken } = theme;

const UserProfileAvatar = () => {
  const { token } = useToken();
  const { auth } = useSelector((state) => state);

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
              display: "flex",
              alignItems: "center",
              gap: "30px",
              backgroundColor: "transparent",
              borderRadius: "6px",
            }}
          >
            <div>
              <div
                style={{
                  lineHeight: "20px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {auth?.user ?? ""}
              </div>
              <div
                style={{ lineHeight: "16px", fontSize: "10px", opacity: 0.7 }}
              >
                {auth?.email ?? ""}
              </div>
            </div>

            <Button
              type="default"
              icon={<LogoutOutlined />}
              title="Signout"
              onClick={handleLogout}
            />
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
    </div>
  );
};

export default UserProfileAvatar;
