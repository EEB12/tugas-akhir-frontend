import React from 'react';
import './progress.css'
function ProgressBar({ value, maxValue, color }) {
  const progressPercentage = (value / maxValue) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{
          width: `${progressPercentage}%`,
          backgroundColor: color
        }}
      >
        <span className="percentage">{`${progressPercentage}%`}</span>
      </div>
    </div>
  );
}

export default ProgressBar;