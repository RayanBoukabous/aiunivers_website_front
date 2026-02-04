'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function GradientOrb() {
  const { theme } = useTheme();

  const orbs = [
    {
      className: theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-500/8',
      position: 'top-1/4 left-1/4',
      size: 'w-96 h-96',
      animation: {
        x: [0, 100, 0],
        y: [0, 50, 0],
        scale: [1, 1.2, 1],
      },
      duration: 20,
    },
    {
      className: theme === 'dark' ? 'bg-green-500/20' : 'bg-green-500/8',
      position: 'bottom-1/4 right-1/4',
      size: 'w-[28rem] h-[28rem]',
      animation: {
        x: [0, -80, 0],
        y: [0, -60, 0],
        scale: [1, 1.15, 1],
      },
      duration: 25,
    },
    {
      className: theme === 'dark' ? 'bg-teal-500/15' : 'bg-teal-500/6',
      position: 'top-1/2 right-1/3',
      size: 'w-80 h-80',
      animation: {
        x: [0, 60, 0],
        y: [0, -80, 0],
        scale: [1, 1.25, 1],
      },
      duration: 30,
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.position} ${orb.size} ${orb.className} rounded-full blur-3xl transition-all duration-700`}
          animate={orb.animation}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
