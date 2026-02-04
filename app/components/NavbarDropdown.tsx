'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { sectorsData, Sector } from '../data/sectors';

interface NavbarDropdownProps {
  label: string;
  items: Sector[];
  onItemClick?: () => void;
}

export default function NavbarDropdown({ label, items, onItemClick }: NavbarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative px-4 py-2 text-sm lg:text-base font-medium transition-colors duration-200 ${
          theme === 'dark'
            ? 'text-gray-400 hover:text-white'
            : 'text-gray-600 hover:text-black'
        }`}
      >
        <span className="relative flex items-center gap-2">
          {label}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>

        {/* Simple underline */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 transition-all duration-200 ${
            isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={`absolute top-full left-0 mt-2 w-72 sm:w-80 rounded-xl shadow-2xl overflow-hidden ${
              theme === 'dark'
                ? 'backdrop-blur-2xl bg-black/80 border border-white/10'
                : 'backdrop-blur-2xl bg-white/80 border border-black/10'
            }`}
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            {/* Gradient line on top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="relative z-10 p-2">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/secteurs/${item.slug}`}
                  onClick={() => {
                    setIsOpen(false);
                    onItemClick?.();
                  }}
                >
                  <div
                    className={`group relative p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                      theme === 'dark'
                        ? 'hover:bg-white/5'
                        : 'hover:bg-black/5'
                    }`}
                  >
                    {/* Icon and Title */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          theme === 'dark'
                            ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500/20'
                        }`}
                      >
                        <div className="w-5 h-5">{item.icon}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold text-sm mb-1 ${
                            theme === 'dark' ? 'text-white' : 'text-black'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`text-xs line-clamp-2 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
