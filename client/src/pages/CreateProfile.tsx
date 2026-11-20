import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

interface CreateProfileData {
  nickname: string;
  ageGroup: '0-3' | '3-6' | '6-9';
  language: 'en' | 'hi';
  avatar: string;
  dailyScreenTimeMinutes: number;
}

const PROFILE_TYPES = [
  { id: 'bear', name: 'Smiley Bear', color: 'bg-yellow-400' },
  { id: 'lion', name: 'Roary Lion', color: 'bg-orange-400' },
  { id: 'elephant', name: 'Ellie Elephant', color: 'bg-gray-400' },
  { id: 'rabbit', name: 'Bunny Rabbit', color: 'bg-pink-300' },
  { id: 'penguin', name: 'Pip Penguin', color: 'bg-blue-300' },
];

const createProfile = async (data: CreateProfileData): Promise<void> => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create profile');
  }
};

const CreateProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [ageGroup, setAgeGroup] = useState<'0-3' | '3-6' | '6-9'>('3-6');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedAvatar, setSelectedAvatar] = useState('bear');

  const mutation = useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      navigate('/kids/home');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      nickname,
      ageGroup,
      language,
      avatar: selectedAvatar,
      dailyScreenTimeMinutes: ageGroup === '0-3' ? 30 : ageGroup === '3-6' ? 60 : 90,
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-green-50 p-4">
      <div className="text-3xl font-bold text-primary mb-6">
        🎨 Create Your Profile
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Child's Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value as any)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        >
          <option value="0-3">Ages 0-3: Early Learning</option>
          <option value="3-6">Ages 3-6: Foundation Skills</option>
          <option value="6-9">Ages 6-9: Advanced Learning</option>
        </select>
        
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
        </select>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Choose an Avatar</label>
          <div className="grid grid-cols-5 gap-2">
            {PROFILE_TYPES.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`w-12 h-12 rounded-full ${avatar.color} border-2 ${selectedAvatar === avatar.id ? 'border-primary' : 'border-white'} flex items-center justify-center`}
              >
                <span className="text-2xl">{avatar.name === 'Smiley Bear' ? '🐻' : avatar.name === 'Roary Lion' ? '🦁' : avatar.name === 'Ellie Elephant' ? '🐘' : avatar.name === 'Bunny Rabbit' ? '🐰' : '🐧'}</span>
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
        >
          {mutation.isPending ? 'Creating Profile...' : 'Create Profile'}
        </button>
        
        {mutation.isError && (
          <div className="text-center text-red-500 text-sm">
            {mutation.error instanceof Error ? mutation.error.message : 'Failed to create profile'}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProfileScreen;