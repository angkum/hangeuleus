import { AppState, MenuItem, NewsPost } from './types';

// PASTE START: Generated from Admin (2026-01-21T12:11:46.242Z)
const CURRENT_STATE: AppState = {
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
    },
    {
      "id": "1768996839598",
      "category": "rice",
      "name": {
        "en": "Wok Fried Rice",
        "ko": "중화 볶음밥"
      },
      "description": {
        "en": "Classic wok-fried rice finished over high heat for a fluffy, smoky “wok hei” aroma. Stir-fried with egg, scallions, and vegetables for a clean, satisfying bowl.",
        "ko": "강한 불에서 빠르게 볶아낸 쌀알의 고슬함과 ‘불맛’을 살린 기본 볶음밥. 계란, 파, 야채를 밸런스 있게 볶아 한 그릇으로 깔끔하게 완성했습니다."
      },
      "price": 18,
      "image": "https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-01-21%20195819.png",
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
        "en": "🔥 A Bowl Shaped by Fire — Coming Soon\n\nHello, this is HAN GEU LEUS.\n\n🍽️ Very soon,\nwe will introduce a bowl\ndefined by fire and standards in Malaysia.\n\nHAN GEU LEUS does not simply recreate\nthe taste you remember from Korea.\n\n🌏 The climate is different.\n🥬 Ingredients behave differently.\n🔥 And fire itself works differently here.\n\nSo we redesigned everything from the start—\nheat levels, timing, and sequence—\nuntil the same depth of flavor was achieved.\n\n👨‍🍳 Before the kitchen,\nChef Jang worked with fire in a kiln, shaping ceramics.\nHe learned that fire may look the same,\nbut it never delivers the same result.\n\nThat understanding now defines our food.\n\nThis is not fast cooking.\nThis is not compromise.\n\n✨ This is a bowl\nfinished by fire and held to a standard.\n\n📍 Grand Opening Coming Soon\nExperience a different approach\nto what a single bowl can be.\n\nWe look forward to welcoming you\nto HAN GEU LEUS",
        "ko": "🔥 불로 완성한 한 그릇, 곧 만납니다\n\n안녕하세요, HAN GEU LEUS입니다.\n\n🍽️ 곧,\n불을 기준으로 요리하는 한 그릇을\n말레이시아에서 선보입니다.\n\nHAN GEU LEUS는\n단순히 한국에서 먹던 맛을\n그대로 옮겨오는 데서 멈추지 않았습니다.\n\n🌏 기후가 다르고\n🥬 재료가 다르고\n🔥 무엇보다 불의 성질이 다른 이곳에서\n\n같은 깊이가 나올 때까지\n불의 세기, 시간, 순서를\n처음부터 다시 설계했습니다.\n\n👨‍🍳 불가마 앞에서 도자기를 만들던 쉐프 장은\n불이 같아 보여도\n결과는 절대 같지 않다는 걸 알고 있었습니다.\n그 기준은, 지금 이 주방에서도 이어집니다.\n\n그래서 HAN GEU LEUS의 한 그릇은\n✔ 빠르게 만든 음식이 아니고\n✔ 타협한 맛도 아닙니다.\n\n✨ 불로 완성한 기준입니다.\n\n📍 Grand Opening Coming Soon\n지금까지와는 다른\n한 그릇의 기준을\n직접 경험해 보세요.\n\n곧,\nHAN GEU LEUS에서 뵙겠습니다."
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
        "en": "🔥 SEASONAL SET MENU\nExperience Cooking by Fire\n\nHello from HAN GEU LEUS,\n\nFor a limited time only,\nwe present a seasonal set menu crafted to showcase\nour philosophy of cooking by fire.\n\nEach set is prepared with\ncarefully planned heat intensity and cooking sequence,\nfinished at the most stable depth of flavor.\n\n📌 Only 30 sets available per day.\n\n🍽️ Set Menu Includes\n\nJja Jang Noodle\n\nJjamppong Soup\n\nSweet and Sour Pork (Tang Soo Yook)\n\n✔ Each dish is cooked and served in perfect timing\n✔ to deliver its best texture and balance.\n\n📅 Availability\n\nDate: February 29, 2026\n\nTime: 11:00 AM – 2:00 PM\n\nQuantity: Limited to 30 sets per day\n\n💰 Price\n\nRegular Price: RM 56\n\nSeasonal Special: RM 28\n\n✔ Not a rushed lunch,\n✔ but a meal completed by fire.\n\n📍 Limited availability — first come, first served.\nExperience cooking by fire, only at HAN GEU LEUS.",
        "ko": "불의 요리를 경험하세요\n\n안녕하세요, HAN GEU LEUS입니다.\n\n한정된 시간 동안\n불의 기준으로 완성한 시즌 한정 세트 메뉴를 선보입니다.\n\n이번 세트는\n불의 세기와 조리 순서를 미리 설계해\n가장 안정적인 깊이로 완성한 구성입니다.\n\n📌 하루 단 30인분만 제공됩니다.\n\n🍽️ 세트 메뉴 구성\n\n짜장면\n\n짬뽕 국물\n\n탕수육\n\n✔ 각 메뉴는 동시에 가장 좋은 상태로 제공되도록\n✔ 불의 타이밍을 맞춰 조리됩니다.\n\n📅 이용 안내\n\n날짜: 2026년 2월 29일\n\n시간: 오전 11시 – 오후 2시\n\n수량: 하루 30세트 한정\n\n💰 가격\n\n정가 RM 56\n\n시즌 특별가 RM 28\n\n✔ 빠르게 소비되는 점심이 아닌,\n✔ 불로 완성한 기준을 경험하는 한 끼.\n\n📍 한정 수량으로 조기 마감될 수 있습니다.\n지금, 불의 요리를 경험해 보세요.\n\nHAN GEU LEUS"
      },
      "date": "2026-01-21",
      "image": "https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-01-21%20200609.png"
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