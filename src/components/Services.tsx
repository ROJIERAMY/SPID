import { motion } from 'motion/react';
import { services } from '../data';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  onServiceSelect: (service: Service) => void;
  lang: 'en' | 'ar';
  t: any;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 16,
    },
  },
};

export default function Services({ onServiceSelect, lang, t }: ServicesProps) {
  const serviceTitles: Record<string, string> = {
    apps: t.serviceAppsTitle,
    web: t.serviceWebTitle,
    network: t.serviceNetworkTitle,
    security: t.serviceSecurityTitle,
    systems: t.serviceSystemsTitle,
  };

  const serviceDescs: Record<string, string> = {
    apps: t.serviceAppsDesc,
    web: t.serviceWebDesc,
    network: t.serviceNetworkDesc,
    security: t.serviceSecurityDesc,
    systems: t.serviceSystemsDesc,
  };

  return (
    <section id="services" className="py-24 px-6 md:px-16 max-w-7xl mx-auto relative">
      {/* Decorative lines & elements */}
      <div className="absolute left-1/2 top-0 w-px h-16 bg-gradient-to-b from-primary/40 to-transparent" />
      
      <div className="text-center mb-16 space-y-3">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="font-display text-3xl md:text-4xl font-bold tracking-tight text-primary uppercase"
        >
          {t.servicesTitle}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base text-on-surface-variant max-w-md mx-auto font-sans"
        >
          {t.servicesSubtitle}
        </motion.p>
      </div>

      {/* Grid containing services with staggered entrance */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        {services.map((service) => {
          // Dynamically lookup the Lucide icon from the service.icon string
          const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;
          const title = serviceTitles[service.id] || service.title;
          const description = serviceDescs[service.id] || service.description;

          return (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                transition: { type: 'spring', stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onServiceSelect(service)}
              className="glass-card p-8 rounded-2xl flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Icon Container with glowing effect */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 border group-hover:scale-110 transition-transform duration-300
                ${service.isSecurity 
                  ? 'bg-secondary/10 border-secondary/30 group-hover:bg-secondary/20 text-secondary group-hover:shadow-[0_0_15px_rgba(122,29,255,0.4)]' 
                  : 'bg-primary/10 border-primary/20 group-hover:bg-primary/20 text-primary group-hover:shadow-[0_0_15px_rgba(255,78,0,0.4)]'}`}
              >
                <IconComponent className="w-7 h-7 stroke-[2]" />
              </div>

              {/* Title */}
              <h3 className={`font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors
                ${service.isSecurity ? 'text-secondary' : 'text-primary'}`}
              >
                {title}
              </h3>

              {/* Description */}
              <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed font-sans">
                {description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
