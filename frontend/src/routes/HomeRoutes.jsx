// PlayerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default HomeRoutes;
