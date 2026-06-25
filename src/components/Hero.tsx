import { motion } from 'motion/react';
import ThreeScene from './ThreeScene';
import CyberBackground from './CyberBackground';
import { ArrowRight, Terminal, Rocket, ThumbsUp, Briefcase, Headphones } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onViewServices: () => void;
  lang: 'en' | 'ar';
  t: any;
}

export default function Hero({ onGetStarted, onViewServices, lang, t }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-16 pt-28 pb-12 relative overflow-hidden bg-background">
      {/* Immersive interactive dynamic background */}
      <CyberBackground />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content Column */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-start"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 pill-badge py-2 px-4 border-primary/20 bg-primary/5 text-xs font-mono"
          >
            <Terminal className="w-3.5 h-3.5 text-primary" /> {t.heroBadge}
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-on-surface leading-tight tracking-tight text-start uppercase"
          >
            {lang === 'en' ? (
              <>
                Speed. Security.<br />
                Systems.<br />
                Powered by <span className="text-primary font-black">SPID.</span>
              </>
            ) : (
              <>
                السرعة. الأمان.<br />
                الأنظمة.<br />
                بواسطة <span className="text-primary font-black">SPID.</span>
              </>
            )}
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed font-sans"
          >
            {t.heroSubtitle}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-start"
          >
            <button 
              onClick={onViewServices}
              className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-sm hover:shadow-[0_0_25px_rgba(227,27,28,0.5)] hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {t.btnOurServices} <ArrowRight className="w-4 h-4 text-on-primary rtl:rotate-180" />
            </button>
            <button 
              onClick={onGetStarted}
              className="border border-outline hover:border-primary/40 text-on-surface hover:bg-surface-container/50 px-8 py-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {t.btnGetInTouch} <ArrowRight className="w-4 h-4 text-on-surface rtl:rotate-180" />
            </button>
          </motion.div>

          {/* Reference stats row inside Hero left column */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-outline/10 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/25 shrink-0">
                <Rocket className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg md:text-xl font-black font-display tracking-tight text-on-surface leading-tight">100+</div>
                <div className="text-[10px] text-on-surface-variant font-medium leading-tight">{t.statProjects}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/25 shrink-0">
                <ThumbsUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg md:text-xl font-black font-display tracking-tight text-on-surface leading-tight">98%</div>
                <div className="text-[10px] text-on-surface-variant font-medium leading-tight">{t.statSatisfaction}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/25 shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg md:text-xl font-black font-display tracking-tight text-on-surface leading-tight">5+</div>
                <div className="text-[10px] text-on-surface-variant font-medium leading-tight">{t.statExperience}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/25 shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg md:text-xl font-black font-display tracking-tight text-on-surface leading-tight">24/7</div>
                <div className="text-[10px] text-on-surface-variant font-medium leading-tight">{t.statSupport}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right 3D Visual Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex justify-center items-center w-full"
        >
          {/* Pulsing backlight behind 3D canvas */}
          <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full scale-75 animate-pulse" />
          
          <div className="relative z-10 w-full max-w-md aspect-square flex justify-center items-center">
            <ThreeScene />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
