export type Language = 'en' | 'ko';

export interface LocalizedString {
  en: string;
  ko: string;
}

export interface MenuItem {
  id: string;
  category: 'noodles' | 'rice' | 'dishes' | 'beverages';
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  image: string;
  isPopular: boolean;
}

export interface NewsPost {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  date: string;
}

export interface SiteContent {
  hero: {
    title: LocalizedString;
    subtitle: LocalizedString;
    cta: LocalizedString;
    image: string;
    imageOpacity?: number; // Added opacity control (0.0 to 1.0)
  };
  about: {
    title: LocalizedString;
    description: LocalizedString; // Short summary for Home page
    details: LocalizedString;     // Full content for About page
    image: string;
    stats: {
      stat1: {
        value: string;
        label: LocalizedString;
      };
      stat2: {
        value: string;
        label: LocalizedString;
      };
    };
  };
  contact: {
    address: LocalizedString;
    phone: string;
    email: string;
    hours: LocalizedString;
    social: {
      instagram: string;
      facebook: string;
      threads: string;
    };
  };
  footer: {
    brandName: LocalizedString;
    tagline: LocalizedString;
    logo: string;
  };
}

export interface AppState {
  lang: Language;
  content: SiteContent;
  menu: MenuItem[];
  news: NewsPost[];
  theme: {
    primaryColor: string; // The Gold Color
  };
}

export interface AdminContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
  updateContent: (section: keyof SiteContent, data: any) => void;
  updateTheme: (color: string) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  addNews: (post: NewsPost) => void;
  updateNews: (post: NewsPost) => void;
  deleteNews: (id: string) => void;
}