import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { SectionTitle, Button, Input, TextArea } from '../components/UI';

const Reservation: React.FC = () => {
  const { state } = useApp();
  const { lang } = state;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xpqqjdln", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000); // Reset after 5s
      } else {
        alert(lang === 'en' ? 'Something went wrong. Please try again.' : '오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert(lang === 'en' ? 'Network error. Please try again.' : '네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <SectionTitle 
          title={lang === 'en' ? 'Reservations' : '예약'} 
          subtitle={lang === 'en' ? 'Book Your Table' : '테이블 예약'} 
        />

        {submitted ? (
          <div className="bg-neutral-900 border border-gold p-8 text-center animate-fade-in">
            <h3 className="text-2xl font-serif text-white mb-4">{lang === 'en' ? 'Request Received' : '예약 요청 접수'}</h3>
            <p className="text-gray-400">
              {lang === 'en' 
                ? 'We have received your request. We will confirm via email or phone shortly.' 
                : '예약 요청이 접수되었습니다. 곧 이메일이나 전화로 확정 안내를 드리겠습니다.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-neutral-900/50 p-8 md:p-12 border border-neutral-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input required name="name" label={lang === 'en' ? 'Name' : '성함'} type="text" placeholder="John Doe" />
              <Input required name="phone" label={lang === 'en' ? 'Phone' : '연락처'} type="tel" placeholder="+60 12-345-6789" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <Input required name="date" label="Date" type="date" lang="en" />
              <Input required name="time" label="Time" type="time" lang="en" />
            </div>
            <div className="mt-2">
              <Input required name="guests" label={lang === 'en' ? 'Guests' : '인원'} type="number" min="1" max="20" />
            </div>
            <div className="mt-2">
              <TextArea name="message" label={lang === 'en' ? 'Special Requests' : '요청사항'} rows={4} />
            </div>
            
            <div className="mt-8 text-center">
              <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                {isSubmitting 
                  ? (lang === 'en' ? 'Sending...' : '전송 중...') 
                  : (lang === 'en' ? 'Request Reservation' : '예약 요청')
                }
              </Button>
            </div>
          </form>
        )}
        
        <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-2">{lang === 'en' ? 'For private dining or events, please contact us directly.' : '프라이빗 다이닝 및 행사 문의는 직접 연락 부탁드립니다.'}</p>
            <p className="text-white text-lg font-serif">{state.content.contact.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;