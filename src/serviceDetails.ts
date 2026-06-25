export interface ServicePackage {
  id: string;
  name: string;
  price: string;
  billing: string;
  desc: string;
  features: string[];
}

export interface DetailedServiceData {
  id: string;
  icon: string;
  colorType: 'blue' | 'red';
  badge: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  overview: { en: string; ar: string };
  deliverablesTitle: { en: string; ar: string };
  packagesTitle: { en: string; ar: string };
  packages: {
    en: ServicePackage[];
    ar: ServicePackage[];
  };
}

export const detailedServices: DetailedServiceData[] = [
  {
    id: 'apps',
    icon: 'Smartphone',
    colorType: 'blue',
    badge: {
      en: 'High-Performance Mobile',
      ar: 'تطبيقات الهواتف فائقة الأداء'
    },
    title: {
      en: 'SPID Mobile Apps',
      ar: 'تطبيقات الهواتف الذكية SPID Apps'
    },
    subtitle: {
      en: 'State-of-the-art native and cross-platform mobile apps built for premium performance.',
      ar: 'تطبيقات الهواتف الذكية الأصلية والمتجاوبة المصممة خصيصاً لأعلى مستويات السرعة والأداء.'
    },
    overview: {
      en: 'Our mobile division engineers robust applications designed to leverage native hardware acceleration, keeping memory usage minimal and battery performance optimized. Whether using React Native, Flutter, iOS Swift, or Android Kotlin, we craft responsive touchpoints with secure state persistence.',
      ar: 'يقوم قسم تطبيقات الهواتف لدينا بهندسة برمجيات قوية تستغل تسريع الأجهزة والعتاد الأصلي، مع الحفاظ على الحد الأدنى من استهلاك الذاكرة وتحسين كفاءة البطارية. سواء كنا نستخدم React Native أو Flutter أو Swift أو Kotlin، فإننا نصمم واجهات تفاعلية مع مزامنة آمنة للحالة.'
    },
    deliverablesTitle: {
      en: 'Technical Capabilities',
      ar: 'القدرات والميزات التقنية'
    },
    packagesTitle: {
      en: 'SPID Apps Dedicated Packages',
      ar: 'باقات وحزم تطبيقات SPID المخصصة'
    },
    packages: {
      en: [
        {
          id: 'apps-starter',
          name: 'Holographic MVP',
          price: '15,000 - 25,000',
          billing: 'EGP',
          desc: 'Perfect for launching a single-platform application focusing on the absolute core values.',
          features: [
            'Single Platform Deployment (iOS or Android)',
            'Clean Responsive UI/UX Design',
            'Robust Local Offline Persistence',
            'Standard REST API Integration',
            '1 Month Dedicated Operations Support'
          ]
        },
        {
          id: 'apps-pro',
          name: 'Dynamic Suite Pro',
          price: '35,000 - 55,000',
          billing: 'EGP',
          desc: 'Complete cross-platform application matching modern market standards with secure admin control.',
          features: [
            'Cross-Platform Deployment (iOS & Android)',
            'Custom Admin Dashboard Web Control',
            'High-Frequency Push Notification System',
            'Secure Cloud DB & Cache Pipelines',
            '3 Months Priority Systems Support'
          ]
        },
        {
          id: 'apps-enterprise',
          name: 'Scale Grid Enterprise',
          price: '75,000+',
          billing: 'EGP',
          desc: 'High-end application for corporations demanding extreme sync speeds, offline capability, and heavy load handling.',
          features: [
            'Ultra Low-Latency Real-Time Sync',
            'Biometric Authentication & HW Key Access',
            'Military-Grade 256-Bit Offline Encryption',
            'Advanced Multi-Tenant User Roles',
            '12 Months Full SLA Heartbeat Support'
          ]
        }
      ],
      ar: [
        {
          id: 'apps-starter',
          name: 'باقة التطبيق المصغر MVP',
          price: '15,000 - 25,000',
          billing: 'جنيه مصري',
          desc: 'مثالية لإطلاق تطبيق لمنصة واحدة (آيفون أو أندرويد) مع التركيز الكامل على القيم والميزات الأساسية لعملك.',
          features: [
            'النشر والتشغيل على منصة واحدة (iOS أو Android)',
            'تصميم واجهات مستخدم مذهلة ومتجاوبة بالكامل',
            'تخزين محلي آمن للغاية لدعم العمل دون اتصال بالإنترنت',
            'ربط وتكامل قياسي مع واجهات برمجة التطبيقات REST API',
            'شهر كامل من الدعم الفني والتشغيلي المخصص'
          ]
        },
        {
          id: 'apps-pro',
          name: 'الباقة المتكاملة برو Suite Pro',
          price: '35,000 - 55,000',
          billing: 'جنيه مصري',
          desc: 'تطبيق متكامل لجميع الأنظمة يطابق المعايير العالمية الحديثة مع لوحة تحكم إدارية كاملة ومؤمنة.',
          features: [
            'النشر المزدوج للمنصتين معاً (iOS و Android)',
            'لوحة تحكم إدارية مخصصة لإدارة محتوى التطبيق',
            'نظام إشعارات فورية متقدم عالي السرعة والتفاعل',
            'قواعد بيانات سحابية متقدمة ونقاط مزامنة مؤمنة',
            '3 أشهر من الدعم الفني ذو الأولوية والضمان الشامل'
          ]
        },
        {
          id: 'apps-enterprise',
          name: 'باقة التوسيع اللامتناهي Enterprise',
          price: '75,000+',
          billing: 'جنيه مصري',
          desc: 'باقة مخصصة للمؤسسات الكبرى التي تتطلب سرعة مزامنة فائقة وتأمين بيانات ثنائية الأطراف وتوافق كامل تحت ضغط الاستخدام العالي.',
          features: [
            'مزامنة بيانات فورية فائقة السرعة ومنخفضة الكمون',
            'تسجيل دخول بالمؤشرات الحيوية ومفاتيح الأجهزة الآمنة',
            'تشفير عسكري بقوة 256 بت لقواعد البيانات المحلية',
            'صلاحيات وأدوار متقدمة للمستخدمين والمدراء',
            'دعم وصيانة وضمان كامل 12 شهراً مع اتفاقية SLA'
          ]
        }
      ]
    }
  },
  {
    id: 'web',
    icon: 'Globe',
    colorType: 'blue',
    badge: {
      en: 'Immersive Web Platform',
      ar: 'منصة ويب غامرة وسريعة'
    },
    title: {
      en: 'SPID Web Platforms',
      ar: 'منصات الويب والمواقع SPID Web'
    },
    subtitle: {
      en: 'Stunning, blazing-fast web ecosystems and dynamic SaaS platforms designed for operational scale.',
      ar: 'مواقع رقمية غامرة وتطبيقات ويب سحابية حديثة فائقة السرعة صممت لتوفير أفضل تجربة ونمو لعملائك.'
    },
    overview: {
      en: 'We craft and engineer responsive web applications that score 95+ on Lighthouse metrics. Our development stacks incorporate static-site generation, advanced server-side rendering, and responsive grid layouts to provide zero-friction conversion paths on both mobile and desktop screens.',
      ar: 'نحن نصمم ونطور تطبيقات ويب متجاوبة تسجل أكثر من 95 في مقاييس Lighthouse للأداء والسرعة. تتضمن تقنياتنا توليد الصفحات الثابتة فائق السرعة، الرندرة من جهة السيرفر، وتنسيقات الشبكة المتجاوبة بالكامل لتوفير تجربة خالية من العقبات على الهواتف وأجهزة الكمبيوتر.'
    },
    deliverablesTitle: {
      en: 'Web Stack Advantages',
      ar: 'مزايا حلول الويب لدينا'
    },
    packagesTitle: {
      en: 'SPID Web Dedicated Packages',
      ar: 'باقات وحزم تطوير الويب المخصصة'
    },
    packages: {
      en: [
        {
          id: 'web-starter',
          name: 'Performance Showcase',
          price: '5,000 - 8,000',
          billing: 'EGP',
          desc: 'High-performance digital presentation or portfolio built for lightning-fast speeds and crisp visibility.',
          features: [
            'Up to 5 Elegant Pages tailored for your brand',
            'Fully Responsive Design optimized for all devices',
            'Google SEO Optimization and Schema Integration',
            'Interactive Secure Contact & Inquire Form',
            '1 Month Dedicated Maintenance & Server Monitor'
          ]
        },
        {
          id: 'web-pro',
          name: 'Dynamic Portal Hub',
          price: '12,000 - 18,000',
          billing: 'EGP',
          desc: 'Full-featured interactive portal incorporating advanced content systems and administrator management pipelines.',
          features: [
            'Fully Dynamic Web Interface with Custom Pages',
            'Secure Admin Dashboard with complete CMS',
            'User Authentication, Session Logs & Gatekeepers',
            'Social Media API & Lead Generation Pipelines',
            '3 Months Core Maintenance & Optimization Support'
          ]
        },
        {
          id: 'web-enterprise',
          name: 'Bespoke SaaS Grid',
          price: '25,000 - 40,000',
          billing: 'EGP',
          desc: 'Completely customized web application designed to support transactions, user networks, and core logic tools.',
          features: [
            'Custom Web Application & Core Business Engine',
            'Multi-Platform payment gateway integrations',
            'Blazing-fast Database with advanced querying',
            'Real-time metrics, analytics & automated emails',
            '6 Months Premier Server & System SLA Support'
          ]
        }
      ],
      ar: [
        {
          id: 'web-starter',
          name: 'باقة الهوية الاحترافية',
          price: '5,000 - 8,000',
          billing: 'جنيه مصري',
          desc: 'موقع هوية مذهل يقدم منتجاتك أو خدماتك بسرعة فائقة وجودة استثنائية.',
          features: [
            'ما يصل إلى 5 صفحات مخصصة ومصممة بأناقة لعلامتك التجارية',
            'تصميم متجاوب بالكامل وسريع جداً على كافة الأجهزة والهواتف',
            'تهيئة محركات البحث الأساسية Google SEO والـ Schema الكودية',
            'نموذج اتصال آمن وتفاعلي يرسل مباشرة لبريدك',
            'شهر كامل من المتابعة التقنية ومراقبة الخادم مجاناً'
          ]
        },
        {
          id: 'web-pro',
          name: 'بوابة التفاعل المتكاملة Pro Hub',
          price: '12,000 - 18,000',
          billing: 'جنيه مصري',
          desc: 'بوابة ديناميكية تفاعلية تتيح إدارة كاملة للمحتوى من لوحة تحكم سهلة الاستخدام ومؤمنة بالكامل.',
          features: [
            'واجهة ويب تفاعلية ديناميكية متطورة ومصممة خصيصاً',
            'لوحة تحكم كاملة للمدير لإضافة وتعديل الأقسام والمحتوى',
            'نظام تسجيل دخول وجلسات عمل آمنة للمستخدمين والمدراء',
            'ربط كودي لشبكات التواصل الاجتماعي وبناء قنوات المبيعات',
            '3 أشهر من المتابعة والصيانة الفنية الدورية للسرعة والأمان'
          ]
        },
        {
          id: 'web-enterprise',
          name: 'تطبيقات الويب والـ SaaS المخصصة',
          price: '25,000 - 40,000',
          billing: 'جنيه مصري',
          desc: 'منصة برمجية متكاملة مصممة خصيصاً لدعم عمليات الشراء والدفع، وشبكات المستخدمين، والمنطق البرمجي المخصص لقطاع عملك.',
          features: [
            'برمجة نظام ويب مخصص ومحرك أعمال متكامل من الصفر',
            'ربط بوابات الدفع الإلكتروني (فيزا، فوري، ماستركارد، إلخ)',
            'قواعد بيانات متطورة فائقة السرعة مع تخزين سحابي متزامن',
            'لوحة قياس للمؤشرات الحيوية وإرسال رسائل بريد مؤتمتة للعملاء',
            '6 أشهر من الدعم والضمان التقني الممتاز لاتفاقية الخدمة SLA'
          ]
        }
      ]
    }
  },
  {
    id: 'network',
    icon: 'Network',
    colorType: 'blue',
    badge: {
      en: 'Zero-Lag Connection',
      ar: 'اتصالات صفرية التأخير'
    },
    title: {
      en: 'SPID Network Solutions',
      ar: 'حلول الشبكات والبنية التحتية SPID Network'
    },
    subtitle: {
      en: 'Rock-solid networking and robust server cloud infrastructure designed for modern low-latency demand.',
      ar: 'بنية تحتية للشبكات والخوادم السحابية فائقة الأمان ومصممة خصيصاً للأعمال التي تتطلب سرعة نقل وموثوقية عالية.'
    },
    overview: {
      en: 'We configure low-latency network tunnels, virtual private clouds, and robust load balancers. Our systems are built to withstand high operational load, providing seamless data pipelines with automated failovers and comprehensive heartbeat monitoring systems.',
      ar: 'نقوم بتكوين وضبط أنفاق شبكة منخفضة زمن الاستجابة، وسحب افتراضية خاصة، وموازنات حمل قوية. تم تصميم أنظمتنا لتحمل أعباء تشغيلية هائلة، مع توفير مسارات بيانات سلسة بنقاط حماية وفشل بديلة تلقائية ومراقبة مستمرة.'
    },
    deliverablesTitle: {
      en: 'Network Capabilities',
      ar: 'ميزات وخدمات البنية التحتية'
    },
    packagesTitle: {
      en: 'SPID Network Dedicated Packages',
      ar: 'باقات وحزم الشبكات السحابية من SPID'
    },
    packages: {
      en: [
        {
          id: 'network-starter',
          name: 'Secure Gateway Node',
          price: '8,000 - 12,000',
          billing: 'EGP',
          desc: 'Establish solid network boundaries, local firewall setups, and custom corporate VPN access paths.',
          features: [
            'Local Network Configuration and Diagnostics',
            'Secure Firewall Rules and Port Management',
            'Corporate VPN Access for safe remote work',
            'Network Device Optimization & Setup advisory',
            '1 Month Network Performance Handshake Monitoring'
          ]
        },
        {
          id: 'network-pro',
          name: 'Cloud Cluster Link',
          price: '20,000 - 35,000',
          billing: 'EGP',
          desc: 'High-availability virtual cloud deployment designed to scale web services and systems under load.',
          features: [
            'Virtual Private Cloud (VPC) Sub-netting',
            'Server Orchestration & Automated Backup systems',
            'Port Handshakes & Secure SSL Ingress Management',
            'Dynamic Load Balancer & DNS propagation',
            '3 Months Real-Time Network Health Monitoring'
          ]
        },
        {
          id: 'network-enterprise',
          name: 'Mesh Network Fortress',
          price: '50,000+',
          billing: 'EGP',
          desc: 'High-end network engineering for global structures needing multi-region synchronicity and maximum throughput.',
          features: [
            'Multi-Region Hybrid Cloud Infrastructure Config',
            'Zero-Trust Network Tunneling & Advanced Routing',
            'Auto-Scaling Policies with Instant Failover Nodes',
            '24/7 Heartbeat SLA Node Diagnostics & Logs',
            '12 Months Continuous SLA Priority Network Care'
          ]
        }
      ],
      ar: [
        {
          id: 'network-starter',
          name: 'باقة بوابة الاتصال الآمنة Gateway',
          price: '8,000 - 12,000',
          billing: 'جنيه مصري',
          desc: 'تأسيس بنية تحتية محلية آمنة وجدران نارية متقدمة للشركة مع إعداد شبكات افتراضية خاصة VPN للعمل عن بعد.',
          features: [
            'تهيئة وفحص وتكوين أجهزة الشبكة المحلية بكفاءة',
            'إعداد جدران حماية متقدمة ومراقبة منافذ الشبكة المفتوحة',
            'تأسيس شبكة VPN مخصصة للشركة لدعم العمل عن بعد بأمان',
            'تحسين وضبط أجهزة التوجيه لضمان سرعات اتصال قصوى',
            'شهر كامل من المتابعة ومراقبة كفاءة واستقرار الشبكة'
          ]
        },
        {
          id: 'network-pro',
          name: 'عنقود الخوادم السحابية Cloud Link',
          price: '20,000 - 35,000',
          billing: 'جنيه مصري',
          desc: 'إعداد ونشر بنية تحتية سحابية افتراضية عالية الموثوقية تضمن استقرار مواقعك وأنظمتك تحت أقصى درجات الضغط والزيارات.',
          features: [
            'تهيئة شبكة سحابية خاصة (VPC) مقسمة بشكل مؤمن',
            'إعداد الخوادم ونظام النسخ الاحتياطي التلقائي للبيانات',
            'موازنة الحمولات التلقائية Dynamic Load Balancer لضمان عدم توقف الخدمة',
            'إعداد شهادات الحماية SSL وربط النطاقات بشكل فائق السرعة',
            '3 أشهر من المتابعة اللحظية لصحة وسلامة الخوادم السحابية'
          ]
        },
        {
          id: 'network-enterprise',
          name: 'البنية العالمية الهجينة Mesh Fortress',
          price: '50,000+',
          billing: 'جنيه مصري',
          desc: 'هندسة شبكات معقدة متعددة الأقاليم مصممة للمؤسسات والشركات الكبرى لضمان صفرية التأخير وأعلى درجات الأداء.',
          features: [
            'بناء وتكوين بنية سحابية هجينة ومتعددة الأقاليم الجغرافية',
            'تطبيق بروتوكولات Zero-Trust للوصول الشبكي الآمن',
            'سياسات توسع تلقائي ميكروية مع نقاط تبديل فشل فورية دقيقة',
            'لوحة مراقبة حية ومباشرة للنبض التشغيلي والسجلات 24/7',
            '12 شهراً من الرعاية الفنية ذات الأولوية المطلقة وضمان SLA'
          ]
        }
      ]
    }
  },
  {
    id: 'security',
    icon: 'ShieldCheck',
    colorType: 'red',
    badge: {
      en: 'Impenetrable Fortress',
      ar: 'درع دفاع سيبراني متكامل'
    },
    title: {
      en: 'SPID Cyber Security',
      ar: 'الأمن السيبراني وحماية البيانات SPID Security'
    },
    subtitle: {
      en: 'Engineered security shielding to defend your databases, web endpoints, and workstations from malicious threats.',
      ar: 'حلول دفاع سيبراني جبارة مصممة لحماية قواعد بياناتك، ومواقعك الإلكترونية، وأجهزة شركتك من الهجمات والتهديدات.'
    },
    overview: {
      en: 'Security is not an afterthought; it is built into line one. We provide active encryption modules, multi-factor identification gates, vulnerability assessments, and dynamic scanning agents. We safeguard corporate IP by sealing threat vectors across every network layer.',
      ar: 'الأمن وحماية البيانات ليس مجرد خيار إضافي، بل هو الأساس منذ السطر البرمجي الأول. نحن نقدم وحدات تشفير نشطة، بوابات تحقق متعددة العوامل، تقييم الثغرات الأمنية واختبار الاختراق، وفحص مستمر للشبكات والأنظمة لضمان حماية الملكية الفكرية والبيانات.'
    },
    deliverablesTitle: {
      en: 'Cyber Defense Framework',
      ar: 'إطار العمل الدفاعي المتقدم'
    },
    packagesTitle: {
      en: 'SPID Security Shielding Packages',
      ar: 'باقات الدفاع السيبراني والأمن من SPID'
    },
    packages: {
      en: [
        {
          id: 'security-starter',
          name: 'Vulnerability Audit',
          price: '10,000 - 15,000',
          billing: 'EGP',
          desc: 'Comprehensive penetration testing and infrastructure auditing to discover and list critical vulnerability vectors.',
          features: [
            'Full System Penetration Testing (Black/White Box)',
            'Comprehensive Vulnerability Mapping & Threat Report',
            'Malware & Backdoor scanning inside active files',
            'Security Patch Recommendations & Code Guidelines',
            '1 Month Post-Audit Patch Validation'
          ]
        },
        {
          id: 'security-pro',
          name: 'Active Threat Defense',
          price: '25,000 - 35,000',
          billing: 'EGP',
          desc: 'Establish active web application firewalls and encryption pipelines to monitor and filter server traffic.',
          features: [
            'Active Web Application Firewall (WAF) Integration',
            'Real-Time DDoS protection & bot filtering',
            'End-to-End Encryption (E2EE) for sensitive databases',
            'Multi-Factor Authentication (MFA) Gatekeeper Setup',
            '3 Months Real-Time Security Incident response'
          ]
        },
        {
          id: 'security-enterprise',
          name: 'Zero-Trust Fortress',
          price: '60,000+',
          billing: 'EGP',
          desc: 'Complete high-integrity cryptographic shielding covering servers, nodes, user authentications, and corporate IP.',
          features: [
            'Complete Zero-Trust Access Architecture Setup',
            'Continuous Automated Penetration Testing Agents',
            'Database encryption at rest and in transit (AES-512)',
            'Automated Security Incident Isolation (Safe Sandbox)',
            '12 Months Continuous Security Operations Center (SOC) Support'
          ]
        }
      ],
      ar: [
        {
          id: 'security-starter',
          name: 'باقة فحص واختبار الاختراق Audit',
          price: '10,000 - 15,000',
          billing: 'جنيه مصري',
          desc: 'مراجعة أمنية واختبار اختراق شامل لكشف وتحديد الثغرات ونقاط الضعف الفنية في موقعك أو خوادمك.',
          features: [
            'اختبار اختراق كامل للأنظمة والمواقع (Black/White Box)',
            'تقرير مفصل وشامل بكافة الثغرات الأمنية ونقاط الضعف المكتشفة',
            'فحص دقيق لكود الموقع والملفات لكشف البرمجيات الخبيثة والخلفية',
            'توصيات وحلول فورية لسد الثغرات وتحسين حماية الأكواد',
            'فحص ومراجعة ثانية للتأكد من سد الثغرات بنجاح خلال شهر'
          ]
        },
        {
          id: 'security-pro',
          name: 'باقة الحماية النشطة Threat Defense',
          price: '25,000 - 35,000',
          billing: 'جنيه مصري',
          desc: 'تأسيس جدار حماية نشط لتطبيقات الويب وتشفير دفق البيانات لمنع الاختراقات وتصفية المرور الضار للخوادم.',
          features: [
            'تكامل جدار حماية تطبيقات الويب النشط (WAF)',
            'حماية فائقة من هجمات حجب الخدمة الموزعة DDoS والـ Bots الضارة',
            'تشفير قواعد البيانات الحساسة والمعلومات الشخصية من الأطراف للأطراف',
            'تأسيس نظام تسجيل دخول ذكي ثنائي العوامل MFA للأنظمة',
            '3 أشهر من الاستجابة والتدخل السريع عند استشعار الهجمات والتهديدات'
          ]
        },
        {
          id: 'security-enterprise',
          name: 'باقة درع الحصن السيبراني Fortress',
          price: '60,000+',
          billing: 'جنيه مصري',
          desc: 'حل دفاع سيبراني متكامل عالي الحماية يغطي الخوادم، الأجهزة، تحققات الهوية، لحفظ كامل أصول الشركة وحقوقها الفكرية وبياناتها الحساسة.',
          features: [
            'تأسيس بنية تحتية برمجية بالكامل بنهج Zero-Trust الصارم',
            'وكلاء برمجية آلية تفحص الأنظمة وتجري اختبارات اختراق دورية',
            'تشفير متطور للغاية لقواعد البيانات أثناء الخمول والنقل (AES-512)',
            'نظام عزل وحجر فوري للملفات المصابة أو الهجمات المكتشفة تلقائياً',
            '12 شهراً من المراقبة والتدخل الأمني الفوري عبر مركز عمليات الأمن SOC'
          ]
        }
      ]
    }
  },
  {
    id: 'systems',
    icon: 'Layers',
    colorType: 'blue',
    badge: {
      en: 'Complete Corporate Sync',
      ar: 'مزامنة وإدارة الشركات الكاملة'
    },
    title: {
      en: 'SPID Business Systems',
      ar: 'أنظمة إدارة الأعمال ERP & POS'
    },
    subtitle: {
      en: 'High-performance ERP networks, automated cashier POS setups, and enterprise coordination systems.',
      ar: 'أنظمة ERP مخصصة لتنظيم العمليات، إدارة الحسابات، برمجيات الكاشير ونقاط البيع POS المتصلة فورياً.'
    },
    overview: {
      en: 'Eliminate operational waste with bespoke software modules. We develop custom ERP, POS, CRM, and Inventory ecosystems that bridge gaps between retail floors, supply warehouses, and central financial management. Built to run fast even on legacy local systems.',
      ar: 'تخلص من هدر الموارد والوقت التشغيلي من خلال وحدات برمجية مخصصة ومصممة بدقة لعملك. نحن نطور حلول ERP و POS و CRM وإدارة المخازن المتكاملة تماماً لربط نقاط البيع والمستودعات بالإدارة المالية والقيادة المركزية.'
    },
    deliverablesTitle: {
      en: 'System Integrations',
      ar: 'تكاملات وميزات الأنظمة'
    },
    packagesTitle: {
      en: 'SPID Systems Dedicated Packages',
      ar: 'باقات وحزم أنظمة الأعمال من SPID'
    },
    packages: {
      en: [
        {
          id: 'systems-starter',
          name: 'Retail POS Station',
          price: '12,000 - 18,000',
          billing: 'EGP',
          desc: 'High-performance interactive cashier station built with solid local storage fallback to ensure non-stop sales.',
          features: [
            'Sleek Automated Cashier POS UI Interface',
            'Robust Offline-Ready Local Inventory sync',
            'Dynamic Printed Receipts & Invoice templates',
            'Sales Analytics & Basic Revenue reports',
            '1 Month Launch Support & Hardware Setup Advice'
          ]
        },
        {
          id: 'systems-pro',
          name: 'Enterprise Sync Hub',
          price: '30,000 - 45,000',
          billing: 'EGP',
          desc: 'Complete business workflow coordinator tying inventory, employees, and sales channels under one central cloud.',
          features: [
            'Central Cloud ERP with multi-outlet Inventory control',
            'Employee Shift management & Dynamic Attendance tracking',
            'Advanced Finance Module (Invoices, Expenses, Ledger)',
            'CRM Portal for managing client files and loyalty points',
            '3 Months Priority Operations & Optimization Support'
          ]
        },
        {
          id: 'systems-enterprise',
          name: 'Bespoke ERP Matrix',
          price: '65,000+',
          billing: 'EGP',
          desc: 'Completely tailored operational platform matching the exact manufacturing, logistics, or service workflow of your enterprise.',
          features: [
            '100% Custom Tailored ERP software architecture',
            'Full Supply Chain & Automated Warehouse logistics modules',
            'Advanced Multi-currency finance pipelines & VAT tax modules',
            'Integrated AI Analytics for inventory demand forecasting',
            '12 Months Priority Heartbeat & Continuous Optimization SLA'
          ]
        }
      ],
      ar: [
        {
          id: 'systems-starter',
          name: 'نظام الكاشير ونقاط البيع POS Core',
          price: '12,000 - 18,000',
          billing: 'جنيه مصري',
          desc: 'محطة كاشير ومبيعات تفاعلية فائقة السرعة مع ميزة العمل دون إنترنت لضمان استمرارية عمليات البيع دون أي توقف.',
          features: [
            'واجهة كاشير ونقاط بيع مبيعات ذكية وسلسة للغاية',
            'مزامنة فورية للمخزون والمنتجات مع ميزة الحفظ المحلي',
            'تصميم قوالب الفواتير وإيصالات البيع المطبوعة وتوصيل الطابعات',
            'تحليلات مبيعات يومية وتقارير أساسية مدمجة للإيرادات والربح',
            'شهر كامل من المتابعة وضبط وملاءمة النظام مع الأجهزة'
          ]
        },
        {
          id: 'systems-pro',
          name: 'بوابة الإدارة الشاملة ERP Standard',
          price: '30,000 - 45,000',
          billing: 'جنيه مصري',
          desc: 'منسق أعمال متكامل ومترابط يربط مخزونك، وموظفيك، وقنوات مبيعاتك تحت لوحة تحكم سحابية واحدة لسهولة القرار.',
          features: [
            'نظام سحابي مركزي لإدارة المخازن المتعددة والفروع الموزعة',
            'إدارة شفتات الموظفين والحضور والانصراف والرواتب الأساسية',
            'وحدة مالية متطورة (المبيعات، النفقات، الموردين، حسابات الأرباح)',
            'بوابة CRM لإدارة بيانات وعملاء الشركة ومستويات ولائهم',
            '3 أشهر من الصيانة الفنية والتحديث والتدريب للموظفين'
          ]
        },
        {
          id: 'systems-enterprise',
          name: 'باقة الـ ERP المخصص بالكامل Matrix',
          price: '65,000+',
          billing: 'جنيه مصري',
          desc: 'منصة برمجية هائلة مخصصة 100% لملاءمة سير العمل الدقيق والتصنيع أو الخدمات اللوجستية الخاص بشركتك ومؤسستك.',
          features: [
            'بناء وتطوير بنية برمجيات الـ ERP مخصصة ومصممة من الصفر',
            'وحدات متكاملة لإدارة سلاسل الإمداد ومستودعات التخزين الآلية',
            'إدارة مالية متقدمة متعددة العملات مع حسابات الضرائب والقيمة المضافة',
            'تحليلات آلية متقدمة للتنبؤ بمستويات ومستقبل طلبات المخزون',
            '12 شهراً من الرعاية والصيانة الفنية اللحظية وضمان SLA متكامل'
          ]
        }
      ]
    }
  }
];
