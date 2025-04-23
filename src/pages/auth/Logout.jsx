import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // For navigation
const API_URL = "https://agroback-vi1y.onrender.com"

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Send the logout request to the backend
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token');
      // Redirect the user to the login page after logout
      navigate('auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default LogoutButton;
