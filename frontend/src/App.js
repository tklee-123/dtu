import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import LoginRoutes from "./routes/LoginRoutes";
import PlayerRoutes from "./routes/PlayerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import CheckRoutes  from "./routes/CheckRoutes";
import QuestionRoutes from "./routes/QuestionRoutes";
import ProfileRoutes from "./routes/ProfileRoutes";
function App() {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
        <LoginRoutes />
        <PlayerRoutes />
        <AdminRoutes />
        <CheckRoutes />
        <QuestionRoutes />
        <ProfileRoutes />
      </UserProvider>
    </Router>
  );
}

export default App;
