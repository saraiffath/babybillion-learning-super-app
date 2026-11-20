import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ChildProfile {
  id: string;
  nickname: string;
  avatar: string;
  ageGroup: string;
}

const PROFILE_AVATARS = [
  { id: 'bear', name: 'Bear', color: 'bg-yellow-400' },
  { id: 'lion', name: 'Lion', color: 'bg-orange-400' },
  { id: 'elephant', name: 'Elephant', color: 'bg-gray-400' },
  { id: 'rabbit', name: 'Rabbit', color: 'bg-pink-300' },
  { id: 'penguin', name: 'Penguin', color: 'bg-blue-300' },
];

const ProfileSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/kids/home');
  };

  const handleCreateProfile = () => {
    navigate('/profiles/create');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-50 p-4">
      <div className="text-3xl font-bold text-primary mb-8">
        👋 Hello! Who's Learning Today?
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-12">
        <button
          onClick={handleProfileClick}
          className="w-24 h-24 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 bg-yellow-400 rounded-full mb-2" />
          <span className="text-sm font-semibold">Emma</span>
        </button>
        
        <button
          onClick={handleProfileClick}
          className="w-24 h-24 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 bg-orange-400 rounded-full mb-2" />
          <span className="text-sm font-semibold">Noah</span>
        </button>
        
        <button
          onClick={handleCreateProfile}
          className="w-24 h-24 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center border-2 border-dashed border-secondary"
        >
          <div className="text-3xl">+</div>
          <span className="text-xs mt-1">Create</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSelection;