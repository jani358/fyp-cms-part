import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/shared-styles.css';

const DeleteUser = () => {
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const [userId, setUserId] = useState('');

  const handleDeleteUser = async () => {
    try {
      const response = await api.delete(`/users/${userId}`);
      console.log(response.data);

      // Redirect to another route after successful deletion
      navigate('/get-user'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>Delete User by ID</h2>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
};

export default DeleteUser;
