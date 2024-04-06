import "./admin.css";
import React, { useState } from "react";
import axios from "axios";
import scriptAPI from "../../api/script";
import { useUser } from "../../context/UserContext";

const AdminPage = () => {
  const [playerId, setPlayerId] = useState("");
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [algorithmResult, setAlgorithmResult] = useState("");

  const handleInsertData = async () => {
    try {
        setLoading(true);
        if (!userInfo || !userInfo.accessToken) {
            throw new Error("User information or access token is missing.");
        }
        const response = await scriptAPI.get_major(userInfo.accessToken);
        setAlgorithmResult(response);
    } catch (error) {
        setError("Failed to run script: " + error.message);
    } finally {
        setLoading(false);
    }
  };

  const handleGetRecommendedQuestion = async () => {
    try {
      const response = await scriptAPI.get_major(playerId);
      setAlgorithmResult(response.data); 
    } catch (error) {
      console.error("Error getting recommended question:", error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <button onClick={handleInsertData}>Run Algorithm</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Player ID"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
        />
        <button onClick={handleGetRecommendedQuestion}>Get Recommended Question</button>
      </div>
      <div>
        {/* Hiển thị thông tin kết quả thuật toán */}
        {algorithmResult && (
          <div>
            <h3>Recommended Question:</h3>
            <p>{algorithmResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
