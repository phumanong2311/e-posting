import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const token = localStorage.getItem("accessToken");

const DefaultPage = () => {
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default DefaultPage;
