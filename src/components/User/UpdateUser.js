import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import api from '../../services/api';
import '../../styles/shared-styles.css';

const UpdateUser = () => {
  const navigate = useNavigate();  // Change to useNavigate
  const [userId, setUserId] = useState('');
  const [updatedUserData, setUpdatedUserData] = useState({
    username: '',
    password: '',
  });

  const handleUpdateUser = async () => {
    try {
      const response = await api.put(`/users/${userId}`, updatedUserData);
      console.log(response.data);

      // Redirect to another route after successful update
      navigate('/get-user'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Update User by ID</h2>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          value={updatedUserData.username}
          onChange={(e) =>
            setUpdatedUserData({ ...updatedUserData, username: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={updatedUserData.password}
          onChange={(e) =>
            setUpdatedUserData({ ...updatedUserData, password: e.target.value })
          }
        />
      </label>
      <br />
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UpdateUser;
