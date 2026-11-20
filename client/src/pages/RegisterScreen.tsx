import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

interface RegisterData {
  email: string;
  name: string;
  password: string;
  pin: string;
}

const registerUser = async (data: RegisterData): Promise<{ id: string; email: string; name: string }> => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Registration failed');
  }
  return response.json();
};

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate('/profiles');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, name, password, pin });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="text-4xl font-bold text-primary mb-8">
        👨‍👩‍👧‍👦 Create Account
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          minLength={8}
          required
        />
        
        <input
          type="password"
          placeholder="Parental PIN (for child mode)"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          minLength={4}
          required
        />
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
        >
          {mutation.isPending ? 'Creating account...' : 'Sign Up'}
        </button>
        
        {mutation.isError && (
          <div className="text-center text-red-500 text-sm">
            {mutation.error instanceof Error ? mutation.error.message : 'Registration failed'}
          </div>
        )}
      </form>
      
      <div className="mt-6">
        <Link to="/login" className="text-secondary font-semibold hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;