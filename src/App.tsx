import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Ecosystem from './components/Ecosystem';
import Showcase from './components/Showcase';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import Dialog from './components/Dialog';
import ServicePage from './components/ServicePage';
import { PricingTier, Service, EcosystemBadge } from './types';
import { ServicePackage } from './serviceDetails';
import { ecosystemBadges } from './data';
import { translations } from './translations';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'connect_node' | 'get_started' | 'book_consultation' | 'tier_init' | 'ecosystem_details' | null>(null);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [selectedEcosystem, setSelectedEcosystem] = useState<EcosystemBadge | null>(null);
  const [activeServicePageId, setActiveServicePageId] = useState<string | null>(null);
  const [initialFocus, setInitialFocus] = useState<string>('Web Architecture');

  const t = translations[lang];

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    const root = document.documentElement;
    if (nextTheme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  };

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  const openDialog = (type: 'connect_node' | 'get_started' | 'book_consultation' | 'tier_init' | 'ecosystem_details') => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogType(null);
    setSelectedTier(null);
    setSelectedEcosystem(null);
  };

  const handleConnectNode = () => {
    openDialog('connect_node');
  };

  const handleGetStarted = () => {
    openDialog('get_started');
  };

  const handleBookConsultation = () => {
    setInitialFocus(lang === 'en' ? 'Advanced Web Architecture' : t.dialogConsultationSegment1);
    openDialog('book_consultation');
  };

  const handleTierSelect = (tier: PricingTier) => {
    setSelectedTier(tier);
    openDialog('tier_init');
  };

  const handleEcosystemSelect = (badge: EcosystemBadge) => {
    setSelectedEcosystem(badge);
    openDialog('ecosystem_details');
  };

  const handleServiceSelect = (service: Service) => {
    setActiveServicePageId(service.id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateHome = (sectionId?: string) => {
    setActiveServicePageId(null);
    setTimeout(() => {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleInquirePackage = (pkg: ServicePackage, serviceTitle: string) => {
    let segmentFocus = lang === 'en' ? 'Advanced Web Architecture' : t.dialogConsultationSegment1;
    if (serviceTitle.toLowerCase().includes('web')) {
      segmentFocus = lang === 'en' ? 'Advanced Web Architecture' : t.dialogConsultationSegment1;
    } else if (serviceTitle.toLowerCase().includes('system') || serviceTitle.toLowerCase().includes('pos')) {
      segmentFocus = lang === 'en' ? 'ERP & POS Ecosystems' : t.dialogConsultationSegment2;
    } else if (serviceTitle.toLowerCase().includes('security') || serviceTitle.toLowerCase().includes('cyber')) {
      segmentFocus = lang === 'en' ? 'Threat Defense & Encryption' : t.dialogConsultationSegment3;
    } else if (serviceTitle.toLowerCase().includes('network') || serviceTitle.toLowerCase().includes('infrastructure')) {
      segmentFocus = lang === 'en' ? 'Ultra Low Latency Networks' : t.dialogConsultationSegment4;
    }

    setInitialFocus(segmentFocus);
    openDialog('book_consultation');
  };

  const handleViewServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-on-surface overflow-x-hidden selection:bg-primary/30">
      {/* Top Navbar */}
      <Navbar 
        onConnectNode={handleConnectNode} 
        onBookConsultation={handleBookConsultation} 
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        t={t}
        onNavigateHome={handleNavigateHome}
      />

      {/* Main content body switch */}
      {activeServicePageId ? (
        <ServicePage 
          serviceId={activeServicePageId}
          onBack={() => setActiveServicePageId(null)}
          lang={lang}
          t={t}
          onInquirePackage={handleInquirePackage}
        />
      ) : (
        <>
          {/* Hero Header Section */}
          <Hero 
            onGetStarted={handleGetStarted} 
            onViewServices={handleViewServices} 
            lang={lang}
            t={t}
          />

          {/* Core Capabilities (Services) */}
          <Services 
            onServiceSelect={handleServiceSelect} 
            lang={lang}
            t={t}
          />

          {/* Command Tiers (Pricing) */}
          <Pricing 
            onTierSelect={handleTierSelect} 
            lang={lang}
            t={t}
          />

          {/* Flagship Ecosystem (Interactive Badges + 3D blueprint) */}
          <Ecosystem 
            onEcosystemSelect={handleEcosystemSelect} 
            lang={lang}
            t={t}
          />

          {/* Operations Showcase (Deployed Solutions) */}
          <Showcase 
            lang={lang}
            t={t}
          />

          {/* Client Testimonials */}
          <Testimonials 
            lang={lang}
            t={t}
          />

          {/* Call to Action consultation invitation */}
          <ContactCTA 
            onBookConsultation={handleBookConsultation} 
            lang={lang}
            t={t}
          />
        </>
      )}

      {/* Footer copyright and policy links */}
      <Footer 
        lang={lang}
        t={t}
      />

      {/* Interactive Modal Popups / Dialogs with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isDialogOpen && (
          <Dialog 
            isOpen={isDialogOpen}
            onClose={closeDialog}
            type={dialogType}
            selectedTier={selectedTier}
            selectedEcosystem={selectedEcosystem}
            lang={lang}
            t={t}
            initialFocus={initialFocus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
export { App };
