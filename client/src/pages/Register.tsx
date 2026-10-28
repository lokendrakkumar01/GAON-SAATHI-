import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    village: '',
    district: 'वाराणसी'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'पंजीकरण में त्रुटि हुई');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-primary-800 text-center mb-6">पंजीकरण करें</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">पूरा नाम</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">मोबाइल नंबर</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">पासवर्ड</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">गाँव का नाम</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">जिला</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? 'पंजीकरण हो रहा है...' : 'पंजीकरण करें'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          पहले से खाता है? <Link to="/login" className="text-primary-600 font-medium">लॉगिन करें</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
