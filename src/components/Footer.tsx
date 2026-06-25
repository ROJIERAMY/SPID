import { motion } from 'motion/react';
import { Cpu, Github, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useState } from 'react';

interface FooterProps {
  lang: 'en' | 'ar';
  t: any;
}

export default function Footer({ lang, t }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isFooterSpiderSpinning, setIsFooterSpiderSpinning] = useState(false);

  const handleFooterLogoClick = () => {
    setIsFooterSpiderSpinning(true);
    setTimeout(() => setIsFooterSpiderSpinning(false), 800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  ];

  const copyrightText = (t.footerCopyright || "© {year} SPID Digital Solutions. All Rights Reserved.")
    .replace('{year}', currentYear.toString());

  return (
    <footer className="w-full py-12 bg-surface-container-lowest border-t border-outline-variant relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 max-w-7xl mx-auto gap-8 text-center md:text-start">
        
        {/* Left Column: Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={handleFooterLogoClick}
          >
            <motion.div
              animate={isFooterSpiderSpinning ? { rotate: 360, scale: [1, 1.3, 1] } : { rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.8, rotate: -45 }}
              className="text-primary flex items-center justify-center"
            >
              <Cpu className="w-5 h-5" />
            </motion.div>
            <span className="font-display text-base font-black text-white tracking-tighter uppercase">
              SPID<span className="text-primary">.</span>
            </span>
          </div>
          <p className="text-xs text-on-surface-variant font-medium">
            {copyrightText}
          </p>
        </div>

        {/* Right Column: Socials & Links */}
        <div className="flex flex-col items-center md:items-end gap-4">
          {/* Social Media Icons with Hover Glow Effects */}
          <div className="flex gap-3">
            {socialLinks.map((social) => {
               const IconComponent = social.icon;
               return (
                 <a
                   key={social.name}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label={social.name}
                   className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-on-surface-variant hover:text-white hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(227,27,28,0.4)] transition-all duration-300"
                 >
                   <IconComponent className="w-4 h-4" />
                 </a>
               );
            })}
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
            <a className="text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold opacity-80 hover:opacity-100 font-sans" href="#privacy">
              {t.footerPrivacy}
            </a>
            <a className="text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold opacity-80 hover:opacity-100 font-sans" href="#terms">
              {t.footerTerms}
            </a>
            <a className="text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold opacity-80 hover:opacity-100 font-sans" href="#status">
              {t.footerNodeStatus}
            </a>
            <a className="text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold opacity-80 hover:opacity-100 font-sans" href="#api">
              {t.footerAPISupport}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
