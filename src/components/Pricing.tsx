import { motion } from 'motion/react';
import CyberBackground from './CyberBackground';
import { pricingTiers } from '../data';
import { Check, ShieldCheck, Zap, Lock } from 'lucide-react';
import { PricingTier } from '../types';

interface PricingProps {
  onTierSelect: (tier: PricingTier) => void;
  lang: 'en' | 'ar';
  t: any;
}

export default function Pricing({ onTierSelect, lang, t }: PricingProps) {
  const tierNames: Record<string, string> = {
    starter: t.tierStarter,
    professional: t.tierProfessional,
    business: t.tierBusiness,
    enterprise: t.tierEnterprise,
  };

  const featureTranslations: Record<string, string> = {
    '5 Page Website': t.featurePages5,
    'Responsive Design': t.featureResponsive,
    'Basic SEO': t.featureBasicSEO,
    'Contact Form': t.featureContactForm,
    '1 Month Support': t.featureSupport1M,
    'Dynamic Website': t.featureDynamicWeb,
    'Admin Panel': t.featureAdminPanel,
    'SEO Optimization': t.featureSEOOpt,
    'Social Media Integration': t.featureSocialMedia,
    '3 Months Support': t.featureSupport3M,
    'Custom Web Application': t.featureCustomApp,
    'Advanced Features': t.featureAdvancedFeatures,
    'Payment Integration': t.featurePayment,
    'SEO Advanced': t.featureSEOAdv,
    '6 Months Support': t.featureSupport6M,
    'Custom ERP / System': t.featureCustomERP,
    'Advanced Security': t.featureAdvancedSec,
    'Full Scalability': t.featureScalability,
    'Dedicated Support': t.featureDedicatedSup,
    '12 Months Support': t.featureSupport12M,
  };

  return (
    <section id="pricing" className="py-24 px-6 md:px-16 max-w-7xl mx-auto relative overflow-hidden bg-background">
      <CyberBackground />
      <div className="text-center mb-16 space-y-3 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="font-display text-3xl md:text-4xl font-black tracking-tight text-primary uppercase"
        >
          {t.pricingTitle}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-on-surface-variant max-w-md mx-auto"
        >
          {t.pricingSubtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative z-10">
        {pricingTiers.map((tier, index) => {
          const isRed = tier.colorType === 'red';
          const tierName = tierNames[tier.id] || tier.name;
          const buttonText = tier.id === 'enterprise' ? t.btnContactUs : t.btnGetStarted;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`glass-card p-10 rounded-[2rem] flex flex-col justify-between relative overflow-hidden h-full group
                ${tier.isPopular 
                  ? 'border-primary shadow-[0_0_40px_rgba(227,27,28,0.12)] bg-gradient-to-b from-primary/[0.03] to-transparent scale-[1.02] z-10' 
                  : isRed 
                    ? 'border-primary/20 hover:border-primary/40' 
                    : 'border-secondary/20 hover:border-secondary/40'}`}
            >
              {/* Most Secure Badge */}
              {tier.badge && (
                <div className="absolute top-6 right-6 bg-primary text-on-primary px-3.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase shadow-[0_0_10px_rgba(227,27,28,0.4)]">
                  {t.popularBadge}
                </div>
              )}

              <div>
                {/* Header */}
                <div className={`micro-label mb-4 tracking-[0.2em] font-semibold text-xs uppercase
                  ${isRed ? 'text-primary neon-text-red' : 'text-secondary neon-text-blue'}`}
                >
                  {tierName}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="serif-value text-4xl md:text-5xl text-on-surface tracking-tight font-light italic">
                    {tier.price}
                  </span>
                  <span className="text-on-surface-variant text-xs md:text-sm font-medium">
                    {t.currency}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-10 text-sm">
                  {tier.features.map((feature, i) => {
                    const translatedFeature = featureTranslations[feature] || feature;
                    return (
                      <li key={i} className="flex items-center gap-3 text-on-surface font-medium">
                        {isRed ? (
                          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 text-secondary shrink-0" />
                        )}
                        <span>{translatedFeature}</span>
                      </li>
                    );
                  })}

                  {/* Disabled Features */}
                  {tier.disabledFeatures?.map((feature, i) => {
                    const translatedFeature = featureTranslations[feature] || feature;
                    return (
                      <li key={i} className="flex items-center gap-3 text-on-surface-variant/40 line-through">
                        <Lock className="w-3.5 h-3.5 text-outline-variant shrink-0" />
                        <span>{translatedFeature}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTierSelect(tier)}
                className={`w-full py-4 rounded-xl font-bold transition-all text-sm cursor-pointer flex items-center justify-center gap-2
                  ${tier.isPopular 
                    ? 'bg-primary text-on-primary hover:shadow-[0_0_20px_rgba(227,27,28,0.4)]' 
                    : isRed 
                      ? 'border border-primary text-primary hover:bg-primary/10' 
                      : 'border border-secondary text-secondary hover:bg-secondary/10'}`}
              >
                {tier.isPopular && <Zap className="w-4 h-4 fill-current" />}
                {buttonText}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
