import React from 'react';

const Timer = ({ timeRemaining, totalTime, onTimeUp }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const percentage = (timeRemaining / totalTime) * 100;
  
  // Determine color based on time remaining
  const getColorClass = () => {
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = () => {
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  React.useEffect(() => {
    if (timeRemaining === 0 && onTimeUp) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Time Remaining</span>
        <span className={`text-2xl font-bold ${getColorClass()}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${getProgressBarColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {timeRemaining <= 10 && timeRemaining > 0 && (
        <div className="mt-2 text-center">
          <span className="text-red-600 font-semibold animate-pulse">
            Hurry up! Time is running out!
          </span>
        </div>
      )}
    </div>
  );
};

export default Timer;