import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { SectionTitle, Button, useInView, useIsTouch } from '../components/UI';
import { MapPin, Phone, Clock, Mail, Copy, Check, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const Location: React.FC = () => {
  const { state } = useApp();
  const { lang } = state;
  const { contact } = state.content;
  
  const { ref: mapRef, isInView: mapInView } = useInView({ threshold: 0.3 });
  const isTouch = useIsTouch();
  const mapActive = isTouch && mapInView;

  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const address = contact.address[lang];
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
         <SectionTitle 
            title={lang === 'en' ? 'Visit Us' : '오시는 길'} 
            subtitle={lang === 'en' ? 'Location' : '위치'} 
            centered={true} 
         />

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
            <div className="space-y-8 bg-neutral-900 p-8 border border-neutral-800 animate-fade-in">
               <div className="flex items-start gap-4">
                  <MapPin className="text-gold shrink-0 mt-1" size={24} />
                  <div className="flex-1">
                     <h3 className="text-white font-bold mb-2 uppercase tracking-widest">{lang === 'en' ? 'Address' : '주소'}</h3>
                     <p className="text-gray-400 whitespace-pre-line mb-4">{contact.address[lang]}</p>
                     
                     <div className="flex flex-wrap gap-3">
                       <button 
                         onClick={handleCopyAddress}
                         className="text-xs flex items-center gap-2 px-3 py-2 border border-neutral-700 rounded hover:bg-neutral-800 text-gold transition-colors font-medium tracking-wide"
                       >
                         {copied ? <Check size={14} /> : <Copy size={14} />}
                         {copied ? (lang === 'en' ? 'Copied!' : '복사됨!') : (lang === 'en' ? 'Copy Address' : '주소 복사')}
                       </button>

                       <a 
                         href="https://waze.com/ul?q=HAMGEULEUS&navigate=yes"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-xs flex items-center gap-2 px-3 py-2 border border-neutral-700 rounded hover:bg-neutral-800 text-blue-400 transition-colors font-medium tracking-wide group"
                       >
                         <Navigation size={14} className="group-hover:text-blue-300" />
                         {lang === 'en' ? 'Waze Navigation' : 'Waze 실행'}
                       </a>
                     </div>
                  </div>
               </div>

               <div className="flex items-start gap-4">
                  <Phone className="text-gold shrink-0 mt-1" size={24} />
                  <div>
                     <h3 className="text-white font-bold mb-2 uppercase tracking-widest">{lang === 'en' ? 'Phone' : '전화번호'}</h3>
                     <p className="text-gray-400">{contact.phone}</p>
                  </div>
               </div>

               <div className="flex items-start gap-4">
                  <Clock className="text-gold shrink-0 mt-1" size={24} />
                  <div>
                     <h3 className="text-white font-bold mb-2 uppercase tracking-widest">{lang === 'en' ? 'Opening Hours' : '영업 시간'}</h3>
                     <p className="text-gray-400">{contact.hours[lang]}</p>
                  </div>
               </div>
               
               {contact.email && (
                 <div className="flex items-start gap-4">
                    <Mail className="text-gold shrink-0 mt-1" size={24} />
                    <div>
                       <h3 className="text-white font-bold mb-2 uppercase tracking-widest">{lang === 'en' ? 'Email' : '이메일'}</h3>
                       <p className="text-gray-400">{contact.email}</p>
                    </div>
                 </div>
               )}
            </div>

            <div className="flex flex-col justify-center h-full space-y-6 text-center md:text-left animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
               <h3 className="text-2xl text-white font-serif">{lang === 'en' ? 'Getting Here' : '찾아오시는 길'}</h3>
               <p className="text-gray-400 leading-relaxed">
                  {lang === 'en' 
                    ? 'We are located in the heart of Cheras, easily accessible via major highways. Ample parking is available nearby for your convenience.' 
                    : '체라스 중심부에 위치해 있어 주요 고속도로를 통해 쉽게 접근하실 수 있습니다. 인근에 편리하게 이용하실 수 있는 주차 공간이 마련되어 있습니다.'}
               </p>
               <div>
                  <Link to="/reservation">
                    <Button variant="outline" className="min-w-[200px]">
                      {lang === 'en' ? 'Make a Reservation' : '예약하기'}
                    </Button>
                  </Link>
               </div>
            </div>
         </div>

         <div 
             ref={mapRef}
             className={`w-full h-[400px] md:h-[500px] border border-neutral-800 transition-all duration-700 shadow-2xl animate-fade-in ${mapActive ? 'grayscale-0' : 'grayscale hover:grayscale-0'}`}
             style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
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
      </div>
    </div>
  );
};

export default Location;