import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateCategory = () => {
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
  });

  const handleCreateCategory = async () => {
    try {
      const response = await api.post('/categories', categoryData);
      console.log(response.data);

      // Redirect to another route after successful creation
      navigate('/get-user'); // Adjust the route as needed
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={categoryData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateCategory}>
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
