import React from 'react';
import { Link } from 'react-router-dom';

const ParentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">👨‍👩‍👧 Parent Dashboard</h1>
      </div>

      {/* Quick Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 text-center shadow">
            <div className="text-2xl mb-2">🎮</div>
            <div className="text-sm text-gray-500">Games Played</div>
            <div className="font-bold text-xl mt-1">12</div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 text-center shadow">
            <div className="text-2xl mb-2">📺</div>
            <div className="text-sm text-gray-500">Videos Watched</div>
            <div className="font-bold text-xl mt-1">24</div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 text-center shadow">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-sm text-gray-500">Progress</div>
            <div className="font-bold text-xl mt-1">85%</div>
          </div>
        </div>

        {/* Child Profile Card */}
        <div className="bg-white rounded-2xl p-4 shadow mb-6">
          <h2 className="text-lg font-bold mb-3">Emma (Age 4)</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Screen Time</span>
              <span className="font-medium">45 / 60 min</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4">
        <div className="space-y-3">
          <Link to="/parent/dashboard" className="bg-blue-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <div className="font-semibold">View Report</div>
              <div className="text-sm text-gray-600">See learning progress</div>
            </div>
          </Link>
          
          <Link to="/parent/settings" className="bg-yellow-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <div className="font-semibold">Screen Time Limits</div>
              <div className="text-sm text-gray-600">Manage daily limits</div>
            </div>
          </Link>
          
          <Link to="/parent/subscription" className="bg-green-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">💳</span>
            <div>
              <div className="font-semibold">Subscription</div>
              <div className="text-sm text-gray-600">Manage your plan</div>
            </div>
          </Link>
          
          <Link to="/kids/home" className="bg-purple-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">🏠</span>
            <div>
              <div className="font-semibold">Go to Children Mode</div>
              <div className="text-sm text-gray-600">Enter learning apps</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <Link to="/kids/home" className="flex flex-col items-center text-gray-400">
            <span className="text-2xl">🏠</span>
            <span className="text-xs">Kids Home</span>
          </Link>
          <button className="flex flex-col items-center text-secondary">
            <span className="text-2xl">👨‍👩‍👧</span>
            <span className="text-xs">Parent</span>
          </button>
          <Link to="/parent/settings" className="flex flex-col items-center text-gray-400">
            <span className="text-2xl">⚙️</span>
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;