import React, { Suspense } from "react";
import Loading from "../pages/loading/Loading";

const SuspensePage = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default SuspensePage;
