import { AppState, MenuItem, NewsPost, MenuCategory, MenuSubCategory } from './types';

// PASTE START: Generated from Admin (2026-01-31T16:31:35.002Z)
const CURRENT_STATE: AppState = {
  "lang": "en",
  "theme": {
    "primaryColor": "#D4AF37"
  },
  "categories": [
    {
      "id": "c_sets",
      "name": {
        "en": "Set & Weekday Specials",
        "ko": "세트 및 평일 런치"
      },
      "order": 1
    },
    {
      "id": "c_mains",
      "name": {
        "en": "Main Dishes",
        "ko": "단품 식사류"
      },
      "order": 2
    },
    {
      "id": "c_fried",
      "name": {
        "en": "Fried & Side Dishes",
        "ko": "요리 및 사이드"
      },
      "order": 3
    },
    {
      "id": "c_drinks",
      "name": {
        "en": "Drinks & Alcohol",
        "ko": "음료 및 주류"
      },
      "order": 4
    }
  ],
  "subCategories": [
    {
      "id": "s_best_set",
      "categoryId": "c_sets",
      "name": {
        "en": "S-1. BEST Set Menu",
        "ko": "S-1. 베스트 세트 메뉴"
      },
      "order": 1
    },
    {
      "id": "s_weekday",
      "categoryId": "c_sets",
      "name": {
        "en": "DS. Weekday Lunch Menu",
        "ko": "DS. 평일 런치 메뉴"
      },
      "order": 2
    },
    {
      "id": "s_noodle",
      "categoryId": "c_mains",
      "name": {
        "en": "M. Noodle Dishes",
        "ko": "M. 면류"
      },
      "order": 1
    },
    {
      "id": "s_rice",
      "categoryId": "c_mains",
      "name": {
        "en": "R. Rice Dishes (1 PAX)",
        "ko": "R. 밥류 (1인)"
      },
      "order": 2
    },
    {
      "id": "s_fried_main",
      "categoryId": "c_fried",
      "name": {
        "en": "C. Fried Main Dishes",
        "ko": "C. 튀김 요리"
      },
      "order": 1
    },
    {
      "id": "s_side",
      "categoryId": "c_fried",
      "name": {
        "en": "E. Side Dishes",
        "ko": "E. 사이드 메뉴"
      },
      "order": 2
    },
    {
      "id": "s_drinks",
      "categoryId": "c_drinks",
      "name": {
        "en": "D. Drinks (Tea/Ade/Soda)",
        "ko": "D. 음료 (차/에이드)"
      },
      "order": 1
    },
    {
      "id": "s_liquor",
      "categoryId": "c_drinks",
      "name": {
        "en": "L. Liquor and Beer",
        "ko": "L. 주류 (소주/맥주)"
      },
      "order": 2
    }
  ],
  "menu": [
    {
      "id": "1",
      "subCategoryId": "s_noodle",
      "name": {
        "en": "Jajangmyeon",
        "ko": "짜장면"
      },
      "description": {
        "en": "Noodles in a rich black bean sauce with pork and onions.",
        "ko": "돼지고기와 양파를 듬뿍 넣은 진한 춘장 소스의 면 요리."
      },
      "price": 25,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260117_081238_05644889-1fdb-4e9d-bf6d-a0d152cb1fa6.png",
      "isPopular": true
    },
    {
      "id": "2",
      "subCategoryId": "s_noodle",
      "name": {
        "en": "Seafood Jjambbong",
        "ko": "해물 짬뽕"
      },
      "description": {
        "en": "Spicy seafood noodle soup with vegetables.",
        "ko": "해산물과 채소가 어우러진 얼큰한 국물 요리."
      },
      "price": 28,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260117_032254_57982580-dab1-4c39-9a8a-3054b6c30f94.png",
      "isPopular": true
    },
    {
      "id": "3",
      "subCategoryId": "s_fried_main",
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
      "isPopular": true,
      "order": 0
    },
    {
      "id": "4",
      "subCategoryId": "s_fried_main",
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
      "isPopular": false,
      "order": 1
    },
    {
      "id": "5",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "Yoo-rin Chicken(Regular)",
        "ko": "유린치킨(중)"
      },
      "description": {
        "en": "Deep-fried chicken topped with hot and sour soy sauce.",
        "ko": "바삭한 치킨에 새콤하고 매콤한 간장 소스를 곁들인 요리."
      },
      "price": 50,
      "image": "https://i.ibb.co/DPBrC0Nv/2026-01-30-173749.png",
      "isPopular": false,
      "order": 2
    },
    {
      "id": "1768969350950",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "Fried Shrimp with Cream Sauce(Regular)",
        "ko": "새우 후라이드 + 청양크림소스(중)"
      },
      "description": {
        "en": "Crispy fried shrimp served with spicy Cheongyang cream sauce.",
        "ko": "바삭한 새우 튀김에 매콤한 청양 크림 소스를 곁들였습니다."
      },
      "price": 55,
      "image": "https://i.ibb.co/3mqZK5KF/2026-01-31-180629.png",
      "isPopular": false,
      "order": 4
    },
    {
      "id": "1768969422694",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "Fried Shrimp with Cream Sauce(Large)",
        "ko": "새우 후라이드 + 청양크림소스대)"
      },
      "description": {
        "en": "Crispy fried shrimp served with spicy Cheongyang cream sauce.",
        "ko": "바삭한 새우 튀김에 매콤한 청양 크림 소스를 곁들였습니다."
      },
      "price": 99,
      "image": "https://i.ibb.co/3mqZK5KF/2026-01-31-180629.png",
      "isPopular": false,
      "order": 5
    },
    {
      "id": "1768969485626",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "Yoo-rin Chicken(Large)",
        "ko": "유린치킨(대)"
      },
      "description": {
        "en": ".Deep-fried chicken topped with hot and sour soy sauce",
        "ko": "알싸한 고추와 상큼한 간장 소스가 입맛을 돋우는 바삭한 치킨 요리"
      },
      "price": 90,
      "image": "https://i.ibb.co/DPBrC0Nv/2026-01-30-173749.png",
      "isPopular": false,
      "order": 3
    },
    {
      "id": "1768969592524",
      "subCategoryId": "s_rice",
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
      "subCategoryId": "s_rice",
      "name": {
        "en": "Chicken Mayo Rice + Jjam Bbong Soup",
        "ko": "치킨마요 덮밥 + 짬뽕국물"
      },
      "description": {
        "en": "Fried chicken over rice with teriyaki mayo sauce, served with spicy soup.",
        "ko": "치킨과 마요 소스를 얹은 덮밥에 짬뽕 국물 제공."
      },
      "price": 28,
      "image": "https://i.ibb.co/w2qFpxC/2026-01-30-143204.png",
      "isPopular": false
    },
    {
      "id": "1768996839598",
      "subCategoryId": "s_rice",
      "name": {
        "en": "Kimchi Samgyeopsal Deobap + Jjamppong Soup",
        "ko": "김치삼겹살덮밥 + 짬뽕국물"
      },
      "description": {
        "en": "CRUNCHY CHICKEN AND CREAMY TERIYAKI MAYO ON RICE—THE PERFECT COMFORT BOWL",
        "ko": "바삭한 치킨과 부드러운 마요 소스, 단짠의 정석을 보여주는 덮밥"
      },
      "price": 25,
      "image": "https://i.ibb.co/ds8r0ffb/2026-01-30-174728.png",
      "isPopular": false
    },
    {
      "id": "1769851092884",
      "subCategoryId": "s_best_set",
      "name": {
        "en": "HAN GEU LEUS Set",
        "ko": "한그릇 세트"
      },
      "description": {
        "en": "Choose Jjajang or Jjamppong · Includes salad, shrimp in cream sauce, sweet & sour pork(min 2 pax)",
        "ko": " 짜장면 또는 짬뽕 선택 · 샐러드, 고추마요새우, 탕수육 포함 세트메뉴(2인 이상 주문)"
      },
      "price": 45,
      "image": "https://697c89c1c4feaabd2d10ebfb.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-01-30%20183508.png",
      "isPopular": false
    },
    {
      "id": "1769851882303",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "(Tuesday)Jjajang Noodle + Yoo-rin Chicken",
        "ko": "(화요일)짜장면 + 유린치킨"
      },
      "description": {
        "en": "Lunch Specials 12:00PM~15:00PM",
        "ko": "점심특선__12:00PM~15:00PM"
      },
      "price": 28,
      "image": "https://i.ibb.co/YMj04PP/2026-01-30-175936.png",
      "isPopular": false,
      "order": 1
    },
    {
      "id": "1769852056185",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "(Monday)imchi Samgyeopsal Deobap + Boneless Fried Chicken",
        "ko": "(월요일)김치삼겹덮밥 + 순살후라이드치킨"
      },
      "description": {
        "en": "Lunch Specials 12:00PM~15:00PM",
        "ko": "점심특선__12:00PM~15:00PM"
      },
      "price": 28,
      "image": "https://i.ibb.co/YFr0K2k4/2026-01-30-175628.png",
      "isPopular": false,
      "order": 0
    },
    {
      "id": "1769852167553",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "(Wednesday)Tteokbokki + Fried Dumplings (3P)",
        "ko": "(수요일)떡볶이 + 군만두(3P)"
      },
      "description": {
        "en": "Lunch Specials 12:00PM~15:00PM",
        "ko": "점심특선__12:00PM~15:00PM"
      },
      "price": 28,
      "image": "https://i.ibb.co/9HRJs660/2026-01-30-181415.png",
      "isPopular": false,
      "order": 2
    },
    {
      "id": "1769852401728",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "(Thursday)Jjajang Noodle + Tang Soo-yok",
        "ko": "(목요일)짜장면 + 탕수육"
      },
      "description": {
        "en": "Lunch Specials 12:00PM~15:00PM",
        "ko": "점심특선__12:00PM~15:00PM"
      },
      "price": 28,
      "image": "https://i.ibb.co/0VGFWdZd/2026-01-30-181733.png",
      "isPopular": false,
      "order": 3
    },
    {
      "id": "1769852567241",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "(Friday)Jjamppong + Fried Dumplings(3P)",
        "ko": "짬뽕 + 군만두(3P) "
      },
      "description": {
        "en": "Lunch Specials 12:00PM~15:00PM",
        "ko": "점심특선__12:00PM~15:00PM"
      },
      "price": 28,
      "image": "https://i.ibb.co/TDtJrrBZ/2026-01-30-182121.png",
      "isPopular": false,
      "order": 4
    },
    {
      "id": "1769852829598",
      "subCategoryId": "s_noodle",
      "name": {
        "en": "Bomb Samgyeopsal Jjajang",
        "ko": "폭탄삼겹살짜장"
      },
      "description": {
        "en": "Extra pork belly · Jjajang noodles loaded with pork belly",
        "ko": "삼겹살 듬뿍 · 삼겹살이 가득 올라간 짜장면"
      },
      "price": 33,
      "image": "https://i.ibb.co/SZf4Mw5/2026-01-30-230517.png",
      "isPopular": false
    },
    {
      "id": "1769852924435",
      "subCategoryId": "s_rice",
      "name": {
        "en": "Jjajang Rice + Jjamppong Soup",
        "ko": "짜장밥 + 짬뽕국물"
      },
      "description": {
        "en": "Black bean rice with jjamppong soup",
        "ko": "짜장소스 덮밥과 짬뽕국물"
      },
      "price": 25,
      "image": "https://i.ibb.co/nMxC46sx/2026-01-31-144910.png",
      "isPopular": false
    },
    {
      "id": "1769854205551",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "Boneless Fried Chicken(regular)",
        "ko": "순살후라이드치킨(중)"
      },
      "description": {
        "en": "Seasoning sauce · Crispy boneless chicken",
        "ko": "양념소스 제공 · 바삭한 순살치킨"
      },
      "price": 35,
      "image": "https://i.ibb.co/gbfWPK7y/2026-01-30-200319.png",
      "isPopular": false,
      "order": 6
    },
    {
      "id": "1769854407673",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "Boneless Fried Chicken(large)",
        "ko": "순살후라이드치킨(대)"
      },
      "description": {
        "en": "Seasoning sauce · Crispy boneless chicken",
        "ko": "양념소스 제공 · 바삭한 순살치킨"
      },
      "price": 65,
      "image": "https://i.ibb.co/gbfWPK7y/2026-01-30-200319.png",
      "isPopular": false,
      "order": 7
    },
    {
      "id": "1769854517535",
      "subCategoryId": "s_side",
      "name": {
        "en": "Goon Man Doo",
        "ko": "군만두(6P)"
      },
      "description": {
        "en": "Crispy dumplings",
        "ko": "바삭한 군만두"
      },
      "price": 15,
      "image": "https://i.ibb.co/Kz88sZ8T/2026-01-30-143113.png",
      "isPopular": false
    },
    {
      "id": "1769854646188",
      "subCategoryId": "s_side",
      "name": {
        "en": "Chicken Salad",
        "ko": "치킨샐러드"
      },
      "description": {
        "en": "Fresh salad with chicken",
        "ko": "치킨이 올라간 샐러드"
      },
      "price": 18,
      "image": "https://i.ibb.co/dsrJvY2p/2026-01-30-200711.png",
      "isPopular": false
    },
    {
      "id": "1769854711584",
      "subCategoryId": "s_side",
      "name": {
        "en": "DDOEK-BOKKI",
        "ko": "떡볶이"
      },
      "description": {
        "en": "CHEWY RICE CAKES IN AN ADDICTIVE SPICY-SWEET SAUCE—A KOREAN STREET FOOD ICON",
        "ko": "매콤달콤한 소스에 쫄깃한 떡, 한국 길거리 음식의 대표주자"
      },
      "price": 23,
      "image": "https://i.ibb.co/rBmswC3/2026-01-30-143155.png",
      "isPopular": false
    },
    {
      "id": "1769854960018",
      "subCategoryId": "s_side",
      "name": {
        "en": "Fried Chicken(5P)",
        "ko": "후라이드치킨 추가(5P)"
      },
      "description": {
        "en": "",
        "ko": ""
      },
      "price": 9,
      "image": "https://i.ibb.co/pB90FmjZ/2026-01-31-182508.png",
      "isPopular": false
    },
    {
      "id": "1769855150528",
      "subCategoryId": "s_side",
      "name": {
        "en": "GONGKIBAB",
        "ko": "공기밥"
      },
      "description": {
        "en": "Steamed Rice",
        "ko": "흰쌀밥"
      },
      "price": 5,
      "image": "https://i.ibb.co/Fqst5RfK/2026-01-31-230314.png",
      "isPopular": true
    },
    {
      "id": "1769855282836",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "Korean Citron Tea · Hot/Cold",
        "ko": "유자차 · Hot/Cold"
      },
      "description": {
        "en": "Refreshing citron tea",
        "ko": "상큼한 유자차"
      },
      "price": 9,
      "image": "https://i.ibb.co/TM5MYKg2/2026-01-30-185413.png",
      "isPopular": false
    },
    {
      "id": "1769855403823",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "Korean Green Tea · Hot/Cold",
        "ko": "녹차 · Hot/Cold"
      },
      "description": {
        "en": "Clean green tea",
        "ko": "깔끔한 녹차"
      },
      "price": 6,
      "image": "https://i.ibb.co/Cs2L470K/2026-01-30-185727.png",
      "isPopular": false
    },
    {
      "id": "1769855548161",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "Korean Mix Coffee · Hot/Cold",
        "ko": "믹스커피 · Hot/Cold"
      },
      "description": {
        "en": "달콤한 한국식 커피",
        "ko": "Sweet Korean coffee"
      },
      "price": 9,
      "image": "https://i.ibb.co/q3n8wp5g/2026-01-30-190629.png",
      "isPopular": false
    },
    {
      "id": "1769855647212",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "Coke",
        "ko": "콜라"
      },
      "description": {
        "en": "Soft Drinks",
        "ko": "탄산음료"
      },
      "price": 6,
      "image": "https://i.ibb.co/JF8378fy/2026-01-31-150036.png\"",
      "isPopular": false
    },
    {
      "id": "1769855716287",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "Demisoda",
        "ko": "데미소다"
      },
      "description": {
        "en": "Soft Drinks",
        "ko": "탄산음료"
      },
      "price": 6,
      "image": "https://i.ibb.co/TM9XR3g2/2026-01-31-150442.png",
      "isPopular": false
    },
    {
      "id": "1769855858270",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "탄산음료",
        "ko": "밀키스"
      },
      "description": {
        "en": "Soft Drinks",
        "ko": "탄산음료"
      },
      "price": 6,
      "image": "https://i.ibb.co/mVnSsBvT/2026-01-31-150951.png",
      "isPopular": false
    },
    {
      "id": "1769868154190",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "Podo",
        "ko": "포도봉봉"
      },
      "description": {
        "en": "Soft Drinks",
        "ko": "탄산음료"
      },
      "price": 6,
      "image": "https://i.ibb.co/B2VvLjs4/2026-01-31-220407.png",
      "isPopular": false
    },
    {
      "id": "1769868337430",
      "subCategoryId": "s_liquor",
      "name": {
        "en": "Soju",
        "ko": "소주"
      },
      "description": {
        "en": "Korean soju",
        "ko": "한국 소주"
      },
      "price": 29,
      "image": "https://i.ibb.co/9HspZsRN/2026-01-30-192057.png",
      "isPopular": false
    },
    {
      "id": "1769868385495",
      "subCategoryId": "s_liquor",
      "name": {
        "en": "Tiger Beer (650ml)",
        "ko": "타이거 맥주(650ml)"
      },
      "description": {
        "en": "Regular · Bottled beer",
        "ko": "병맥주"
      },
      "price": 26,
      "image": "https://i.ibb.co/KpTXTYB7/2026-01-30-192314.png",
      "isPopular": false
    },
    {
      "id": "1769868476520",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "Cheongsachorong Ade",
        "ko": "청사초롱에이드"
      },
      "description": {
        "en": "",
        "ko": ""
      },
      "price": 11,
      "image": "https://i.ibb.co/spt8d2vM/2026-01-31-221648.png",
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
        "instagram": "https://www.instagram.com/hangeuleus?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        "facebook": "https://facebook.com",
        "threads": "https://www.threads.com/@hangeuleus_kyunghee?invite=0"
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