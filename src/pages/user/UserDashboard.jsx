import { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [profile, setProfile] = useState({ name: '', phone: '', dob: '' });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/user/profile', { withCredentials: true })
      .then(res => {
        setProfile(res.data);
        setIsComplete(res.data.name && res.data.phone && res.data.dob);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user profile:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/auth/user/profile', profile, { withCredentials: true })
      .then(res => {
        setMsg(res.data.msg);
        setIsComplete(true);
      })
      .catch(() => setMsg('Error updating profile'));
  };

  const handleLogout = () => {
    axios.post('http://localhost:5000/auth/logout', { withCredentials: true })
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
        <h2 className="text-2xl font-bold">User Dashboard</h2>
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
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Date of Birth:</strong> {profile.dob}</p>
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
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 w-full"
          />
          <input
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            placeholder="DOB (YYYY-MM-DD)"
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default UserDashboard;
