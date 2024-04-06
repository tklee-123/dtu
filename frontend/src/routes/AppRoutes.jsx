// AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import HomeRoutes from "./HomeRoutes";
import Login from "./LoginRoutes";
import PlayerRoutes from "./PlayerRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
    const { userInfo } = useUser();
    return <HomeRoutes />;
};

export default AppRoutes; // Sửa lại tên export thành AppRoutes
