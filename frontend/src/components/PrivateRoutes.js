import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//this is private route components where we restrict user to use other options without signup
const PrivateRoutes = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoutes;
