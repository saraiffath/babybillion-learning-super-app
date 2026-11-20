import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

interface LoginData {
  email: string;
  password: string;
}

const loginUser = async (data: LoginData): Promise<{ token: string }> => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/profiles');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4">
      <div className="text-4xl font-bold text-primary mb-8">
        🔐 Welcome Back!
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
        >
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </button>
        
        {mutation.isError && (
          <div className="text-center text-red-500 text-sm">
            Invalid email or password
          </div>
        )}
      </form>
      
      <div className="mt-6">
        <Link to="/register" className="text-secondary font-semibold hover:underline">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;