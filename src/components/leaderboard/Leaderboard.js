import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { signOutUser } from '../../firebase/auth';
import Button from '../common/Button';
import Card from '../common/Card';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboard();
      setLeaderboardData(data);
    } catch (err) {
      setError('Failed to load leaderboard');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 40) return 'text-green-600';
    if (score >= 30) return 'text-yellow-600';
    if (score >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <Card className="text-center" padding="large">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              🏆 Global Leaderboard
            </h1>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="small" 
                onClick={() => window.location.href = '/'}
              >
                🏠 Home
              </Button>
              <span className="text-sm text-gray-600">
                {user?.displayName || 'Player'}
              </span>
              <Button variant="outline" size="small" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Top Eco Champions
          </h2>
          <p className="text-gray-600">
            See how you rank among players worldwide in sustainable decision-making!
          </p>
        </div>

        {error && (
          <Card className="mb-6 bg-red-50 border-red-200" padding="medium">
            <div className="text-red-600 text-center">
              <p>{error}</p>
              <Button 
                variant="outline" 
                size="small" 
                onClick={fetchLeaderboard}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          </Card>
        )}

        {leaderboardData.length === 0 && !loading && !error && (
          <Card className="text-center" padding="large">
            <div className="text-gray-500">
              <span className="text-4xl mb-4 block">🌱</span>
              <h3 className="text-lg font-semibold mb-2">No players yet!</h3>
              <p className="mb-4">Be the first to complete the game and appear on the leaderboard.</p>
              <Button onClick={() => window.location.href = '/'}>
                Start Playing
              </Button>
            </div>
          </Card>
        )}

        {leaderboardData.length > 0 && (
          <Card padding="none">
            <div className="overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700 text-sm">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">Player</div>
                  <div className="col-span-2">Score</div>
                  <div className="col-span-2">Environment</div>
                  <div className="col-span-2">Date</div>
                </div>
              </div>

              {/* Leaderboard Entries */}
              <div className="divide-y divide-gray-200">
                {leaderboardData.map((entry, index) => {
                  const rank = index + 1;
                  const isCurrentUser = user && entry.id === user.uid;
                  
                  return (
                    <div 
                      key={entry.id} 
                      className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                        isCurrentUser ? 'bg-primary-50 border-l-4 border-primary-500' : ''
                      }`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Rank */}
                        <div className="col-span-1">
                          <span className="text-2xl">{getRankEmoji(rank)}</span>
                          <span className="ml-1 font-semibold text-gray-700">
                            #{rank}
                          </span>
                        </div>

                        {/* Player Info */}
                        <div className="col-span-5 flex items-center gap-3">
                          {entry.photoURL ? (
                            <img 
                              src={entry.photoURL} 
                              alt={entry.displayName}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 font-semibold">
                                {entry.displayName?.charAt(0) || '?'}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900">
                              {entry.displayName || 'Anonymous Player'}
                              {isCurrentUser && (
                                <span className="ml-2 text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Total Score */}
                        <div className="col-span-2">
                          <span className={`text-xl font-bold ${getScoreColor(entry.totalScore)}`}>
                            {entry.totalScore?.toFixed(1) || '0.0'}
                          </span>
                        </div>

                        {/* Category Scores */}
                        <div className="col-span-2">
                          <div className="text-sm text-gray-600">
                            <div className="flex gap-1">
                              <span>🌍</span>
                              <span>👥</span>
                              <span>⏰</span>
                            </div>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="col-span-2">
                          <span className="text-sm text-gray-500">
                            {formatDate(entry.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Current User Stats */}
        {user && leaderboardData.length > 0 && (
          <Card className="mt-6" padding="medium">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Your Standing</h3>
              {(() => {
                const userEntry = leaderboardData.find(entry => entry.id === user.uid);
                const userRank = leaderboardData.findIndex(entry => entry.id === user.uid) + 1;
                
                if (userEntry) {
                  return (
                    <div className="flex justify-center items-center gap-6">
                      <div>
                        <span className="text-sm text-gray-600">Rank</span>
                        <div className="text-lg font-bold text-primary-600">
                          #{userRank}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Score</span>
                        <div className={`text-lg font-bold ${getScoreColor(userEntry.totalScore)}`}>
                          {userEntry.totalScore?.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="text-gray-600">
                      <p>You haven't completed the game yet!</p>
                      <Button 
                        className="mt-2" 
                        size="small"
                        onClick={() => window.location.href = '/'}
                      >
                        Play Now
                      </Button>
                    </div>
                  );
                }
              })()}
            </div>
          </Card>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            onClick={fetchLeaderboard}
            disabled={loading}
          >
            🔄 Refresh Leaderboard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;