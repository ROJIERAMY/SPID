import { motion } from 'motion/react';
import { Cpu, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onConnectNode: () => void;
  onBookConsultation: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  lang: 'en' | 'ar';
  onToggleLang: () => void;
  t: any;
  onNavigateHome?: (sectionId?: string) => void;
}

export default function Navbar({ onConnectNode, onBookConsultation, theme, onToggleTheme, lang, onToggleLang, t, onNavigateHome }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSpiderSpinning, setIsSpiderSpinning] = useState(false);

  const handleLogoClick = () => {
    setIsSpiderSpinning(true);
    setTimeout(() => setIsSpiderSpinning(false), 800);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-surface/70 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-7xl mx-auto">
        {/* Logo and title */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={handleLogoClick}>
          <motion.div
            animate={isSpiderSpinning ? { rotate: 360, scale: [1, 1.25, 1] } : { rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.85, rotate: -45 }}
            className="text-primary flex items-center justify-center"
          >
            <Cpu className="w-8 h-8 stroke-[2.2] filter drop-shadow-[0_0_8px_rgba(227,27,28,0.5)]" />
          </motion.div>
          <span className="font-display text-2xl font-black text-white tracking-tighter uppercase">
            SPID<span className="text-primary">.</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm tracking-wide cursor-pointer"
          >
            {t.navAbout}
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm tracking-wide cursor-pointer"
          >
            {t.navServices}
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm tracking-wide cursor-pointer"
          >
            {t.navPricing}
          </button>
          <button 
            onClick={() => scrollToSection('showcase')} 
            className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm tracking-wide cursor-pointer"
          >
            {t.navShowcase}
          </button>
          <button 
            onClick={onBookConsultation} 
            className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm tracking-wide cursor-pointer"
          >
            {t.navContact}
          </button>
        </div>

        {/* Connect Node CTA, Language & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onToggleLang}
            aria-label="Toggle language"
            className="px-3.5 py-1.5 text-xs font-bold rounded-full border border-outline hover:border-primary/50 text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all duration-300 bg-surface-container-low/40 cursor-pointer flex items-center justify-center"
            title={lang === 'en' ? "تبديل إلى اللغة العربية" : "Switch to English"}
          >
            {lang === 'en' ? 'العربية' : 'EN'}
          </button>

          {/* Theme is permanently set to dark for high-contrast cyberpunk consistency */}

          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onConnectNode}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:shadow-[0_0_15px_rgba(227,27,28,0.4)] transition-all cursor-pointer"
          >
            {t.btnConnectNode}
          </motion.button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-primary p-2 focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-surface-container border-b border-primary/20 px-6 py-6 space-y-4"
        >
          <button 
            onClick={() => scrollToSection('about')}
            className="block w-full text-start text-on-surface-variant hover:text-primary py-2 text-sm font-semibold cursor-pointer"
          >
            {t.navAbout}
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="block w-full text-start text-on-surface-variant hover:text-primary py-2 text-sm font-semibold cursor-pointer"
          >
            {t.navServices}
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="block w-full text-start text-on-surface-variant hover:text-primary py-2 text-sm font-semibold cursor-pointer"
          >
            {t.navPricing}
          </button>
          <button 
            onClick={() => scrollToSection('showcase')}
            className="block w-full text-start text-on-surface-variant hover:text-primary py-2 text-sm font-semibold cursor-pointer"
          >
            {t.navShowcase}
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onBookConsultation(); }}
            className="block w-full text-start text-on-surface-variant hover:text-primary py-2 text-sm font-semibold cursor-pointer"
          >
            {t.navContact}
          </button>
          
          {/* Removed theme mode toggle row to stick to premium dark theme only */}

          <div className="flex items-center justify-between py-3 border-t border-outline/10">
            <span className="text-sm font-semibold text-on-surface-variant">{lang === 'en' ? 'Language' : 'اللغة'}</span>
            <button
              onClick={() => { onToggleLang(); }}
              className="p-2 px-3.5 rounded-xl border border-outline hover:border-primary/50 text-on-surface-variant hover:text-primary bg-surface-container-low/50 flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>

          <button 
            onClick={() => { setMobileMenuOpen(false); onConnectNode(); }}
            className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-center block text-sm cursor-pointer"
          >
            {t.btnConnectNode}
          </button>
        </motion.div>
      )}
    </nav>
  );
}
