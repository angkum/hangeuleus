
export type Language = 'en' | 'ko';

export interface LocalizedString {
  en: string;
  ko: string;
}

export interface MenuCategory {
  id: string;
  name: LocalizedString;
  order: number;
}

export interface MenuSubCategory {
  id: string;
  categoryId: string; // Links to MenuCategory
  name: LocalizedString;
  order: number;
}

export interface MenuItem {
  id: string;
  subCategoryId: string; // Changed from category string to subCategoryId
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  image: string;
  isPopular: boolean;
  order?: number; // Added for ordering items
}

export interface NewsPost {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  date: string;
  image?: string;
}

export interface SiteContent {
  hero: {
    title: LocalizedString;
    subtitle: LocalizedString;
    cta: LocalizedString;
    image: string;
    imageOpacity?: number;
  };
  about: {
    title: LocalizedString;
    description: LocalizedString;
    details: LocalizedString;
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
  categories: MenuCategory[];
  subCategories: MenuSubCategory[];
  menu: MenuItem[];
  news: NewsPost[];
  theme: {
    primaryColor: string;
  };
}

export interface AdminContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
  updateContent: (section: keyof SiteContent, data: any) => void;
  updateTheme: (color: string) => void;
  
  // Menu Item Actions
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  
  // Category Actions
  addCategory: (cat: MenuCategory) => void;
  updateCategory: (cat: MenuCategory) => void;
  deleteCategory: (id: string) => void;
  
  // SubCategory Actions
  addSubCategory: (sub: MenuSubCategory) => void;
  updateSubCategory: (sub: MenuSubCategory) => void;
  deleteSubCategory: (id: string) => void;

  // News Actions
  addNews: (post: NewsPost) => void;
  updateNews: (post: NewsPost) => void;
  deleteNews: (id: string) => void;
}
