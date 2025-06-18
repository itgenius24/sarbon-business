# Yuqori Darajadagi Arxitektura Hujjati

## Umumiy Ko'rinish

**Sarbon Logistika Platformasi** - bu Next.js 14 bilan qurilgan keng qamrovli yuk almashinuvi va logistika boshqaruv tizimi bo'lib, yuk egalarini, tashuvchilarni, haydovchilarni va dispetcherlarni bog'laydigan raqamli bozor sifatida xizmat qiladi. Platforma real vaqtda GPS kuzatuvi, avtomatlashtirilgan yuk-haydovchi moslashtirish va rol asosidagi ish jarayoni boshqaruvi orqali samarali yuk tashishni ta'minlaydi.

## Texnologiya To'plami

### Asosiy Freymvork
- **Next.js 14** App Router namunasi bilan
- **TypeScript/JavaScript** tip xavfsizligi va rivojlantirish uchun
- **React 18.2.0** komponent arxitekturasi uchun
- **Node.js ≥18.0.0** runtime talabi

### Holat Boshqaruvi va Ma'lumot Olish
- **MobX 6.12.0** saqlash bilan global holat boshqaruvi uchun
- **React Query 4** (@tanstack/react-query) server holati va keshlash uchun
- **mobx-persist-store** localStorage saqlash uchun
- **nookies** cookie asosidagi sessiya boshqaruvi uchun

### UI Freymvork va Uslublash
- **Chakra UI 2.8.0** asosiy komponent kutubxonasi sifatida
- **Emotion** CSS-in-JS uslublash uchun
- **Framer Motion 12.4.2** animatsiyalar uchun
- **Sass** qo'shimcha uslublash imkoniyatlari uchun

### Tashqi Integratsiyalar
- **Yandex Maps** (@pbe/react-yandex-maps) xaritalash va geokodlash uchun
- **Stream Chat** real vaqtda muloqot uchun
- **Firebase 11.4.0** ijtimoiy autentifikatsiya uchun (Google, Apple)
- **Sentry** xato kuzatuvi va ishlash nazorati uchun

### Rivojlantirish Vositalari
- **ESLint** Next.js konfiguratsiyasi bilan
- **Prettier** kod formatlash uchun
- **Husky** git hook'lari va commit oldi tekshiruvi uchun

## Loyiha Tuzilishi

```
src/
├── app/[locale]/                 # Next.js App Router xalqarolashtirish bilan
│   ├── auth/                     # Autentifikatsiya sahifalari va komponentlari
│   ├── dashboard*/               # Rolga xos dashboard sahifalari
│   ├── gps-tracking*/           # Rolga ko'ra GPS kuzatuv interfeyslari
│   ├── my-*/                    # Foydalanuvchi resurs boshqaruv sahifalari
│   └── globals.scss             # Global uslublar
├── modules/                     # Biznes logika modullari (35+ modul)
│   ├── MyLoadsMain/             # Asosiy yuk buyurtma boshqaruvi
│   ├── CargoTest/               # Ko'p bosqichli yuk yaratish
│   ├── GpsTracking*/           # Foydalanuvchi roli bo'yicha GPS kuzatuv
│   ├── Dashboard*/             # Analitika va hisobot
│   └── MyCarsDispatcher/       # Transport va haydovchi boshqaruvi
├── components/                  # Qayta foydalaniladigan UI komponentlari (50+ komponent)
├── services/                    # API integratsiya qatlami
│   ├── api/                     # Domen-spetsifik xizmatlar
│   ├── request/                 # HTTP mijoz konfiguratsiyasi
│   └── requestInvoke/          # Ikkinchi HTTP mijoz
├── store/                       # Global holat boshqaruvi (MobX)
├── layouts/                     # Navigatsiya bilan dastur tartiblar
├── hooks/                       # Maxsus React hook'lari
├── utils/                       # Yordamchi funksiyalar va utilitalar
└── middleware.js               # Rol asosidagi yo'l himoyasi
```

## Arxitektura Namunalari

### 1. Rol Asosidagi Kirish Nazorati (RBAC)

Dastur middleware.js orqali beshta aniq foydalanuvchi roli bilan keng qamrovli rol asosidagi kirish nazoratini amalga oshiradi:

- **Tashuvchi** (`f81d3c3d-228d-479e-a2b1-9948c98640f2`)
- **Mijoz** (`48871d27-7361-4f69-8fe4-b54daf270739`)
- **Dispetcher** (`785678f2-fae7-4a00-8766-99ea67d3784f` + `first_dispatcher`)
- **Yuqori Dispetcher** (`785678f2-fae7-4a00-8766-99ea67d3784f` + `top_dispatcher`)
- **Direktor** (`527d2017-2dc2-4449-9eeb-08fc1aafa469`)

