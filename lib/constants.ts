import { Company, Partner, ImageAsset } from '@/types';

// Image assets with proper typing
export const IMAGES = {
  logo: {
    src: "/images/2-days-early-wordmark-2026-v4-nobg.png?v=5",
    fallback: "/images/2-days-early-calendar-logo-2025-banner-v2.png?v=3"
  } as ImageAsset,
  calendarIcon: {
    src: "/images/2-days-early-calendar-icon-2025-v2.png",
    fallback: "/images/2-days-early-calendar-icon-2025-v2.png"
  } as ImageAsset,
  banner: {
    src: "/images/2-days-early-calendar-logo-2025-banner-v2.png?v=3",
    fallback: "/images/2-days-early-logo-2025-v2.png?v=3"
  } as ImageAsset,
  companies: {
    placeholder: "/images/company-placeholder.svg",
    backpack: "/images/backpack.png",
    harper: "/images/harper.png",
    campus: "/images/campus.png",
    coast: "/images/coast.png",
    nfaTrade: "/images/nfa-trade.svg",
    hadrius: "/images/hadrius-logo.png",
    keep: "/images/keep.png",
    sundae: "/images/sundae.png",
    unoWallet: "/images/uno-wallet.png",
    waldo: "/images/waldo.png",
    instaswitch: "/images/instaswitch-logo.png"
  }
} as const;

// Portfolio companies data
export const COMPANIES: Company[] = [
  {
    name: "BACKPACK",
    href: "https://www.backpack529.com/",
    description: "Simplifying 529 plan management for families and advisors with innovative payment solutions.",
    logo: IMAGES.companies.backpack
  },
  {
    name: "NFA.TRADE",
    href: "https://nfa.trade/",
    description: "A trading terminal that turns high-signal social posts into executable trades.",
    logo: IMAGES.companies.nfaTrade
  },
  {
    name: "HADRIUS",
    href: "https://hadrius.com",
    description: "AI-powered compliance platform for SEC & FINRA regulated firms, saving 19hrs/week on compliance tasks.",
    logo: IMAGES.companies.hadrius
  },
  {
    name: "CAMPUS",
    href: "https://campus.edu/",
    description: "An accredited online community college expanding access to live higher education.",
    logo: IMAGES.companies.campus
  },
  {
    name: "COAST",
    href: "https://coastpay.com/",
    description: "A modern commercial card and expense management platform built for fleet operators.",
    logo: IMAGES.companies.coast
  },
  {
    name: "KEEP",
    href: "https://www.trykeep.com/",
    description: "All-in-one business banking, cards, expense management, and growth capital for Canadian companies.",
    logo: IMAGES.companies.keep
  },
  {
    name: "UNO WALLET",
    href: "https://myunowallet.com/",
    description: "A smart wallet that helps consumers choose the best rewards card for every purchase.",
    logo: IMAGES.companies.unoWallet
  },
  {
    name: "SUNDAE",
    href: "https://www.sundae.com",
    description: "Marketplace connecting homeowners looking to sell with property investors for fair, off-market deals.",
    logo: IMAGES.companies.sundae
  },
  {
    name: "WALDO",
    href: "https://www.waldo.ai/",
    description: "AI-powered treasury management for startups.",
    logo: IMAGES.companies.waldo,
    markup: true
  },
  {
    name: "INSTASWITCH",
    href: "https://instaswitch.co",
    description: "Automate business bank switching — move income, payroll, spend, and vendors instantly.",
    logo: IMAGES.companies.instaswitch,
    markup: true
  }
];

// Partners data - JSX is defined in components/sections/partners.tsx
