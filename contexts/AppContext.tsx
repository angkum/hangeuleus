import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AppState, AdminContextType, Language, SiteContent, MenuItem, NewsPost, MenuCategory, MenuSubCategory } from "../types";
import { INITIAL_STATE } from "../constants";

const AppContext = createContext<AdminContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  // ✅ Only allow localStorage persistence on /admin
  const isAdminRoute =
    typeof window !== "undefined" &&
    window.location.pathname.toLowerCase().startsWith("/admin");

  const STORAGE_KEY = "hangeuleus_state";

  // Load from local storage on mount (Admin only)
  useEffect(() => {
    // ✅ On public pages, ensure no local overrides can affect what visitors see
    if (!isAdminRoute) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      return; // public pages should use INITIAL_STATE from constants.ts only
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      // --- Migration Logic for new fields ---
      // Ensure footer exists
      if (!parsed?.content?.footer) {
        parsed.content = parsed.content || {};
        parsed.content.footer = INITIAL_STATE.content.footer;
      }

      // Ensure stats exists
      if (!parsed?.content?.about?.stats) {
        parsed.content = parsed.content || {};
        parsed.content.about = parsed.content.about || {};
        parsed.content.about.stats = INITIAL_STATE.content.about.stats;
      }

      // Ensure hero opacity exists
      if (parsed?.content?.hero?.imageOpacity === undefined) {
        parsed.content = parsed.content || {};
        parsed.content.hero = parsed.content.hero || {};
        parsed.content.hero.imageOpacity = 0.6;
      }

      // Ensure Categories exist (Migration from old version)
      if (!parsed.categories || parsed.categories.length === 0) {
        parsed.categories = INITIAL_STATE.categories;
        parsed.subCategories = INITIAL_STATE.subCategories;
        // Note: Old menu items won't have correct subCategoryId if we just load old state.
        // In a real app, we'd run a migration script. For this demo, we assume the user 
        // resets data if structure changes drastically, or we rely on INITIAL_STATE if parsed is invalid.
      }

      setState(parsed);
    } catch (e) {
      console.error("Failed to load state", e);
    }
  }, [isAdminRoute]);

  // Save to local storage on change (Admin only)
  useEffect(() => {
    if (!isAdminRoute) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save state to localStorage. Quota exceeded or storage error.", e);
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

  // --- Menu Items ---
  const addMenuItem = (item: MenuItem) => {
    setState((prev) => ({ ...prev, menu: [...prev.menu, item] }));
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setState((prev) => ({
      ...prev,
      menu: prev.menu.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    }));
  };

  const deleteMenuItem = (id: string) => {
    setState((prev) => ({
      ...prev,
      menu: prev.menu.filter((item) => item.id !== id),
    }));
  };

  // --- Categories ---
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
      // Also delete subcategories? For safety, maybe just unlink or leave them.
      // Let's remove subcategories to keep it clean.
      subCategories: prev.subCategories.filter(s => s.categoryId !== id)
    }));
  }

  // --- SubCategories ---
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

  // --- News ---
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