import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone, MapPin, Instagram, Facebook, Clock, AtSign } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { state, setLanguage } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { en: 'Home', ko: '홈', path: '/' },
    { en: 'Menu', ko: '메뉴', path: '/menu' },
    { en: 'About', ko: '소개', path: '/about' },
    { en: 'Location', ko: '위치', path: '/location' },
    { en: 'Reservation', ko: '예약', path: '/reservation' },
  ];

  const toggleLang = () => {
    setLanguage(state.lang === 'en' ? 'ko' : 'en');
  };

  const activeColor = state.theme.primaryColor;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isOpen ? 'bg-black/95 py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="z-50 group">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-bold text-white tracking-[0.3em] group-hover:opacity-80 transition-opacity">
              {state.lang === 'en' ? 'HAN GEU LEUS' : '한 그 릇'}
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm uppercase tracking-widest hover:text-[${activeColor}] transition-colors font-medium`}
              style={{ color: location.pathname === link.path ? activeColor : 'white' }}
            >
              {link[state.lang]}
            </Link>
          ))}
          
          <button onClick={toggleLang} className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors ml-4 border border-white/20 px-3 py-1 rounded-full">
            <Globe size={14} />
            {state.lang === 'en' ? 'KO' : 'EN'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white z-50">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/95 flex flex-col justify-center items-center gap-8 transition-transform duration-500 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-2xl font-bold text-white tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              {link[state.lang]}
            </Link>
          ))}
          <button onClick={toggleLang} className="mt-8 text-gold uppercase tracking-widest">
            Switch to {state.lang === 'en' ? 'Korean' : 'English'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => {
  const { state } = useApp();
  const { contact, footer } = state.content;
  const lang = state.lang;
  const primaryColor = state.theme.primaryColor;

  // Fallback defaults if footer is missing (migration safety)
  const brandName = footer?.brandName?.[lang] || (lang === 'en' ? 'HAN GEU LEUS' : '한 그 릇');
  const tagline = footer?.tagline?.[lang] || (lang === 'en' ? 'Authentic Korean-Chinese Cuisine.' : '정통 중화요리의 진수.');
  const logo = footer?.logo || '';

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          
          {/* 1. Brand Info - Left Aligned */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-[0.2em]">{brandName}</h3>
            <p className="text-gray-500 text-sm leading-relaxed uppercase tracking-wide">
              {tagline}
            </p>
            <div className="flex gap-4 pt-2">
               {contact.social?.instagram && (
                 <a href={contact.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white text-gray-500 transition-colors">
                   <Instagram size={20} />
                 </a>
               )}
               {contact.social?.facebook && (
                 <a href={contact.social.facebook} target="_blank" rel="noreferrer" className="hover:text-white text-gray-500 transition-colors">
                   <Facebook size={20} />
                 </a>
               )}
               {contact.social?.threads && (
                 <a href={contact.social.threads} target="_blank" rel="noreferrer" className="hover:text-white text-gray-500 transition-colors">
                   <AtSign size={20} />
                 </a>
               )}
            </div>
          </div>

          {/* 2. Contact - Centered Block */}
          <div className="flex flex-col md:items-center">
            <div className="space-y-6">
              <h4 className="text-sm uppercase tracking-widest font-bold" style={{ color: primaryColor }}>{lang === 'en' ? 'Contact' : '연락처'}</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3 items-start"><MapPin size={16} className="mt-0.5 shrink-0" /> {contact.address[lang]}</li>
                <li className="flex gap-3 items-center"><Phone size={16} className="shrink-0" /> {contact.phone}</li>
                <li className="flex gap-3 items-center"><Clock size={16} className="shrink-0" /> {contact.hours[lang]}</li>
              </ul>
            </div>
          </div>

          {/* 3. Links - Centered Block */}
          <div className="flex flex-col md:items-center">
             <div className="space-y-6 w-full md:w-auto">
               <h4 className="text-sm uppercase tracking-widest font-bold" style={{ color: primaryColor }}>{lang === 'en' ? 'Links' : '링크'}</h4>
               <ul className="space-y-3 text-sm text-gray-400">
                  <li><Link to="/menu" className="hover:text-white transition-colors tracking-wide">{lang === 'en' ? 'Menu' : '메뉴'}</Link></li>
                  <li><Link to="/location" className="hover:text-white transition-colors tracking-wide">{lang === 'en' ? 'Location' : '위치'}</Link></li>
                  <li><Link to="/reservation" className="hover:text-white transition-colors tracking-wide">{lang === 'en' ? 'Reservations' : '예약'}</Link></li>
                  <li><Link to="/admin" className="hover:text-white transition-colors tracking-wide">Admin Login</Link></li>
               </ul>
             </div>
          </div>

          {/* 4. Logo - Right Aligned */}
          <div className="flex flex-col items-start md:items-end h-full">
            {logo && (
              <div className="w-[150px] h-[150px] flex items-center justify-center">
                <img src={logo} alt="Brand Logo" className="w-full h-full object-contain opacity-80" />
              </div>
            )}
          </div>

        </div>
        <div className="border-t border-neutral-900 mt-20 pt-8 text-center text-xs text-gray-600 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Han Geu Leus. All rights reserved.
        </div>
      </div>
    </footer>
  );
};