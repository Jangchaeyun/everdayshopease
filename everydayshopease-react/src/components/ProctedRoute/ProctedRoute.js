import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../utils/jwt-helper";

const ProctedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      navigate("/v1/login");
    }
  }, [navigate]);
  return <div>{children}</div>;
};

export default ProctedRoute;
