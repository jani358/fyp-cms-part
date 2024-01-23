import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/shared-styles.css';

const CreateMotivationalTip = () => {
  const navigate = useNavigate();

  const [motivationalTipData, setMotivationalTipData] = useState({
    title: '',
    content: '',
  });

  const handleCreateMotivationalTip = async () => {
    try {
      const response = await api.post('/motivational-tips', motivationalTipData);
      console.log(response.data);

      // Redirect to another route after successful creation
      navigate('/get-motivational-tip'); // Adjust the route as needed
    } catch (error) {
      console.error('Error creating motivational tip:', error);
    }
  };

  const handleChange = (e) => {
    setMotivationalTipData({
      ...motivationalTipData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Create Motivational Tip</h2>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={motivationalTipData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            name="content"
            value={motivationalTipData.content}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateMotivationalTip}>
          Create Motivational Tip
        </button>
      </form>

      {/* Add a Link to navigate back */}
      <Link to="/get-motivational-tip">Go to Get Motivational Tip</Link>

      {/* Define the route for Get Motivational Tip */}
      <Routes>
        <Route path="/get-motivational-tip" element={<GetMotivationalTip />} />
      </Routes>
    </div>
  );
};

export default CreateMotivationalTip;

// Add the GetMotivationalTip component here
const GetMotivationalTip = () => {
  // Implement the GetMotivationalTip component logic here
  return <div>GetMotivationalTip component content</div>;
};
