
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AppState, AdminContextType, Language, SiteContent, MenuItem, NewsPost, MenuCategory, MenuSubCategory } from "../types";
import { INITIAL_STATE } from "../constants";

interface ExtendedAdminContextType extends AdminContextType {
  batchUpdateMenuItems: (updatedItems: MenuItem[]) => void;
}

const AppContext = createContext<ExtendedAdminContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const isAdminRoute =
    typeof window !== "undefined" &&
    window.location.pathname.toLowerCase().startsWith("/admin");

  const STORAGE_KEY = "hangeuleus_state";

  useEffect(() => {
    if (!isAdminRoute) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (!parsed?.content?.footer) {
        parsed.content = parsed.content || {};
        parsed.content.footer = INITIAL_STATE.content.footer;
      }
      if (!parsed?.content?.about?.stats) {
        parsed.content = parsed.content || {};
        parsed.content.about = parsed.content.about || {};
        parsed.content.about.stats = INITIAL_STATE.content.about.stats;
      }
      if (parsed?.content?.hero?.imageOpacity === undefined) {
        parsed.content = parsed.content || {};
        parsed.content.hero = parsed.content.hero || {};
        parsed.content.hero.imageOpacity = 0.6;
      }
      if (!parsed.categories || parsed.categories.length === 0) {
        parsed.categories = INITIAL_STATE.categories;
        parsed.subCategories = INITIAL_STATE.subCategories;
      }
      setState(parsed);
    } catch (e) {
      console.error("Failed to load state", e);
    }
  }, [isAdminRoute]);

  useEffect(() => {
    if (!isAdminRoute) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }, [state, isAdminRoute]);

  const setLanguage = (lang: Language) => {
    setState((prev) => ({ ...prev, lang }));
  };

  const updateContent = (section: keyof SiteContent, data: any) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: { ...prev.content[section], ...data },
      },
    }));
  };

  const updateTheme = (color: string) => {
    setState((prev) => ({ ...prev, theme: { primaryColor: color } }));
  };

  const addMenuItem = (item: MenuItem) => {
    setState((prev) => ({ ...prev, menu: [...prev.menu, item] }));
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setState((prev) => ({
      ...prev,
      menu: prev.menu.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    }));
  };

  const batchUpdateMenuItems = (updatedItems: MenuItem[]) => {
    setState((prev) => {
      const newMenu = [...prev.menu];
      updatedItems.forEach(updated => {
        const index = newMenu.findIndex(m => m.id === updated.id);
        if (index !== -1) newMenu[index] = updated;
      });
      return { ...prev, menu: newMenu };
    });
  };

  const deleteMenuItem = (id: string) => {
    setState((prev) => ({
      ...prev,
      menu: prev.menu.filter((item) => item.id !== id),
    }));
  };

  const addCategory = (cat: MenuCategory) => {
    setState(prev => ({ ...prev, categories: [...prev.categories, cat] }));
  }
  const updateCategory = (updated: MenuCategory) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.map(c => c.id === updated.id ? updated : c)
    }));
  }
  const deleteCategory = (id: string) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id),
      subCategories: prev.subCategories.filter(s => s.categoryId !== id)
    }));
  }

  const addSubCategory = (sub: MenuSubCategory) => {
    setState(prev => ({ ...prev, subCategories: [...prev.subCategories, sub] }));
  }
  const updateSubCategory = (updated: MenuSubCategory) => {
    setState(prev => ({
      ...prev,
      subCategories: prev.subCategories.map(s => s.id === updated.id ? updated : s)
    }));
  }
  const deleteSubCategory = (id: string) => {
    setState(prev => ({
      ...prev,
      subCategories: prev.subCategories.filter(s => s.id !== id)
    }));
  }

  const addNews = (post: NewsPost) => {
    setState((prev) => ({ ...prev, news: [post, ...prev.news] }));
  };

  const updateNews = (updatedPost: NewsPost) => {
    setState((prev) => ({
      ...prev,
      news: prev.news.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    }));
  };

  const deleteNews = (id: string) => {
    setState((prev) => ({
      ...prev,
      news: prev.news.filter((post) => post.id !== id),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setLanguage,
        updateContent,
        updateTheme,
        addMenuItem,
        updateMenuItem,
        batchUpdateMenuItems,
        deleteMenuItem,
        addCategory,
        updateCategory,
        deleteCategory,
        addSubCategory,
        updateSubCategory,
        deleteSubCategory,
        addNews,
        updateNews,
        deleteNews,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
