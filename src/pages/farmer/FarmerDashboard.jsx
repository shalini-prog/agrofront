import { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = "https://agroback-vi1y.onrender.com"

const FarmerDashboard = () => {
  const [profile, setProfile] = useState({ name: '', zone: '', area: '' });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/auth/farmer/profile`, { withCredentials: true })
      .then(res => {
        setProfile(res.data);
        setIsComplete(res.data.name && res.data.zone && res.data.area); // ✅ Check completeness
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching farmer profile:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`${API_URL}/auth/farmer/profile`,{...profile}, { withCredentials: true ,headers: { "Content-Type": "application/json" }})
      .then(res => {
        setMsg(res.data.msg);
        setIsComplete(true); // ✅ After update, set complete
      })
      .catch(() => setMsg('Error updating profile'));
  };

  const handleLogout = () => {
    axios.post(`${API_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        
        window.location.href = '/login';
      })
      .catch(err => {
        console.error('Logout failed:', err);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 min-h-screen">
      {/* Header with title and logout */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Farmer Dashboard</h2>
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
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Zone:</strong> {profile.zone}</p>
          <p><strong>Area:</strong> {profile.area}</p>
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
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full"
          />
          <input
            name="zone"
            value={profile.zone}
            onChange={handleChange}
            placeholder="Zone"
            className="border p-2 w-full"
          />
          <input
            name="area"
            value={profile.area}
            onChange={handleChange}
            placeholder="Area"
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default FarmerDashboard;
