import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { X, Shield, Cpu, Terminal, Calendar, Send, CheckCircle2, Cloud, Zap, ArrowRight, Download } from 'lucide-react';
import { PricingTier, Service, EcosystemBadge } from '../types';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'connect_node' | 'get_started' | 'book_consultation' | 'tier_init' | 'ecosystem_details' | null;
  selectedTier?: PricingTier | null;
  selectedEcosystem?: EcosystemBadge | null;
  lang: 'en' | 'ar';
  t: any;
  initialFocus?: string;
}

export default function Dialog({ isOpen, onClose, type, selectedTier, selectedEcosystem, lang, t, initialFocus }: DialogProps) {
  const [step, setStep] = useState(1);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    focus: 'Web Architecture',
    cloud: 'gcp',
    region: 'us-central1',
    date: '',
    time: '14:00',
  });

  // Reset states on open
  useEffect(() => {
    if (isOpen) {
      setBookingSuccess(false);
      setStep(1);
      if (initialFocus) {
        setFormData(prev => ({ ...prev, focus: initialFocus }));
      }
    }
  }, [isOpen, type, initialFocus]);

  // Handle Terminal Logs animation for Tier Init
  useEffect(() => {
    if (type === 'tier_init' && isOpen) {
      setStep(1);
      const initialLog = lang === 'en' 
        ? '[SYSTEM] INITIALIZING COMMAND DEPLOYMENT SEQUENCE...' 
        : '[النظام] جاري بدء تسلسل نشر التحكم...';
      setTerminalLogs([initialLog]);

      const logs = [
        `[SECURITY] ${lang === 'en' ? 'PAIRING NODE SECURE KEYS...' : 'جاري إقران المفاتيح الآمنة للعقدة...'}`,
        `[CONFIG] ${lang === 'en' ? `RETRIEVING ${selectedTier?.name} SPECIFICATIONS...` : `جاري جلب مواصفات باقة ${selectedTier?.name}...`}`,
        `[HOSTING] ${lang === 'en' ? `ALLOCATING VIRTUAL CLOUD HOSTS (${formData.region})...` : `جاري تخصيص المضيف السحابي الافتراضي (${formData.region})...`}`,
        `[NETWORKING] ${lang === 'en' ? 'TESTING NODE PORT TUNNELING IN PORT 3000...' : 'جاري اختبار نفق منفذ العقدة عبر المنفذ 3000...'}`,
        `[COMPILING] ${lang === 'en' ? 'COMPILING EMBEDDED SYSTEM AGENTS...' : 'جاري تجميع وكلاء النظام المضمنة...'}`,
        `[SECURITY] ${lang === 'en' ? 'GENERATING 256-BIT HIGH-STRENGTH CRYPTOGRAPHIC KEY...' : 'جاري إنشاء مفتاح تشفير عالي القوة 256 بت...'}`,
        `[COMPLETED] ${lang === 'en' ? 'NODE DEPLOYMENT INITIALIZED SUCCESSFULLY.' : 'تم تهيئة نشر العقدة بنجاح.'}`,
        `[STATUS] ${lang === 'en' ? 'SECURE TUNNEL ACTIVE.' : 'نفق الاتصال الآمن نشط.'}`
      ];

      let logIndex = 0;
      const interval = setInterval(() => {
        if (logIndex < logs.length) {
          setTerminalLogs(prev => [...prev, logs[logIndex]]);
          logIndex++;
        } else {
          setStep(2); // Show final download/success step
          clearInterval(interval);
        }
      }, 700);

      return () => clearInterval(interval);
    }
  }, [type, isOpen, selectedTier, lang]);

  if (!isOpen) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setBookingSuccess(true);
  };

  const handleGetStartedSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(2); // Success step
  };

  const downloadConfigFile = () => {
    const configData = {
      timestamp: new Date().toISOString(),
      node_id: `SPID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      tier: selectedTier?.name || 'GENERIC',
      security_hash: 'SHA256-b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      port: 3000,
      protocol: 'https_tls1.3',
      cloud_provider: formData.cloud,
      region: formData.region,
      status: 'active'
    };

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `spid-node-config-${configData.node_id.toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Safe substitutions for translations
  const deployTitle = (t.dialogDeployTitle || "Deploying {name} Tier").replace('{name}', selectedTier?.name || '');
  const deploySuccessDesc = (t.dialogDeploySuccessDesc || "The {name} command node has been spawned successfully.").replace('{name}', selectedTier?.name || '');
  const specsTitle = (t.dialogSpecsTitle || "{label} Protocol").replace('{label}', selectedEcosystem?.label || '');
  const specsDesc = (t.dialogSpecsDesc || "Architecture breakdown for {label}").replace('{label}', selectedEcosystem?.label || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-md"
      />

      {/* Dialog Content */}
      <motion.div 
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-lg bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
      >
        {/* Header decoration bar */}
        <div className={`h-1.5 w-full ${type === 'tier_init' && selectedTier?.colorType === 'red' ? 'bg-secondary' : 'bg-primary'}`} />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* 1. CONNECT NODE DIALOG */}
          {type === 'connect_node' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-primary font-display">{t.dialogConnectTitle}</h3>
              </div>
              
              <p className="text-sm text-on-surface-variant mb-6 font-sans text-start">
                {t.dialogConnectDesc}
              </p>

              <div className="bg-surface-container-low border border-white/10 rounded-2xl p-5 font-mono text-xs mb-6 space-y-2 text-start">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">{t.dialogConnectHost}</span>
                  <span className="text-primary font-bold">NODE_080B12.SPID.NETWORK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">{t.dialogConnectHandshake}</span>
                  <span className="text-primary font-bold">3000 (SECURE INGRESS)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">{t.dialogConnectCipher}</span>
                  <span className="text-secondary font-bold">ECDHE-RSA-AES256-GCM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">{t.dialogConnectTunnel}</span>
                  <span className="text-primary">v1.3 (HOLOGRAPHIC)</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    const connectInitLog = lang === 'en' ? '[CONNECT] Pairing initiated...' : '[اتصال] جاري بدء الاقتران...';
                    const connectSuccessLog = lang === 'en' ? '[CONNECT] Success! Connection node integrated.' : '[اتصال] نجاح! تم دمج عقدة الاتصال الآمن.';
                    setTerminalLogs([connectInitLog, connectSuccessLog]);
                    setStep(2);
                  }}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(255,78,0,0.4)] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Zap className="w-4 h-4" /> {t.dialogConnectBtn}
                </button>
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-4 bg-primary/10 border border-primary/30 rounded-xl text-center text-primary text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> {t.dialogConnectSuccess}
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* 2. GET STARTED DIALOG */}
          {type === 'get_started' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-primary font-display">{t.dialogLaunchTitle}</h3>
              </div>

              {step === 1 ? (
                <form onSubmit={handleGetStartedSubmit} className="space-y-4 text-start">
                  <p className="text-sm text-on-surface-variant mb-4 font-sans text-start">
                    {t.dialogLaunchDesc}
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{t.dialogLaunchNameLabel}</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="e.g. Project-Nexus"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{t.dialogLaunchCloudLabel}</label>
                    <select 
                      name="cloud" 
                      value={formData.cloud}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="gcp">{t.dialogLaunchCloudOption1}</option>
                      <option value="aws">{t.dialogLaunchCloudOption2}</option>
                      <option value="azure">{t.dialogLaunchCloudOption3}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{t.dialogLaunchRegionLabel}</label>
                    <select 
                      name="region" 
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="us-central1">Iowa (us-central1)</option>
                      <option value="europe-west2">London (europe-west2)</option>
                      <option value="asia-east1">Taiwan (asia-east1)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{t.dialogLaunchAdminEmailLabel}</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="admin@domain.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(255,78,0,0.4)] transition-all flex items-center justify-center gap-2 mt-6 text-sm cursor-pointer"
                  >
                    {t.dialogLaunchBtn} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full border border-primary/20 text-primary">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="text-lg font-bold text-primary">{t.dialogLaunchSuccessTitle}</h4>
                  <p className="text-sm text-on-surface-variant max-w-sm mx-auto font-sans">
                    {(t.dialogLaunchSuccessDesc || "We've initiated the building of your workspace {name} in {region}.")
                      .replace('{name}', formData.name || 'Sandbox')
                      .replace('{region}', formData.region)
                      .replace('{email}', formData.email)}
                  </p>
                  <button 
                    onClick={onClose}
                    className="px-6 py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary/10 transition-all text-sm cursor-pointer"
                  >
                    {t.dialogLaunchSuccessBtn}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. BOOK CONSULTATION DIALOG */}
          {type === 'book_consultation' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-primary font-display">{t.dialogConsultationTitle}</h3>
              </div>

              {!bookingSuccess ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-start">
                  <p className="text-sm text-on-surface-variant mb-4 font-sans text-start">
                    {t.dialogConsultationDesc}
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{t.dialogConsultationNameLabel}</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Director of Technology"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{t.dialogConsultationSegmentLabel}</label>
                    </div>
                    <select className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:outline-none" name="focus" value={formData.focus} onChange={handleInputChange}>
                      <option value="Web Architecture">{t.dialogConsultationSegment1}</option>
                      <option value="ERP Systems">{t.dialogConsultationSegment2}</option>
                      <option value="Cyber Security">{t.dialogConsultationSegment3}</option>
                      <option value="Cloud Networks">{t.dialogConsultationSegment4}</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{t.dialogConsultationDateLabel}</label>
                      <input 
                        type="date" 
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{t.dialogConsultationTimeLabel}</label>
                      <select 
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:outline-none"
                      >
                        <option value="09:00">09:00 AM</option>
                        <option value="11:30">11:30 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:30">04:30 PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{t.dialogConsultationEmailLabel}</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="coordination@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(255,78,0,0.4)] transition-all flex items-center justify-center gap-2 mt-6 text-sm cursor-pointer"
                  >
                    {t.dialogConsultationBtn} <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full border border-primary/20 text-primary">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="text-lg font-bold text-primary">{t.dialogConsultationSuccessTitle}</h4>
                  <p className="text-sm text-on-surface-variant max-w-sm mx-auto font-sans">
                    {(t.dialogConsultationSuccessDesc || "We have locked in your session.")
                      .replace('{name}', formData.name || 'Partner')
                      .replace('{focus}', formData.focus)
                      .replace('{date}', formData.date || '')
                      .replace('{time}', formData.time)
                      .replace('{email}', formData.email)}
                  </p>
                  <button 
                    onClick={() => {
                      setBookingSuccess(false);
                      onClose();
                    }}
                    className="px-6 py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary/10 transition-all text-sm cursor-pointer"
                  >
                    {t.dialogConsultationSuccessBtn}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 4. TIER DEPLOYMENT TERMINAL (Pricing) */}
          {type === 'tier_init' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Terminal className={`w-6 h-6 ${selectedTier?.colorType === 'red' ? 'text-secondary' : 'text-primary'}`} />
                <h3 className={`text-xl font-bold font-display ${selectedTier?.colorType === 'red' ? 'text-secondary' : 'text-primary'}`}>
                  {deployTitle}
                </h3>
              </div>

              {step === 1 ? (
                <div className="space-y-4 text-start">
                  <p className="text-sm text-on-surface-variant font-sans">
                    {t.dialogDeployDesc}
                  </p>
                  <div className="bg-surface-container-lowest font-mono text-[11px] p-4 rounded-xl h-48 overflow-y-auto space-y-1.5 border border-white/10 text-start">
                    {terminalLogs.map((log, i) => (
                      <div 
                        key={i} 
                        className={log?.includes('COMPLETED') || log?.includes('ACTIVE') || log?.includes('نجاح') 
                          ? 'text-primary font-bold' 
                          : log?.includes('RETRIEVING') || log?.includes('جلب')
                            ? 'text-secondary' 
                            : 'text-on-surface-variant'}
                      >
                        {log}
                      </div>
                    ))}
                    <div className="animate-pulse inline-block w-1.5 h-3.5 bg-primary ml-1 align-middle" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-5">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full border border-primary/20 text-primary">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="text-lg font-bold text-primary">{t.dialogDeploySuccessTitle}</h4>
                  <p className="text-sm text-on-surface-variant max-w-sm mx-auto font-sans">
                    {deploySuccessDesc}
                  </p>
                  <div className="flex gap-4 max-w-xs mx-auto">
                    <button 
                      onClick={downloadConfigFile}
                      className="flex-1 bg-primary text-on-primary py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(255,78,0,0.4)] transition-all text-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> {t.dialogDeployDownloadBtn}
                    </button>
                    <button 
                      onClick={onClose}
                      className="flex-1 border border-primary/30 text-primary py-3.5 px-4 rounded-xl font-bold hover:bg-primary/10 transition-all text-sm cursor-pointer"
                    >
                      {t.dialogDeployCompletedBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. ECOSYSTEM DETAILS DIALOG */}
          {type === 'ecosystem_details' && selectedEcosystem && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className={`w-6 h-6 ${selectedEcosystem.colorType === 'red' ? 'text-secondary' : 'text-primary'}`} />
                <h3 className={`text-xl font-bold font-display ${selectedEcosystem.colorType === 'red' ? 'text-secondary font-display neon-text-red' : 'text-primary font-display neon-text-blue'}`}>
                  {specsTitle}
                </h3>
              </div>

              <div className="space-y-5 text-start">
                <p className="text-sm text-on-surface-variant font-sans">
                  {specsDesc}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-high p-4 rounded-2xl border border-white/5">
                    <span className="text-xs text-on-surface-variant uppercase block mb-1">{t.dialogSpecLatency}</span>
                    <span className="serif-value text-lg font-light text-primary">
                      {selectedEcosystem.colorType === 'red' ? '0.05ms' : '0.2ms'}
                    </span>
                  </div>
                  <div className="bg-surface-container-high p-4 rounded-2xl border border-white/5">
                    <span className="text-xs text-on-surface-variant uppercase block mb-1">{t.dialogSpecEncryption}</span>
                    <span className="serif-value text-lg font-light text-secondary">
                      {selectedEcosystem.colorType === 'red' ? '512-bit RSA' : '256-bit AES'}
                    </span>
                  </div>
                  <div className="bg-surface-container-high p-4 rounded-2xl border border-white/5">
                    <span className="text-xs text-on-surface-variant uppercase block mb-1">{t.dialogSpecContainer}</span>
                    <span className="text-sm font-bold text-on-surface">Cloud Run MicroNode</span>
                  </div>
                  <div className="bg-surface-container-high p-4 rounded-2xl border border-white/5">
                    <span className="text-xs text-on-surface-variant uppercase block mb-1">{t.dialogSpecPipeline}</span>
                    <span className="text-sm font-bold text-on-surface">Real-Time WebSocket</span>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl text-xs text-on-surface-variant leading-relaxed">
                  {t.dialogSpecFooterText}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      onClose();
                      // Redirect to book/get-started
                    }}
                    className="flex-1 bg-primary text-on-primary py-3.5 rounded-xl font-bold text-sm hover:shadow-[0_0_15px_rgba(255,78,0,0.4)] transition-all cursor-pointer"
                  >
                    {t.dialogSpecBtnProvision}
                  </button>
                  <button 
                    onClick={onClose}
                    className="px-6 py-3.5 border border-primary/30 text-primary font-bold rounded-xl text-sm hover:bg-primary/10 transition-all cursor-pointer"
                  >
                    {t.dialogSpecBtnClose}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
