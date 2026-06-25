import { motion } from 'motion/react';
import CyberBackground from './CyberBackground';
import { 
  ArrowLeft, 
  Check, 
  Smartphone, 
  Globe, 
  Network, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { detailedServices, DetailedServiceData, ServicePackage } from '../serviceDetails';

interface ServicePageProps {
  serviceId: string;
  onBack: () => void;
  lang: 'en' | 'ar';
  t: any;
  onInquirePackage: (pkg: ServicePackage, serviceTitle: string) => void;
}

const iconMap: Record<string, any> = {
  Smartphone,
  Globe,
  Network,
  ShieldCheck,
  Layers
};

export default function ServicePage({ serviceId, onBack, lang, t, onInquirePackage }: ServicePageProps) {
  const serviceData = detailedServices.find(s => s.id === serviceId);

  if (!serviceData) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-6">
        <p className="text-on-surface-variant font-mono">NODE_ERROR: Capabilitiy signature not found.</p>
        <button 
          onClick={onBack}
          className="mt-6 px-6 py-3 bg-primary text-on-primary font-bold rounded-xl flex items-center gap-2 mx-auto cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  const IconComponent = iconMap[serviceData.icon] || Globe;
  const isRed = serviceData.colorType === 'red';
  const badgeText = lang === 'en' ? serviceData.badge.en : serviceData.badge.ar;
  const titleText = lang === 'en' ? serviceData.title.en : serviceData.title.ar;
  const subtitleText = lang === 'en' ? serviceData.subtitle.en : serviceData.subtitle.ar;
  const overviewText = lang === 'en' ? serviceData.overview.en : serviceData.overview.ar;
  const deliverablesTitle = lang === 'en' ? serviceData.deliverablesTitle.en : serviceData.deliverablesTitle.ar;
  const packagesTitle = lang === 'en' ? serviceData.packagesTitle.en : serviceData.packagesTitle.ar;
  const packagesList = lang === 'en' ? serviceData.packages.en : serviceData.packages.ar;

  // Let's create sub-advantages specific to the capability
  const technicalAdvantages = {
    apps: {
      en: [
        { title: 'Native Performance', desc: 'Pre-compiled binaries leveraging full GPU/CPU rendering without runtime wrappers.' },
        { title: 'Offline Architecture', desc: 'Intelligent SQLite sync databases designed to persist client state on weak connection cells.' },
        { title: 'Encrypted Persistence', desc: 'Hardware-backed keychain integration to encrypt all local application data nodes.' }
      ],
      ar: [
        { title: 'الأداء البرمجي الأصلي', desc: 'مستويات تشغيل فائقة عبر لغات النظم لضمان سلاسة حركة الرسوم والتفاعل.' },
        { title: 'العمل دون إنترنت', desc: 'قواعد بيانات ميكروية مدمجة تحفظ حالة وبيانات المستخدم وتزامنها لاحقاً.' },
        { title: 'تشفير العتاد الداخلي', desc: 'ربط وحفظ مفاتيح الجلسات داخل رقاقات الهاتف والأجهزة الآمنة.' }
      ]
    },
    web: {
      en: [
        { title: 'Fast Rendering Engines', desc: 'Server-side rendered (SSR) static outputs optimizing initial viewport loads.' },
        { title: 'Responsive Fluid Grid', desc: 'Tailwind adaptive styling rendering perfectly on any mobile, tablet, or display frame.' },
        { title: 'Optimized Speed Score', desc: 'Guaranteed 95+ lighthouse optimization covering caching, compression, and script execution.' }
      ],
      ar: [
        { title: 'سرعة الاستجابة القصوى', desc: 'رندرة البيانات والمحتوى من جهة السيرفر لضمان تحميل فوري للصفحات.' },
        { title: 'شبكة الواجهات المرنة', desc: 'واجهات متكاملة التجاوب تتكيف بدقة متناهية مع كافة مقاسات الشاشات.' },
        { title: 'أعلى نقاط القياس', desc: 'تحسين شامل للصور والأكواد وملفات الكاش لضمان درجات Lighthouse قياسية.' }
      ]
    },
    network: {
      en: [
        { title: 'Zero-Leak Tunnels', desc: 'Dedicated SSL tunnels routing client-server handshake traffic safely on Port 3000.' },
        { title: 'Automated Load Distribution', desc: 'Dynamic server balancing distributing traffic queries seamlessly across micro-clusters.' },
        { title: '24/7 Heartbeat Monitoring', desc: 'Proactive node diagnostics broadcasting alerts to administrator email servers instantly.' }
      ],
      ar: [
        { title: 'أنفاق اتصالات محصنة', desc: 'إنشاء وضبط ممرات تشفير آمنة لنقل بيانات شركتك عبر المنافذ الآمنة.' },
        { title: 'توزيع حمولة ديناميكي', desc: 'توزيع فوري ومؤتمت لزيارات موقعك وأنظمتك عبر خوادم ميكروية متعددة.' },
        { title: 'مراقبة النبض اللحظي 24/7', desc: 'أنظمة تشخيص استباقية تفحص سلامة الخوادم وترسل تنبيهات فورية للمسؤول.' }
      ]
    },
    security: {
      en: [
        { title: 'Active Traffic Sandboxing', desc: 'Dynamic filtering agents isolating malicious client payloads before they touch active databases.' },
        { title: 'AES-512 Secure Ciphers', desc: 'Enterprise-grade encryption protecting critical state files at rest and during transits.' },
        { title: 'Vulnerability Isolation', desc: 'Scheduled threat vector maps and secure ports scanning protecting internal network frames.' }
      ],
      ar: [
        { title: 'بيئة عزل البيانات النشطة', desc: 'تصفية وحجر فوري لطلبات المرور المشبوهة قبل وصولها لقاعدة بيانات النظام.' },
        { title: 'تشفير سيبراني جبار AES-512', desc: 'أعلى بروتوكولات التشفير حمايةً للملفات والمعلومات أثناء تخزينها ونقلها.' },
        { title: 'مسح وإغلاق منافذ الثغرات', desc: 'جدولة دورية لفحص أنظمة الشركة وإغلاق منافذ التسلل الأمنية بنجاح.' }
      ]
    },
    systems: {
      en: [
        { title: 'Offline-First Registers', desc: 'Cashier terminals caching sales transactions locally to prevent connection downtime sales loss.' },
        { title: 'Multi-Branch Synchronization', desc: 'Secure web sockets transmitting stock changes and staff shift logs instantly to admin boards.' },
        { title: 'Dynamic Ledger Reports', desc: 'Automated calculations of profit, costs, inventory status, and corporate VAT modules.' }
      ],
      ar: [
        { title: 'تشغيل الكاشير دون إنترنت', desc: 'حفظ وتسجيل عمليات البيع محلياً بشكل فوري لمنع خسارة المبيعات عند انقطاع الشبكة.' },
        { title: 'مزامنة الفروع الموزعة', desc: 'قنوات اتصال آمنة ومباشرة تحدث حالة المخازن في كافة الفروع لحظة بلحظة.' },
        { title: 'دفاتر حسابات ذكية مؤتمتة', desc: 'احتساب تلقائي دقيق للمبيعات، المصروفات، الأرباح، والضرائب لتسهيل اتخاذ القرار.' }
      ]
    }
  };

  const selectedAdvantages = (technicalAdvantages as any)[serviceId]?.[lang] || [];

  return (
    <div className="relative min-h-screen bg-background text-on-surface pt-24 pb-20 overflow-hidden" id="service-root">
      {/* Dynamic catchy high tech background */}
      <CyberBackground />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        {/* Navigation back and header */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: lang === 'en' ? -15 : 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="group flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-8 font-sans font-semibold cursor-pointer border border-outline-variant/50 bg-surface-container-lowest/50 px-4 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
          {lang === 'en' ? 'Back to Command Hub' : 'العودة لمركز التحكم الرئيسي'}
        </motion.button>

        {/* Hero Section of Service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 text-start">
          <div className="lg:col-span-7 space-y-6">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${isRed ? 'bg-secondary/15 text-secondary border border-secondary/30' : 'bg-primary/15 text-primary border border-primary/30'}`}>
              <Sparkles className="w-3.5 h-3.5" />
              {badgeText}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight text-on-surface">
              {titleText}
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant font-sans leading-relaxed">
              {subtitleText}
            </p>

            <div className="h-px bg-gradient-to-r from-outline-variant to-transparent w-full" />

            <p className="text-sm md:text-base text-on-surface-variant font-sans leading-relaxed">
              {overviewText}
            </p>
          </div>

          {/* Graphical Representation Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`relative p-8 md:p-10 rounded-3xl bg-surface-container-low border border-outline-variant w-full max-w-md overflow-hidden ${isRed ? 'shadow-[0_0_30px_rgba(227,27,28,0.05)]' : 'shadow-[0_0_30px_rgba(255,78,0,0.05)]'}`}
            >
              {/* Grid abstract overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className={`p-4 rounded-2xl w-fit mb-6 ${isRed ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                <IconComponent className="w-10 h-10" />
              </div>

              <h3 className="text-xl font-bold font-display text-on-surface mb-2">
                {lang === 'en' ? 'SPID Encrypted Framework' : 'إطار عمل تشفير SPID'}
              </h3>
              <p className="text-xs text-on-surface-variant font-mono mb-6">
                {lang === 'en' ? 'MODULE_SIGNATURE: SPID_CORE_' : 'توقيع_الوحدة: SPID_CORE_'}{serviceId.toUpperCase()}
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-white/5">
                  <span className="text-on-surface-variant">{lang === 'en' ? 'STABILITY RATIO:' : 'معدل الاستقرار:'}</span>
                  <span className="text-primary font-bold">99.99%</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-white/5">
                  <span className="text-on-surface-variant">{lang === 'en' ? 'LATENCY NODE:' : 'معدل الاستجابة:'}</span>
                  <span className="text-secondary font-bold">{isRed ? '0.05ms' : '0.2ms'}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-white/5">
                  <span className="text-on-surface-variant">{lang === 'en' ? 'DEPLOYMENT CODE:' : 'ترميز النشر:'}</span>
                  <span className="text-on-surface font-semibold">C_RUN_V3</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technical Advantages Grid */}
        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-on-surface mb-8 text-start flex items-center gap-3">
            <Zap className={`w-6 h-6 ${isRed ? 'text-secondary' : 'text-primary'}`} />
            {deliverablesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
            {selectedAdvantages.map((advantage: any, idx: number) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant hover:border-primary/30 transition-all duration-300"
              >
                <div className={`p-2.5 rounded-xl w-fit mb-4 ${isRed ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold font-display text-on-surface mb-2">{advantage.title}</h4>
                <p className="text-sm text-on-surface-variant font-sans leading-relaxed">{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Packages Pricing Section */}
        <div className="border-t border-outline-variant pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-on-surface tracking-tight">
              {packagesTitle}
            </h2>
            <p className="text-on-surface-variant font-sans text-sm md:text-base">
              {lang === 'en' 
                ? 'Select a structured digital package tailored to your exact scope and request. Scale up your node anytime.'
                : 'اختر باقة رقمية مخصصة تناسب احتياج عملك وميزانيتك بدقة. يمكنك ترقية مواصفات العقدة في أي وقت.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-start">
            {packagesList.map((pkg: ServicePackage, idx: number) => {
              const isPopular = idx === 1; // Mark the middle package as popular
              const floatDuration = 5 + idx * 0.8;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="h-full"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: floatDuration,
                      ease: 'easeInOut',
                    }}
                    className={`relative flex flex-col justify-between p-8 rounded-3xl bg-surface-container-low border transition-all duration-300 h-full ${
                      isPopular 
                        ? isRed 
                          ? 'border-secondary shadow-[0_0_25px_rgba(227,27,28,0.15)] bg-surface-container-high' 
                          : 'border-primary shadow-[0_0_25px_rgba(255,78,0,0.15)] bg-surface-container-high'
                        : 'border-outline-variant hover:border-outline hover:shadow-[0_10px_20px_rgba(255,255,255,0.02)]'
                    }`}
                  >
                    {isPopular && (
                      <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-on-primary ${isRed ? 'bg-secondary' : 'bg-primary'}`}>
                        {lang === 'en' ? 'Most Popular' : 'الأكثر طلباً'}
                      </span>
                    )}

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold font-display text-on-surface">{pkg.name}</h4>
                        <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed font-sans min-h-[32px]">{pkg.desc}</p>
                      </div>

                      <div className="py-4 border-y border-outline-variant/40">
                        <span className="text-3xl font-extrabold font-display text-on-surface">{pkg.price}</span>
                        <span className="text-xs text-on-surface-variant font-sans mx-1.5">{pkg.billing}</span>
                      </div>

                      <ul className="space-y-3">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isRed ? 'text-secondary' : 'text-primary'}`} />
                            <span className="font-sans leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => onInquirePackage(pkg, titleText)}
                      className={`w-full mt-8 py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isPopular
                          ? isRed 
                            ? 'bg-secondary text-on-primary hover:shadow-[0_0_15px_rgba(227,27,28,0.4)]' 
                            : 'bg-primary text-on-primary hover:shadow-[0_0_15px_rgba(255,78,0,0.4)]'
                          : 'border border-primary text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      {lang === 'en' ? 'Inquire/Book Package' : 'طلب واستشارة الباقة'}
                    </button>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Direct consultation call block */}
        <div className="mt-24 p-8 md:p-12 rounded-3xl bg-surface-container-low border border-outline-variant flex flex-col md:flex-row justify-between items-center gap-8 text-start relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div className="space-y-2 max-w-2xl relative z-10">
            <h3 className="text-xl md:text-2xl font-bold font-display text-on-surface">
              {lang === 'en' ? 'Need a Custom Scope Architecture?' : 'هل تحتاج إلى مواصفات هندسية مخصصة بالكامل؟'}
            </h3>
            <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
              {lang === 'en' 
                ? 'Our lead cloud architects can plan a bespoke zero-trust grid or full scale ERP mapped specifically to your enterprise operations.'
                : 'يمكن لمهندسينا السحابيين الرائدين تخطيط شبكة أمان صفرية مخصصة أو نظام ERP كامل النطاق ومصمم خصيصاً لعمليات شركتك.'}
            </p>
          </div>

          <button
            onClick={() => onInquirePackage({ id: 'custom', name: 'Custom Architecture', price: 'Bespoke', billing: '', desc: '', features: [] }, titleText)}
            className="px-6 py-4 bg-primary text-on-primary font-bold rounded-xl hover:shadow-[0_0_15px_rgba(255,78,0,0.4)] transition-all flex items-center gap-2 text-sm cursor-pointer whitespace-nowrap shrink-0 relative z-10 font-sans"
          >
            {lang === 'en' ? 'Consult Lead Architect' : 'استشر مهندس الأنظمة الرائد'}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
