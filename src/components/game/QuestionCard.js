import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { gameScenarios } from '../../data/gameData';
import Button from '../common/Button';
import Card from '../common/Card';
import Timer from '../common/Timer';
import ProgressBar from '../common/ProgressBar';

const QuestionCard = () => {
  const {
    currentScenarioIndex,
    userAnswers,
    timeRemaining,
    answerScenario,
    nextScenario,
    updateTime,
    timeUp
  } = useGame();

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [canProceed, setCanProceed] = useState(false);

  const currentScenario = gameScenarios[currentScenarioIndex];

  const handleTimeUp = React.useCallback(() => {
    if (!selectedAnswer) {
      // Auto-select first option if no answer was given
      const firstOptionId = currentScenario.options[0].id;
      answerScenario(currentScenario.id, firstOptionId);
    }
    timeUp();
  }, [selectedAnswer, currentScenario, answerScenario, timeUp]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        updateTime();
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
  }, [timeRemaining, updateTime, handleTimeUp]);

  // Check if answer was already given for this scenario
  useEffect(() => {
    const existingAnswer = userAnswers[currentScenario?.id];
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer);
      setCanProceed(true);
    } else {
      setSelectedAnswer('');
      setCanProceed(false);
    }
  }, [currentScenario?.id, userAnswers]);

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
    answerScenario(currentScenario.id, optionId);
    setCanProceed(true);
  };

  const handleNext = () => {
    if (canProceed) {
      nextScenario();
      setSelectedAnswer('');
      setCanProceed(false);
    }
  };

  if (!currentScenario) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress and Timer */}
        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <ProgressBar 
            current={currentScenarioIndex + 1} 
            total={gameScenarios.length} 
          />
          <Timer 
            timeRemaining={timeRemaining}
            totalTime={currentScenario.timeLimit}
            onTimeUp={handleTimeUp}
          />
        </div>

        {/* Scenario Card */}
        <Card className="mb-6" padding="large">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {currentScenario.title}
          </h2>
          
          {/* Scenario Image */}
          <div className="mb-6">
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={currentScenario.image} 
                alt={`Scenario: ${currentScenario.title}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full flex items-center justify-center text-center" style={{display: 'none'}}>
                <div>
                  <span className="text-4xl mb-2 block">🏠</span>
                  <p className="text-gray-600">Scenario Illustration</p>
                  <p className="text-sm text-gray-500">{currentScenario.title}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            {currentScenario.description}
          </p>
        </Card>

        {/* Options */}
        <div className="space-y-4 mb-6">
          {currentScenario.options.map((option, index) => (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedAnswer === option.id 
                  ? 'ring-2 ring-primary-500 bg-primary-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleAnswerSelect(option.id)}
              padding="medium"
            >
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                  selectedAnswer === option.id
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    {option.text}
                  </p>
                  {selectedAnswer === option.id && (
                    <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <span className="block text-green-600 font-semibold">
                          Environment
                        </span>
                        <span className="text-green-700">
                          {option.scores.environment}/50
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="block text-blue-600 font-semibold">
                          Society
                        </span>
                        <span className="text-blue-700">
                          {option.scores.society}/50
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="block text-purple-600 font-semibold">
                          Time/Money
                        </span>
                        <span className="text-purple-700">
                          {option.scores.timeMoney}/50
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Next Button */}
        <div className="text-center">
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            size="large"
            className="px-8"
          >
            {currentScenarioIndex === gameScenarios.length - 1 ? 'Finish Game' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;