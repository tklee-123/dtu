import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import LoginRoutes from "./routes/LoginRoutes";
import PlayerRoutes from "./routes/PlayerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
function App() {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
        <LoginRoutes />
        <PlayerRoutes />
        <AdminRoutes />
      </UserProvider>
    </Router>
  );
}

export default App;
