import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { SectionTitle, Button, Input, TextArea } from '../components/UI';
import { Calendar, Clock } from 'lucide-react';

const generateTimeSlots = () => {
  const slots = [];
  const startHour = 11; // 11 AM
  const endHour = 22;   // 10 PM
  
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += 10) {
      if (h === endHour && m > 0) break; // Stop at 10:00 PM exactly
      
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHour = h > 12 ? h - 12 : h;
      const displayMinute = m.toString().padStart(2, '0');
      
      slots.push(`${displayHour}:${displayMinute} ${period}`);
    }
  }
  return slots;
};

const Reservation: React.FC = () => {
  const { state } = useApp();
  const { lang } = state;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for Phone input to enforce +60 prefix
  const [phone, setPhone] = useState("+60 ");
  // State for Date/Time inputs
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const timeSlots = generateTimeSlots();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Strict prefix enforcement: Must start with "+60 "
    if (!inputValue.startsWith("+60 ")) {
       // Allow recovery if they deleted just the space (e.g. "+601")
       if (inputValue.startsWith("+60")) {
          const raw = inputValue.substring(3).replace(/[^0-9]/g, '');
          setPhone("+60 " + raw);
       } else {
          // Reset if prefix is damaged
          setPhone("+60 ");
       }
       return;
    }

    // Get the part after "+60 "
    const inputNumber = inputValue.substring(4);
    
    // Allow only numeric digits
    const cleanNumber = inputNumber.replace(/[^0-9]/g, '');
    
    setPhone("+60 " + cleanNumber);
  };

  const getFormattedDate = () => {
    if (!dateValue) return "";
    const [year, month, day] = dateValue.split("-");
    return `${day}-${month}-${year.slice(2)}`; // Convert YYYY-MM-DD to DD-MM-YY
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mwvbdoza", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        setPhone("+60 "); // Reset phone
        setDateValue(""); // Reset date
        setTimeValue(""); // Reset time
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
      <style>{`
        /* 
           CSS Trick: Expand the calendar picker indicator to cover the entire input.
           This ensures clicking anywhere on the input opens the native date picker 
           without relying on JS .showPicker() which can cause security errors in iframes.
        */
        input[type="date"]::-webkit-calendar-picker-indicator {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            cursor: pointer;
            opacity: 0;
        }
      `}</style>
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
              <Input 
                required 
                name="phone" 
                label={lang === 'en' ? 'Phone' : '연락처'} 
                type="tel" 
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+60 123456789" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              
              {/* Custom Date Input for DD-MM-YY format */}
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Date</label>
                <div className="relative bg-neutral-900 border border-neutral-800 h-[50px]">
                   {/* Visible Display Layer */}
                   <div className={`absolute inset-0 w-full h-full p-3 flex justify-between items-center pointer-events-none ${!dateValue ? 'text-gray-500' : 'text-white'}`}>
                       <span>{dateValue ? getFormattedDate() : 'DD-MM-YY'}</span>
                       <Calendar size={16} className="text-gray-400" />
                   </div>
                   
                   {/* Hidden Native Input Layer (Triggers Picker) */}
                   <input 
                      required 
                      name="date" 
                      type="date" 
                      lang="en" 
                      value={dateValue}
                      onChange={(e) => setDateValue(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 [color-scheme:dark]"
                   />
                </div>
              </div>

              {/* Custom Time Select for 10-min intervals & AM/PM */}
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Time</label>
                <div className="relative h-[50px]">
                   <select 
                      required 
                      name="time" 
                      value={timeValue}
                      onChange={(e) => setTimeValue(e.target.value)}
                      className={`w-full h-full bg-neutral-900 border border-neutral-800 p-3 appearance-none focus:outline-none focus:border-white transition-colors cursor-pointer ${!timeValue ? 'text-gray-500' : 'text-white'}`}
                   >
                      <option value="" disabled>-- : -- --</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-neutral-800 text-white">{slot}</option>
                      ))}
                   </select>
                   <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                      <Clock size={16} />
                   </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Input required name="guests" label={lang === 'en' ? 'Guests' : '인원'} type="number" min="1" max="20" />
            </div>
            <div className="mt-2">
              <TextArea 
                name="message" 
                label={lang === 'en' ? 'Special Requests' : '요청사항'} 
                rows={4} 
                placeholder={lang === 'en' 
                  ? "We will reserve your valuable seat. Please note that reservations may be automatically cancelled if you arrive more than 10 minutes late. We will contact you shortly to confirm." 
                  : "고객님의 소중한 좌석을 준비해 두겠습니다. 원활한 테이블 운영을 위해 예약 시간으로부터 10분이 경과하면 예약이 자동 취소될 수 있는 점 너그러운 양해 부탁드립니다. 예약 확정 여부는 확인 후 곧바로 연락드리겠습니다."
                }
              />
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