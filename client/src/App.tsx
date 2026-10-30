import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import HelpDesk from './pages/HelpDesk';
import VoiceAssistant from './pages/VoiceAssistant';
import Education from './pages/Education';
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.toLowerCase().startsWith('/admin');
  return (
    <div className="min-h-screen bg-cream">
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/help-desk" element={<HelpDesk />} />
        <Route path="/voice-assistant" element={<VoiceAssistant />} />
        <Route path="/education" element={<Education />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
