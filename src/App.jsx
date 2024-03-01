import { useDetectAdBlock } from "adblock-detect-react";
import { ConfigProvider, message, notification, theme } from "antd";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CookiesIcon } from "./assets/svg/cookiesSvg";
import LaravelEchoClient from "./components/LaravelEchoClient";
import SuspensePage from "./components/SuspensePage";
import { cookiesButton, cookiesMessage } from "./constant/cookiesNotification";
import { unauthenticatedPageList } from "./constant/pageList";
import { themeColor } from "./constant/themeColor";
import { AbilityContext } from "./context/AbilityContext";
import DataContext from "./context/DataContext";
import AppLayout from "./layouts/AppLayout";
import { refreshToken } from "./redux/actions/authAction";
import AuthenticatedRouter from "./routes/AuthenticatedRouter";
import UnauthenticatedRouter from "./routes/UnauthenticatedRouter";
import { accountAbility } from "./utils/ability";
import { notificationPermission } from "./utils/permissions";

const NotFound = lazy(() => import("./pages/notFound/NotFound"));

function App() {
  const { auth, app } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [messageApi, messageHolder] = message.useMessage();
  const [notificationApi, notificationHolder] = notification.useNotification();
  const [alertApi, setAlertApi] = useState({
    open: false,
    type: "", // success, info, warning, error
    message: "",
  });

  // ? showMessage used for success or simple message
  const showMessage = ({ type, content }) => {
    messageApi.open({
      type, // error, info, loading, success, warning
      content,
    });
  };

  // ? showNotification used for error or complex message
  const showNotification = ({ type, message, description, ...props }) => {
    // destroy, error, info, success, warning
    notificationApi[type]({
      message,
      description,
      ...props,
    });
  };

  const handleCloseAlert = () => {
    setAlertApi({
      open: false,
      type: "", // success, info, warning, error
      message: "",
    });
  };

  // ? adBlockDetected used for detect adblocker
  const adBlockDetected = useDetectAdBlock();

  const state = {
    showMessage,
    showNotification,
    setAlertApi,
  };

  //* AdBlock and Cookies Notification
  useEffect(() => {
    if (adBlockDetected) {
      showNotification({
        type: "warning",
        message: "AdBlock Detected",
        description: "Please disable your adblocker to use this website",
        placement: "bottomLeft",
        duration: 0,
      });
    }

    if (Cookies.get("allow_cookies") === undefined) {
      const key = dayjs().unix();

      showNotification({
        key,
        type: "info",
        icon: <CookiesIcon />,
        message: "Cookies Settings",
        description: cookiesMessage(),
        placement: "bottomLeft",
        onClose: () => Cookies.set("allow_cookies", true),
        btn: cookiesButton(notificationApi, key),
        duration: 0,
      });
    }

    // eslint-disable-next-line
  }, []);

  //* Browser Permission
  useEffect(() => {
    notificationPermission();
  }, []);

  //* Get Access Token
  useEffect(() => {
    if (!auth.token) {
      dispatch(refreshToken());
    }
  }, [dispatch, auth.token]);

  return (
    <Router>
      <ErrorBoundary>
        <DataContext.Provider value={{ ...state }}>
          <AbilityContext.Provider value={accountAbility()}>
            <ConfigProvider
              theme={{
                ...themeColor,
                algorithm: app.darkMode
                  ? theme.darkAlgorithm
                  : theme.defaultAlgorithm,
                token: {
                  motion: app.motion,
                },
              }}
            >
              {auth.accessToken && <LaravelEchoClient />}

              <AppLayout
                alertApi={alertApi}
                handleCloseAlert={handleCloseAlert}
                messageHolder={messageHolder}
                notificationHolder={notificationHolder}
              >
                <Routes>
                  <Route path="/" element={<UnauthenticatedRouter />}>
                    {unauthenticatedPageList.map((item) => (
                      <Route
                        key={item.key}
                        path={item.path}
                        element={<SuspensePage>{item.element}</SuspensePage>}
                      />
                    ))}
                  </Route>

                  <Route path="/" element={<AuthenticatedRouter />}>
                    {/* ? Documentation in src/utils/pages.js */}
                    {app.page.list.map((item) => (
                      <Route
                        key={item.key}
                        path={item.path}
                        element={
                          <SuspensePage>
                            <div style={{ width: "100%" }}>{item.element}</div>
                          </SuspensePage>
                        }
                      />
                    ))}

                    <Route
                      path="*"
                      element={
                        <SuspensePage>
                          <NotFound />
                        </SuspensePage>
                      }
                    />
                  </Route>
                </Routes>
              </AppLayout>
            </ConfigProvider>
          </AbilityContext.Provider>
        </DataContext.Provider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
