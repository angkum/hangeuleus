
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Button, SectionTitle, useIsTouch } from '../components/UI';
import { ArrowRight, Star, MessageCircle, ChevronDown, ChevronUp, MapPin, Navigation } from 'lucide-react';

const PopularItemCard: React.FC<{ item: any, lang: any, primaryColor: string }> = ({ item, lang, primaryColor }) => {
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
  const savings = hasDiscount ? item.originalPrice - item.price : 0;
  const isSoldOut = item.isSoldOut;

  return (
    <div className={`group cursor-pointer ${isSoldOut ? 'pointer-events-none' : ''}`}>
      <div className="overflow-hidden mb-6 relative border border-white/5 bg-neutral-900">
        <img 
          src={item.image} 
          alt={item.name[lang]} 
          className={`w-full h-80 object-cover transition-transform duration-700 scale-100 opacity-90 ${isSoldOut ? 'grayscale blur-[2px]' : 'group-hover:scale-105 group-hover:opacity-100'}`}
        />
        
        {/* Sold Out Overlay for Home Page */}
        {isSoldOut && (
           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-xs font-black text-white bg-red-600 px-4 py-2 tracking-[0.2em] border-2 border-white shadow-2xl">
                SOLD OUT
              </span>
           </div>
        )}

        <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 backdrop-blur-sm border border-white/10 flex flex-col items-end gap-1">
          <div className="flex items-center">
            <Star size={12} className="text-gold inline mr-1" fill={primaryColor} />
            <span className="text-xs tracking-widest uppercase text-white">Popular</span>
          </div>
          {hasDiscount && !isSoldOut && (
             <span className="text-[10px] bg-gold text-black font-black px-1.5 py-0.5 tracking-tighter">
                SAVE RM{savings}
             </span>
          )}
        </div>
      </div>
      <div className={`text-center p-4 transition-colors rounded-sm ${isSoldOut ? '' : 'hover:bg-white/5'}`}>
        <h3 className={`text-xl font-bold mb-2 uppercase ${isSoldOut ? 'text-gray-600' : 'text-white'}`}>{item.name[lang]}</h3>
        <p className={`text-sm mb-3 line-clamp-2 ${isSoldOut ? 'text-gray-700 italic' : 'text-gray-500'}`}>
            {isSoldOut ? (lang === 'en' ? 'Currently Out of Stock' : '현재 품절 상태입니다') : item.description[lang]}
        </p>
        
        <div className="flex flex-col items-center">
            {hasDiscount && !isSoldOut && (
                <span className="text-sm text-gray-500 line-through mb-1">RM {item.originalPrice}</span>
            )}
            <p className={`text-lg font-bold ${isSoldOut ? 'text-gray-600' : ''}`} style={{ color: isSoldOut ? undefined : primaryColor }}>
              {lang === 'en' ? `RM ${item.price}` : `${item.price} 링깃`}
            </p>
        </div>
      </div>
    </div>
  );
};

const NewsItemCard = ({ post, lang, isExpanded, toggleExpand }: any) => {
  return (
    <div 
      onClick={() => toggleExpand(post.id)}
      className="border-b border-neutral-800 pb-8 last:border-0 p-6 transition-colors rounded cursor-pointer group hover:bg-neutral-900/50"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
            <h3 className="text-xl text-white font-bold uppercase">{post.title[lang]}</h3>
            <span className="text-gray-600 group-hover:text-gold transition-colors">
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
        </div>
        <span className="text-xs text-gray-500 tracking-widest border border-neutral-800 px-2 py-1">{post.date}</span>
      </div>
      
      {isExpanded && post.image && (
          <div className="mb-6 mt-2 overflow-hidden rounded border border-neutral-800">
             <img src={post.image} alt="News Post" className="w-full object-cover max-h-[500px]" />
          </div>
      )}

      <p className={`text-gray-400 font-light ${isExpanded ? 'whitespace-pre-line' : 'truncate'}`}>
          {post.content[lang]}
      </p>
    </div>
  );
};

