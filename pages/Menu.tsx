
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { SectionTitle, useInView, useIsTouch } from '../components/UI';
import { X, ZoomIn, Sparkles, Tag, AlertCircle, ChevronUp, Layers, TrendingDown, CheckCircle2 } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuGridItemProps {
  item: MenuItem;
  lang: 'en' | 'ko';
  primaryColor: string;
  onImageClick: (item: MenuItem) => void;
}

const MenuGridItem: React.FC<MenuGridItemProps> = ({ item, lang, primaryColor, onImageClick }) => {
  const hasDiscount = !!(item.originalPrice && item.originalPrice > item.price);
  const savings = hasDiscount ? item.originalPrice! - item.price : 0;
  const isSoldOut = !!item.isSoldOut;

  return (
    <div className={`flex gap-6 group transition-opacity duration-300 ${isSoldOut ? 'opacity-60' : 'opacity-100'}`}>
      <div 
        onClick={() => onImageClick(item)}
        className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-sm bg-neutral-900 relative cursor-zoom-in"
      >
        <img 
          src={item.image} 
          alt={item.name[lang]} 
          className={`w-full h-full object-cover transition-all duration-500 ${isSoldOut ? 'grayscale blur-[1px]' : 'group-hover:scale-110'}`}
        />
        
        {isSoldOut && (
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-[10px] md:text-xs font-black text-white bg-red-600 px-2 py-1 tracking-widest border border-white/20">
                SOLD OUT
              </span>
           </div>
        )}

        {!isSoldOut && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100" size={24} />
          </div>
        )}
        
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
                {hasDiscount && !isSoldOut ? (
                    <span className="text-xs text-gray-500 line-through mb-0.5">
                        RM {item.originalPrice}
                    </span>
                ) : null}
                <div className="flex items-center gap-2">
                    {hasDiscount && !isSoldOut ? (
                        <span className="text-[10px] font-bold text-gold uppercase tracking-tighter bg-gold/10 px-1.5 py-0.5 border border-gold/20 hidden md:inline-block">
                            SAVE RM{savings}
                        </span>
                    ) : null}
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
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const isTouch = useIsTouch();
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories]);

  // Scroll Spy Logic for Mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const cat of categories) {
        const element = categoryRefs.current[cat.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategoryId(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedItem(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const scrollToCategory = (id: string) => {
    const element = categoryRefs.current[id];
    if (element) {
      const offset = 100; // Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveCategoryId(id);
    setShowMobileNav(false);
  };

  const closeModal = () => setSelectedItem(null);
  const primaryColor = state.theme.primaryColor;

  // Values for Modal
  const modalHasDiscount = selectedItem ? !!(selectedItem.originalPrice && selectedItem.originalPrice > selectedItem.price) : false;
  const modalSavings = selectedItem && modalHasDiscount ? selectedItem.originalPrice! - selectedItem.price : 0;

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-32 relative">
      {/* 
        Floating Mobile Navigation Trigger 
      */}
      {isTouch && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 group animate-fade-in">
          <button 
            onClick={() => setShowMobileNav(true)}
            className="flex items-center gap-3 px-6 py-4 rounded-full bg-black/80 backdrop-blur-xl border border-gold/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all active:scale-95 group"
          >
            <Layers size={18} className="text-gold" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Browse Menu</span>
              <span className="text-sm text-white font-bold uppercase tracking-wider">
                {categories.find(c => c.id === activeCategoryId)?.name[lang]}
              </span>
            </div>
            <div className="ml-2 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
              <ChevronUp size={14} className="text-gold" />
            </div>
          </button>
        </div>
      )}

      {/* 
        Mobile Category Bottom Sheet Overlay
      */}
      {showMobileNav && (
        <div className="fixed inset-0 z-[100] animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobileNav(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-neutral-900 border-t border-gold/20 rounded-t-[2rem] p-8 pb-12 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="w-12 h-1 bg-neutral-800 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-serif text-white tracking-widest uppercase">Categories</h3>
              <button onClick={() => setShowMobileNav(false)} className="p-2 text-gray-500 hover:text-white"><X size={24}/></button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {categories.sort((a,b) => a.order - b.order).map(cat => {
                const isActive = activeCategoryId === cat.id;
                return (
                  <button 
                    key={cat.id} 
                    onClick={() => scrollToCategory(cat.id)}
                    className={`w-full text-left px-6 py-5 rounded-xl border transition-all flex justify-between items-center ${
                      isActive ? 'bg-gold border-gold text-black font-black' : 'bg-neutral-800/50 border-neutral-800 text-gray-400'
                    }`}
                  >
                    <span className="uppercase tracking-[0.15em] text-sm">{cat.name[lang]}</span>
                    {isActive && <Sparkles size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 
        Item Modal - COMPACT VERSION
      */}
      {selectedItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 pt-20 animate-fade-in" onClick={closeModal}>
            <button onClick={closeModal} className="absolute top-6 right-6 text-white/50 hover:text-white z-[120] bg-black/40 rounded-full p-2 transition-transform hover:scale-110"><X size={32} /></button>
            <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded shadow-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                
                {/* Visual Sales Triggers */}
                {modalHasDiscount && !selectedItem.isSoldOut && (
                  <div className="absolute top-4 left-4 z-[120]">
                    <div className="bg-gold text-black px-3 py-1 font-black text-[9px] tracking-widest shadow-2xl border border-white/20 flex items-center gap-1.5 rounded-full">
                       <TrendingDown size={12} />
                       {lang === 'en' ? 'LIMITED OFFER' : '한정 혜택'}
                    </div>
                  </div>
                )}

                {/* Hero Image - Maximum Scale */}
                <div className="w-full bg-black relative shrink-0 flex items-center justify-center min-h-[250px] overflow-hidden">
                   <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name[lang]} 
                    className={`w-full h-auto max-h-[60vh] object-contain transition-transform duration-1000 ${selectedItem.isSoldOut ? 'grayscale blur-md opacity-40' : 'scale-100'}`} 
                   />
                   {selectedItem.isSoldOut && (
                       <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-red-600 text-white px-6 py-3 font-black text-xl shadow-2xl tracking-[0.2em] transform -rotate-12 border-2 border-white uppercase">SOLD OUT</div>
                       </div>
                   )}
                </div>

                {/* Price Block - High Contrast & Centralized */}
                <div className="p-6 md:p-8 bg-gradient-to-t from-neutral-950 to-neutral-900 border-t border-white/10 text-center">
                    <div className="flex flex-col items-center gap-3">
                         <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-2 flex-wrap justify-center">
                                <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight leading-tight ${selectedItem.isSoldOut ? 'text-gray-500' : 'text-white'}`}>
                                    {selectedItem.name[lang]}
                                </h3>
                                {selectedItem.isPopular && !selectedItem.isSoldOut && (
                                  <div className="flex items-center gap-1 bg-gold/10 border border-gold/30 px-2 py-0.5 rounded-full text-[9px] font-bold text-gold uppercase tracking-widest">
                                    <Sparkles size={10} />
                                    {lang === 'en' ? 'BEST' : '인기'}
                                  </div>
                                )}
                            </div>
                            <p className="text-[9px] text-gray-500 tracking-[0.2em] uppercase font-bold">
                                {subCategories.find(s => s.id === selectedItem.subCategoryId)?.name[lang]}
                            </p>
                         </div>

                         <div className="flex flex-col items-center w-full pt-4 border-t border-white/5">
                            {modalHasDiscount && !selectedItem.isSoldOut && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-500 line-through font-medium">
                                    RM {selectedItem.originalPrice}
                                </span>
                                <span className="text-[9px] font-black bg-gold text-black px-1.5 py-0.5 rounded tracking-tighter">
                                  SAVE RM{modalSavings}
                                </span>
                              </div>
                            )}
                            <div className="flex items-baseline gap-2">
                                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest opacity-50">Price</span>
                                <span className={`text-3xl md:text-4xl font-black whitespace-nowrap drop-shadow-lg ${selectedItem.isSoldOut ? 'text-gray-600' : ''}`} style={{ color: selectedItem.isSoldOut ? undefined : primaryColor }}>
                                    {lang === 'en' ? `RM ${selectedItem.price}` : `RM ${selectedItem.price}`}
                                </span>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Desktop Category Sidebar */}
          <aside className="hidden lg:block lg:w-1/4 lg:shrink-0 relative z-30">
             <div className="sticky top-24 pr-8 border-r border-neutral-800 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
                <h2 className="text-2xl font-serif text-white mb-8 border-b border-gold pb-4 tracking-widest uppercase">{lang === 'en' ? 'Categories' : '카테고리'}</h2>
                <div className="flex flex-col gap-1">
                  {categories.sort((a,b) => a.order - b.order).map(cat => {
                    const isActive = activeCategoryId === cat.id;
                    return (
                        <button 
                          key={cat.id} 
                          onClick={() => scrollToCategory(cat.id)} 
                          className={`group w-full text-left px-6 py-4 text-sm uppercase tracking-[0.2em] transition-all relative overflow-hidden ${
                            isActive ? 'text-black font-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {isActive && <div className="absolute inset-0 bg-gold z-0" />}
                          <span className="relative z-10">{cat.name[lang]}</span>
                          {!isActive && <div className="absolute bottom-0 left-6 right-6 h-px bg-neutral-800 group-hover:bg-neutral-600" />}
                        </button>
                    );
                  })}
                </div>
             </div>
          </aside>

          {/* Menu Sections List */}
          <div className="flex-1">
             <div className="animate-fade-in">
                {categories.sort((a,b) => a.order - b.order).map(cat => {
                   const catSubCategories = subCategories
                     .filter(sub => sub.categoryId === cat.id)
                     .sort((a,b) => a.order - b.order);

                   return (
                      <div 
                        key={cat.id} 
                        id={`cat-${cat.id}`} 
                        ref={el => { categoryRefs.current[cat.id] = el; }}
                        className="mb-24 last:mb-0 pt-8"
                      >
                         <div className="flex flex-col items-center mb-16">
                            <span className="text-gold text-xs tracking-[0.4em] uppercase font-bold mb-4">{lang === 'en' ? 'Hangeuleus Selection' : '한그릇 엄선'}</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 text-center">{cat.name[lang]}</h2>
                            <div className="h-1 w-20 bg-gold/30 rounded-full"></div>
                         </div>

                         {catSubCategories.map(sub => {
                            const subItems = menu
                              .filter(item => item.subCategoryId === sub.id)
                              .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
                            
                            if (subItems.length === 0) return null;

                            return (
                               <div key={sub.id} className="mb-16 last:mb-0">
                                  <div className="flex items-center gap-6 mb-10">
                                     <h3 className="text-sm md:text-base font-bold text-gold uppercase tracking-[0.3em] whitespace-nowrap">{sub.name[lang]}</h3>
                                     <div className="h-px bg-neutral-800/50 flex-1"></div>
                                  </div>
                                  <div className="grid grid-cols-1 gap-12 lg:gap-16">
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
                            );
                         })}
                      </div>
                   )
                })}
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Menu;
