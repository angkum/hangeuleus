import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { SectionTitle } from '../components/UI';

const Menu: React.FC = () => {
  const { state } = useApp();
  const { lang, menu } = state;
  const [activeCategory, setActiveCategory] = useState<'all' | 'noodles' | 'rice' | 'dishes'>('all');

  const categories = [
    { id: 'all', en: 'All', ko: '전체' },
    { id: 'noodles', en: 'Noodles', ko: '면류' },
    { id: 'rice', en: 'Rice', ko: '밥류' },
    { id: 'dishes', en: 'Dishes', ko: '요리' },
  ];

  const filteredMenu = activeCategory === 'all' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <SectionTitle 
          title={lang === 'en' ? 'Our Menu' : '메뉴'} 
          subtitle={lang === 'en' ? 'Experience the Flavor' : '맛의 경험'} 
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat.id 
                  ? `text-black bg-[${state.theme.primaryColor}] border-[${state.theme.primaryColor}]` 
                  : 'text-gray-400 border-neutral-800 hover:border-gray-500'
              }`}
              style={activeCategory === cat.id ? { backgroundColor: state.theme.primaryColor, borderColor: state.theme.primaryColor } : {}}
            >
              {cat[lang]}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
          {filteredMenu.map(item => (
            <div key={item.id} className="flex gap-6 group">
              <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-sm bg-neutral-900">
                <img 
                  src={item.image} 
                  alt={item.name[lang]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-baseline mb-2 border-b border-neutral-800 pb-2 border-dashed">
                    <h3 className="text-lg md:text-xl font-bold text-white uppercase">{item.name[lang]}</h3>
                    <span className="text-lg ml-4 font-light" style={{ color: state.theme.primaryColor }}>
                      {lang === 'en' ? `RM ${item.price}` : `${item.price} 링깃`}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description[lang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            {lang === 'en' ? 'No items found in this category.' : '해당 카테고리에 메뉴가 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;