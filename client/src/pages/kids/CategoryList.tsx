import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch('/api/categories');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

const CategoryList: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-lg">Loading learning categories...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <div className="text-lg text-red-600">Failed to load categories</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <h1 className="text-2xl font-bold">📚 Learning Categories</h1>
      </div>

      {/* Categories Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {categories?.map((category) => (
            <Link
              key={category.id}
              to={`/kids/categories/${category.slug}`}
              className="bg-white rounded-2xl p-4 shadow-lg items-center justify-center text-center"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-medium text-sm">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <Link to="/kids/home" className="flex flex-col items-center text-secondary">
            <span className="text-2xl">🏠</span>
            <span className="text-xs">Home</span>
          </Link>
          <button className="flex flex-col items-center text-primary">
            <span className="text-2xl">📚</span>
            <span className="text-xs">Categories</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Link to="/kids/games" className="flex flex-col items-center">
              <span className="text-2xl">🎮</span>
              <span className="text-xs">Games</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;