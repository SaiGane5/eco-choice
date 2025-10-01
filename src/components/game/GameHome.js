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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              🌱 EcoChoice Game
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.displayName || 'Player'}!
              </span>
              <Button variant="outline" size="small" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your environmental decision-making skills through 5 real-life scenarios. 
            Each choice impacts the environment, society, and resource efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">5 Scenarios</h3>
              <p className="text-gray-600">
                Face real-life situations from dorm cleanups to grocery shopping decisions.
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">2 Minutes per Question</h3>
              <p className="text-gray-600">
                Think fast! You have limited time to make each decision.
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Leaderboard</h3>
              <p className="text-gray-600">
                Compete with players worldwide and see how you rank!
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Three Score Categories</h3>
              <p className="text-gray-600">
                Environment (40%), Society (35%), and Time/Money (25%) efficiency.
              </p>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-md mx-auto" padding="large">
            <h3 className="text-xl font-semibold mb-4">Ready to Start?</h3>
            <p className="text-gray-600 mb-6">
              Your choices matter! Each decision will be scored based on its impact on environmental sustainability, 
              social responsibility, and resource efficiency.
            </p>
            <Button 
              onClick={startGame}
              size="large"
              className="w-full"
            >
              🌍 Start Game
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GameHome;