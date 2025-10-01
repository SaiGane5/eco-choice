import React from 'react';

const ProgressBar = ({ current, total, className = '' }) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;