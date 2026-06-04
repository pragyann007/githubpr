import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../context/UserContext";

const PrivateRoutes = () => {
  const { user, loading } = useContext(userContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;