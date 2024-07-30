import { Alert, Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

import { useSelector } from "react-redux";
import Bottombar from "./Bottombar";
// import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const {useToken} = theme

const AppLayout = ({
  children,
  alertApi,
  handleCloseAlert,
  messageHolder,
  notificationHolder,
}) => {
  const { auth } = useSelector((state) => state);
  const {token} = useToken()

 
  return (
    <Layout className="app">
      {alertApi.open && (
        <Alert
          type={alertApi.type}
          message={alertApi.message}
          banner
          closable
          onClose={handleCloseAlert}
        />
      )}

      {auth.accessToken && <Topbar />}

      {messageHolder}
      {notificationHolder}

      <Layout>
        {/* {auth.accessToken && <Sidebar />} */}

        <Layout>
          <Content
            style={{
              minHeight: 280,
              display: "flex",
              justifyContent: "center",
              color: token.colorText
            }}
          >
            {children}
          </Content>

          <Bottombar />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
