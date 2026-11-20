import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <button onClick={() => navigate(-1)} className="text-2xl mb-2">←</button>
        <h1 className="text-2xl font-bold">⚙️ Settings</h1>
      </div>

      {/* Settings Menu */}
      <div className="p-4">
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <div>
              <div className="font-semibold">Parent Account</div>
              <div className="text-sm text-gray-600">email@example.com</div>
            </div>
          </div>
          
          <Link to="/parent/settings/screentime" className="bg-yellow-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <div className="font-semibold">Screen Time Limits</div>
              <div className="text-sm text-gray-600">Daily time restrictions</div>
            </div>
          </Link>
          
          <Link to="/parent/settings/languages" className="bg-blue-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <div>
              <div className="font-semibold">Language Preferences</div>
              <div className="text-sm text-gray-600">App language settings</div>
            </div>
          </Link>
          
          <button className="bg-purple-100 rounded-xl p-4 flex items-center gap-3 w-full text-left">
            <span className="text-2xl">🔒</span>
            <div>
              <div className="font-semibold">Security</div>
              <div className="text-sm text-gray-600">Password & PIN settings</div>
            </div>
          </button>
          
          <button onClick={handleLogout} className="bg-red-100 rounded-xl p-4 flex items-center gap-3 w-full text-left">
            <span className="text-2xl">🚪</span>
            <div>
              <div className="font-semibold">Log Out</div>
              <div className="text-sm text-gray-600">Sign out of your account</div>
            </div>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-center text-gray-500 text-sm">
          &copy; 2024 BabyBillion Learning
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;