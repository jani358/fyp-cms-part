import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import axios from 'axios';

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3002/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/category', {
        title: title,
        image: image,
        description: description,
      });
      console.log('Category created:', response.data);
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3002/category/${id}`, {
        title: title,
        image: image,
        description: description,
      });
      console.log('Category updated:', response.data);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/category/${id}`);
      console.log('Category deleted:', response.data);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleGet = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3002/category/get_category/${id}`);
      console.log('Category:', response.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Category</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Category</button>
      </form>

      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.title} - {category.description}
            <button onClick={() => handleUpdate(category.id)}>Update</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
            <button onClick={() => handleGet(category.id)}>Get</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateCategory;