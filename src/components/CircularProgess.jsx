import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';

const CircularProgress = ({
  value = 0,
  size = 120,
  strokeWidth = 10,
  ringColor = "stroke-gray-200",
  progressColor = "stroke-blue-500",
  textColor = "text-gray-700"
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const controls = animate(animatedValue, value, {
    
      duration: 0.1, 
      ease: "easeInOut",
      onUpdate: (latestValue) => {
        setAnimatedValue(parseFloat(latestValue.toFixed(2)));
      }
    });

    return () => controls.stop();
  }, [value, animatedValue]);

  return (
    <div
      className="relative inline-block transition-transform duration-300 ease-out shadow-md rounded-full hover:scale-105"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          className={ringColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
        />
        
        <motion.circle
          className={progressColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={center}
          cy={center}
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: circumference * (1 - value / 100) }}
        
          transition={{ duration: 0.1, ease: "easeInOut" }} 
          initial={{ strokeDashoffset: circumference }}
        />
      </svg>

    
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <span className={`text-2xl font-bold ${textColor}`}>
          {animatedValue}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;