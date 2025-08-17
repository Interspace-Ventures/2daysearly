import { Company, Partner, ImageAsset } from '@/types';

// Image assets with proper typing
export const IMAGES = {
  logo: {
    src: "/images/2-days-early-calendar-logo-2025-banner.png",
    fallback: "/images/2-days-early-calendar-icon-2025.png"
  } as ImageAsset,
  calendarIcon: {
    src: "/images/2-days-early-calendar-icon-2025.png",
    fallback: "/images/2-days-early-calendar-icon-2025.png"
  } as ImageAsset,
  banner: {
    src: "/images/2-days-early-calendar-logo-2025-banner.png",
    fallback: "/images/2-days-early-logo-2025.png"
  } as ImageAsset,
  companies: {
    placeholder: "/images/company-placeholder.svg",
    backpack: "/images/backpack.png",
    harper: "/images/harper.png",
    juno: "/images/juno.png",
    fizz: "/images/fizz-logo.svg",
    hadrius: "/images/hadrius-logo.svg",
    kartera: "/images/kartera.png",
    sundae: "/images/sundae.png",
    waldo: "/images/waldo.png"
  }
} as const;

// Portfolio companies data
export const COMPANIES: Company[] = [
  {
    name: "BACKPACK",
    href: "https://www.backpack529.com/",
    description: "SIMPLIFYING 529 PLAN MANAGEMENT FOR FAMILIES AND ADVISORS WITH INNOVATIVE PAYMENT SOLUTIONS.",
    logo: IMAGES.companies.backpack,
    color: "bg-blue-400"
  },
  {
    name: "JUNO", 
    href: "https://juno.finance/",
    description: "MODERN BANKING FOR THE CRYPTO-NATIVE, WITH SEAMLESS ON-RAMPS AND A FOCUS ON USER EXPERIENCE.",
    logo: IMAGES.companies.juno,
    color: "bg-purple-400"
  },
  {
    name: "FIZZ",
    href: "https://joinfizz.com",
    description: "SOCIAL DEBIT CARD AND FINANCIAL PLATFORM DESIGNED FOR COLLEGE STUDENTS AND YOUNG ADULTS.",
    logo: IMAGES.companies.fizz,
    color: "bg-green-400"
  },
  {
    name: "HADRIUS",
    href: "https://hadrius.com",
    description: "AI-POWERED COMPLIANCE PLATFORM FOR SEC & FINRA REGULATED FIRMS, SAVING 19HRS/WEEK ON COMPLIANCE TASKS.",
    logo: IMAGES.companies.hadrius,
    color: "bg-purple-400"
  },
  {
    name: "KARTERA",
    href: "https://www.kartera.com",
    description: "EMPOWERING FINANCIAL ADVISORS WITH DIGITAL-FIRST SOLUTIONS TO SERVE THE NEXT GENERATION OF WEALTH.",
    logo: IMAGES.companies.kartera,
    color: "bg-yellow-400"
  },
  {
    name: "SUNDAE",
    href: "https://www.sundae.com",
    description: "MARKETPLACE CONNECTING HOMEOWNERS LOOKING TO SELL WITH PROPERTY INVESTORS FOR FAIR, OFF-MARKET DEALS.",
    logo: IMAGES.companies.sundae,
    color: "bg-orange-400"
  },
  {
    name: "WALDO",
    href: "https://www.waldo.ai/",
    description: "AI-POWERED FRAUD PREVENTION THAT AUTOMATES COMPLIANCE AND KEEPS YOUR BUSINESS SAFE.",
    logo: IMAGES.companies.waldo,
    color: "bg-red-400"
  }
];

// Partners data - JSX will be defined in the component file due to import constraints