'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  useGradient?: boolean;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 100,
  delay = 0,
  className = '',
  useGradient = false,
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          
          // Cacher le curseur après un court délai
          setTimeout(() => {
            setShowCursor(false);
            if (onComplete) {
              onComplete();
            }
          }, 1000);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay, onComplete]);

  const gradientStyle = useGradient
    ? theme === 'dark'
      ? 'linear-gradient(135deg, #10b981 0%, #059669 50%, #15803d 100%)'
      : 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)'
    : null;

  return (
    <span className={className}>
      <span
        style={
          gradientStyle
            ? {
                background: gradientStyle,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }
            : {}
        }
      >
        {displayedText}
      </span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[3px] h-[0.9em] ml-1 align-middle rounded-sm"
          style={{
            backgroundColor: useGradient ? '#22c55e' : 'currentColor',
          }}
        />
      )}
    </span>
  );
}