Har bir rol middleware.js da belgilangan maxsus sahifa kirish ruxsatlariga ega, ruxsatsiz kirish urinishlari uchun avtomatik yo'naltirish bilan.

### 2. Modulli Biznes Logika Arxitekturasi

Platforma biznes logikasini 35+ ixtisoslashgan modullarga tashkil qiladi, har biri quyidagilarni o'z ichiga oladi:
- Asosiy komponent fayli
- Biznes logika uchun maxsus hook'lar (`useModuleNameProps.js`)
- Maxsus funksionallik uchun sub-komponentlar
- Ma'lumot transformatsiya utilitalar

### 3. Qatlamli API Arxitekturasi

```
Frontend Komponentlari → Maxsus Hook'lar → API Xizmatlari → HTTP Mijozlar → Backend API'lar
```

- **Maxsus Hook'lar**: Ma'lumot olish va mutatsiyalar uchun React Query asosidagi hook'lar
- **API Xizmatlari**: Domen-spetsifik xizmat qatlamlari (auth, functions, items, object)
- **HTTP Mijozlar**: Autentifikatsiya interceptor'lari bilan ikkita Axios namunasi
- **Backend Integratsiyasi**: Avtomatik token yangilash bilan RESTful API'lar

### 4. Holat Boshqaruvi Strategiyasi

**Global Holat (MobX)**:
- `authStore`: Foydalanuvchi autentifikatsiyasi va sessiya boshqaruvi
- `formStore`: Navigatsiya bo'ylab forma ma'lumotlarini saqlash

**Server Holati (React Query)**:
- API ma'lumotlar keshlash va sinxronizatsiya
- Foydalanuvchi o'zaro ta'siri uchun optimistik yangilanishlar
- Fon qayta olish va xato boshqaruvi

**Mahalliy Holat (React)**:
- Komponentga xos UI holati
- Forma kirishlari va tekshirish
- Vaqtinchalik ma'lumot transformatsiyalari

## Ma'lumot Oqimi Arxitekturasi

### 1. Autentifikatsiya Oqimi

```
Login Sahifasi → Telefon Tekshiruvi → OTP Tasdiqlash → Rol Tayinlash → Dashboard Yo'naltirish
```

1. Foydalanuvchi telefon raqamini kiritadi
2. Backend API orqali SMS OTP yuboriladi
3. Rol aniqlash bilan OTP tekshiruvi
4. Sessiya ma'lumotlari cookie va localStorage da saqlanadi
5. Middleware rolga mos dashboard ga yo'naltiradi

### 2. Yuk Boshqaruvi Oqimi

```
Yuk Yaratish → Haydovchi Tayinlash → GPS Kuzatuv → Holat Yangilanishlari → Yakunlash
```

1. **Yuk Yaratish**: CargoTest modulida ko'p bosqichli forma
2. **Haydovchi Qidirish**: Real vaqtda filtrlash va tayinlash
3. **GPS Kuzatuv**: Yo'l vizualizatsiyasi bilan jonli joylashuv yangilanishlari
4. **Holat Boshqaruvi**: Ish jarayoni holat o'tishlari
5. **Yakunlash**: Yakuniy yetkazib berish tasdiqi va analitika

### 3. GPS Kuzatuv Ma'lumot Oqimi

```
Haydovchi Mobil Ilova → Backend API'lar → WebSocket/Polling → Frontend Yangilanishlar → Xarita Vizualizatsiyasi
```

1. Haydovchi joylashuvi mobil ilovadan uzatiladi
2. Backend GPS koordinatalarini qayta ishlaydi va saqlaydi
3. Frontend API chaqiruvlari orqali yangilanishlar uchun so'rov yuboradi
4. Yo'l tarixi bilan real vaqtda xarita yangilanishlari
5. Tegishli manfaatdor tomonlarga holat bildirishnomalari

## Asosiy Arxitektura Komponentlari

### 1. Xalqarolashtirish (i18n)

- Brauzer tili aniqlash bilan **i18next**
- Lokal asosidagi yo'naltirish (`/[locale]/`)
- Ishlash uchun dinamik resurs yuklash
- Rus va o'zbek tillari uchun qo'llab-quvvatlash

### 2. Real Vaqtda Muloqot

- Xabar almashish uchun **Stream Chat** integratsiyasi
- Yuk yangilanishlari uchun push bildirishnomalari
- Muhim hodisalar uchun audio ogohlantirishlar
- Rol asosidagi bildirishnoma filtrlash

### 3. Xarita Integratsiyasi

