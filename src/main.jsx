import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import UserDashboard from './pages/user/UserDashboard';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import AdminDashboard from './pages/admin/AdminDashBoard';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* dashboards */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* catch‑all 404 so you never get a blank page */}
        <Route path="*" element={<h1>404 – Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
