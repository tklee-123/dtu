import React, { useState } from "react";
import scriptAPI from "../../api/script";
import { useUser } from "../../context/UserContext";
import "./player.css"; // Import CSS file for Main component

const Player = () => {
    const { userInfo } = useUser();
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleStartButtonClick = async () => {
        try {
            setLoading(true);
            if (!userInfo || !userInfo.accessToken) {
                throw new Error("User information or access token is missing.");
            }
            const response = await scriptAPI.run(userInfo.accessToken);

            setResult(response);
        } catch (error) {
            setError("Failed to run script: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="wrapper">
            <div className="main-container">
                <div className="content">
                    <div className="start-button-container">
                        <button onClick={handleStartButtonClick} disabled={loading} className="start-button">
                            {loading ? "Running..." : "Start"}
                        </button>
                    </div>
                    {error && <div className="error">{error}</div>}
                    <div className="result-container">
                        <h3>Result:</h3>
                        <p className="result">{loading ? "Waiting for result..." : result}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
};

export default Player;
