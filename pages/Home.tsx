import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Button, SectionTitle } from '../components/UI';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
  const { state } = useApp();
  const { lang, content, menu, news } = state;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const popularItems = menu.filter(item => item.isPopular).slice(0, 3);

  // Parallax Effect Handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Format phone number for WhatsApp (remove non-digits)
  const whatsappNumber = state.content.contact.phone.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-900">
        
        {/* LAYER 1: Night Sky Background (Gradient) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#161B2E] to-[#252A40] z-0"></div>

        {/* LAYER 2: Stars (Interactive Parallax) */}
        <div 
          className="absolute inset-0 z-0 opacity-80"
          style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
        >
           {/* Generate some static stars with CSS */}
           {[...Array(20)].map((_, i) => (
             <div 
               key={i}
               className="absolute rounded-full bg-white animate-twinkle"
               style={{
                 width: Math.random() * 2 + 1 + 'px',
                 height: Math.random() * 2 + 1 + 'px',
                 top: Math.random() * 100 + '%',
                 left: Math.random() * 100 + '%',
                 animationDelay: Math.random() * 3 + 's',
                 opacity: Math.random()
               }}
             ></div>
           ))}
        </div>

        {/* LAYER 3: The Super Moon (Interactive Parallax - Moves slightly opposite to mouse) */}
        <div 
          className="absolute z-0 top-[10%] md:top-[15%]"
          style={{ 
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
            right: '50%',
            marginRight: '-150px' // Center horizontalish relative to 50%
          }}
        >
          {/* Moon Glow */}
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-orange-500 blur-[120px] opacity-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>
          
          {/* Moon Body */}
          <div className="w-48 h-48 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] relative overflow-hidden shadow-[0_0_50px_rgba(255,150,50,0.6)]">
             {/* Craters / Texture */}
             <div className="absolute top-10 left-12 w-16 h-16 bg-black/10 rounded-full blur-md"></div>
             <div className="absolute bottom-12 right-16 w-24 h-24 bg-black/5 rounded-full blur-xl"></div>
             <div className="absolute top-1/2 right-8 w-10 h-10 bg-black/10 rounded-full blur-sm"></div>
          </div>
        </div>

        {/* LAYER 4: Korean Palace Silhouette (Foreground - Moves least) */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-10 h-[60vh] w-full"
          style={{ transform: `translate(${mousePos.x * -5}px, ${mousePos.y * 5}px)` }} // Slight opposite movement
        >
          <img 
            src="https://images.unsplash.com/photo-1590128965859-99d799f9273c?auto=format&fit=crop&q=80&w=2000" 
            alt="Korean Palace Night" 
            className="w-full h-full object-cover object-bottom opacity-90 mask-image-gradient"
            style={{ 
              maskImage: 'linear-gradient(to top, black 50%, transparent 100%)', 
              WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)' 
            }}
          />
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
          <div className="relative py-8">
            <p className="text-sm md:text-base uppercase tracking-[0.2em] mb-8 text-orange-200 animate-fade-in font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {content.hero.subtitle[lang]}
            </p>
            
            <div className="mb-12">
              <h1 className="text-5xl md:text-8xl font-extrabold text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,1)] tracking-tight">
                {content.hero.title[lang]}
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Link to="/menu" className="w-full md:w-auto">
                <Button variant="outline" className="w-full group flex items-center justify-center gap-3 px-10 py-4 border-orange-200/50 text-orange-100 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all backdrop-blur-sm">
                  {content.hero.cta[lang]} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto"
              >
                <Button variant="outline" className="w-full group flex items-center justify-center gap-3 px-10 py-4 border-orange-200/50 text-orange-100 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all backdrop-blur-sm">
                  WhatsApp <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Fade to blend with next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-20"></div>
      </section>

      {/* Intro Section */}
      <section className="py-24 relative px-6 overflow-hidden">
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
                className="w-full h-[500px] object-cover filter grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
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
              <div key={item.id} className="group cursor-pointer">
                <div className="overflow-hidden mb-6 relative border border-white/5 bg-neutral-900">
                  <img 
                    src={item.image} 
                    alt={item.name[lang]} 
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 backdrop-blur-sm border border-white/10">
                    <Star size={12} className="text-gold inline mr-1" fill={state.theme.primaryColor} />
                    <span className="text-xs tracking-widest uppercase text-white">Popular</span>
                  </div>
                </div>
                <div className="text-center p-4 transition-colors hover:bg-white/5 rounded-sm">
                  <h3 className="text-xl text-white font-bold mb-2 uppercase">{item.name[lang]}</h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description[lang]}</p>
                  <p className="text-lg font-bold" style={{ color: state.theme.primaryColor }}>
                    {lang === 'en' ? `RM ${item.price}` : `${item.price} 링깃`}
                  </p>
                </div>
              </div>
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
            <div className="space-y-8 mt-12">
              {news.slice(0, 3).map(post => (
                <div key={post.id} className="border-b border-neutral-800 pb-8 last:border-0 hover:bg-neutral-900/50 p-6 transition-colors rounded">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                    <h3 className="text-xl text-white font-bold uppercase">{post.title[lang]}</h3>
                    <span className="text-xs text-gray-500 tracking-widest border border-neutral-800 px-2 py-1">{post.date}</span>
                  </div>
                  <p className="text-gray-400 font-light">{post.content[lang]}</p>
                </div>
              ))}
              {news.length === 0 && (
                <p className="text-center text-gray-600 italic">{lang === 'en' ? 'No news available.' : '새로운 소식이 없습니다.'}</p>
              )}
            </div>
         </div>
      </section>

      {/* Location & Reservation Map */}
      <section className="py-24 px-6 border-t border-neutral-900/50 bg-neutral-900/30">
        <div className="container mx-auto max-w-5xl text-center">
           <SectionTitle title={lang === 'en' ? 'Visit Us' : '오시는 길'} subtitle={lang === 'en' ? 'Location' : '위치'} centered={true} />
           
           <div className="w-full h-[400px] md:h-[500px] border border-neutral-800 grayscale hover:grayscale-0 transition-all duration-700 mb-12 shadow-2xl">
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