// PlayerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Player from "../components/player/Player";

const PlayerRoutes = () => {
  return (
    <Routes>
      <Route path="/player" element={<Player />} />
    </Routes>
  );
};

export default PlayerRoutes;
