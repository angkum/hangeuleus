import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { SectionTitle, useInView, useIsTouch } from '../components/UI';
import { X, ZoomIn } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuGridItemProps {
  item: MenuItem;
  lang: 'en' | 'ko';
  primaryColor: string;
  onImageClick: (item: MenuItem) => void;
}

const MenuGridItem: React.FC<MenuGridItemProps> = ({ item, lang, primaryColor, onImageClick }) => {
  return (
    <div className="flex gap-6 group">
      {/* Clickable Image Container */}
      <div 
        onClick={() => onImageClick(item)}
        className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-sm bg-neutral-900 relative cursor-zoom-in"
      >
        <img 
          src={item.image} 
          alt={item.name[lang]} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover Overlay with Icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100" size={24} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-baseline mb-2 border-b border-neutral-800 pb-2 border-dashed">
            <h3 className="text-lg md:text-xl font-bold text-white uppercase cursor-pointer hover:text-gold transition-colors" onClick={() => onImageClick(item)}>
                {item.name[lang]}
            </h3>
            <span className="text-lg ml-4 font-light whitespace-nowrap" style={{ color: primaryColor }}>
              {lang === 'en' ? `RM ${item.price}` : `${item.price} 링깃`}
            </span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">{item.description[lang]}</p>
        </div>
      </div>
    </div>
  );
};

const Menu: React.FC = () => {
  const { state } = useApp();
  const { lang, menu, categories, subCategories } = state;
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '');
  
  // Modal State
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const closeModal = () => setSelectedItem(null);

  const primaryColor = state.theme.primaryColor;

  // Filter SubCategories for the active Large Category
  const activeSubCategories = subCategories
    .filter(sub => sub.categoryId === activeCategoryId)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-24 relative">
      
      {/* 
        IMAGE MODAL (Lightbox)
      */}
      {selectedItem && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in"
            onClick={closeModal}
        >
            {/* Close Button (Top Right) */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                }}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
            >
                <X size={40} />
            </button>

            <div 
                className="relative max-w-5xl w-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content area
            >
                {/* Image Wrapper - Constraints max height to viewport */}
                <div className="relative w-auto max-w-full">
                    <img 
                        src={selectedItem.image} 
                        alt={selectedItem.name[lang]} 
                        className="max-h-[75vh] md:max-h-[80vh] w-auto max-w-full object-contain shadow-2xl border border-white/10 rounded-sm bg-neutral-900"
                    />
                </div>

                {/* Caption */}
                <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider mb-2">
                        {selectedItem.name[lang]}
                    </h3>
                    <p className="text-xl font-light" style={{ color: primaryColor }}>
                        {lang === 'en' ? `RM ${selectedItem.price}` : `${selectedItem.price} 링깃`}
                    </p>
                    <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                        {selectedItem.description[lang]}
                    </p>
                </div>
            </div>
        </div>
      )}

      {/* 
        LAYOUT: 
        Mobile: Top horizontal scroll bar
        Desktop: Left sticky sidebar 
      */}
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Top Nav */}
          <aside className="lg:w-1/4 lg:shrink-0">
             <div className="sticky top-24 z-20 bg-neutral-950/95 backdrop-blur lg:bg-transparent pb-4 lg:pb-0 border-b lg:border-b-0 border-neutral-800 lg:border-r lg:border-neutral-800 lg:pr-8 h-auto lg:h-[calc(100vh-6rem)] overflow-y-auto">
                <h2 className="text-2xl font-serif text-white mb-6 hidden lg:block border-b border-gold pb-4">
                  {lang === 'en' ? 'Menu Category' : '메뉴 카테고리'}
                </h2>
                
                {/* Mobile: Horizontal Scroll */}
                <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                  {categories.sort((a,b) => a.order - b.order).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategoryId(cat.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`whitespace-nowrap px-4 py-3 text-sm md:text-base uppercase tracking-widest text-left transition-all duration-300 border-l-2 lg:border-l-4 ${
                        activeCategoryId === cat.id 
                          ? `text-white bg-white/5 border-[${primaryColor}]` 
                          : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
                      }`}
                      style={{ borderColor: activeCategoryId === cat.id ? primaryColor : 'transparent' }}
                    >
                      {cat.name[lang]}
                    </button>
                  ))}
                </div>
             </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-h-[50vh]">
             <div className="animate-fade-in">
                {activeSubCategories.length === 0 && (
                   <div className="text-center text-gray-500 py-12 border border-neutral-800 rounded bg-neutral-900/50">
                      {lang === 'en' ? 'No sub-categories found.' : '하위 카테고리가 없습니다.'}
                   </div>
                )}

                {activeSubCategories.map(sub => {
                   // Get items for this subcategory and sort by order
                   const subItems = menu
                      .filter(item => item.subCategoryId === sub.id)
                      .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
                      
                   if (subItems.length === 0) return null;

                   return (
                      <div key={sub.id} className="mb-16 last:mb-0">
                         {/* Sub Category Header */}
                         <div className="flex items-center gap-4 mb-8">
                            <div className="h-px bg-neutral-800 flex-1"></div>
                            <h3 className="text-xl md:text-2xl font-bold text-gold uppercase tracking-widest text-center px-4">
                               {sub.name[lang]}
                            </h3>
                            <div className="h-px bg-neutral-800 flex-1"></div>
                         </div>

                         {/* Items Grid */}
                         <div className="grid grid-cols-1 gap-12">
                            {subItems.map(item => (
                               <MenuGridItem 
                                  key={item.id}
                                  item={item}
                                  lang={lang}
                                  primaryColor={primaryColor}
                                  onImageClick={setSelectedItem}
                               />
                            ))}
                         </div>
                      </div>
                   )
                })}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Menu;