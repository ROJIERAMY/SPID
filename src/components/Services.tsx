import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import CyberBackground from './CyberBackground';
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

interface TiltCardProps {
  key?: string;
  service: Service;
  title: string;
  description: string;
  onServiceSelect: (service: Service) => void;
}

function TiltCard({ service, title, description, onServiceSelect }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Capture exact coordinate relative to the card dimensions
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setGlowPos({ x, y });

    const mouseX = x - width / 2;
    const mouseY = y - height / 2;

    // Convert mouse vectors to maximum rotation degrees (e.g., max 15 degrees)
    const rotateX = -(mouseY / (height / 2)) * 12;
    const rotateY = (mouseX / (width / 2)) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const floatDuration = 4 + (service.id.charCodeAt(0) % 4) * 0.7;

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onServiceSelect(service)}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
      }}
      className={`glass-card p-8 rounded-2xl flex flex-col items-center text-center group cursor-pointer relative overflow-hidden transition-all duration-300 ${
        isHovered 
          ? 'shadow-[0_15px_45px_rgba(0,130,255,0.25)] border-secondary/40' 
          : 'border-white/5'
      }`}
    >
      {/* 3D Floating Interactive Spotlight Laser Glow (Adds incredible depth and catchy feel) */}
      {isHovered && (
        <div 
          className="absolute pointer-events-none rounded-full blur-[40px] opacity-35 w-32 h-32 bg-secondary"
          style={{
            left: `${glowPos.x}px`,
            top: `${glowPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Grid pattern inside each card for high tech detail */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Persistent subtle 3D float animation wrapping content */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          repeat: Infinity,
          duration: floatDuration,
          ease: 'easeInOut',
        }}
        className="w-full flex flex-col items-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Icon Container with glowing effects, adding much more vibrant blue tones */}
        <div 
          style={{ transform: 'translateZ(30px)' }}
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 border group-hover:scale-110 transition-transform duration-300 relative z-10
            ${service.isSecurity 
              ? 'bg-secondary/15 border-secondary/50 text-secondary shadow-[0_0_20px_rgba(0,130,255,0.45)]' 
              : 'bg-primary/5 border-secondary/35 text-secondary shadow-[0_0_15px_rgba(0,130,255,0.2)] group-hover:border-secondary group-hover:shadow-[0_0_25px_rgba(0,130,255,0.5)]'}`}
        >
          <IconComponent className="w-7 h-7 stroke-[2]" />
        </div>

        {/* Title with Z-index perspective */}
        <h3 
          style={{ transform: 'translateZ(20px)' }}
          className={`font-display text-lg font-bold mb-2 group-hover:text-secondary transition-colors relative z-10
            ${service.isSecurity ? 'text-secondary' : 'text-primary'}`}
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          style={{ transform: 'translateZ(10px)' }}
          className="text-on-surface-variant text-xs md:text-sm leading-relaxed font-sans relative z-10"
        >
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}

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
    <section id="services" className="py-24 px-6 md:px-16 max-w-7xl mx-auto relative overflow-hidden">
      <CyberBackground />
      {/* Decorative lines & elements */}
      <div className="absolute left-1/2 top-0 w-px h-16 bg-gradient-to-b from-secondary/40 to-transparent z-10" />
      
      <div className="text-center mb-16 space-y-3">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="font-display text-3xl md:text-4xl font-bold tracking-tight text-secondary uppercase neon-text-blue"
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
          const title = serviceTitles[service.id] || service.title;
          const description = serviceDescs[service.id] || service.description;

          return (
            <TiltCard
              key={service.id}
              service={service}
              title={title}
              description={description}
              onServiceSelect={onServiceSelect}
            />
          );
        })}
      </motion.div>
    </section>
  );
}