- Asosiy xaritalash funksionallik uchun **Yandex Maps**
- Manzil hal qilish uchun geokodlash
- Yo'l hisoblash va optimallashtirish
- Real vaqtda GPS kuzatuv vizualizatsiyasi
- Masofa hisoblash utilitalar

### 4. Xato Boshqaruvi va Monitoring

- Xato kuzatuvi uchun **Sentry** integratsiyasi
- Tartiblar da global xato chegaralari
- Qayta urinish logikasi bilan API xato interceptor'lari
- Ishlash monitoring va analitika

## Xavfsizlik Arxitekturasi

### 1. Autentifikatsiya va Avtorizatsiya

- Yangilash tokenlari bilan JWT asosidagi autentifikatsiya
- Middleware orqali rol asosidagi sahifa kirish nazorati
- httpOnly bayroqlari bilan xavfsiz cookie saqlash
- Sessiya vaqt tugashi va avtomatik yangilash

### 2. API Xavfsizligi

- Token boshqaruvi uchun so'rov/javob interceptor'lari
- Muddati tugaganda avtomatik token yangilash
- Cross-origin so'rovlar uchun CORS konfiguratsiyasi
- Muhit asosidagi API endpoint konfiguratsiyasi

### 3. Ma'lumot Himoyasi

- Uzatishda sezgir ma'lumotlar shifrlash
- Autentifikatsiya tokenlarining xavfsiz saqlash
- Kirish tekshiruvi va tozalash
- React ning o'rnatilgan mexanizmlari orqali XSS himoyasi

## Ishlash Optimallashtirish

### 1. Kod Bo'lish

- Sahifalar bo'yicha Next.js avtomatik kod bo'lish
- Og'ir komponentlar uchun dinamik import
- Muhim bo'lmagan modullarning kech yuklash
- Bundle hajmi optimallashtirish

### 2. Ma'lumot Olish

- React Query keshlash strategiyalari
- Fon ma'lumot sinxronizatsiyasi
- Yaxshi UX uchun optimistik yangilanishlar
- Katta ma'lumot to'plamlari uchun sahifalash

### 3. Asset Optimallashtirish

- Optimallashtirish uchun Next.js Image komponenti
- Masshtablanish uchun SVG icon tizimi
- Komponentga yo'naltirilgan uslublar uchun CSS-in-JS
- Ishlab chiqarish build optimallashtirish

## Joylashtirish Arxitekturasi

### Rivojlantirish Muhiti
- 8080 portida mahalliy rivojlantirish serveri
- Tez rivojlantirish uchun hot module replacement
- Kod sifati uchun ESLint va Prettier
- Commit oldi tekshiruvi uchun Git hook'lari

### Ishlab Chiqarish Mulohazalari
- Iloji boricha statik generatsiya
- SEO uchun server-side rendering
- Asset yetkazib berish uchun CDN integratsiyasi
- Muhitga xos konfiguratsiya

## Integratsiya Nuqtalari

### 1. Mobil Ilova
- Mobil ilova bilan umumiy API endpointlari
- Izchil ma'lumot modellari va tekshirish
- GPS ma'lumotlarining real vaqtda sinxronizatsiyasi
- Push bildirishnoma koordinatsiyasi

### 2. Backend Xizmatlari
- RESTful API integratsiyasi
- Real vaqt xususiyatlari uchun WebSocket ulanishlari
- Fayl yuklash va qayta ishlash xizmatlari
- AI bilan quvvatlanadigan hujjat qayta ishlash

### 3. Uchinchi Tomon Xizmatlari
- To'lov qayta ishlash integratsiyasi
- OTP yetkazib berish uchun SMS gateway
- Bildirishnomalari uchun email xizmatlari
- Analitika va hisobot vositalari

## Masshtablanish Mulohazalari

### 1. Frontend Masshtablanish
- Qayta foydalanish uchun komponent asosidagi arxitektura
- Modulli biznes logika tashkiloti
- Samarali holat boshqaruvi namunalari
- Ishlash monitoring va optimallashtirish

### 2. Ma'lumot Boshqaruvi
- Samarali keshlash strategiyalari
- Katta ma'lumot to'plamlari uchun sahifalash
- Fon ma'lumot sinxronizatsiyasi
- Optimistik UI yangilanishlar

### 3. Foydalanuvchi Tajribasi
- Progressiv yuklash strategiyalari
- Oflayn imkoniyat mulohazalari
- Mobil-javobgar dizayn
- Accessibility muvofiqlik

Bu arxitektura turli rollar va mintaqalar bo'ylab o'sib borayotgan foydalanuvchi bazasi uchun ishlash, xavfsizlik va masshtablanishni saqlab qolgan holda murakkab logistika ish jarayonlarini qo'llab-quvvatlaydi.
