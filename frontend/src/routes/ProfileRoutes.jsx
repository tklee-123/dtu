// PlayerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../components/player/Profile";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
};

export default ProfileRoutes;
