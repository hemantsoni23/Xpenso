import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const accessToken = Cookies.get("xpenso-accessToken");
  return accessToken ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;