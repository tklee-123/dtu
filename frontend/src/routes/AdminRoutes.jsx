// PlayerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../components/admin/Admin"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AdminRoutes;
