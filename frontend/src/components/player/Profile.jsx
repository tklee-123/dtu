import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import scriptAPI from '../../api/script'; 
import Sidebar from '../sidebar/Sidebar';
import "./profile.css";

const Profile = () => {
  const { id } = useParams(); 
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await scriptAPI.get_infor(id); 
        setResponse(response); 
      } catch (error) {
        setError('Failed to fetch profile: ' + error.message);
      }
    };

    fetchData(); 
  }, [id]);

  return (
    <div className="container">
      <Sidebar playerId={id} />
      <div className="profile-content">
        {error && <div className="error">{error}</div>}
        {response && (
          <div>
            <h2 className="profile-heading">Profile</h2>
            <div className="profile-details">
              <p><strong>Full Name:</strong> {response.full_name}</p>
              <p><strong>Email:</strong> {response.email}</p>
              <p><strong>Birth Year:</strong> {response.birth_year}</p>
              <p><strong>Degree:</strong> {response.degree}</p>
              <p><strong>Major:</strong> {response.major.join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default Profile;
