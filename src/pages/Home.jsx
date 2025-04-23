// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center space-y-6">
        <h1 className="text-3xl font-bold text-green-700">Welcome to AgriCommerce</h1>
        <p className="text-gray-600">Choose your role to get started:</p>

        <div className="flex flex-col gap-4">
          <Link to="/register" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Register
          </Link>
          <Link to="/login" className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
