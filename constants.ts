import { AppState, MenuItem, NewsPost } from './types';

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    category: 'noodles',
    name: { en: 'Jajangmyeon', ko: '자장면' },
    description: { 
      en: 'Noodles in a rich black bean sauce with pork and onions.', 
      ko: '돼지고기와 양파를 듬뿍 넣은 진한 춘장 소스의 면 요리.' 
    },
    price: 14,
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
  },
  {
    id: '2',
    category: 'noodles',
    name: { en: 'Jjamppong', ko: '짬뽕' },
    description: { 
      en: 'Spicy seafood noodle soup with vegetables.', 
      ko: '해산물과 채소가 어우러진 얼큰한 국물 요리.' 
    },
    price: 16,
    image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
  },
  {
    id: '3',
    category: 'dishes',
    name: { en: 'Tangsuyuk', ko: '탕수육' },
    description: { 
      en: 'Crispy deep-fried pork with sweet and sour sauce.', 
      ko: '바삭하게 튀긴 돼지고기에 새콤달콤한 소스를 곁들인 요리.' 
    },
    price: 24,
    image: 'https://images.unsplash.com/photo-1626804475297-411f7c8d9e72?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
  },
  {
    id: '4',
    category: 'rice',
    name: { en: 'Fried Rice', ko: '볶음밥' },
    description: { 
      en: 'Wok-fried rice with shrimp, egg, and vegetables.', 
      ko: '새우, 계란, 야채를 넣고 센 불에 볶아낸 밥.' 
    },
    price: 15,
    image: 'https://images.unsplash.com/photo-1603133872878-684f5c9322ed?auto=format&fit=crop&q=80&w=800',
    isPopular: false,
  },
   {
    id: '5',
    category: 'dishes',
    name: { en: 'Kkanpunggi', ko: '깐풍기' },
    description: { 
      en: 'Spicy garlic fried chicken.', 
      ko: '매콤한 마늘 소스로 맛을 낸 닭고기 튀김.' 
    },
    price: 26,
    image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&q=80&w=800',
    isPopular: false,
  },
];

export const INITIAL_NEWS: NewsPost[] = [
  {
    id: '1',
    title: { en: 'Grand Opening', ko: '그랜드 오픈' },
    content: { 
      en: 'We are thrilled to open our doors in the heart of the city.', 
      ko: '도심 한복판에 새로운 매장을 오픈하게 되어 기쁩니다.' 
    },
    date: '2023-10-01'
  },
  {
    id: '2',
    title: { en: 'New Seasonal Menu', ko: '신규 시즌 메뉴' },
    content: { 
      en: 'Try our new oyster dishes available for a limited time.', 
      ko: '한정 기간 동안 제공되는 굴 요리를 맛보세요.' 
    },
    date: '2023-11-15'
  }
];

export const INITIAL_STATE: AppState = {
  lang: 'en',
  theme: {
    primaryColor: '#D4AF37',
  },
  menu: INITIAL_MENU,
  news: INITIAL_NEWS,
  content: {
    hero: {
      title: { en: 'One bowl is finished by fire', ko: '한 그릇은 불에서 완성됩니다' },
      subtitle: { en: 'Crafted by someone who understands fire', ko: '불가마를 알던 사람이 불의 맛을 만듭니다' },
      cta: { en: 'View Menu', ko: '메뉴 보기' },
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600'
    },
    about: {
      title: { en: 'Our Story', ko: '우리의 이야기' },
      description: { 
        en: 'Han Geu Leus creates an unforgettable dining experience by blending traditional Chinese techniques with Korean palate preferences.', 
        ko: '한그릇은 전통 중식 조리법과 한국인의 입맛을 조화시켜 잊지 못할 다이닝 경험을 선사합니다.' 
      },
      details: {
        en: 'Han Geu Leus was founded with a simple mission: to redefine Korean-Chinese cuisine.\n\nOur journey began over 20 years ago in a small kitchen, experimenting with the delicate balance of "Wok Hei" (breath of the wok) and the savory, comforting flavors that Koreans love.\n\nWe believe that great food starts with great ingredients. That\'s why we source our produce locally every morning and use only the finest meats and seafood. Our chefs are masters of their craft, dedicated to preserving traditional techniques while embracing modern culinary innovations.\n\nWhether you are here for a quick lunch of Jajangmyeon or a full course dinner with family, we promise an experience that warms both your heart and stomach.',
        ko: '한그릇은 한국식 중화요리를 재정의하겠다는 단순한 사명으로 시작되었습니다.\n\n우리의 여정은 20여 년 전 작은 주방에서 시작되었으며, "웍 헤이(Wok Hei, 웍의 숨결)"의 섬세한 균형과 한국인이 사랑하는 감칠맛 나는 풍미를 연구해왔습니다.\n\n우리는 훌륭한 음식은 훌륭한 재료에서 시작된다고 믿습니다. 그래서 매일 아침 현지에서 신선한 농산물을 공수하고 최상급 고기와 해산물만을 사용합니다. 우리의 셰프들은 전통 기술을 보존하면서도 현대적인 요리 혁신을 수용하는 장인들입니다.\n\n간단한 자장면 점심 식사든 가족과 함께하는 코스 요리든, 몸과 마음을 모두 따뜻하게 하는 경험을 약속드립니다.'
      },
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
      stats: {
        stat1: {
          value: '20+',
          label: { en: 'Years of Experience', ko: '년 경력' }
        },
        stat2: {
          value: '100%',
          label: { en: 'Fresh Ingredients', ko: '신선한 재료' }
        }
      }
    },
    contact: {
      address: { 
        en: '98-1, Jalan Dataran Cheras 5, DATARAN PERNIAGAAN BALAKONG, 43200 Cheras, Selangor', 
        ko: '98-1, Jalan Dataran Cheras 5, DATARAN PERNIAGAAN BALAKONG, 43200 Cheras, Selangor' 
      },
      phone: '+82 2-1234-5678',
      email: 'reservation@hangeuleus.com',
      hours: { en: 'Daily: 11:00 AM - 10:00 PM', ko: '매일: 오전 11시 - 오후 10시' },
      social: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        threads: 'https://threads.net'
      }
    },
    footer: {
      brandName: { en: 'HAN GEU LEUS', ko: '한 그 릇' },
      tagline: { en: 'Authentic Korean-Chinese Cuisine.', ko: '정통 중화요리의 진수.' },
      logo: ''
    }
  }
};