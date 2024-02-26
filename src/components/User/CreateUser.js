import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:3002/users', {
        username: username,
        password: password,
      });
      console.log(response.data); 
      setUsers([...users, response.data]); 
      setUsername('');
      setPassword('');
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:3002/users/${userId}`, {
        username: username,
        password: password,
      });
      console.log(response.data); 
      setUsers(users.map((user) => (user.id === userId ? response.data : user)));
      setUsername('');
      setPassword('');
      setEditingUserId(null);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3002/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleEditUser = (user) => {
    setUsername(user.username);
    setPassword(user.password);
    setEditingUserId(user.id);
  };

  const handleCancelEdit = () => {
    setUsername('');
    setPassword('');
    setEditingUserId(null);
  };

  const handleRequestError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <h2>Create User</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      {editingUserId ? (
        <div>
          <button onClick={() => handleUpdateUser(editingUserId)}>Update User</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleCreateUser}>Create User</button>
      )}
      <hr />
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} -{' '}
            <button onClick={() => handleEditUser(user)}>Edit</button>{' '}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
