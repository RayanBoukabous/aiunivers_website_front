'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useLanguage } from '../../../../contexts/LanguageContext';
import Navbar from '../../../../components/Navbar';
import ParticleBackground from '../../../../components/ParticleBackground';
import GradientOrb from '../../../../components/GradientOrb';
import Footer from '../../../../components/Footer';
import { getSolutionBySlug, getSectorBySlug } from '../../../../data/sectors';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string; solutionSlug: string }>;
}) {
  const { slug, solutionSlug } = use(params);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const solution = getSolutionBySlug(slug, solutionSlug);
  const sector = getSectorBySlug(slug);

  useEffect(() => {
    if (!solution || !sector) {
      router.push(`/secteurs/${slug}`);
    }
  }, [solution, sector, router, slug]);

  if (!solution || !sector) {
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
              <Link
                href={`/secteurs/${slug}`}
                className={`transition-colors duration-300 hover:text-emerald-400 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {sector.title}
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>
                /
              </span>
              <span
                className={theme === 'dark' ? 'text-white' : 'text-black'}
              >
                {solution.title}
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
                <div className="h-8 w-8 text-current">{solution.icon}</div>
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
              {solution.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed px-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {solution.fullDescription}
            </motion.p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-12 sm:mb-16"
          >
            <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/10 to-transparent opacity-70 mix-blend-soft-light dark:from-black/60 dark:via-black/40 dark:to-transparent pointer-events-none" />
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-full object-cover brightness-95 grayscale-[0.2] dark:brightness-75 dark:grayscale"
              />
            </div>
          </motion.div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            {/* Avantages */}
            {solution.advantages && solution.advantages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Card
                  className={`h-full ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/[0.02]'
                      : 'border-black/5 bg-white'
                  }`}
                >
                  <CardHeader>
                    <CardTitle
                      className={theme === 'dark' ? 'text-white' : 'text-black'}
                    >
                      Avantages Clés
                    </CardTitle>
                    <CardDescription>
                      Les bénéfices principaux de cette solution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 sm:space-y-4">
                      {solution.advantages.map((advantage, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div
                            className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mt-0.5 ${
                              theme === 'dark'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-emerald-500/10 text-emerald-600'
                            }`}
                          >
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span
                            className={`flex-1 text-sm sm:text-base transition-colors duration-300 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {advantage}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Clients Visés */}
            {solution.targetClients && solution.targetClients.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Card
                  className={`h-full ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/[0.02]'
                      : 'border-black/5 bg-white'
                  }`}
                >
                  <CardHeader>
                    <CardTitle
                      className={theme === 'dark' ? 'text-white' : 'text-black'}
                    >
                      {t('solutions.clients')}
                    </CardTitle>
                    <CardDescription>
                      {t('solutions.clients.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {solution.targetClients.map((client, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                              theme === 'dark'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-emerald-500/10 text-emerald-600'
                            }`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                          <span
                            className={`flex-1 transition-colors duration-300 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {client}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Features and Use Cases Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            {/* Fonctionnalités */}
            {solution.features && solution.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Card
                  className={`h-full ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/[0.02]'
                      : 'border-black/5 bg-white'
                  }`}
                >
                  <CardHeader>
                    <CardTitle
                      className={theme === 'dark' ? 'text-white' : 'text-black'}
                    >
                      {t('solutions.features')}
                    </CardTitle>
                    <CardDescription>
                      {t('solutions.features.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {solution.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                          className={`flex items-center gap-2 p-2 sm:p-3 rounded-lg ${
                            theme === 'dark'
                              ? 'bg-white/5 border border-white/5'
                              : 'bg-black/5 border border-black/5'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
                              theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'
                            }`}
                          />
                          <span
                            className={`text-xs sm:text-sm transition-colors duration-300 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Cas d'Usage */}
            {solution.useCases && solution.useCases.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Card
                  className={`h-full ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/[0.02]'
                      : 'border-black/5 bg-white'
                  }`}
                >
                  <CardHeader>
                    <CardTitle
                      className={theme === 'dark' ? 'text-white' : 'text-black'}
                    >
                      {t('solutions.usecases')}
                    </CardTitle>
                    <CardDescription>
                      {t('solutions.usecases.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {solution.useCases.map((useCase, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                          className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 ${
                            theme === 'dark'
                              ? 'border-white/10 bg-white/5 hover:border-emerald-400/30'
                              : 'border-black/10 bg-black/5 hover:border-emerald-400/30'
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                              theme === 'dark'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-emerald-500/10 text-emerald-600'
                            }`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                          </div>
                          <span
                            className={`flex-1 transition-colors duration-300 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {useCase}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Media Section */}
          {solution.media && solution.media.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mb-16"
            >
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center px-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                {t('solutions.demos')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {solution.media.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="relative rounded-xl overflow-hidden"
                  >
                    {item.type === 'video' ? (
                      <div className="relative w-full aspect-video bg-black/10 rounded-xl overflow-hidden">
                        <video
                          src={item.url}
                          controls
                          className="w-full h-full object-cover"
                          poster={item.thumbnail}
                        >
                          Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
                        <img
                          src={item.url}
                          alt={item.title || solution.title}
                          className="w-full h-full object-cover"
                        />
                        {item.title && (
                          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <p
                              className={`text-sm font-medium transition-colors duration-300 ${
                                theme === 'dark' ? 'text-white' : 'text-black'
                              }`}
                            >
                              {item.title}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="text-center mb-12"
          >
            <Card
              className={`${
                theme === 'dark'
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-emerald-500/20 bg-emerald-500/5'
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={theme === 'dark' ? 'text-white' : 'text-black'}
                >
                  Intéressé par cette solution ?
                </CardTitle>
                <CardDescription>
                  Contactez-nous pour discuter de vos besoins spécifiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact">
                  <button
                    className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:from-emerald-500 hover:to-emerald-400'
                        : 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:from-emerald-500 hover:to-emerald-400'
                    }`}
                  >
                    Demander un devis
                  </button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex justify-center"
          >
            <Link href={`/secteurs/${slug}`}>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-emerald-400/60'
                    : 'bg-black/5 border border-black/10 text-black hover:bg-black/10 hover:border-emerald-400/60'
                }`}
              >
                {t('solutions.back')}
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
