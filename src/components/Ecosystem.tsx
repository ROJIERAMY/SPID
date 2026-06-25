import { motion } from 'motion/react';
import { Shield, Zap, Sparkles, Headphones, ArrowRight } from 'lucide-react';

interface EcosystemProps {
  onEcosystemSelect: (badge: any) => void;
  lang: 'en' | 'ar';
  t: any;
}

export default function Ecosystem({ onEcosystemSelect, lang, t }: EcosystemProps) {
  // Key selling points from SPID reference
  const pillars = [
    {
      id: 'delivery',
      icon: Zap,
      title: t.pillarFastTitle,
      description: t.pillarFastDesc,
      colorClass: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      id: 'secure',
      icon: Shield,
      title: t.pillarSecureTitle,
      description: t.pillarSecureDesc,
      colorClass: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      id: 'scalable',
      icon: Sparkles,
      title: t.pillarScalableTitle,
      description: t.pillarScalableDesc,
      colorClass: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      id: 'support_24_7',
      icon: Headphones,
      title: t.pillarSupportTitle,
      description: t.pillarSupportDesc,
      colorClass: 'text-secondary border-secondary/20 bg-secondary/5',
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-background">
      <div className="ecosystem-red-blue p-8 md:p-16 rounded-[3rem] relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Background glow overlay */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Column: About Copywriting */}
          <div className="space-y-6 text-start">
            <div className="inline-block text-[10px] tracking-[0.25em] font-bold text-primary bg-primary/10 border border-primary/25 rounded-full px-3.5 py-1.5 uppercase">
              {t.aboutBadge}
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {t.aboutTitle1}<br />
              {t.aboutTitle2}<br />
              {t.aboutTitle3}
            </h2>
            
            <p className="text-base text-on-surface-variant leading-relaxed max-w-xl">
              {t.aboutDesc}
            </p>

            <p className="text-sm text-on-surface-variant font-medium italic border-l-2 rtl:border-l-0 rtl:border-r-2 border-primary pl-4 pr-4 py-1">
              {t.aboutMission}
            </p>

            <div className="pt-4">
              <button 
                onClick={() => onEcosystemSelect({ id: 'about', label: t.moreAboutUsLabel })}
                className="inline-flex items-center gap-2 text-white font-bold text-sm bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 px-6 py-3 rounded-xl transition-all cursor-pointer group"
              >
                {t.btnMoreAbout} 
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Key Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-surface/30 border border-white/5 hover:border-primary/20 transition-all group hover:bg-surface/50 text-start"
                >
                  <div className={`p-3 rounded-xl border w-fit mb-4 transition-transform duration-300 group-hover:scale-105 ${pillar.colorClass}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
