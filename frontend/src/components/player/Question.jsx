import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import scriptAPI from '../../api/script'; 
// import "./check.css";
import Sidebar from '../sidebar/Sidebar';
const Recommened_Question = () => {
  const { id } = useParams(); 
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  console.log(id); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await scriptAPI.get_recommended_questions(id); 
        setResponse(response); 
      } catch (error) {
        setError('Failed to fetch recommended questions: ' + error.message);
      }
    };

    fetchData(); // Gọi hàm fetchData khi component được render
  }, [id]); // Sử dụng id từ useParams

  return (
    <div className="container">
      <Sidebar playerId={id} />
      {error && <div className="error">{error}</div>}
      {response && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Difficulty</th>
                <th>Required Rank</th>
              </tr>
            </thead>
            <tbody>
              {response.recommended_questions.map(question => (
                <tr key={question._id}>
                  <td>{question.category}</td>
                  <td>{question.subcategory}</td>
                  <td>{question.difficulty}</td>
                  <td>{question.required_rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Recommened_Question;
