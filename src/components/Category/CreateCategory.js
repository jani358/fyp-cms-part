import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateCategory() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/category');
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
      const response = await axios.post('http://localhost:3000/category', {
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
      const response = await axios.put(`http://localhost:3000/category/${id}`, {
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
      const response = await axios.delete(`http://localhost:3000/category/${id}`);
      console.log('Category deleted:', response.data);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleGet = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/category/get_category/${id}`);
      console.log('Category:', response.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Create a New Category</h2>
      <form onSubmit={handleCreate} className="mb-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Category
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-4">
            <span className="block text-lg font-semibold">{category.title}</span>
            <span className="block text-gray-600">{category.description}</span>
            <div className="mt-2">
              <button
                onClick={() => handleUpdate(category.id)}
                className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
              <button
                onClick={() => handleGet(category.id)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Get
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateCategory;
