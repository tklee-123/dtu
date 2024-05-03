import React, { useState } from "react";
import scriptAPI from "../../api/script";
import "./admin.css"; // Import CSS file for Admin component

const Admin = () => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [response, setResponse] = useState(""); // Thêm state để lưu trữ kết quả API

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleExecuteButtonClick = async () => {
        try {
            setLoading(true);
            const response = await scriptAPI.get_nearest_player(inputValue);
            setResponse(response); 
            setError(""); 
        } catch (error) {
            setError("Failed to execute script: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-wrapper">
            <div className="admin-container">
                <div className="admin-content">
                    <div className="input-container">
                        <label htmlFor="inputField">Input:</label>
                        <input
                            type="text"
                            id="inputField"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </div>
                    <div className="button-container">
                        <button
                            onClick={handleExecuteButtonClick}
                            disabled={loading}
                            className="execute-button"
                        >
                            {loading ? "Executing..." : "Execute"}
                        </button>
                    </div>
                    {error && <div className="admin-error">{error}</div>}
                    {/* Hiển thị kết quả của API */}
                    {response && (
                        <div className="api-response-container">
                            <h3>Nearest Players</h3>
                            <div>{response}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
