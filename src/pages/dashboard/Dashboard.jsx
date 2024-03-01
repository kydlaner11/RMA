import { effect, signal } from "@preact/signals-react";
import { Button, Spin } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StickyHeader from "../../layouts/StickyHeader";

// ? Initialize signal and effect here
const loading = signal(false);

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ! Dont initial signal and effect here
  const handleFetch = () => {
    loading.value = !loading.value;

    const interval = setInterval(() => {
      loading.value = false;
    }, 2000);

    clearInterval(interval);
  };

  // ? Auto redirect to previous page after login
  effect(() => {
    if (Cookies.get("redirect_uri")) {
      const uri = Cookies.get("redirect_uri");
      Cookies.remove("redirect_uri");
      navigate(uri);
    }
  });

  return (
    <div>
      <Spin spinning={loading.value} size="large">
        <StickyHeader title={t("title")}>
          <div>
            <Button onClick={handleFetch}>FETCH</Button>
          </div>
        </StickyHeader>

        <div style={{ padding: 32 }}>Dashboard Content</div>
      </Spin>
    </div>
  );
};

export default Dashboard;
