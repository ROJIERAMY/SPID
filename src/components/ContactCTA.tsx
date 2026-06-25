import { motion } from 'motion/react';
import CyberBackground from './CyberBackground';

interface ContactCTAProps {
  onBookConsultation: () => void;
  lang: 'en' | 'ar';
  t: any;
}

export default function ContactCTA({ onBookConsultation, lang, t }: ContactCTAProps) {
  return (
    <section className="py-24 px-6 md:px-16 text-center relative overflow-hidden">
      <CyberBackground />
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[110px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto glass-card p-10 md:p-16 rounded-[2.5rem] border-primary/20 glow-pulse relative z-10 space-y-8"
      >
        <div className="space-y-4">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-primary tracking-tight leading-none uppercase">
            {t.ctaTitle}
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant max-w-sm mx-auto font-sans">
            {t.ctaSubtitle}
          </p>
        </div>

        <div>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBookConsultation}
            className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-base md:text-lg hover:shadow-[0_0_30px_rgba(255,78,0,0.5)] transition-all cursor-pointer text-sm"
          >
            {t.btnBookConsultation}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
