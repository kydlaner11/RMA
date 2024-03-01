import { signal } from "@preact/signals-react";
import dayjs from "dayjs";
import React from "react";

const sD = signal(dayjs().add(-7, "days"));

const Activity = () => {
  return <div>Activity: {sD.value.format("DD-MM-YYYY HH:mm:ss")}</div>;
};

export default Activity;
