import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateActivity = () => {
  const navigate = useNavigate();

  const [activityData, setActivityData] = useState({
    name: '',
    description: '',
  });

  const handleCreateActivity = async () => {
    try {
      const response = await api.post('/activities', activityData);
      console.log(response.data);

      navigate('/get-user');
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleChange = (e) => {
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-2xl font-bold mb-4">Create Activity</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={activityData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={activityData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateActivity}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Activity
        </button>
      </form>
    </div>
  );
};

export default CreateActivity;
