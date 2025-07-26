import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AttendanceLog from './pages/AttendanceLog';
import AdminPanel from './pages/AdminPanel';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/logs" element={<AttendanceLog />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;