import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-primary to-secondary p-4">
      <div className="text-4xl font-bold text-white mb-6">
        🎈 BabyBillion
      </div>
      <div className="text-lg text-white/80 text-center mb-8">
        Your Learning Adventure Starts Here!
      </div>
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
};

export default SplashScreen;