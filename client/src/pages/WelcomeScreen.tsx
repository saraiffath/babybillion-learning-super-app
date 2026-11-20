import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-4">
      <div className="text-5xl font-bold text-primary mb-8">
        🎈 Welcome!
      </div>
      <div className="text-lg text-gray-600 text-center mb-12 max-w-md">
        Join millions of children learning through play!
        <br />
        <span className="text-2xl font-bold text-secondary mt-4 block">📚 Discover</span>
        <span className="text-2xl font-bold text-secondary block">🎮 Play</span>
        <span className="text-2xl font-bold text-secondary block">🌟 Grow</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/login" 
          className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="px-8 py-4 bg-secondary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;