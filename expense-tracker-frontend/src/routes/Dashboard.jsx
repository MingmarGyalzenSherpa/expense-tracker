import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
export default function Dashboard() {
  const Navigate = useNavigate();
  const token = JSON.parse(window.localStorage.getItem("auth"));
  console.log(token);
  useEffect(() => {
    if (!token) return Navigate("/login");
  }, []);
  return (
    <div className="d-flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
