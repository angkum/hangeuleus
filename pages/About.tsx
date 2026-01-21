import React from 'react';
import { useApp } from '../contexts/AppContext';
import { SectionTitle, useInView, useIsTouch } from '../components/UI';

const About: React.FC = () => {
  const { state } = useApp();
  const { lang } = state;
  const { about } = state.content;

  // Hooks for mobile scroll effects
  const { ref, isInView } = useInView({ threshold: 0.4 });
  const isTouch = useIsTouch();
  const isActive = isTouch && isInView;

  // Fallback if stats are missing (e.g. old local storage state)
  const stat1 = about.stats?.stat1 || { value: '20+', label: { en: 'Years of Experience', ko: '년 경력' } };
  const stat2 = about.stats?.stat2 || { value: '100%', label: { en: 'Fresh Ingredients', ko: '신선한 재료' } };

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle 
          title={about.title[lang]} 
          subtitle={lang === 'en' ? 'Our Story' : '우리의 이야기'} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-12">
          {/* Image Side */}
          <div ref={ref} className="relative group">
            <div className={`absolute inset-0 border border-gold/20 -z-10 transition-transform duration-500 ${isActive ? 'translate-x-2 translate-y-2' : 'translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2'}`}></div>
             <div className={`absolute inset-0 border border-white/10 -z-10 transition-transform duration-500 ${isActive ? '-translate-x-2 -translate-y-2' : '-translate-x-4 -translate-y-4 group-hover:-translate-x-2 group-hover:-translate-y-2'}`}></div>
            <img 
              src={about.image} 
              alt="About Us" 
              className={`w-full h-[600px] object-cover transition-all duration-700 shadow-2xl ${isActive ? 'grayscale-0' : 'filter grayscale hover:grayscale-0'}`}
            />
          </div>

          {/* Text Side */}
          <div className="space-y-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-white uppercase tracking-widest">
              {lang === 'en' ? 'Authentic Tradition' : '정통의 계승'}
            </h3>
            <div className="h-px w-20 bg-gold"></div>
            <p className="text-gray-400 leading-loose text-lg font-light whitespace-pre-line">
              {about.details ? about.details[lang] : about.description[lang]}
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-8">
               <div>
                  <h4 className="text-gold text-xl font-bold mb-2">{stat1.value}</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500">{stat1.label[lang]}</p>
               </div>
               <div>
                  <h4 className="text-gold text-xl font-bold mb-2">{stat2.value}</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500">{stat2.label[lang]}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;