// Core application types
export interface Company {
  name: string;
  href: string;
  description: string;
  logo: string;
}

export interface Partner {
  name: string;
  bio: React.ReactNode;
  image: string;
  imageClassName?: string;
}

export interface ImageAsset {
  src: string;
  fallback: string;
}

export interface Theme {
  fonts: {
    primary: string;
    secondary: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  shadows: {
    neo: string;
    neoLg: string;
    neoXl: string;
  };
}