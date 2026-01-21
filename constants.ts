import { AppState, MenuItem, NewsPost } from './types';

// PASTE START: Generated from Admin (2026-01-21T09:52:51.017Z)
const CURRENT_STATE = {
  "lang": "en",
  "theme": {
    "primaryColor": "#D4AF37"
  },
  "menu": [
    {
      "id": "1",
      "category": "noodles",
      "name": {
        "en": "Jajangmyeon",
        "ko": "자장면"
      },
      "description": {
        "en": "Noodles in a rich black bean sauce with pork and onions.",
        "ko": "돼지고기와 양파를 듬뿍 넣은 진한 춘장 소스의 면 요리."
      },
      "price": 14,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260117_081238_05644889-1fdb-4e9d-bf6d-a0d152cb1fa6.png",
      "isPopular": true
    },
    {
      "id": "2",
      "category": "noodles",
      "name": {
        "en": "Jjamppong",
        "ko": "짬뽕"
      },
      "description": {
        "en": "Spicy seafood noodle soup with vegetables.",
        "ko": "해산물과 채소가 어우러진 얼큰한 국물 요리."
      },
      "price": 16,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260117_032254_57982580-dab1-4c39-9a8a-3054b6c30f94.png",
      "isPopular": true
    },
    {
      "id": "3",
      "category": "dishes",
      "name": {
        "en": "Tang Soo-yook(Regular)",
        "ko": "탕수육(중)"
      },
      "description": {
        "en": "Korean-style sweet and sour pork.",
        "ko": "바삭하게 튀긴 돼지고기에 새콤달콤한 소스를 더한 한국식 탕수육."
      },
      "price": 50,
      "image": "https://696fb61876634d918b871516.imgix.net/%ED%83%95%EC%88%98%EC%9C%A1.png",
      "isPopular": true
    },
    {
      "id": "4",
      "category": "dishes",
      "name": {
        "en": "Tang Soo-yook(large)",
        "ko": "탕수육(대)"
      },
      "description": {
        "en": "Korean-style sweet and sour pork.",
        "ko": "바삭하게 튀긴 돼지고기에 새콤달콤한 소스를 더한 한국식 탕수육."
      },
      "price": 90,
      "image": "https://696fb61876634d918b871516.imgix.net/%ED%83%95%EC%88%98%EC%9C%A1.png",
      "isPopular": false
    },
    {
      "id": "5",
      "category": "dishes",
      "name": {
        "en": "Yoo-rin Chicken(Regular)",
        "ko": "유린치킨(중)"
      },
      "description": {
        "en": "Deep-fried chicken topped with hot and sour soy sauce.",
        "ko": "바삭한 치킨에 새콤하고 매콤한 간장 소스를 곁들인 요리."
      },
      "price": 50,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260120_122626_95e36479-6678-4bbd-851c-8c18f879b041.png",
      "isPopular": true
    },
    {
      "id": "1768969350950",
      "category": "dishes",
      "name": {
        "en": " Fried Shrimp with Cream Sauce(Regular)",
        "ko": "크림새우(중)"
      },
      "description": {
        "en": "Deep-fried shrimp served with spicy cream sauce and chili peppers.",
        "ko": "바삭한 새우 튀김에 매콤한 크림 소스를 곁들였습니다."
      },
      "price": 55,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260120_143644_53e4831c-7853-4b85-a016-e73606c6f9ec.png",
      "isPopular": false
    },
    {
      "id": "1768969422694",
      "category": "dishes",
      "name": {
        "en": " Fried Shrimp with Cream Sauce(Large)",
        "ko": "크림새우(대)"
      },
      "description": {
        "en": "Deep-fried shrimp served with spicy cream sauce and chili peppers.",
        "ko": "바삭한 새우 튀김에 매콤한 크림 소스를 곁들였습니다."
      },
      "price": 99,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260120_143644_53e4831c-7853-4b85-a016-e73606c6f9ec.png",
      "isPopular": false
    },
    {
      "id": "1768969485626",
      "category": "dishes",
      "name": {
        "en": "Pork Cutlet",
        "ko": "돈까스"
      },
      "description": {
        "en": "Crispy breaded pork cutlet.",
        "ko": "바삭하게 튀긴 한국식 돈까스."
      },
      "price": 35,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260120_123049_130d9516-0ff7-4d52-966f-5be3242ab738.png",
      "isPopular": false
    },
    {
      "id": "1768969592524",
      "category": "rice",
      "name": {
        "en": "Seafood Jjam Bbong Rice",
        "ko": "해물 짬뽕밥"
      },
      "description": {
        "en": "Spicy seafood soup served with rice.",
        "ko": "얼큰한 해물 짬뽕 국물과 밥을 함께 제공합니다."
      },
      "price": 28,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260120_132940_48715c18-6666-421c-865d-20dca9f342da.png",
      "isPopular": false
    },
    {
      "id": "1768969631602",
      "category": "rice",
      "name": {
        "en": "Chicken Mayo Rice + Jjam Bbong Soup",
        "ko": "치킨마요 덮밥 + 짬뽕국물"
      },
      "description": {
        "en": "Fried chicken over rice with teriyaki mayo sauce, served with spicy soup.",
        "ko": "치킨과 마요 소스를 얹은 덮밥에 짬뽕 국물 제공."
      },
      "price": 28,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260120_133008_3dd0f2ef-96e1-4b54-ae54-167cd86e1b5a.png",
      "isPopular": false
    }
  ],
  "news": [
    {
      "id": "1",
      "title": {
        "en": "Grand Opening",
        "ko": "그랜드 오픈"
      },
      "content": {
        "en": "We are thrilled to open our doors in the heart of the city.",
        "ko": "도심 한복판에 새로운 매장을 오픈하게 되어 기쁩니다."
      },
      "date": "2026-01-21"
    },
    {
      "id": "2",
      "title": {
        "en": "New Seasonal Menu",
        "ko": "신규 시즌 메뉴"
      },
      "content": {
        "en": "Try our new oyster dishes available for a limited time.",
        "ko": "한정 기간 동안 제공되는 굴 요리를 맛보세요."
      },
      "date": "2026-02-09"
    }
  ],
  "content": {
    "hero": {
      "title": {
        "en": "One bowl is finished by fire",
        "ko": "한 그 릇은 불이 완성합니다"
      },
      "subtitle": {
        "en": "Crafted by someone who understands fire",
        "ko": "불가마를 알던 사람이 불의 맛을 만듭니다"
      },
      "cta": {
        "en": "View Menu",
        "ko": "메뉴 보기"
      },
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260121_031550_3093b2f9-6c3e-477a-a4b4-4052d8aa3ec8.png",
      "imageOpacity": 0.2
    },
    "about": {
      "title": {
        "en": "Our Story",
        "ko": "한그릇 브랜드 이야기"
      },
      "description": {
        "en": "HAN GEU LEUS finishes every bowl by a standard shaped by fire.",
        "ko": "한그릇은 불을 다루던 장인의 기준으로 한 그릇의 깊이를 완성합니다."
      },
      "details": {
        "en": "HAN GEU LEUS does not stop at\nrecreating the taste you remember from Korea\nhere in Malaysia.\n\nThe climate is different.\nThe ingredients respond differently.\nAnd most importantly,\nfire behaves differently here.\n\nBefore cooking,\nChef Jang worked with fire in a kiln,\nshaping ceramics—\nlearning that fire may look the same,\nbut never acts the same.\n\nThat understanding defines our kitchen.\n\nEvery process was redesigned.\nHeat, timing, and sequence\nwere recalibrated from the ground up\nuntil the same depth of flavor emerged.\n\nIt takes more time.\nIt demands more precision.\nAnd it allows no shortcuts.\n\nBut at the very least,\nwe never want you to leave thinking,\n“I shouldn’t have come.”\n\nThe HAN GEU LEUS you expect—\ntreated with the seriousness it deserves.\n\nThis is HAN GEU LEUS.",
        "ko": "한그릇은\n한국에서 먹던 그 맛을\n말레이시아에서도 그대로 재현하는 데서\n멈추지 않습니다.\n\n이곳은 기후가 다르고,\n재료가 다르고,\n무엇보다 불의 성질이 다릅니다.\n\n불가마 앞에서\n도자기를 만들던 쉐프 장은\n불이 같아 보인다고\n결과가 같아지지 않는다는 걸\n이미 알고 있었습니다.\n\n그래서 모든 과정을\n다시 설계했습니다.\n불의 세기, 시간, 순서까지\n같은 깊이가 나올 때까지\n처음부터 다시 맞췄습니다.\n\n그래서 시간이 더 걸리고,\n그래서 더 어렵습니다.\n\n하지만 적어도,\n당신이 **“괜히 왔다”**는 생각만큼은\n하지 않게 하고 싶었습니다.\n\n당신이 기대하는 그 한 그릇.\n그 기대를\n가볍게 대하지 않는 곳.\n\n한그릇입니다."
      },
      "image": "https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-01-20%20192755.png",
      "stats": {
        "stat1": {
          "value": "20+",
          "label": {
            "en": "Years of Working with Fire",
            "ko": "년 이상의 불을 다뤄온 경험"
          }
        },
        "stat2": {
          "value": "100%",
          "label": {
            "en": "Fresh Ingredients",
            "ko": "신선한 재료"
          }
        }
      }
    },
    "contact": {
      "address": {
        "en": "98-1, Jalan Dataran Cheras 5, DATARAN PERNIAGAAN BALAKONG, 43200 Cheras, Selangor",
        "ko": "말레이시아 셀랑고르주 체라스 발라콩 상업지구 다타란 체라스 5번가 98-1 (우편번호 43200)"
      },
      "phone": "+60 11-1635-2210",
      "email": "reservation@hangeuleus.com",
      "hours": {
        "en": "Daily: 11:00 AM - 10:00 PM",
        "ko": "매일: 오전 11시 - 오후 10시"
      },
      "social": {
        "instagram": "https://instagram.com",
        "facebook": "https://facebook.com",
        "threads": "https://threads.net"
      }
    },
    "footer": {
      "brandName": {
        "en": "HAN GEU LEUS",
        "ko": "한 그 릇"
      },
      "tagline": {
        "en": "A bowl shaped by fire and standards.",
        "ko": "불과 기준으로 완성한 한 그릇."
      },
      "logo": "https://696fb61876634d918b871516.imgix.net/%EB%A1%9C%EA%B3%A0_21.png"
    }
  }
};
// PASTE END

export const INITIAL_MENU: MenuItem[] = CURRENT_STATE.menu;
export const INITIAL_NEWS: NewsPost[] = CURRENT_STATE.news;
export const INITIAL_STATE: AppState = CURRENT_STATE;