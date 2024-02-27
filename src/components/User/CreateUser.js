import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [createdUser, setCreatedUser] = useState(null);
  const [userData, setUserData] = useState({ username: '', password: '' });

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users', userData);
      setCreatedUser(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Create New User</h2>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={userData.username}
        onChange={handleInputChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
      />
      <button
        onClick={handleCreateUser}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create User
      </button>
      {createdUser && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">User Created</h3>
          <p><span className="font-semibold">ID:</span> {createdUser.id}</p>
          <p><span className="font-semibold">Username:</span> {createdUser.username}</p>
          <p><span className="font-semibold">Password:</span> {createdUser.password}</p>
        </div>
      )}
    </div>
  );
}

export default CreateUser;
