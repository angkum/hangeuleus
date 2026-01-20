import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppState, AdminContextType, Language, SiteContent, MenuItem, NewsPost } from '../types';
import { INITIAL_STATE } from '../constants';

const AppContext = createContext<AdminContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  // Load from local storage on mount (persistence simulation)
  useEffect(() => {
    const saved = localStorage.getItem('hangeuleus_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // --- Migration Logic for new fields ---
        // Ensure footer exists
        if (!parsed.content.footer) {
             parsed.content.footer = INITIAL_STATE.content.footer;
        }
        // Ensure stats exists
        if (!parsed.content.about.stats) {
             parsed.content.about.stats = INITIAL_STATE.content.about.stats;
        }

        setState(parsed);
      } catch (e) {
        console.error('Failed to load state', e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('hangeuleus_state', JSON.stringify(state));
  }, [state]);

  const setLanguage = (lang: Language) => {
    setState(prev => ({ ...prev, lang }));
  };

  const updateContent = (section: keyof SiteContent, data: any) => {
    setState(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: { ...prev.content[section], ...data }
      }
    }));
  };

  const updateTheme = (color: string) => {
    setState(prev => ({ ...prev, theme: { primaryColor: color } }));
  };

  const addMenuItem = (item: MenuItem) => {
    setState(prev => ({ ...prev, menu: [...prev.menu, item] }));
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setState(prev => ({
      ...prev,
      menu: prev.menu.map(item => item.id === updatedItem.id ? updatedItem : item)
    }));
  };

  const deleteMenuItem = (id: string) => {
    setState(prev => ({
      ...prev,
      menu: prev.menu.filter(item => item.id !== id)
    }));
  };

  const addNews = (post: NewsPost) => {
    setState(prev => ({ ...prev, news: [post, ...prev.news] }));
  };

  const updateNews = (updatedPost: NewsPost) => {
    setState(prev => ({
      ...prev,
      news: prev.news.map(post => post.id === updatedPost.id ? updatedPost : post)
    }));
  };

  const deleteNews = (id: string) => {
    setState(prev => ({
      ...prev,
      news: prev.news.filter(post => post.id !== id)
    }));
  };

  return (
    <AppContext.Provider value={{
      state,
      setLanguage,
      updateContent,
      updateTheme,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addNews,
      updateNews,
      deleteNews
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};