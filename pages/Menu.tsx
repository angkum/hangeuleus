
import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { SectionTitle, useInView, useIsTouch } from '../components/UI';
import { X, ZoomIn, Sparkles, Tag, AlertCircle } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuGridItemProps {
  item: MenuItem;
  lang: 'en' | 'ko';
  primaryColor: string;
  onImageClick: (item: MenuItem) => void;
}

const MenuGridItem: React.FC<MenuGridItemProps> = ({ item, lang, primaryColor, onImageClick }) => {
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
  const savings = hasDiscount ? item.originalPrice! - item.price : 0;
  const isSoldOut = item.isSoldOut;

  return (
    <div className={`flex gap-6 group transition-opacity duration-300 ${isSoldOut ? 'opacity-60' : 'opacity-100'}`}>
      {/* Clickable Image Container */}
      <div 
        onClick={() => onImageClick(item)}
        className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-sm bg-neutral-900 relative cursor-zoom-in"
      >
        <img 
          src={item.image} 
          alt={item.name[lang]} 
          className={`w-full h-full object-cover transition-all duration-500 ${isSoldOut ? 'grayscale blur-[1px]' : 'group-hover:scale-110'}`}
        />
        
        {/* Sold Out Overlay */}
        {isSoldOut && (
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-[10px] md:text-xs font-black text-white bg-red-600 px-2 py-1 tracking-widest border border-white/20">
                SOLD OUT
              </span>
           </div>
        )}

        {/* Hover Overlay with Icon (Only if not sold out) */}
        {!isSoldOut && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100" size={24} />
          </div>
        )}
        
        {/* Discount Badge on Image */}
        {hasDiscount && !isSoldOut && (
           <div className="absolute top-0 left-0 bg-gold text-black text-[9px] font-bold px-1.5 py-0.5 tracking-tighter">
              SAVE RM{savings}
           </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-baseline mb-2 border-b border-neutral-800 pb-2 border-dashed">
            <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`text-lg md:text-xl font-bold uppercase transition-colors ${isSoldOut ? 'text-gray-500' : 'text-white cursor-pointer hover:text-gold'}`} onClick={() => !isSoldOut && onImageClick(item)}>
                    {item.name[lang]}
                </h3>
                {item.isPopular && !isSoldOut && (
                    <span 
                        className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full border border-gold/30 bg-gold/5 text-gold tracking-tight"
                        style={{ borderColor: `${primaryColor}40`, color: primaryColor }}
                    >
                        ✨ {lang === 'en' ? 'BEST' : '인기'}
                    </span>
                )}
                {isSoldOut && (
                    <span className="text-[10px] text-red-500 font-bold border border-red-500/30 px-1.5 py-0.5 uppercase tracking-tighter">
                        {lang === 'en' ? 'Out of Stock' : '품절'}
                    </span>
                )}
            </div>
            
            <div className="flex flex-col items-end">
                {hasDiscount && !isSoldOut && (
                    <span className="text-xs text-gray-500 line-through mb-0.5">
                        RM {item.originalPrice}
                    </span>
                )}
                <div className="flex items-center gap-2">
                    {hasDiscount && !isSoldOut && (
                        <span className="text-[10px] font-bold text-gold uppercase tracking-tighter bg-gold/10 px-1.5 py-0.5 border border-gold/20 hidden md:inline-block">
                            SAVE RM{savings}
                        </span>
                    )}
                    <span className={`text-lg font-light whitespace-nowrap ${isSoldOut ? 'text-gray-600' : ''}`} style={{ color: isSoldOut ? undefined : primaryColor }}>
                        {lang === 'en' ? `RM ${item.price}` : `${item.price} 링깃`}
                    </span>
                </div>
            </div>
          </div>
          <p className={`text-sm leading-relaxed ${isSoldOut ? 'text-gray-600' : 'text-gray-500'}`}>{item.description[lang]}</p>
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
      <style>{`
        /* Custom override for desktop to reset inline styles used for mobile active state */
        @media (min-width: 1024px) {
            .desktop-reset-bg {
                background-color: transparent !important;
            }
            .desktop-active-bg {
                background-color: rgba(255, 255, 255, 0.05) !important;
            }
        }
      `}</style>
      
      {/* 
        IMAGE MODAL (Lightbox)
      */}
      {selectedItem && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in"
            onClick={closeModal}
        >
            {/* Close Button */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                }}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-[110] bg-black/40 rounded-full p-1"
            >
                <X size={28} />
            </button>

            {/* Modal Content */}
            <div 
                className="relative w-full max-w-lg md:max-w-xl bg-neutral-900 border border-neutral-800 rounded-sm shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Image Container */}
                <div className="w-full bg-black relative shrink-0 flex items-center justify-center min-h-[200px]">
                   <img 
                        src={selectedItem.image} 
                        alt={selectedItem.name[lang]} 
                        className={`w-full h-auto max-h-[60vh] object-contain ${selectedItem.isSoldOut ? 'grayscale blur-sm opacity-50' : ''}`}
                    />
                    
                    {/* Modal Sold Out Banner */}
                    {selectedItem.isSoldOut && (
                       <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-red-600 text-white px-8 py-4 font-black text-2xl shadow-2xl tracking-[0.2em] transform -rotate-12 border-4 border-white">
                               SOLD OUT
                           </div>
                       </div>
                    )}

                    {selectedItem.originalPrice && selectedItem.originalPrice > selectedItem.price && !selectedItem.isSoldOut && (
                        <div className="absolute bottom-4 right-4 bg-gold text-black px-4 py-2 font-black text-sm shadow-xl tracking-widest animate-pulse">
                            SAVE RM{selectedItem.originalPrice - selectedItem.price}
                        </div>
                    )}
                </div>

                {/* Caption / Details */}
                <div className="p-6 overflow-y-auto bg-neutral-900 border-t border-white/5">
                    <div className="flex justify-between items-start gap-3 mb-2">
                         <div className="flex flex-col gap-1">
                            <h3 className={`text-xl md:text-2xl font-bold uppercase tracking-wider leading-tight flex items-center gap-3 ${selectedItem.isSoldOut ? 'text-gray-500' : 'text-white'}`}>
                                {selectedItem.name[lang]}
                                {selectedItem.isPopular && !selectedItem.isSoldOut && <span className="text-gold text-sm">✨</span>}
                            </h3>
                            {selectedItem.isPopular && !selectedItem.isSoldOut && (
                                <span className="text-gold text-[10px] uppercase tracking-widest font-bold">
                                    {lang === 'en' ? 'Most Popular Item' : '한그릇 인기 메뉴'}
                                </span>
                            )}
                            {selectedItem.isSoldOut && (
                                <span className="text-red-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
                                    <AlertCircle size={10} />
                                    {lang === 'en' ? 'Currently Unavailable' : '현재 주문이 불가능합니다'}
                                </span>
                            )}
                         </div>
                        
                        <div className="flex flex-col items-end">
                            {selectedItem.originalPrice && selectedItem.originalPrice > selectedItem.price && !selectedItem.isSoldOut && (
                                <span className="text-sm text-gray-500 line-through mb-1">RM {selectedItem.originalPrice}</span>
                            )}
                            <span className={`text-xl font-medium whitespace-nowrap ${selectedItem.isSoldOut ? 'text-gray-600' : ''}`} style={{ color: selectedItem.isSoldOut ? undefined : primaryColor }}>
                                {lang === 'en' ? `RM ${selectedItem.price}` : `${selectedItem.price} 링깃`}
                            </span>
                        </div>
                    </div>
                    <p className={`text-sm leading-relaxed mt-4 border-l pl-4 ${selectedItem.isSoldOut ? 'text-gray-600 border-gray-800' : 'text-gray-400 border-gold/30'}`}>
                        {selectedItem.description[lang]}
                    </p>
                </div>
            </div>
        </div>
      )}

      {/* 
        LAYOUT: 
        Mobile: Top horizontal scroll bar (Sticky)
        Desktop: Left sticky sidebar 
      */}
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar / Top Nav */}
          <aside className="lg:w-1/4 lg:shrink-0 relative z-30">
             <div className="sticky top-[80px] lg:top-24 z-30 bg-neutral-950/95 backdrop-blur-md lg:backdrop-blur-none lg:bg-transparent -mx-4 px-4 py-4 lg:mx-0 lg:px-0 lg:py-0 border-b border-neutral-800 lg:border-b-0 lg:border-r lg:border-neutral-800 lg:pr-8 h-auto lg:h-[calc(100vh-6rem)] overflow-y-auto">
                <h2 className="text-2xl font-serif text-white mb-6 hidden lg:block border-b border-gold pb-4">
                  {lang === 'en' ? 'Menu Category' : '메뉴 카테고리'}
                </h2>
                
                {/* Mobile: Horizontal Scroll (Pill Shape) / Desktop: Vertical List (Tabs) */}
                <div className="flex lg:flex-col gap-3 lg:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
                  {categories.sort((a,b) => a.order - b.order).map(cat => {
                    const isActive = activeCategoryId === cat.id;
                    return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategoryId(cat.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`
                            whitespace-nowrap px-6 py-3 lg:px-4 lg:py-3 
                            text-sm md:text-base uppercase tracking-widest text-left transition-all duration-300 
                            rounded-full lg:rounded-none border lg:border-0 lg:border-l-4
                            flex-shrink-0
                            ${isActive 
                                ? 'text-black font-extrabold shadow-lg lg:text-white lg:shadow-none desktop-active-bg' 
                                : 'bg-neutral-900 text-gray-400 border-neutral-800 hover:border-gray-600 lg:bg-transparent lg:border-transparent lg:hover:text-gray-300 lg:hover:bg-white/5 desktop-reset-bg'}
                          `}
                          style={{ 
                              // Mobile: Use inline style for dynamic primary color background
                              backgroundColor: isActive ? primaryColor : undefined,
                              borderColor: isActive ? primaryColor : undefined,
                              // Desktop: Use inline style for border-left color
                              borderLeftColor: isActive && window.innerWidth >= 1024 ? primaryColor : undefined
                          }}
                        >
                          {cat.name[lang]}
                        </button>
                    );
                  })}
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
