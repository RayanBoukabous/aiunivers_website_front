'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import ThemeToggle from './ThemeToggle';
import NavbarDropdown from './NavbarDropdown';
import LanguageSelector from './LanguageSelector';
import { sectorsData } from '../data/sectors';

// Créer un composant motion pour Link
const MotionLink = motion(Link);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isDesktop = window.innerWidth >= 768; // md breakpoint
      
      setIsScrolled(currentScrollY > 20);

      // Masquer/afficher la navbar uniquement sur desktop
      if (isDesktop) {
        if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and past 100px - hide navbar
          setIsVisible(false);
        }
      } else {
        // Toujours visible sur mobile
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: '#home', label: t('nav.home'), type: 'link' },
    { href: '#about', label: t('nav.about'), type: 'link' },
    { href: '#services', label: t('nav.services'), type: 'dropdown' },
    { href: '#solutions', label: t('nav.solutions'), type: 'dropdown' },
    { href: '/contact', label: t('nav.contact'), type: 'link' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Navbar Container */}
      <div
        className={`relative transition-all duration-700 ease-out ${
          isScrolled
            ? theme === 'dark'
              ? 'backdrop-blur-2xl bg-black/40 border-b border-white/[0.08] shadow-2xl shadow-black/20'
              : 'backdrop-blur-2xl bg-white/40 border-b border-black/[0.08] shadow-2xl shadow-black/10'
            : 'bg-transparent'
        }`}
        style={{
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        }}
      >
        {/* Animated gradient line on top */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent origin-center"
        />

        {/* Glow effect on scroll */}
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-3xl opacity-20 ${
                theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-400'
              }`}
            />
          </motion.div>
        )}

        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-24">
            {/* Logo */}
            <MotionLink
              href="/"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center group z-10"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center overflow-hidden">
                <Image
                  src={theme === 'dark' ? '/logo/aiunivers- logo- blanc.png' : '/logo/aiunivers.png'}
                  alt="AIUNIVERS"
                  fill
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                  className="object-contain object-center transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  priority
                />
              </div>
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </MotionLink>

            {/* Spacer to push everything to the right */}
            <div className="flex-1"></div>

            {/* Desktop Navigation - Right Side */}
            <div className="hidden md:flex items-center gap-2 lg:gap-6">
              {navLinks.map((link, index) => {
                // Si c'est un dropdown, afficher le composant dropdown
                if (link.type === 'dropdown') {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <NavbarDropdown
                        label={link.label}
                        items={sectorsData}
                        onItemClick={() => setHoveredLink(null)}
                      />
                    </motion.div>
                  );
                }

                // Si c'est un lien avec hash (#), rediriger vers la page d'accueil avec l'ancre
                // Sinon, utiliser Link de Next.js pour la navigation sans reload
                const isHashLink = link.href.startsWith('#');
                const linkHref = isHashLink ? `/${link.href}` : link.href;
                
                if (isHashLink) {
                  return (
                    <MotionLink
                      key={link.href}
                      href={linkHref}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onHoverStart={() => setHoveredLink(link.href)}
                      onHoverEnd={() => setHoveredLink(null)}
                      className="relative group px-4 py-2"
                    >
                      {/* Link text */}
                      <span
                        className={`relative text-sm lg:text-base font-medium transition-all duration-500 ${
                          theme === 'dark'
                            ? 'text-gray-400 group-hover:text-white'
                            : 'text-gray-600 group-hover:text-black'
                        }`}
                        style={{
                          textShadow:
                            hoveredLink === link.href
                              ? '0 0 20px rgba(16, 185, 129, 0.5)'
                              : 'none',
                        }}
                      >
                        {link.label}
                      </span>

                      {/* Animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{
                          scaleX: hoveredLink === link.href ? 1 : 0,
                          opacity: hoveredLink === link.href ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />

                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-emerald-500/10 blur-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: hoveredLink === link.href ? 1 : 0,
                          scale: hoveredLink === link.href ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </MotionLink>
                  );
                }
                
                return (
                  <MotionLink
                    key={link.href}
                    href={linkHref}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onHoverStart={() => setHoveredLink(link.href)}
                    onHoverEnd={() => setHoveredLink(null)}
                    className="relative group px-4 py-2"
                  >
                  {/* Link text */}
                  <span
                    className={`relative text-sm lg:text-base font-medium transition-all duration-500 ${
                      theme === 'dark'
                        ? 'text-gray-400 group-hover:text-white'
                        : 'text-gray-600 group-hover:text-black'
                    }`}
                    style={{
                      textShadow:
                        hoveredLink === link.href
                          ? '0 0 20px rgba(16, 185, 129, 0.5)'
                          : 'none',
                    }}
                  >
                    {link.label}
                  </span>

                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: hoveredLink === link.href ? 1 : 0,
                      opacity: hoveredLink === link.href ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-emerald-500/10 blur-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredLink === link.href ? 1 : 0,
                      scale: hoveredLink === link.href ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  </MotionLink>
                );
              })}

              {/* Separator */}
              <div
                className={`w-px h-6 mx-2 transition-colors duration-500 ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
                }`}
              />

              {/* Language Selector */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <LanguageSelector />
              </motion.div>

              {/* Separator */}
              <div
                className={`w-px h-6 mx-2 transition-colors duration-500 ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
                }`}
              />

              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ThemeToggle />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`relative p-2 rounded-lg transition-all duration-200 active:scale-95 ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white hover:bg-white/5'
                    : 'text-black/80 hover:text-black hover:bg-black/5'
                }`}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5 w-6">
                  <span
                    className={`h-0.5 rounded-full origin-center transition-all duration-200 ${
                      theme === 'dark' ? 'bg-white' : 'bg-black'
                    } ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`h-0.5 rounded-full transition-all duration-200 ${
                      theme === 'dark' ? 'bg-white' : 'bg-black'
                    } ${
                      isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                    }`}
                  />
                  <span
                    className={`h-0.5 rounded-full origin-center transition-all duration-200 ${
                      theme === 'dark' ? 'bg-white' : 'bg-black'
                    } ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden overflow-hidden backdrop-blur-2xl transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-black/60 border-b border-white/[0.08]'
              : 'bg-white/60 border-b border-black/[0.08]'
          } ${
            isMobileMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
          }`}
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <div className="px-4 py-8 space-y-2 max-w-7xl mx-auto">
            {navLinks.map((link, index) => {
              // Si c'est un dropdown, afficher les secteurs
              if (link.type === 'dropdown') {
                return (
                  <div key={link.href}>
                    <div
                      className={`text-lg font-semibold py-3 px-4 mb-2 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}
                    >
                      {link.label}
                    </div>
                    {sectorsData.map((sector) => {
                      return (
                        <Link
                          key={sector.slug}
                          href={`/secteurs/${sector.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block text-base font-medium transition-all duration-200 py-2 px-8 rounded-lg ${
                            theme === 'dark'
                              ? 'text-gray-400 hover:text-white hover:bg-white/5'
                              : 'text-gray-600 hover:text-black hover:bg-black/5'
                          }`}
                        >
                          <span className="relative flex items-center gap-2">
                            <div className="w-4 h-4">{sector.icon}</div>
                            {sector.title}
                            <span className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-400 to-green-500 rounded-full w-0 group-hover:w-full transition-all duration-200" />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                );
              }

              const isHashLink = link.href.startsWith('#');
              const linkHref = isHashLink ? `/${link.href}` : link.href;
              
              if (isHashLink) {
                return (
                  <Link
                    key={link.href}
                    href={linkHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-lg font-medium transition-all duration-200 py-3 px-4 rounded-lg ${
                      theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-400 to-green-500 rounded-full w-0 hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                );
              }
              
              return (
                <Link
                  key={link.href}
                  href={linkHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium transition-all duration-200 py-3 px-4 rounded-lg ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-400 to-green-500 rounded-full w-0 hover:w-full transition-all duration-200" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
