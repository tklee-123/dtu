import React, { useState } from 'react';
import scriptAPI from '../../api/script'; 
import "./check.css";

const CheckPage = () => {
  const [number, setNumber] = useState('')
  const [playerId, setPlayerId] = useState('');
  const [error, setError] = useState('');
  const [showData, setShowData] = useState(false);

  const handleInputChange = (event) => {
    setNumber(event.target.value); 
  };

  const handleGetButtonClick = async () => {
    try {
        const response = await scriptAPI.get_id(number); 
        const playerId = response.player_id
        setPlayerId(playerId)
        setShowData(true); 
        setError(''); 
        redirectToAnotherPage(playerId); 
    } catch (error) {
        setError('Failed to fetch recommended questions: ' + error.message);
    }
  };

  const redirectToAnotherPage = (playerId) => {
      window.location.href = `/player/${playerId}`; 
  };

  
  return (
    <div className="container">
      <div className="input-container">
        <label htmlFor="playerIdInput">Enter player order:</label>
        <input
          type="text"
          id="playerIdInput"
          value={number}
          onChange={handleInputChange}
          placeholder="Enter player order"
        />
        <button onClick={handleGetButtonClick}>Get</button>
      </div>
      {error && <div className="error-message">{error} {playerId}</div>}
    </div>
  );
};

export default CheckPage;
