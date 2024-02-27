import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTutorial = () => {
  const [title, setTitle] = useState('');
  const [tutoUrl, setTutoUrl] = useState('');
  const [course, setCourse] = useState('');
  const [tutorialId, setTutorialId] = useState('');
  const [loadedTutorials, setLoadedTutorials] = useState([]);

  // Fetch all tutorials on component mount
  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tutorial');
      setLoadedTutorials(response.data);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/tutorial', {
        title: title,
        tuto_url: tutoUrl,
        course: parseInt(course),
      });

      console.log('Tutorial created:', response.data);
      fetchTutorials(); // Refresh tutorial list after creating
    } catch (error) {
      console.error('Error creating tutorial:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/tutorial/${tutorialId}`, {
        title: title,
        tuto_url: tutoUrl,
        course: parseInt(course),
      });

      console.log('Tutorial updated:', response.data);
      fetchTutorials(); // Refresh tutorial list after updating
    } catch (error) {
      console.error('Error updating tutorial:', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:3000/tutorial/${tutorialId}`);

      console.log('Tutorial deleted:', response.data);
      fetchTutorials(); // Refresh tutorial list after deleting
    } catch (error) {
      console.error('Error deleting tutorial:', error);
    }
  };

  const handleGet = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/tutorial/get_tutorial/${tutorialId}`);

      console.log('Fetched tutorial:', response.data);
      // You can use the fetched tutorial data as needed
    } catch (error) {
      console.error('Error fetching tutorial:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Create, Update, Delete, and Get Tutorials</h1>
      
      {/* Create Form */}
      <h2 className="text-xl font-bold mb-4">Create Tutorial</h2>
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
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tutoUrl" className="block text-sm font-medium text-gray-700">
            Tutorial URL:
          </label>
          <input
            type="text"
            id="tutoUrl"
            value={tutoUrl}
            onChange={(e) => setTutoUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="course" className="block text-sm font-medium text-gray-700">
            Course ID:
          </label>
          <input
            type="number"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Tutorial
        </button>
      </form>

      {/* Update Form */}
      <h2 className="text-xl font-bold mb-4">Update Tutorial</h2>
      <form onSubmit={handleUpdate} className="mb-8">
        <div className="mb-4">
          <label htmlFor="updateTitle" className="block text-sm font-medium text-gray-700">
            New Title:
          </label>
          <input
            type="text"
            id="updateTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="updateTutoUrl" className="block text-sm font-medium text-gray-700">
            New Tutorial URL:
          </label>
          <input
            type="text"
            id="updateTutoUrl"
            value={tutoUrl}
            onChange={(e) => setTutoUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="updateCourse" className="block text-sm font-medium text-gray-700">
            New Course ID:
          </label>
          <input
            type="number"
            id="updateCourse"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Tutorial
        </button>
      </form>

      {/* Delete Form */}
      <h2 className="text-xl font-bold mb-4">Delete Tutorial</h2>
      <form onSubmit={handleDelete} className="mb-8">
        <div className="mb-4">
          <label htmlFor="deleteId" className="block text-sm font-medium text-gray-700">
            Tutorial ID to Delete:
          </label>
          <input
            type="number"
            id="deleteId"
            value={tutorialId}
            onChange={(e) => setTutorialId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete Tutorial
        </button>
      </form>

      {/* Get Tutorial */}
      <h2 className="text-xl font-bold mb-4">Get Tutorial</h2>
      <form onSubmit={handleGet} className="mb-8">
        <div className="mb-4">
          <label htmlFor="getId" className="block text-sm font-medium text-gray-700">
            Tutorial ID to Fetch:
          </label>
          <input
            type="number"
            id="getId"
            value={tutorialId}
            onChange={(e) => setTutorialId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Tutorial
        </button>
      </form>

      {/* List of Tutorials */}
      <h2 className="text-xl font-bold mb-4">List of Tutorials</h2>
      <ul>
        {loadedTutorials.map((tutorial) => (
          <li key={tutorial.id} className="mb-4">
            <div>
              <strong>{tutorial.title}</strong> - {tutorial.tuto_url}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTutorial;
