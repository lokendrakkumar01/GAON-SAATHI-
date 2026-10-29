import { Link } from 'react-router-dom';
import { Menu, X, Home } from './Icons';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-700">GAON SAATHI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className="text-gray-700 hover:text-primary-600">गाँव बाजार</Link>
            <Link to="/help-desk" className="text-gray-700 hover:text-primary-600">हेल्प डेस्क</Link>
            <Link to="/education" className="text-gray-700 hover:text-primary-600">शिक्षा साथी</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-primary-600">नौकरी & सेवाएं</Link>
            <Link to="/voice-assistant" className="text-gray-700 hover:text-primary-600">आवाज सहायक</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600">डैशबोर्ड</Link>
                <button onClick={logout} className="text-gray-700 hover:text-primary-600">लॉगआउट</button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 hover:text-primary-600">लॉगिन</Link>
                <Link to="/register" className="btn-primary">पंजीकरण</Link>
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/marketplace" className="block px-3 py-2 text-gray-700">गाँव बाजार</Link>
            <Link to="/help-desk" className="block px-3 py-2 text-gray-700">हेल्प डेस्क</Link>
            <Link to="/education" className="block px-3 py-2 text-gray-700">शिक्षा साथी</Link>
            <Link to="/jobs" className="block px-3 py-2 text-gray-700">नौकरी & सेवाएं</Link>
            <Link to="/voice-assistant" className="block px-3 py-2 text-gray-700">आवाज सहायक</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-gray-700">डैशबोर्ड</Link>
                <button onClick={logout} className="block w-full text-left px-3 py-2 text-gray-700">लॉगआउट</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-700">लॉगिन</Link>
                <Link to="/register" className="block px-3 py-2 text-primary-600 font-medium">पंजीकरण</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
