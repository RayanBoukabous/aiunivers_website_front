'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import SectorCard from './SectorCard';
import { sectorsData } from '../data/sectors';

export default function SectorsSection() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <section
      id="sectors"
      className="relative py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            theme === 'dark' ? 'opacity-[0.015]' : 'opacity-[0.01]'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
            } 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-28 flex flex-col items-center text-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
              }`}
            >
              {t('home.expertise')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight px-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {t('home.sectors')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t('home.sectors.description')}
          </motion.p>
        </motion.div>

        {/* Cards Grid - Responsive */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 justify-items-center items-stretch max-w-7xl w-full">
            {sectorsData.map((sector, index) => (
              <div key={sector.title} className="w-full max-w-md h-full flex">
                <SectorCard
                  title={sector.title}
                  description={sector.description}
                  icon={sector.icon}
                  delay={index * 0.08}
                  slug={sector.slug}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
