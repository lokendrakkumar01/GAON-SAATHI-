import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Routes>
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
