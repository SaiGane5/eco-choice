import React, { useEffect, useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { useAuth } from '../../contexts/AuthContext';
import { calculateTotalScore, gameScenarios, scoreWeights } from '../../data/gameData';
import { saveGameResult } from '../../firebase/firestore';
import Button from '../common/Button';
import Card from '../common/Card';

const GameResults = () => {
  const { userAnswers, totalScore, setTotalScore, resetGame } = useGame();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const score = calculateTotalScore(userAnswers);
    setTotalScore(score);
    
    // Auto-save results
    saveResults(score);
  }, [userAnswers, setTotalScore]);

  const saveResults = async (score) => {
    if (!user || saving || saved) return;
    
    setSaving(true);
    try {
      await saveGameResult(user.uid, {
        userAnswers,
        totalScore: score,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        completedAt: new Date()
      });
      setSaved(true);
    } catch (error) {
      console.error('Error saving results:', error);
    } finally {
      setSaving(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 40) return 'text-green-600';
    if (score >= 30) return 'text-yellow-600';
    if (score >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 40) return '🌟 Excellent! You\'re an eco-champion!';
    if (score >= 30) return '👍 Great job! You make sustainable choices!';
    if (score >= 20) return '📈 Good effort! Room for improvement!';
    return '🌱 Keep learning about sustainability!';
  };

  const calculateCategoryScores = () => {
    let totalEnvironment = 0;
    let totalSociety = 0;
    let totalTimeMoney = 0;
    let answeredScenarios = 0;

    gameScenarios.forEach(scenario => {
      const userAnswer = userAnswers[scenario.id];
      if (userAnswer) {
        const selectedOption = scenario.options.find(option => option.id === userAnswer);
        if (selectedOption) {
          totalEnvironment += selectedOption.scores.environment;
          totalSociety += selectedOption.scores.society;
          totalTimeMoney += selectedOption.scores.timeMoney;
          answeredScenarios++;
        }
      }
    });

    return {
      environment: answeredScenarios > 0 ? Math.round(totalEnvironment / answeredScenarios) : 0,
      society: answeredScenarios > 0 ? Math.round(totalSociety / answeredScenarios) : 0,
      timeMoney: answeredScenarios > 0 ? Math.round(totalTimeMoney / answeredScenarios) : 0
    };
  };

  const categoryScores = calculateCategoryScores();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Results Card */}
        <Card className="text-center mb-8" padding="large">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Game Complete!
          </h1>
          
          <div className="mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(totalScore)}`}>
              {totalScore.toFixed(1)}
            </div>
            <div className="text-gray-600 text-lg">
              Final Score
            </div>
            <div className="text-lg font-medium text-gray-700 mt-2">
              {getScoreMessage(totalScore)}
            </div>
          </div>

          {saving && (
            <div className="text-blue-600 mb-4">
              💾 Saving your results...
            </div>
          )}

          {saved && (
            <div className="text-green-600 mb-4">
              ✅ Results saved to leaderboard!
            </div>
          )}
        </Card>

        {/* Category Breakdown */}
        <Card className="mb-8" padding="large">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Score Breakdown
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-1">Environment</h3>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {categoryScores.environment}/50
              </div>
              <div className="text-sm text-gray-600">
                Weight: {Math.round(scoreWeights.environment * 100)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(categoryScores.environment / 50) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-blue-800 mb-1">Society</h3>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {categoryScores.society}/50
              </div>
              <div className="text-sm text-gray-600">
                Weight: {Math.round(scoreWeights.society * 100)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(categoryScores.society / 50) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold text-purple-800 mb-1">Time/Money</h3>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {categoryScores.timeMoney}/50
              </div>
              <div className="text-sm text-gray-600">
                Weight: {Math.round(scoreWeights.timeMoney * 100)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(categoryScores.timeMoney / 50) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Answers */}
        <Card className="mb-8" padding="large">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Your Choices
          </h2>
          
          <div className="space-y-4">
            {gameScenarios.map((scenario, index) => {
              const userAnswer = userAnswers[scenario.id];
              const selectedOption = scenario.options.find(option => option.id === userAnswer);
              
              return (
                <div key={scenario.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {index + 1}. {scenario.title}
                  </h3>
                  
                  {selectedOption ? (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 mb-2">
                        <strong>Your choice:</strong> {selectedOption.text}
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span className="text-green-600">
                          🌍 Environment: {selectedOption.scores.environment}
                        </span>
                        <span className="text-blue-600">
                          👥 Society: {selectedOption.scores.society}
                        </span>
                        <span className="text-purple-600">
                          ⏰ Time/Money: {selectedOption.scores.timeMoney}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No answer provided</p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={resetGame}
              variant="outline"
              size="large"
            >
              🔄 Play Again
            </Button>
            
            <Button
              onClick={() => window.location.href = '/leaderboard'}
              size="large"
            >
              🏆 View Leaderboard
            </Button>
          </div>
          
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Share your results and challenge your friends to beat your score! 
            Every sustainable choice makes a difference in the real world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameResults;