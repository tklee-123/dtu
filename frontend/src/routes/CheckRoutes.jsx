// PlayerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import CheckPage from "../components/check/Check";
const CheckRoutes = () => {
  return (
    <Routes>
      <Route path="/check" element={<CheckPage />} />
    </Routes>
  );
};

export default CheckRoutes;
