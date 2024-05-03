// PlayerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Recommened_Question from "../components/player/Question"

const QuestionRoutes = () => {
  return (
    <Routes>
      <Route path="/recommended-questions/:id" element={<Recommened_Question />} />
    </Routes>
  );
};

export default QuestionRoutes;
