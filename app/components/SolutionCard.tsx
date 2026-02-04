/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ReactNode } from 'react';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  slug: string;
  sectorSlug: string;
  image: string;
}

export default function SolutionCard({
  title,
  description,
  icon,
  delay = 0,
  slug,
  sectorSlug,
  image,
}: SolutionCardProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group h-full"
    >
      <Link href={`/secteurs/${sectorSlug}/solutions/${slug}`}>
        <Card
          className={`relative mx-auto w-full h-full flex flex-col overflow-hidden border transition-all duration-500 cursor-pointer ${
            theme === 'dark'
              ? 'border-white/10 bg-white/[0.02] hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.28)]'
              : 'border-black/5 bg-white hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.22)]'
          }`}
        >
          {/* Image */}
          <div className="relative w-full aspect-video overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/10 to-transparent opacity-70 mix-blend-soft-light dark:from-black/60 dark:via-black/40 dark:to-transparent pointer-events-none" />
            <img
              src={image}
              alt={title}
              className="relative z-20 w-full h-full object-cover brightness-95 grayscale-[0.2] dark:brightness-75 dark:grayscale transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <CardHeader className="flex-1 flex flex-col relative z-30 px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
            <div
              className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border text-emerald-400 shadow-sm shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${
                theme === 'dark'
                  ? 'border-emerald-500/30 bg-emerald-500/10'
                  : 'border-emerald-500/20 bg-emerald-500/5'
              }`}
            >
              <div className="h-5 w-5 sm:h-6 sm:w-6 text-current">{icon}</div>
            </div>
          </div>

          <CardTitle
            className={`mb-2 sm:mb-3 text-lg sm:text-xl ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {title}
          </CardTitle>
          <CardDescription
            className={`text-sm sm:text-base line-clamp-3 sm:line-clamp-4 ${
              theme === 'dark'
                ? 'text-gray-300/80'
                : 'text-gray-600'
            }`}
          >
            {description}
          </CardDescription>
        </CardHeader>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: delay + 0.2,
            ease: 'easeOut',
          }}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] origin-center bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
        />
        </Card>
      </Link>
    </motion.div>
  );
}
