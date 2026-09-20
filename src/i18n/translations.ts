export type Language = "en" | "ar";

export const translations = {
  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      startProject: "Start a project",
    },
    hero: {
      est: "( est. 2021 )",
      titleLine1: "We Build",
      titleLine2: "Products.",
      remoteStudio: "( remote studio )",
      tagline:
        "YB Dev is a digital studio building web, mobile & desktop products.",
      description:
        "We design and build software for businesses that care about the details — not another anonymous dev shop.",
      startProject: "Start a project",
      whatsapp: "Chat on WhatsApp",
    },
    services: {
      label: "What we do",
      headingA: "One team, three",
      headingB: "disciplines.",
      viewPricing: "View pricing",
      items: {
        "web-development": {
          title: "Web Development",
          description:
            "Marketing sites, dashboards and full web applications built for speed, accessibility and long-term maintainability.",
        },
        "mobile-apps": {
          title: "Mobile Apps",
          description:
            "Native-feeling iOS and Android apps, from first prototype through App Store and Play Store release.",
        },
        "desktop-software": {
          title: "Desktop Software",
          description:
            "Custom internal tools and desktop applications built around how your team actually works, not a generic template.",
        },
      },
    },
    process: {
      label: "How we work",
      headingA: "Four steps,",
      headingB: "no surprises.",
      steps: [
        {
          title: "Discover",
          description:
            "We start with a working session to understand the problem, not just the feature list — what the business actually needs to be true a month after launch.",
        },
        {
          title: "Design",
          description:
            "Wireframes and UI direction get signed off before a line of production code is written, so revisions happen on paper, not in a finished build.",
        },
        {
          title: "Build",
          description:
            "Development happens in short milestones with something demoable at each one — you're never waiting weeks to see progress.",
        },
        {
          title: "Launch",
          description:
            "We handle deployment, monitor the first weeks in production, and stay on for support instead of disappearing after handoff.",
        },
      ],
    },
    projectsSection: {
      label: "Selected work",
      headingA: "Ideas turned into",
      headingB: "digital products.",
      viewAll: "View all projects",
      viewCaseStudy: "View case study",
      visitSite: "Visit site",
    },
    about: {
      label: "About us",
      headingA: "We build like it's",
      headingB: "our own product.",
      paragraph:
        "YB Dev is a small, product-focused studio. We don't hand a spec to a queue of anonymous developers — the same people who plan your project design and build it, end to end. That's what lets us move fast without cutting corners on the details that make software feel considered.",
      stats: [
        { value: "30+", label: "Projects shipped" },
        { value: "5", label: "Years building" },
        { value: "98%", label: "Client retention" },
      ],
    },
    testimonials: {
      label: "What clients say",
      items: [
        {
          quote:
            "They didn't just build what we asked for — they pushed back on a couple of ideas that would've caused problems later, and they were right both times.",
          author: "Sarah Chen",
          role: "Founder, Marketplace client",
        },
        {
          quote:
            "Fast, communicative, and the code quality was noticeably better than the last agency we used.",
          author: "David Okafor",
          role: "Operations Lead",
        },
        {
          quote:
            "Our internal tool finally feels like software our team actually wants to use.",
          author: "Priya Patel",
          role: "COO",
        },
      ],
    },
    contact: {
      label: "Get in touch",
      headingA: "Have a project",
      headingB: "in mind?",
      paragraph:
        "Tell us what you're building. We'll get back to you within one business day.",
      location: "Remote — working with clients worldwide",
      formName: "Your name",
      formEmail: "Email address",
      formMessage: "Tell us about your project",
      send: "Send message",
      sending: "Sending…",
success: "Thanks! Your message has been sent — we'll get back to you soon.",
error: "Something went wrong. Please try again or email us directly.",
    },
    footer: {
      tagline:
        "A product-focused studio building web, mobile and desktop software for businesses that care about the details.",
      explore: "Explore",
      contactHeading: "Contact",
      follow: "Follow",
      remote: "Remote — worldwide",
      rights: "All rights reserved.",
      process: "Process",
    },
    work: {
      label: "All work",
      headingA: "Every project,",
      headingB: "one place.",
      caseStudy: "Case study",
    },
    projectCase: {
      backToWork: "Back to work",
      brief: "The brief",
      approach: "Our approach",
      startSimilar: "Start a similar project",
    },
    pricingPage: {
      backToServices: "Back to services",
      pricingLabel: "Pricing",
      getPlan: "Get this plan",
      recommended: "Recommended",
    },
  },
  ar: {
    nav: {
      services: "الخدمات",
      projects: "المشاريع",
      about: "من نحن",
      contact: "تواصل معنا",
      startProject: "ابدأ مشروعك",
    },
    hero: {
      est: "( تأسست 2021 )",
      titleLine1: "نحن نبني",
      titleLine2: "منتجات رقمية.",
      remoteStudio: "( استوديو عن بُعد )",
      tagline:
        "واي بي ديف استوديو رقمي يبني مواقع الويب وتطبيقات الجوال والبرمجيات المكتبية.",
      description:
        "نصمم ونبني برمجيات للشركات التي تهتم بالتفاصيل — لسنا مجرد شركة برمجة مجهولة أخرى.",
      startProject: "ابدأ مشروعك",
      whatsapp: "تواصل عبر واتساب",
    },
    services: {
      label: "ماذا نقدم",
      headingA: "فريق واحد،",
      headingB: "ثلاثة تخصصات.",
      viewPricing: "عرض الأسعار",
      items: {
        "web-development": {
          title: "تطوير الويب",
          description:
            "مواقع تعريفية، لوحات تحكم، وتطبيقات ويب كاملة مبنية للسرعة وسهولة الوصول والاستمرارية على المدى الطويل.",
        },
        "mobile-apps": {
          title: "تطبيقات الجوال",
          description:
            "تطبيقات iOS و Android بتجربة أصلية، من النموذج الأولي وصولاً إلى النشر على App Store و Play Store.",
        },
        "desktop-software": {
          title: "برمجيات سطح المكتب",
          description:
            "أدوات داخلية وتطبيقات مكتبية مخصصة تُبنى حول طريقة عمل فريقك الفعلية، وليست قالبًا عامًا جاهزًا.",
        },
      },
    },
    process: {
      label: "كيف نعمل",
      headingA: "أربع خطوات،",
      headingB: "بدون مفاجآت.",
      steps: [
        {
          title: "الاكتشاف",
          description:
            "نبدأ بجلسة عمل لفهم المشكلة، وليس فقط قائمة المزايا — ما الذي يحتاجه العمل فعلًا ليبقى صحيحًا بعد شهر من الإطلاق.",
        },
        {
          title: "التصميم",
          description:
            "يتم اعتماد التصاميم والواجهات قبل كتابة أي سطر من الكود النهائي، بحيث تتم التعديلات على الورق لا على بناء جاهز.",
        },
        {
          title: "البناء",
          description:
            "تتم البرمجة على مراحل قصيرة يمكن عرضها في كل مرحلة — لن تنتظر أسابيع لترى أي تقدم.",
        },
        {
          title: "الإطلاق",
          description:
            "نتولى عملية النشر، ونراقب الأسابيع الأولى في الإنتاج، ونبقى لتقديم الدعم بدل الاختفاء بعد التسليم.",
        },
      ],
    },
    projectsSection: {
      label: "أعمال مختارة",
      headingA: "أفكار تحولت إلى",
      headingB: "منتجات رقمية.",
      viewAll: "عرض كل المشاريع",
      viewCaseStudy: "عرض دراسة الحالة",
      visitSite: "زيارة الموقع",
    },
    about: {
      label: "من نحن",
      headingA: "نبني كأنه",
      headingB: "منتجنا الخاص.",
      paragraph:
        "واي بي ديف استوديو صغير يركز على المنتج. نحن لا نسلّم المواصفات لطابور من المطورين المجهولين — نفس الأشخاص الذين يخططون لمشروعك هم من يصممونه ويبنونه من البداية للنهاية. هذا ما يتيح لنا العمل بسرعة دون التضحية بالتفاصيل التي تجعل البرمجيات مدروسة فعلاً.",
      stats: [
        { value: "+30", label: "مشروعًا منجزًا" },
        { value: "5", label: "سنوات من العمل" },
        { value: "98%", label: "نسبة بقاء العملاء" },
      ],
    },
    testimonials: {
      label: "آراء العملاء",
      items: [
        {
          quote:
            "لم يكتفوا ببناء ما طلبناه فقط — بل اعترضوا على بعض الأفكار التي كانت ستسبب مشاكل لاحقًا، وكانوا محقين في المرتين.",
          author: "Sarah Chen",
          role: "مؤسسة، عميل منصة تسويق",
        },
        {
          quote:
            "سرعة وتواصل ممتازان، وجودة الكود كانت أفضل بشكل ملحوظ من الوكالة السابقة التي تعاملنا معها.",
          author: "David Okafor",
          role: "مسؤول العمليات",
        },
        {
          quote: "أداتنا الداخلية أصبحت أخيرًا برنامجًا يرغب فريقنا فعلاً في استخدامه.",
          author: "Priya Patel",
          role: "المديرة التنفيذية للعمليات",
        },
      ],
    },
    contact: {
      label: "تواصل معنا",
      headingA: "لديك مشروع",
      headingB: "في بالك؟",
      paragraph: "أخبرنا بما تريد بناءه، وسنرد عليك خلال يوم عمل واحد.",
      location: "عن بعد — نعمل مع عملاء حول العالم",
      formName: "اسمك",
      formEmail: "البريد الإلكتروني",
      formMessage: "أخبرنا عن مشروعك",
      send: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
success: "شكرًا! تم إرسال رسالتك — سنتواصل معك قريبًا.",
error: "حدث خطأ ما. حاول مرة أخرى أو راسلنا مباشرة.",
    },
    footer: {
      tagline:
        "استوديو يركز على المنتج، يبني برمجيات الويب والجوال وسطح المكتب للشركات التي تهتم بالتفاصيل.",
      explore: "استكشف",
      contactHeading: "تواصل",
      follow: "تابعنا",
      remote: "عن بعد — حول العالم",
      rights: "جميع الحقوق محفوظة.",
      process: "طريقة العمل",
    },
    work: {
      label: "كل الأعمال",
      headingA: "كل مشروع،",
      headingB: "في مكان واحد.",
      caseStudy: "دراسة الحالة",
    },
    projectCase: {
      backToWork: "العودة إلى الأعمال",
      brief: "الفكرة",
      approach: "منهجنا",
      startSimilar: "ابدأ مشروعًا مشابهًا",
    },
    pricingPage: {
      backToServices: "العودة إلى الخدمات",
      pricingLabel: "الأسعار",
      getPlan: "اختر هذه الباقة",
      recommended: "الأكثر طلبًا",
    },
  },
} as const;