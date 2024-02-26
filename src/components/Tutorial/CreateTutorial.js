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
      const response = await axios.get('http://localhost:3002/tutorial');
      setLoadedTutorials(response.data);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3002/tutorial', {
        title: title,
        tuto_url: tutoUrl,
        course: parseInt(course)
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
      const response = await axios.put(`http://localhost:3002/tutorial/${tutorialId}`, {
        title: title,
        tuto_url: tutoUrl,
        course: parseInt(course)
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
      const response = await axios.delete(`http://localhost:3002/tutorial/${tutorialId}`);

      console.log('Tutorial deleted:', response.data);
      fetchTutorials(); // Refresh tutorial list after deleting
    } catch (error) {
      console.error('Error deleting tutorial:', error);
    }
  };

  const handleGet = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3002/tutorial/get_tutorial/${tutorialId}`);

      console.log('Fetched tutorial:', response.data);
      // You can use the fetched tutorial data as needed
    } catch (error) {
      console.error('Error fetching tutorial:', error);
    }
  };

  return (
    <div>
      <h1>Create, Update, Delete, and Get Tutorials</h1>
      
      {/* Create Form */}
      <h2>Create Tutorial</h2>
      <form onSubmit={handleCreate}>
        {/* Input fields for creating a new tutorial */}
      </form>

      {/* Update Form */}
      <h2>Update Tutorial</h2>
      <form onSubmit={handleUpdate}>
        {/* Input fields for updating a tutorial */}
      </form>

      {/* Delete Form */}
      <h2>Delete Tutorial</h2>
      <form onSubmit={handleDelete}>
        {/* Input fields for deleting a tutorial */}
      </form>

      {/* Get Tutorial */}
      <h2>Get Tutorial</h2>
      <form onSubmit={handleGet}>
        {/* Input fields for fetching a tutorial */}
      </form>

      {/* List of Tutorials */}
      <h2>List of Tutorials</h2>
      <ul>
        {loadedTutorials.map((tutorial) => (
          <li key={tutorial.id}>
            {tutorial.title} - {tutorial.tuto_url}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTutorial;
