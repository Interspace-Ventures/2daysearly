import { Company, Partner, ImageAsset } from '@/types';

// Image assets with proper typing
export const IMAGES = {
  logo: {
    src: "/images/2-days-early-calendar-logo-2025-banner-v2.png?v=3",
    fallback: "/images/2-days-early-calendar-icon-2025-v2.png?v=3"
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
    juno: "/images/juno.png",
    mine: "/images/mine-logo.png",
    hadrius: "/images/hadrius-logo.png",
    kartera: "/images/kartera.png",
    sundae: "/images/sundae.png",
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
    name: "JUNO",
    href: "https://juno.finance/",
    description: "Modern banking for the crypto-native, with seamless on-ramps and a focus on user experience.",
    logo: IMAGES.companies.juno
  },
  {
    name: "MINE",
    href: "https://usemine.com",
    description: "Build credit, stay on budget, and control your money.",
    logo: IMAGES.companies.mine
  },
  {
    name: "HADRIUS",
    href: "https://hadrius.com",
    description: "AI-powered compliance platform for SEC & FINRA regulated firms, saving 19hrs/week on compliance tasks.",
    logo: IMAGES.companies.hadrius
  },
  {
    name: "KARTERA",
    href: "https://www.kartera.com",
    description: "Empowering financial advisors with digital-first solutions to serve the next generation of wealth.",
    logo: IMAGES.companies.kartera
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