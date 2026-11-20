import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  durationDays: number;
  isPopular?: boolean;
}

const SubscriptionScreen: React.FC = () => {
  const navigate = useNavigate();

  const plans: Plan[] = [
    { id: 'free', name: 'Free Plan', price: 0, currency: 'INR', isPopular: false },
    { id: 'monthly', name: 'Monthly Premium', price: 199, currency: 'INR', durationDays: 30, isPopular: true },
    { id: 'annual', name: 'Annual Premium', price: 1999, currency: 'INR', durationDays: 365 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <button onClick={() => navigate(-1)} className="text-2xl mb-2">←</button>
        <h1 className="text-2xl font-bold">💳 Subscription</h1>
      </div>

      {/* Current Status */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 shadow mb-6">
          <h2 className="text-lg font-bold mb-2">Your Current Plan</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <div className="font-medium">Premium Monthly</div>
              <div className="text-sm text-gray-600">Renews on Dec 15, 2024</div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-bold mb-3">Available Plans</h2>
        <div className="space-y-3">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-4 shadow border-2 ${plan.isPopular ? 'border-primary' : 'border-gray-100'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">{plan.name}</h3>
                {plan.isPopular && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Popular</span>
                )}
              </div>
              <div className="text-3xl font-bold mb-2">
                {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                {plan.durationDays > 0 && plan.price > 0 && (
                  <span className="text-base font-normal text-gray-500">/yr</span>
                )}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {plan.durationDays > 0 ? `Renews every ${plan.durationDays} days` : 'No subscription required'}
              </div>
              <button
                className={`w-full py-3 rounded-full font-medium ${
                  plan.price === 0 
                    ? 'bg-gray-200 text-gray-700' 
                    : 'bg-secondary text-white hover:shadow-lg transition-shadow'
                }`}
              >
                {plan.price === 0 ? 'Get Free Plan' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="px-4">
        <h2 className="text-lg font-bold mb-3">Payment History</h2>
        <div className="bg-white rounded-2xl p-4 shadow">
          <div className="text-center text-gray-500 py-4">
            No payment history yet
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;