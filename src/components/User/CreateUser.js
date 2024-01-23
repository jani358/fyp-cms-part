import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/shared-styles.css';

const CreateUser = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: null,
    username: '',
    password: '',
    createdAt: null,
  });

  const handleCreateUser = async () => {
    try {
      console.log(userData); // Log the user data
      const response = await api.post('/users', userData);
      console.log(response.data);

      setUserData({
        id: null,
        username: '',
        password: '',
        createdAt: null,
      });

     
      navigate('/get-user');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form>
        <label>
          ID:
          <input
            type="number"
            value={userData.id || ''}
            onChange={(e) => setUserData({ ...userData, id: e.target.value })}
            disabled
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
        </label>
        <br />
        <label>
          Created At:
          <input
            type="text"
            value={userData.createdAt || ''}
            onChange={(e) => setUserData({ ...userData, createdAt: e.target.value })}
            disabled
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateUser}>
          Create User
        </button>
      </form>

      <Link to="/get-user">Go to Get User</Link>

   
      <Routes>
        <Route path="/get-user" element={<GetUser />} />
      </Routes>
    </div>
  );
};

export default CreateUser;

// Add the GetUser component here
const GetUser = () => {
  // Implement the GetUser component logic here
  return <div>GetUser component content</div>;
};
