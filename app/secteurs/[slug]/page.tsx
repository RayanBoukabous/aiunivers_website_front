'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Navbar from '../../components/Navbar';
import ParticleBackground from '../../components/ParticleBackground';
import GradientOrb from '../../components/GradientOrb';
import SolutionCard from '../../components/SolutionCard';
import Footer from '../../components/Footer';
import { getSectorBySlug } from '../../data/sectors';
import Link from 'next/link';
import { useEffect } from 'react';

export default function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const sector = getSectorBySlug(slug);

  useEffect(() => {
    if (!sector) {
      router.push('/#sectors');
    }
  }, [sector, router]);

  if (!sector) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <GradientOrb />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm flex-wrap">
              <Link
                href="/"
                className={`transition-colors duration-300 hover:text-emerald-400 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {t('nav.home')}
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>
                /
              </span>
              <Link
                href="/#sectors"
                className={`transition-colors duration-300 hover:text-emerald-400 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {t('home.sectors')}
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>
                /
              </span>
              <span
                className={theme === 'dark' ? 'text-white' : 'text-black'}
              >
                {sector.title}
              </span>
            </nav>
          </motion.div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border text-emerald-400 shadow-lg shadow-emerald-500/30 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-emerald-500/30 bg-emerald-500/10'
                    : 'border-emerald-500/20 bg-emerald-500/5'
                }`}
              >
                <div className="h-8 w-8 text-current">{sector.icon}</div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight px-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {sector.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed px-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {sector.fullDescription}
            </motion.p>
          </motion.div>

          {/* Solutions Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8 sm:mb-12"
          >
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center px-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {t('sectors.solutions')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {sector.solutions.map((solution, index) => (
                <SolutionCard
                  key={solution.title}
                  title={solution.title}
                  description={solution.description}
                  icon={solution.icon}
                  delay={index * 0.1}
                  slug={solution.slug}
                  sectorSlug={sector.slug}
                  image={solution.image}
                />
              ))}
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/#sectors">
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-emerald-400/60'
                    : 'bg-black/5 border border-black/10 text-black hover:bg-black/10 hover:border-emerald-400/60'
                }`}
              >
                {t('sectors.back')}
              </button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
