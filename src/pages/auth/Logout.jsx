import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // For navigation

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Send the logout request to the backend
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });

      // Redirect the user to the login page after logout
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default LogoutButton;
