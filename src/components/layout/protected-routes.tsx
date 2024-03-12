import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/common/cookies.helpers";
import { ProtectedRouteProps } from "../../interfaces/protectedRoute";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const accessToken = getCookie("accessToken");

  return accessToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
