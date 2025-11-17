import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { useAuth } from '../../contexts/AuthContext';
import { signOutUser } from '../../firebase/auth';
import Button from '../common/Button';
import Card from '../common/Card';

const GameHome = () => {
  const { startGame } = useGame();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">EcoChoice</h1>
              <p className="text-sm text-gray-500 mt-1">Sustainable Decision Making</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600">
                {user?.displayName || 'Player'}
              </span>
              <Button 
                variant="outline" 
                size="small" 
                onClick={handleSignOut}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
            Test Your Sustainability<br />
            <span className="font-semibold">Decision Making</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Navigate through real-world scenarios and see how your choices impact 
            the environment, society, and economic efficiency.
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900 mb-2">25</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Scenarios</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900 mb-2">2:00</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Per Question</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900 mb-2">3</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Score Categories</div>
          </div>
        </div>

        {/* Scoring System */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🌍</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Environment</h4>
              <p className="text-sm text-gray-600">40% weight</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">👥</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Society</h4>
              <p className="text-sm text-gray-600">35% weight</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚡</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Money/Time</h4>
              <p className="text-sm text-gray-600">25% weight</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-md mx-auto">
            <Button 
              onClick={startGame}
              size="large"
              className="w-full py-4 text-lg font-medium bg-gray-900 hover:bg-gray-800 text-white border-gray-900"
            >
              Start Assessment
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Complete all scenarios to qualify for the global leaderboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            size="small"
            onClick={() => window.location.href = '/leaderboard'}
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            View Leaderboard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default GameHome;