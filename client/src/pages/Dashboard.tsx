import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">कृपया पहले लॉगिन करें</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-800 mb-6">नमस्ते, {user.name} जी</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-2">प्रोफाइल</h3>
          <p className="text-gray-600">मोबाइल: {user.phone}</p>
          <p className="text-gray-600">गाँव: {user.village || 'उल्लेख नहीं'}</p>
          <p className="text-gray-600">जिला: {user.district}</p>
          <p className="text-gray-600 mt-2">भूमिका: {user.roles.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
