import { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = "https://agroback-vi1y.onrender.com"

const AdminDashboard = () => {
  const [profile, setProfile] = useState({
    empType: '',
    empId: '',
    dept: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/admin/profile`, { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
        setIsComplete(
          res.data.empType &&
            res.data.empId &&
            res.data.dept &&
            res.data.phone &&
            res.data.address
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching admin profile:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/admin/profile`, profile, {
        withCredentials: true,
      })
      .then((res) => {
        setMsg(res.data.msg);
        setIsComplete(true);
      })
      .catch(() => setMsg('Error updating profile'));
  };

  const handleLogout = () => {
    axios
      .post(`${API_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        window.location.href = '/login';
      })
      .catch((err) => {
        console.error('Logout failed:', err);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 min-h-screen">
      {/* Header with title and logout */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {msg && <p className="text-green-600 mb-4">{msg}</p>}

      {isComplete ? (
        <div className="space-y-2">
          <p><strong>Employee Type:</strong> {profile.empType}</p>
          <p><strong>Employee ID:</strong> {profile.empId}</p>
          <p><strong>Department:</strong> {profile.dept}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <button
            className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded"
            onClick={() => setIsComplete(false)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input
            name="empType"
            value={profile.empType}
            onChange={handleChange}
            placeholder="Employee Type"
            className="border p-2 w-full"
          />
          <input
            name="empId"
            value={profile.empId}
            onChange={handleChange}
            placeholder="Employee ID"
            className="border p-2 w-full"
          />
          <input
            name="dept"
            value={profile.dept}
            onChange={handleChange}
            placeholder="Department"
            className="border p-2 w-full"
          />
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 w-full"
          />
          <input
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
