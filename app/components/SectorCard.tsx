/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ReactNode } from 'react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SectorCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  slug: string;
}

export default function SectorCard({
  title,
  description,
  icon,
  delay = 0,
  slug,
}: SectorCardProps) {
  const { theme } = useTheme();

  const imageSrc = '/logo/aiunivers.png';

  const badgeLabel =
    title === 'Intelligence Artificielle'
      ? 'AI & Data'
      : title === 'Télécommunications'
      ? 'Telecom & Réseaux'
      : title === 'Applications Web & Mobile'
      ? 'Digital Experience'
      : title === 'LMS & E-Learning'
      ? 'EdTech'
      : 'Cyber Défense';

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
      <Card
        className={`relative mx-auto w-full max-w-sm h-full flex flex-col overflow-hidden border transition-all duration-500 ${
          theme === 'dark'
            ? 'border-white/10 bg-white/[0.02] hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.28)]'
            : 'border-black/5 bg-white hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.22)]'
        }`}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/10 to-transparent opacity-70 mix-blend-soft-light dark:from-black/60 dark:via-black/40 dark:to-transparent pointer-events-none" />
        <img
          src={imageSrc}
          alt={title}
          className="relative z-20 aspect-video w-full object-cover brightness-95 grayscale-[0.2] dark:brightness-75 dark:grayscale pointer-events-none"
        />

        <CardHeader className="flex-1 flex flex-col relative z-30">
          <div className="mb-3 flex items-start justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border text-emerald-400 shadow-sm shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${
                  theme === 'dark'
                    ? 'border-emerald-500/30 bg-emerald-500/10'
                    : 'border-emerald-500/20 bg-emerald-500/5'
                }`}
              >
                <div className="h-5 w-5 sm:h-6 sm:w-6 text-current">{icon}</div>
              </div>
            </div>
            <CardAction>
              <Badge variant="secondary" className="text-xs">{badgeLabel}</Badge>
            </CardAction>
          </div>

          <CardTitle
            className={`text-lg sm:text-xl ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {title}
          </CardTitle>
          <CardDescription
            className={`text-sm sm:text-base line-clamp-3 ${
              theme === 'dark'
                ? 'text-gray-300/80'
                : 'text-gray-600'
            }`}
          >
            {description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="mt-auto relative z-30 px-4 sm:px-6 pb-4 sm:pb-6">
          <Link
            href={`/secteurs/${slug}`}
            className="w-full inline-flex items-center justify-center h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm rounded-full font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:from-emerald-500 hover:to-emerald-400 hover:shadow-[0_0_40px_rgba(5,150,105,0.5)]"
          >
            En savoir plus
          </Link>
        </CardFooter>

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
    </motion.div>
  );
}