const Home: React.FC = () => {
  const { state } = useApp();
  const { lang, content, menu, news } = state;
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Animation Trigger (On Mount)
  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => {
    // Slight delay to ensure CSS is ready and prevent flash
    const timer = setTimeout(() => setHeroMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // State for News section
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);
  const [expandedNewsIds, setExpandedNewsIds] = useState<Set<string>>(new Set());
  
  // Environment checks
  const isTouch = useIsTouch();

  // Generate Embers - Fewer particles, slower speed
  const embers = useMemo(() => {
    // Generate 7 particles
    return Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100% position
      delay: Math.random() * 5, // 0-5s start delay
      duration: 10 + Math.random() * 8, // Slower: 10-18s duration
      size: 3 + Math.random() * 5, // 3-8px size
      // Irregular shapes (blobs) instead of circles
      borderRadius: `${30 + Math.random() * 50}% ${30 + Math.random() * 50}% ${30 + Math.random() * 50}% ${30 + Math.random() * 50}% / ${30 + Math.random() * 50}% ${30 + Math.random() * 50}% ${30 + Math.random() * 50}% ${30 + Math.random() * 50}%`
    }));
  }, []);

  const popularItems = menu.filter(item => item.isPopular).slice(0, 3);
  
  // Use dedicated whatsapp field if available, fallback to phone
  const whatsappNumberRaw = state.content.contact.whatsapp || state.content.contact.phone;
  const whatsappNumber = whatsappNumberRaw.replace(/[^0-9]/g, '');

  const toggleNewsExpand = (id: string) => {
    setExpandedNewsIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleLoadMoreNews = () => {
    setVisibleNewsCount(prev => prev + 3);
  };

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes ember-rise {
          0% {
            transform: translateY(110vh) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translateY(95vh) scale(1) rotate(45deg);
          }
          50% {
            opacity: 0.8;
            transform: translateY(50vh) scale(1.2) rotate(180deg);
          }
          75% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-10vh) scale(0.8) rotate(360deg);
            opacity: 0;
          }
        }

        .ember-particle {
          position: absolute;
          /* Hot core to cooler edge gradient */
          background: radial-gradient(circle at 30% 30%, #fff 0%, #FFD700 30%, #ff4500 100%);
          /* Intense glow */
          box-shadow: 
            0 0 4px 1px rgba(255, 69, 0, 0.8),
            0 0 12px 4px rgba(255, 215, 0, 0.4);
          /* Soften edges to look like light/fire */
          filter: blur(0.5px);
          animation: ember-rise linear infinite;
          top: 0; 
          opacity: 0;
          z-index: 20;
          will-change: transform, opacity;
        }

        /* Clean Slide Up Animation */
        @keyframes hero-slide-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Fade Only Animation */
        @keyframes hero-fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-hero-slide-up {
          animation: hero-slide-up 3.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .animate-hero-fade {
          animation: hero-fade-in 3.5s ease-out forwards;
        }
      `}</style>

      {/* 
        HERO SECTION 
      */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Layer 0: Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20s] ease-in-out"
          style={{
            backgroundImage: `url(${content.hero.image})`,
          }}
        />

        {/* Layer 1: Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Layer 2: Ember Particles */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
           {embers.map((ember) => (
             <div 
               key={ember.id}
               className="ember-particle"
               style={{
                 left: `${ember.left}%`,
                 width: `${ember.size}px`,
                 height: `${ember.size}px`,
                 borderRadius: ember.borderRadius, // Random irregular shape
                 animationDuration: `${ember.duration}s`,
                 animationDelay: `${ember.delay}s`,
               }}
             />
           ))}
        </div>

        {/* Layer 3: Content (Text & CTA) */}
        <div 
          className="relative z-30 text-center px-6 max-w-7xl mx-auto flex flex-col items-center justify-center h-full pt-20"
        >
          
          {/* Subtitle - Slide Up */}
          <p 
            className={`text-base md:text-xl text-gold uppercase tracking-[0.3em] font-medium mb-8 ${heroMounted ? 'animate-hero-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            {content.hero.subtitle[lang]}
          </p>
          
          {/* Title - Slide Up (Large & Readable) */}
          <div className="mb-14 max-w-6xl mx-auto">
            <h1 
              className={`text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-[0.9] tracking-tighter ${heroMounted ? 'animate-hero-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.5s' }}
            >
              {lang === 'ko' ? (
                <span className="flex flex-col gap-2 lg:gap-4">
                  <span>한그릇은</span>
                  <span>불이 완성합니다</span>
                </span>
              ) : (
                content.hero.title[lang]
              )}
            </h1>
          </div>
          
          {/* Buttons - Fade Only (No Movement) */}
          <div 
            className={`flex flex-col md:flex-row justify-center items-center gap-6 ${heroMounted ? 'animate-hero-fade' : 'opacity-0'}`}
            style={{ animationDelay: '1.2s' }}
          >
            <Link to="/menu" className="w-full md:w-auto">
              <Button variant="outline" className="w-full group flex items-center justify-center gap-3 px-10 py-5 text-base border-gold/60 text-gold hover:bg-gold hover:text-black transition-colors backdrop-blur-sm bg-black/50">
                {content.hero.cta[lang]} <ArrowRight size={18} />
              </Button>
            </Link>

            <a 
              href={`https://wa.me/${whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button variant="outline" className="w-full group flex items-center justify-center gap-3 px-10 py-5 text-base border-gold/60 text-gold hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors backdrop-blur-sm bg-black/50">
                WhatsApp <MessageCircle size={18} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 relative px-6 overflow-hidden bg-neutral-950">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-l from-neutral-900/40 to-transparent pointer-events-none blur-3xl"></div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 md:order-1 relative p-4">
             {/* Image Frame Effect */}
             <div className="absolute top-0 left-0 w-full h-full border border-gold/10 translate-x-4 translate-y-4 -z-10"></div>
             <div className="absolute bottom-0 right-0 w-full h-full border border-white/5 -translate-x-4 -translate-y-4 -z-10"></div>
             <img 
                src={content.about.image} 
                alt="Chef" 
                className="w-full h-[500px] object-cover shadow-2xl transition-all duration-700 hover:grayscale-0 grayscale"
             />
          </div>
          <div className="order-1 md:order-2">
            <SectionTitle 
              title={content.about.title[lang]} 
              subtitle={lang === 'en' ? 'Our Philosophy' : '우리의 철학'}
              centered={false}
            />
            <p className="text-gray-400 leading-loose mb-8 text-lg font-light">
              {content.about.description[lang]}
            </p>
            <Link to="/about">
              <Button variant="outline">{lang === 'en' ? 'Read More' : '더 보기'}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Menu */}
      <section className="py-24 bg-black/20 px-6 relative">
        <div className="container mx-auto">
          <SectionTitle 
            title={lang === 'en' ? 'Signature Dishes' : '대표 메뉴'} 
            subtitle={lang === 'en' ? 'Chef Selections' : '셰프 추천'}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {popularItems.map(item => (
              <PopularItemCard 
                key={item.id} 
                item={item} 
                lang={lang} 
                primaryColor={state.theme.primaryColor} 
              />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/menu">
              <Button variant="outline">{lang === 'en' ? 'View Full Menu' : '전체 메뉴 보기'}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News / Events */}
      <section className="py-24 px-6 border-t border-neutral-900/50">
         <div className="container mx-auto max-w-4xl">
            <SectionTitle title={lang === 'en' ? 'Latest News' : '새로운 소식'} centered={true} />
            <div className="space-y-6 mt-12">
              {news.slice(0, visibleNewsCount).map(post => (
                <NewsItemCard 
                  key={post.id}
                  post={post}
                  lang={lang}
                  isExpanded={expandedNewsIds.has(post.id)}
                  toggleExpand={toggleNewsExpand}
                />
              ))}
              
              {news.length === 0 && (
                <p className="text-center text-gray-600 italic">{lang === 'en' ? 'No news available.' : '새로운 소식이 없습니다.'}</p>
              )}

              {/* Load More Button */}
              {visibleNewsCount < news.length && (
                <div className="text-center pt-8">
                  <Button onClick={handleLoadMoreNews} variant="outline" size="sm">
                     {lang === 'en' ? 'Load More News' : '게시물 더 보기'}
                  </Button>
                </div>
              )}
            </div>
         </div>
      </section>

      {/* Location & Reservation Map */}
      <section className="py-24 px-6 border-t border-neutral-900/50 bg-neutral-900/30">
        <div className="container mx-auto max-w-5xl text-center">
           <SectionTitle title={lang === 'en' ? 'Visit Us' : '오시는 길'} subtitle={lang === 'en' ? 'Location' : '위치'} centered={true} />
           
           {/* Address Actions */}
           <div className="flex flex-wrap justify-center gap-4 mb-8">
             <a 
               href="https://maps.app.goo.gl/jJhgQ7nsdmEAC7sK9"
               target="_blank"
               rel="noopener noreferrer"
               className="text-xs flex items-center gap-2 px-3 py-2 border border-neutral-700 rounded hover:bg-neutral-800 text-gold transition-colors font-medium tracking-wide bg-neutral-900"
             >
               <MapPin size={14} />
               {lang === 'en' ? 'Google Map' : '구글 맵'}
             </a>

             <a 
               href="https://waze.com/ul?ll=3.0357278,101.7644058&navigate=yes"
               target="_blank"
               rel="noopener noreferrer"
               className="text-xs flex items-center gap-2 px-3 py-2 border border-neutral-700 rounded hover:bg-neutral-800 text-blue-400 transition-colors font-medium tracking-wide group bg-neutral-900"
             >
               <Navigation size={14} className="group-hover:text-blue-300" />
               {lang === 'en' ? 'Waze Navigation' : 'Waze 실행'}
             </a>
           </div>

           <div 
             className="w-full h-[400px] md:h-[500px] border border-neutral-800 transition-all duration-700 mb-12 shadow-2xl grayscale hover:grayscale-0"
           >
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4726.072788120122!2d101.76440579999999!3d3.0357277999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc35c729d82de3%3A0x4cc34d49e813397c!2sHANGEULEUS!5e1!3m2!1sko!2smy!4v1768914255084!5m2!1sko!2smy" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Google Maps Location"
             ></iframe>
           </div>

           <Link to="/reservation">
             <Button variant="outline" size="lg" className="min-w-[200px]">
               {lang === 'en' ? 'Make a Reservation' : '예약하기'}
             </Button>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
