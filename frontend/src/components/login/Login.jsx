import "./login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import loginAPI from "../../api/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginAPI.post(email, password);
      setLoading(false);

      const role = response.role;
      localStorage.setItem("accessToken", response.accessToken);
      
      if (role === "player") {
        login(response);
        navigate("/player");
      } else {
        if (role === "admin") {
          login(response);
          navigate("/admin");
        } 
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to login ", error);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row row-login">
          <div className="col-md-6 side-image">
            <div className="text">
              {/* <p>Internship management system</p> */}
            </div>
          </div>
          <div className="col-md-6 right">
            <div className="input-box">
              <header className="header-login">Login</header>
              <div className="input-field">
                <input
                  type="text"
                  className="input"
                  id="email"
                  required=""
                  autoComplete="off"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="input"
                  id="password"
                  required=""
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>
  
              <div className="input-field">
                <button onClick={handleLogin} disabled={loading} className="submit">
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
              {error && <div className="error">{error}</div>}
              <div className="signin">
                <span>
                  <Link to="/">Back to home page</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
