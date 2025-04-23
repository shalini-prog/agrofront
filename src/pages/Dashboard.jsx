import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = "https://agroback-vi1y.onrender.com"

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getRoleAndRedirect = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
        const role = res.data.role;

        if (role === 'user') {
          navigate('/user/dashboard');
        } else if (role === 'farmer') {
          navigate('/farmer/dashboard');
        } else if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error redirecting:", error);
        navigate('/login');
      }
    };

    getRoleAndRedirect();
  }, [navigate]);

  return <div>Loading dashboard...</div>;
};

export default Dashboard;
