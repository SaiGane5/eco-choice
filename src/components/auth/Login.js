import React from 'react';
import { signInWithGoogle } from '../../firebase/auth';
import Button from '../common/Button';
import Card from '../common/Card';

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center" padding="large">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🌱 EcoChoice Game
          </h1>
          <p className="text-gray-600">
            Make sustainable choices and compete with others in environmental decision-making!
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-primary-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-primary-800 mb-2">How to Play:</h3>
            <ul className="text-sm text-primary-700 space-y-1">
              <li>• Answer 5 real-life scenarios</li>
              <li>• Each question has a 2-minute time limit</li>
              <li>• Score points for environment, society, and efficiency</li>
              <li>• Compete on the global leaderboard</li>
            </ul>
          </div>
        </div>

        <Button 
          onClick={handleGoogleSignIn}
          size="large"
          className="w-full flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          By signing in, you agree to participate in this educational game about environmental sustainability.
        </p>
      </Card>
    </div>
  );
};

export default Login;