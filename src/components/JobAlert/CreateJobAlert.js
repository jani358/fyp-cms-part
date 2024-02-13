import React, { useState } from 'react';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import api from '../../services/api';

const CreateJobAlert = () => {
  const navigate = useNavigate();

  const [jobAlertData, setJobAlertData] = useState({
    title: '',
    location: '',
  });

  const handleCreateJobAlert = async () => {
    try {
      const response = await api.post('/job-alerts', jobAlertData);
      console.log(response.data);

      // Redirect to another route after successful creation
      navigate('/get-job-alert'); // Adjust the route as needed
    } catch (error) {
      console.error('Error creating job alert:', error);
    }
  };

  const handleChange = (e) => {
    setJobAlertData({
      ...jobAlertData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Create Job Alert</h2>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={jobAlertData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={jobAlertData.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateJobAlert}>
          Create Job Alert
        </button>
      </form>

      {/* Add a Link to navigate back or to the job alerts list */}
      <Link to="/get-job-alert">Go to Get Job Alert</Link>

      {/* Define the route for Get Job Alert */}
      <Routes>
        <Route path="/get-job-alert" element={<GetJobAlert />} />
      </Routes>
    </div>
  );
};

export default CreateJobAlert;

// Add the GetJobAlert component here
const GetJobAlert = () => {
  // Implement the GetJobAlert component logic here
  return <div>GetJobAlert component content</div>;
};
