import React, { useEffect, useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { useAuth } from '../../contexts/AuthContext';
import { calculateCategoryScores, calculateTotalScore, WIN_LOSE_THRESHOLDS } from '../../data/gameData';
import { saveGameResult } from '../../firebase/firestore';
import Button from '../common/Button';
import Card from '../common/Card';

const GameLoss = () => {
  const { userAnswers, resetGame } = useGame();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const categoryScores = calculateCategoryScores(userAnswers);
  const totalScore = calculateTotalScore(userAnswers);

  // Save results for losing players
  const saveResults = React.useCallback(async () => {
    if (!user || saving || saved) return;
    
    setSaving(true);
    try {
      await saveGameResult(user.uid, {
        userAnswers,
        totalScore: totalScore,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        completedAt: new Date(),
        gameWon: false,  // Player lost
        categoryScores: categoryScores
      });
      setSaved(true);
    } catch (error) {
      console.error('Error saving results:', error);
    } finally {
      setSaving(false);
    }
  }, [user, saving, saved, userAnswers, totalScore, categoryScores]);

  // Auto-save results when component mounts
  useEffect(() => {
    saveResults();
  }, [saveResults]);

  const getFailureReason = () => {
    const reasons = [];
    
    if (categoryScores.environment < WIN_LOSE_THRESHOLDS.minCategoryScore) {
      reasons.push(`Environment score too low (${categoryScores.environment} < ${WIN_LOSE_THRESHOLDS.minCategoryScore})`);
    }
    if (categoryScores.society < WIN_LOSE_THRESHOLDS.minCategoryScore) {
      reasons.push(`Society score too low (${categoryScores.society} < ${WIN_LOSE_THRESHOLDS.minCategoryScore})`);
    }
    if (categoryScores.timeMoney < WIN_LOSE_THRESHOLDS.minCategoryScore) {
      reasons.push(`Time/Money score too low (${categoryScores.timeMoney} < ${WIN_LOSE_THRESHOLDS.minCategoryScore})`);
    }
    if (totalScore < WIN_LOSE_THRESHOLDS.minTotalScore) {
      reasons.push(`Total score too low (${totalScore.toFixed(1)} < ${WIN_LOSE_THRESHOLDS.minTotalScore})`);
    }
    
    return reasons;
  };

  const failureReasons = getFailureReason();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Loss Card */}
        <Card className="text-center mb-8" padding="large">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Game Over - You Lost!
          </h1>
          
          <div className="mb-6">
            <div className="text-4xl font-bold mb-2 text-red-600">
              {totalScore.toFixed(1)}
            </div>
            <div className="text-gray-600 text-lg">
              Final Score
            </div>
          </div>

          <div className="text-lg text-gray-700 mb-6">
            Your sustainability choices led to critical consequences. 
            The environment and society couldn't withstand the impact of your decisions.
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Reasons for Game Loss:
            </h3>
            <ul className="text-left text-red-700">
              {failureReasons.map((reason, index) => (
                <li key={index} className="mb-1">• {reason}</li>
              ))}
            </ul>
          </div>

          {saving && (
            <div className="text-blue-600 mb-4">
              💾 Saving your results...
            </div>
          )}

          {saved && (
            <div className="text-green-600 mb-4">
              ✅ Results saved for analysis!
            </div>
          )}
        </Card>

        {/* Score Breakdown */}
        <Card className="mb-8" padding="large">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Final Score Breakdown
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-red-800 mb-1">Environment</h3>
              <div className={`text-2xl font-bold mb-1 ${
                categoryScores.environment < WIN_LOSE_THRESHOLDS.minCategoryScore ? 'text-red-600' : 'text-green-600'
              }`}>
                {categoryScores.environment}/50
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    categoryScores.environment < WIN_LOSE_THRESHOLDS.minCategoryScore ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.max(0, (categoryScores.environment / 50) * 100)}%` }}
                />
              </div>
              {categoryScores.environment < WIN_LOSE_THRESHOLDS.minCategoryScore && (
                <div className="text-red-600 text-xs mt-1">Critical Level!</div>
              )}
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-red-800 mb-1">Society</h3>
              <div className={`text-2xl font-bold mb-1 ${
                categoryScores.society < WIN_LOSE_THRESHOLDS.minCategoryScore ? 'text-red-600' : 'text-blue-600'
              }`}>
                {categoryScores.society}/50
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    categoryScores.society < WIN_LOSE_THRESHOLDS.minCategoryScore ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.max(0, (categoryScores.society / 50) * 100)}%` }}
                />
              </div>
              {categoryScores.society < WIN_LOSE_THRESHOLDS.minCategoryScore && (
                <div className="text-red-600 text-xs mt-1">Critical Level!</div>
              )}
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold text-red-800 mb-1">Time/Money</h3>
              <div className={`text-2xl font-bold mb-1 ${
                categoryScores.timeMoney < WIN_LOSE_THRESHOLDS.minCategoryScore ? 'text-red-600' : 'text-purple-600'
              }`}>
                {categoryScores.timeMoney}/50
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    categoryScores.timeMoney < WIN_LOSE_THRESHOLDS.minCategoryScore ? 'bg-red-500' : 'bg-purple-500'
                  }`}
                  style={{ width: `${Math.max(0, (categoryScores.timeMoney / 50) * 100)}%` }}
                />
              </div>
              {categoryScores.timeMoney < WIN_LOSE_THRESHOLDS.minCategoryScore && (
                <div className="text-red-600 text-xs mt-1">Critical Level!</div>
              )}
            </div>
          </div>
        </Card>

        {/* Learning Message */}
        <Card className="mb-8" padding="large">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            🌱 Learning Opportunity
          </h2>
          <div className="text-gray-700 space-y-3">
            <p>
              Sustainability is about balance. Every choice has consequences for our environment, 
              society, and economic well-being. Small actions compound over time.
            </p>
            <p>
              <strong>Key Lessons:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Proper waste segregation prevents environmental contamination</li>
              <li>Community responsibility builds social trust and cooperation</li>
              <li>Long-term thinking often saves money and resources</li>
              <li>Every individual action contributes to collective impact</li>
            </ul>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="text-center">
          <Button
            onClick={resetGame}
            size="large"
            className="px-8"
          >
            🔄 Try Again
          </Button>
          
          <p className="text-gray-600 text-sm mt-4 max-w-md mx-auto">
            Learn from your choices and make more sustainable decisions in your next attempt!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameLoss;