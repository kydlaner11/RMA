import { Spin } from "antd";
import React from "react";


const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        heigth: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin />  
    </div>
  );
};

export default Loading;
