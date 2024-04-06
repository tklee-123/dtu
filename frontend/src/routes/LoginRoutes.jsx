// PlayerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";

const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default LoginRoutes;
