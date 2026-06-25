import { motion } from 'motion/react';
import CyberBackground from './CyberBackground';
import { caseStudies } from '../data';

interface ShowcaseProps {
  lang: 'en' | 'ar';
  t: any;
}

export default function Showcase({ lang, t }: ShowcaseProps) {
  const caseTitles: Record<string, string> = {
    cafehub: t.caseCafeHubTitle,
    elitecars: t.caseEliteCarsTitle,
    taskflow: t.caseTaskFlowTitle,
  };

  const caseSubtitles: Record<string, string> = {
    cafehub: t.caseCafeHubDesc,
    elitecars: t.caseEliteCarsDesc,
    taskflow: t.caseTaskFlowDesc,
  };

  const categoryTranslations: Record<string, string> = {
    'Systems': t.catSystems,
    'Web Development': t.catWebDev,
    'Mobile Apps': t.catMobileApps,
  };

  return (
    <section id="showcase" className="py-24 px-6 md:px-16 max-w-7xl mx-auto relative overflow-hidden">
      <CyberBackground />
      
      {/* Section Header */}
      <div className="text-center mb-16 space-y-3 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="font-display text-3xl md:text-4xl font-bold tracking-tight text-primary uppercase"
        >
          {t.showcaseTitle}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-on-surface-variant max-w-md mx-auto"
        >
          {t.showcaseSubtitle}
        </motion.p>
      </div>

      {/* Grid of Case Study Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {caseStudies.map((study, index) => {
          const title = caseTitles[study.id] || study.title;
          const subtitle = caseSubtitles[study.id] || study.subtitle;
          const category = categoryTranslations[study.category] || study.category;
          const floatDuration = 5 + (study.id.charCodeAt(0) % 3) * 0.8;

          return (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Subtle 3D Floating animation wrapping the actual card */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: floatDuration,
                  ease: 'easeInOut',
                }}
                className="glass-card rounded-[2rem] overflow-hidden group flex flex-col h-full hover:shadow-[0_15px_35px_rgba(227,27,28,0.18)] border-primary/10 hover:border-primary/40 transition-all duration-300 bg-surface/40 backdrop-blur-md relative"
              >
                {/* Image Container with Hover zoom */}
                <div className="h-60 md:h-64 bg-surface-container-low relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent z-10" />
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={title} 
                    src={study.imageUrl}
                    referrerPolicy="no-referrer"
                  />
                  {/* Digital micro-grid visual element */}
                  <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:12px_12px] z-20 pointer-events-none" />
                </div>

                {/* Card Content Details */}
                <div className="p-8 flex flex-col justify-between flex-grow space-y-5 text-start relative z-10">
                  <div className="space-y-2">
                    <h4 className="font-display text-xl font-bold text-primary group-hover:text-primary transition-colors">
                      {title}
                    </h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-sans">
                      {subtitle}
                    </p>
                  </div>

                  {/* Tag Category */}
                  <div>
                    <span className={`pill-badge py-1 px-3 ${(study?.category || '').includes('Systems') ? 'text-secondary border-secondary/20 bg-secondary/5 hover:text-secondary hover:border-secondary/50' : 'text-primary border-primary/20 bg-primary/5 hover:text-primary'}`}>
                      {category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
