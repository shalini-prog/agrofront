import { BrowserRouter, Routes, Route } from 'react-router‑dom';


function App() {
  return (
    <BrowserRouter>   {/* ← this must match the import */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* dashboards */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* optional catch‑all */}
        <Route path="*" element={<h1>404 – Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
