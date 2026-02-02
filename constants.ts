import { AppState, MenuItem, NewsPost, MenuCategory, MenuSubCategory } from './types';

// PASTE START: Generated from Admin (2026-02-02T17:59:02.854Z)
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
        "en": "M-1 Jajangmyeon",
        "ko": "M-1 짜장면"
      },
      "description": {
        "en": "Noodles in a rich black bean sauce with pork and onions.",
        "ko": "돼지고기와 양파를 듬뿍 넣은 진한 춘장 소스의 면 요리."
      },
      "price": 25,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260117_081238_05644889-1fdb-4e9d-bf6d-a0d152cb1fa6.png",
      "isPopular": true,
      "order": 0
    },
    {
      "id": "2",
      "subCategoryId": "s_noodle",
      "name": {
        "en": "M-3 Seafood Jjambbong",
        "ko": "M-3 해물 짬뽕"
      },
      "description": {
        "en": "Spicy seafood noodle soup with vegetables.",
        "ko": "해산물과 채소가 어우러진 얼큰한 국물 요리."
      },
      "price": 28,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260117_032254_57982580-dab1-4c39-9a8a-3054b6c30f94.png",
      "isPopular": true,
      "order": 2
    },
    {
      "id": "3",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "C-1R Tang Soo-yook(Regular)",
        "ko": "C-1R 탕수육(중)"
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
        "en": "C-1L Tang Soo-yook(large)",
        "ko": "C-1L 탕수육(대)"
      },
      "description": {
        "en": "Korean-style sweet and sour pork.",
        "ko": "바삭하게 튀긴 돼지고기에 새콤달콤한 소스를 더한 한국식 탕수육."
      },
      "price": 90,
      "image": "https://696fb61876634d918b871516.imgix.net/%ED%83%95%EC%88%98%EC%9C%A1.png",
      "isPopular": false,
      "order": 0
    },
    {
      "id": "5",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "C-2R Yoo-rin Chicken(Regular)",
        "ko": "C-2R 유린치킨(중)"
      },
      "description": {
        "en": "Deep-fried chicken topped with hot and sour soy sauce.",
        "ko": "바삭한 치킨에 새콤하고 매콤한 간장 소스를 곁들인 요리."
      },
      "price": 50,
      "image": "https://i.ibb.co/8nyY51Jf/2026-01-30-173749.png",
      "isPopular": false,
      "order": 1
    },
    {
      "id": "1768969350950",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "C-3R Fried Shrimp with Cream Sauce(Regular)",
        "ko": "C-3R 새우 후라이드 + 청양크림소스(중)"
      },
      "description": {
        "en": "Crispy fried shrimp served with spicy Cheongyang cream sauce.",
        "ko": "바삭한 새우 튀김에 매콤한 청양 크림 소스를 곁들였습니다."
      },
      "price": 55,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-02-01%20133032.png",
      "isPopular": false,
      "order": 3
    },
    {
      "id": "1768969422694",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "C-3L Fried Shrimp with Cream Sauce(Large)",
        "ko": "C-3L 새우 후라이드 + 청양크림소스대)"
      },
      "description": {
        "en": "Crispy fried shrimp served with spicy Cheongyang cream sauce.",
        "ko": "바삭한 새우 튀김에 매콤한 청양 크림 소스를 곁들였습니다."
      },
      "price": 99,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-02-01%20133032.png",
      "isPopular": false,
      "order": 4
    },
    {
      "id": "1768969485626",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "C-2L Yoo-rin Chicken(Large)",
        "ko": "C-2L 유린치킨(대)"
      },
      "description": {
        "en": ".Deep-fried chicken topped with hot and sour soy sauce",
        "ko": "알싸한 고추와 상큼한 간장 소스가 입맛을 돋우는 바삭한 치킨 요리"
      },
      "price": 90,
      "image": "https://i.ibb.co/DPBrC0Nv/2026-01-30-173749.png",
      "isPopular": false,
      "order": 2
    },
    {
      "id": "1768969592524",
      "subCategoryId": "s_rice",
      "name": {
        "en": "R-2 Seafood Jjam Bbong Rice",
        "ko": "R-2 해물 짬뽕밥"
      },
      "description": {
        "en": "Spicy seafood soup served with rice.",
        "ko": "얼큰한 해물 짬뽕 국물과 밥을 함께 제공합니다."
      },
      "price": 28,
      "image": "https://696fb61876634d918b871516.imgix.net/hf_20260120_132940_48715c18-6666-421c-865d-20dca9f342da.png",
      "isPopular": false,
      "order": 1
    },
    {
      "id": "1768969631602",
      "subCategoryId": "s_rice",
      "name": {
        "en": "R-3 Chicken Mayo Rice + Jjam Bbong Soup",
        "ko": "R-3 치킨마요 덮밥 + 짬뽕국물"
      },
      "description": {
        "en": "Fried chicken over rice with teriyaki mayo sauce, served with spicy soup.",
        "ko": "치킨과 마요 소스를 얹은 덮밥에 짬뽕 국물 제공."
      },
      "price": 28,
      "image": "https://i.ibb.co/H9yfGkY/2026-01-30-143204.png",
      "isPopular": false,
      "order": 2
    },
    {
      "id": "1768996839598",
      "subCategoryId": "s_rice",
      "name": {
        "en": "R-5 Kimchi Samgyeopsal Deobap + Jjamppong Soup",
        "ko": "R-5 김치삼겹살덮밥 + 짬뽕국물"
      },
      "description": {
        "en": "CRUNCHY CHICKEN AND CREAMY TERIYAKI MAYO ON RICE—THE PERFECT COMFORT BOWL",
        "ko": "바삭한 치킨과 부드러운 마요 소스, 단짠의 정석을 보여주는 덮밥"
      },
      "price": 25,
      "image": "https://i.ibb.co/1YFLf00s/2026-01-30-174728.png",
      "isPopular": false,
      "order": 3
    },
    {
      "id": "1769851092884",
      "subCategoryId": "s_best_set",
      "name": {
        "en": "S-1. HAN GEU LEUS SIGNATURE DUO SET (FOR 2 PAX)",
        "ko": "S-1. 한그릇 시그니처 듀오 세트 (2인 기준)"
      },
      "description": {
        "en": "THE SMARTEST WAY TO TASTE HANGEULEUS! INCLUDES: SALAD, TANG SOO YOOK, LEMON CREAM SHRIMP + CHOICE OF ANY 2 MAINS (JJA JANG / JJAM BBONG) + 2 DRINKS (SOFT DRINKS)",
        "ko": "한그릇 인기 메뉴를 한 번에 즐기는 최고의 가성비! 구성: 샐러드, 탕수육, 레몬 크림 새우 + 식사 2그릇(짜장/짬뽕 중 선택) + 음료 2잔(탄산음료 중 택2)"
      },
      "price": 99,
      "image": "https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-02-01%20135514.png",
      "isPopular": true,
      "originalPrice": 180
    },
    {
      "id": "1769851882303",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "DS-2. Jjajang Noodle + Yoo-rin Chicken",
        "ko": "DS-2. 짜장면 + 유린치킨"
      },
      "description": {
        "en": "Lunch Specials 12:00PM~15:00PM",
        "ko": "점심특선__12:00PM~15:00PM"
      },
      "price": 30,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-01-30%20175936.png",
      "isPopular": true,
      "order": 1,
      "originalPrice": 75
    },
    {
      "id": "1769852056185",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "DS-1. Kimchi Samgyeopsal Deobap + Boneless Fried Chicken",
        "ko": "DS-1. 김치삼겹덮밥 + 순살후라이드치킨"
      },
      "description": {
        "en": "Lunch Specials 12:00PM~15:00PM",
        "ko": "점심특선__12:00PM~15:00PM"
      },
      "price": 30,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-01-30%20175628.png",
      "isPopular": false,
      "order": 0,
      "originalPrice": 66
    },
    {
      "id": "1769852167553",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "DS-3 Tteokbokki + Fried Dumplings (6P)",
        "ko": "DS-3 떡볶이 + 군만두(6P)"
      },
      "description": {
        "en": "Lunch Specials 12:00PM~15:00PM",
        "ko": "점심특선__12:00PM~15:00PM"
      },
      "price": 30,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-02-01%20154532.png",
      "isPopular": false,
      "order": 1,
      "originalPrice": 35
    },
    {
      "id": "1769852567241",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "DS-5 Jjamppong + Fried Dumplings(3P)",
        "ko": "DS-5 짬뽕 + 군만두(3P) "
      },
      "description": {
        "en": "Lunch Specials 12:00PM~15:00PM",
        "ko": "점심특선__12:00PM~15:00PM"
      },
      "price": 30,
      "image": "https://i.ibb.co/8n9GXXDJ/2026-01-30-182121.png",
      "isPopular": false,
      "order": 4,
      "originalPrice": 35
    },
    {
      "id": "1769852829598",
      "subCategoryId": "s_noodle",
      "name": {
        "en": "M-2 Bomb Samgyeopsal Jjajang",
        "ko": "M-2 폭탄삼겹살짜장"
      },
      "description": {
        "en": "Extra pork belly · Jjajang noodles loaded with pork belly",
        "ko": "삼겹살 듬뿍 · 삼겹살이 가득 올라간 짜장면"
      },
      "price": 33,
      "image": "https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-01-30%20230517.png",
      "isPopular": false,
      "order": 1
    },
    {
      "id": "1769852924435",
      "subCategoryId": "s_rice",
      "name": {
        "en": "R-1 Jjajang Rice + Jjamppong Soup",
        "ko": "R-1 짜장밥 + 짬뽕국물"
      },
      "description": {
        "en": "Black bean rice with jjamppong soup",
        "ko": "짜장소스 덮밥과 짬뽕국물"
      },
      "price": 25,
      "image": "https://i.ibb.co/N2cSft6c/2026-01-31-144910.png",
      "isPopular": false,
      "order": 0
    },
    {
      "id": "1769854205551",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "C-A Boneless Fried Chicken",
        "ko": "C-A 순살후라이드치킨"
      },
      "description": {
        "en": "Seasoning sauce · Crispy boneless chicken",
        "ko": "양념소스 제공 · 바삭한 순살치킨"
      },
      "price": 55,
      "image": "https://i.ibb.co/sdMmYB9Q/2026-01-31-182508.png",
      "isPopular": false,
      "order": 5,
      "isSoldOut": false
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
      "image": "https://i.ibb.co/sdMmYB9Q/2026-01-31-182508.png",
      "isPopular": false,
      "order": 7,
      "isSoldOut": true
    },
    {
      "id": "1769854517535",
      "subCategoryId": "s_side",
      "name": {
        "en": "E-1 Goon Man Doo",
        "ko": "E-1. 군만두(6P)"
      },
      "description": {
        "en": "Crispy dumplings",
        "ko": "바삭한 군만두"
      },
      "price": 15,
      "image": "https://i.ibb.co/qF22gG2T/2026-01-30-143113.png",
      "isPopular": false,
      "order": 0
    },
    {
      "id": "1769854646188",
      "subCategoryId": "s_side",
      "name": {
        "en": "E-2 Chicken Salad",
        "ko": "E-2. 치킨샐러드"
      },
      "description": {
        "en": "Fresh salad with chicken",
        "ko": "치킨이 올라간 샐러드"
      },
      "price": 18,
      "image": "https://i.ibb.co/Y43TSskd/2026-01-30-200711.png",
      "isPopular": false,
      "order": 0
    },
    {
      "id": "1769854711584",
      "subCategoryId": "s_side",
      "name": {
        "en": "E-A DDOEK-BOKKI",
        "ko": "E-A 떡볶이"
      },
      "description": {
        "en": "CHEWY RICE CAKES IN AN ADDICTIVE SPICY-SWEET SAUCE—A KOREAN STREET FOOD ICON \n[ADD-ON: MOZZARELLA CHEESE:5RM / QUAIL EGGS (5P):3RM]",
        "ko": "매콤달콤한 소스에 쫄깃한 떡, 한국 길거리 음식의 대표주자\n[토핑추가-모짜렐라 치즈:5RM / 메추리알 5알:3RM]"
      },
      "price": 23,
      "image": "https://i.ibb.co/BhtNCXG/2026-01-30-143155.png",
      "isPopular": false,
      "order": 2
    },
    {
      "id": "1769854960018",
      "subCategoryId": "s_side",
      "name": {
        "en": "E-3 Fried Chicken(5P)",
        "ko": "E-3. 후라이드치킨 추가(5P)"
      },
      "description": {
        "en": "",
        "ko": ""
      },
      "price": 9,
      "image": "https://i.ibb.co/sdMmYB9Q/2026-01-31-182508.png",
      "isPopular": false,
      "order": 1
    },
    {
      "id": "1769855150528",
      "subCategoryId": "s_side",
      "name": {
        "en": "E-5 GONGKIBAB",
        "ko": "E-5 공기밥"
      },
      "description": {
        "en": "Steamed Rice",
        "ko": "흰쌀밥"
      },
      "price": 5,
      "image": "https://i.ibb.co/k63F4Nrx/2026-01-31-230314.png",
      "isPopular": false,
      "order": 4
    },
    {
      "id": "1769855282836",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "D-1 Korean Citron Tea · Hot/Cold",
        "ko": "D-1 유자차 · Hot/Cold"
      },
      "description": {
        "en": "Refreshing citron tea",
        "ko": "상큼한 유자차"
      },
      "price": 9,
      "image": "https://i.ibb.co/8gVgNz7s/2026-01-30-185413.png",
      "isPopular": true
    },
    {
      "id": "1769855403823",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "D-2 Korean Green Tea · Hot/Cold",
        "ko": "D-2 녹차 · Hot/Cold"
      },
      "description": {
        "en": "Clean green tea",
        "ko": "깔끔한 녹차"
      },
      "price": 6,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-02-01%20133936.png",
      "isPopular": false
    },
    {
      "id": "1769855548161",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "D-3 Korean Mix Coffee · Hot/Cold",
        "ko": "D-3 믹스커피 · Hot/Cold"
      },
      "description": {
        "en": "달콤한 한국식 커피",
        "ko": "Sweet Korean coffee"
      },
      "price": 9,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-02-01%20155624.png",
      "isPopular": false
    },
    {
      "id": "1769855647212",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "D-A Coke",
        "ko": "D-A 콜라"
      },
      "description": {
        "en": "Soft Drinks",
        "ko": "탄산음료"
      },
      "price": 5,
      "image": "https://i.ibb.co/JF8378fy/2026-01-31-150036.png",
      "isPopular": false
    },
    {
      "id": "1769855716287",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "D-A Demisoda",
        "ko": "D-A 데미소다"
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
        "en": "D-A Milkis",
        "ko": "D-A 밀키스"
      },
      "description": {
        "en": "Soft Drinks",
        "ko": "탄산음료"
      },
      "price": 6,
      "image": "https://i.ibb.co/9kxGXvwg/2026-01-31-150951.png",
      "isPopular": false
    },
    {
      "id": "1769868154190",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "D-A Podo BONG BONG",
        "ko": "D-A 포도봉봉"
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
        "en": "L-1 Soju",
        "ko": "L-1 소주"
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
        "en": "L-2 Tiger Beer (650ml)",
        "ko": "L-2 타이거 맥주(650ml)"
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
        "en": "D-5 Cheongsachorong Ade",
        "ko": "D-5 청사초롱에이드"
      },
      "description": {
        "en": "",
        "ko": ""
      },
      "price": 11,
      "image": "https://i.ibb.co/4wJhn7Z5/2026-01-31-221648.png\"",
      "isPopular": true
    },
    {
      "id": "1769931900693",
      "subCategoryId": "s_weekday",
      "name": {
        "en": "DS-A JJA JANG NOODLE + TANG SOO-YOOK",
        "ko": "DS-A 짜장면 + 탕수육"
      },
      "description": {
        "en": "RECHARGE YOUR DAY WITH OUR VIBRANT AND AFFORDABLE DAILY LUNCH SPECIALS",
        "ko": "바쁜 일상 속 든든한 한 끼, 매일 다르게 즐기는 합리적인 런치 세트"
      },
      "price": 30,
      "originalPrice": 75,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-01-30%20181733.png",
      "isPopular": true,
      "isSoldOut": false,
      "order": 2
    },
    {
      "id": "1770051613454",
      "subCategoryId": "s_fried_main",
      "name": {
        "en": "NEW. KIM-PI-TANG (Kimchi Cheese Tang Soo Yook)",
        "ko": "신메뉴. 김피탕 - 김치피자탕수육 "
      },
      "description": {
        "en": "The ultimate Korean fusion dish! Our classic crispy Tang Soo Yook topped with spicy stir-fried Kimchi and generous melted mozzarella cheese.",
        "ko": "한국식 퓨전 요리의 끝판왕! 바삭한 탕수육 위에 매콤한 볶음 김치와 고소한 모짜렐라 치즈를 듬뿍 얹어 환상적인 맛의 조화를 자랑합니다."
      },
      "price": 59,
      "originalPrice": 0,
      "isPopular": false,
      "isSoldOut": false,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-02-02%20225813.png",
      "order": 6
    },
    {
      "id": "1770051754856",
      "subCategoryId": "s_side",
      "name": {
        "en": "E-NEW. TANGSU MAN DOO(6p)",
        "ko": "신메뉴 탕수만두(6p)"
      },
      "description": {
        "en": "Crispy fried dumplings (6pcs) topped with our signature sweet and sour Tangsuyuk sauce. A perfect combination of crunch and flavor.",
        "ko": "바삭하게 튀겨낸 만두(6pcs) 위에 새콤달콤한 특제 탕수육 소스를 얹었습니다. 바삭한 식감과 소스의 풍미가 완벽한 조화를 이루는 메뉴입니다."
      },
      "price": 18,
      "originalPrice": 0,
      "isPopular": false,
      "isSoldOut": false,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-02-02%20231109.png",
      "order": 3
    },
    {
      "id": "1770051892677",
      "subCategoryId": "s_drinks",
      "name": {
        "en": "D-6 BIRAK SIKHYE",
        "ko": "D-6 비락식혜"
      },
      "description": {
        "en": "Korea's favorite traditional sweet rice drink. Made with malt water and real cooked rice grains, offering a unique and refreshing taste.",
        "ko": ""
      },
      "price": 6,
      "originalPrice": 0,
      "isPopular": false,
      "isSoldOut": false,
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-02-03%20001242.png"
    }
  ],
  "news": [
    {
      "id": "1",
      "title": {
        "en": "Grand Open",
        "ko": "그랜드 오픈"
      },
      "content": {
        "en": "🔥 A Bowl Shaped by Fire\n\nHello, this is HAN GEU LEUS.\n\n🍽️ Very soon,\nwe will introduce a bowl\ndefined by fire and standards in Malaysia.\n\nHAN GEU LEUS does not simply recreate\nthe taste you remember from Korea.\n\n🌏 The climate is different.\n🥬 Ingredients behave differently.\n🔥 And fire itself works differently here.\n\nSo we redesigned everything from the start—\nheat levels, timing, and sequence—\nuntil the same depth of flavor was achieved.\n\n👨‍🍳 Before the kitchen,\nChef Jang worked with fire in a kiln, shaping ceramics.\nHe learned that fire may look the same,\nbut it never delivers the same result.\n\nThat understanding now defines our food.\n\nThis is not fast cooking.\nThis is not compromise.\n\n✨ This is a bowl\nfinished by fire and held to a standard.\n\n📍 Grand Opening Coming Soon\nExperience a different approach\nto what a single bowl can be.",
        "ko": "🔥 불로 완성한 한 그릇, 곧 만납니다\n\n안녕하세요, HAN GEU LEUS입니다.\n\n🍽️ 곧,\n불을 기준으로 요리하는 한 그릇을\n말레이시아에서 선보입니다.\n\nHAN GEU LEUS는\n단순히 한국에서 먹던 맛을\n그대로 옮겨오는 데서 멈추지 않았습니다.\n\n🌏 기후가 다르고\n🥬 재료가 다르고\n🔥 무엇보다 불의 성질이 다른 이곳에서\n\n같은 깊이가 나올 때까지\n불의 세기, 시간, 순서를\n처음부터 다시 설계했습니다.\n\n👨‍🍳 불가마 앞에서 도자기를 만들던 쉐프 장은\n불이 같아 보여도\n결과는 절대 같지 않다는 걸 알고 있었습니다.\n그 기준은, 지금 이 주방에서도 이어집니다.\n\n그래서 HAN GEU LEUS의 한 그릇은\n✔ 빠르게 만든 음식이 아니고\n✔ 타협한 맛도 아닙니다.\n\n✨ 불로 완성한 기준입니다.\n\n📍 Grand Opening Coming Soon\n지금까지와는 다른\n한 그릇의 기준을\n직접 경험해 보세요.\n"
      },
      "date": "2026-01-21",
      "image": " https://696fb61876634d918b871516.imgix.net/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-01-31%20231508.png"
    },
    {
      "id": "2",
      "title": {
        "en": "THE ULTIMATE K-FEAST NOW ONLY RM 99 🍜✨",
        "ko": "한그릇의 모든 인기 메뉴를 단 RM 99에 맛보는 법 🍜✨"
      },
      "content": {
        "en": "Stop scrolling and start eating! HAN GEU LEUS is dropping the most aggressive value deal in town.\n\nWhy pay RM 180 for individual dishes when you can have the ENTIRE Signature Collection for just RM 99? We’ve curated our top 5 best-sellers into one massive course that satisfies your cravings without breaking the bank.\n\n🍱 SIGNATURE DUO SET (FOR 2 PAX) INCLUDES:\n\nTHE REFRESHER: Crisp SALAD to start.\n\nTHE K-CLASSIC: Our legendary TANG SOO YOOK (Sweet & Sour Pork).\n\nTHE ZESTY DELIGHT: Plump LEMON CREAM SHRIMP with a tangy twist.\n\nTHE CROWD PLEASER: Choice of any 2 bowls—JJA JANG or JJAM BBONG.\n\nTHE COOL DOWN: 2 DRINKS (Green Tea, Citron Tea, or Soft Drinks).\n\n💡 WHY CHOOSE THIS?\n\nUNBEATABLE VALUE: Save RM 81 instantly compared to ala carte prices!\n\nFLEXIBLE DINING: Bringing a friend? Just add RM 45 per person to upgrade the portions.\n\nAUTHENTICITY: Experience the real flavors of Korea in one perfect sitting.\n\nBook your table now and taste the best of Korea at the smartest price. Your wallet (and stomach) will thank you!",
        "ko": "무엇을 주문할지 고민하는 시간조차 아까운 당신을 위해, **한그릇(HAN GEU LEUS)**이 야심 차게 준비했습니다!\n\n단품으로 하나하나 주문하면 RM 180? 아니요, 이제는 그럴 필요 없습니다. 한그릇에서 가장 사랑받는 시그니처 메뉴 5종을 한 상에 가득 담아 RM 99라는 말도 안 되는 가격으로 선보입니다.\n\n🍱 SIGNATURE DUO SET (2인 기준) 구성:\n\n신선한 시작: 아삭한 샐러드\n\n겉바속촉의 정석: 남녀노소 사랑하는 탕수육\n\n상큼한 유혹: 탱글한 새우와 산뜻한 소스의 만남, 레몬 크림 새우\n\n든든한 메인: 짜장면 또는 짬뽕 중 취향껏 선택 (2그릇)\n\n시원한 마무리: 녹차, 유자차, 탄산음료 중 택 2\n\n💡 왜 이 세트인가요?\n\n압도적 가성비: 개별 주문 대비 RM 81을 즉시 절약하세요!\n\n유연한 구성: 3인이 오셔도 걱정 마세요. 1인당 RM 45만 추가하면 요리 양과 식사가 함께 늘어납니다.\n\n검증된 맛: 한그릇 현지 고객들이 가장 많이 찾는 메뉴들로만 꽉 채웠습니다.\n\n지금 바로 예약하시고, 가장 스마트하게 한국의 맛을 경험해 보세요!"
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
        "ko": "한그릇은\n한국에서 먹던 그 맛을\n말레이시아에서도 그대로 재현하는 데서\n멈추지 않습니다.\n\n이곳은 기후가 다르고,\n재료가 다르고,\n무어서보다 불의 성질이 다릅니다.\n\n불가마 앞에서\n도자기를 만들던 쉐프 장은\n불이 같아 보인다고\n결과가 같아지지 않는다는 걸\n이미 알고 있었습니다.\n\n그래서 모든 과정을\n다시 설계했습니다.\n불의 세기, 시간, 순서까지\n같은 깊이가 나올 때까지\n처음부터 다시 맞췄습니다.\n\n그래서 시간이 더 걸리고,\n그래서 더 어렵습니다.\n\n하지만 적어도,\n당신이 **“괜히 왔다”**는 생각만큼은\n하지 않게 하고 싶었습니다.\n\n당신이 기대하는 그 한 그릇.\n그 기대를\n가볍게 대하지 않는 곳.\n\n한그릇입니다."
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
      "whatsapp": "+60 11-1635-2210",
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
