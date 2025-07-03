# Utility Funksiya Ma'lumotnomasi

## Umumiy Ko'rinish

Sarbon Logistika Platformasi `src/utils/` katalogida tashkil etilgan 30+ utility funksiyalarini o'z ichiga oladi, ma'lumot formatlash, tekshirish, xalqarolashtirish va UI operatsiyalari uchun muhim yordamchi funksionallikni ta'minlaydi. Ushbu ma'lumotnoma har bir utility funksiyaning maqsadi, parametrlari, qaytarish qiymatlari va foydalanish namunalarini hujjatlashtiradi.

## Utility Kategoriyalari

### Sana va Vaqt Utilitalar

#### `formatDate(date, dateFormat)`
**Joylashuvi**: `src/utils/formatDate.js`
**Maqsadi**: Tekshirish va xato boshqaruvi bilan sanalarni formatlash
**Parametrlar**:
- `date`: Formatlash uchun Date obyekti yoki sana satri
- `dateFormat`: Format satri (standart: "dd.MM.yyyy")
**Qaytaradi**: Formatlangan sana satri yoki noto'g'ri bo'lsa bo'sh satr
**Bog'liqliklar**: `date-fns` kutubxonasi
**Foydalanish Misoli**:
```javascript
import { formatDate } from '@/utils/formatDate';
const formatted = formatDate(new Date(), 'dd/MM/yyyy'); // "18/06/2025"
```
**Holati**: ✅ Faol - Sana kiritish va ko'rsatishda foydalaniladi

#### `formatDateTime(date)`
**Joylashuvi**: `src/utils/formatDateTime.js`
**Maqsadi**: Vaqt zonasi sozlash va nisbiy vaqt ko'rsatish bilan datetime formatlash
**Parametrlar**:
- `date`: Date obyekti yoki sana satri
**Qaytaradi**: Nisbiy ko'rsatkichlar bilan formatlangan datetime satri
**Xususiyatlar**:
- Vaqt zonasi sozlash (-5 soat)
- "Bugun", "Kecha" nisbiy formatlash
- Yaqin sanalar uchun vaqt ko'rsatish
**Foydalanish**: Yuk vaqt belgilari, GPS kuzatuv tarixi

#### `addDaysToDate(date, days)`
**Joylashuvi**: `src/utils/addDaysToDate.js`
**Maqsadi**: Sanaga belgilangan kun sonini qo'shish
**Parametrlar**:
- `date`: Asosiy sana
- `days`: Qo'shiladigan kunlar soni
**Qaytaradi**: Yangi sana obyekti
**Foydalanish**: Muddat hisoblash, rejalashtirish

#### `isValidDate(date)`
**Joylashuvi**: `src/utils/isValidDate.js`
**Maqsadi**: Qiymat to'g'ri sana ekanligini tekshirish
**Parametrlar**:
- `date`: Tekshiriladigan qiymat
**Qaytaradi**: Haqiqiylikni ko'rsatuvchi Boolean
**Foydalanish**: Forma tekshiruvi, ma'lumot qayta ishlash

### Raqam va Valyuta Formatlash

#### `formatSum(amount, currency)`
**Joylashuvi**: `src/utils/formatSum.js`
**Maqsadi**: Valyuta belgilari bilan pul miqdorlarini formatlash
**Parametrlar**:
- `amount`: Raqamli miqdor
- `currency`: Valyuta kodi (USD, UZS, va boshqalar)
**Qaytaradi**: Formatlangan valyuta satri
**Foydalanish**: Narx ko'rsatish, moliyaviy hisob-kitoblar

#### `formatNumber(number, options)`
**Joylashuvi**: `src/utils/formatNumber.js`
**Maqsadi**: Lokal-spetsifik formatlash bilan raqamlarni formatlash
**Parametrlar**:
- `number`: Formatlanadigan raqam
- `options`: Formatlash variantlari (kasrlar, ajratuvchilar)
**Qaytaradi**: Formatlangan raqam satri
**Foydalanish**: Statistika, o'lchashlar, miqdorlar

#### `splitNumber(number)`
**Joylashuvi**: `src/utils/splitNumber.js`
**Maqsadi**: Raqamlarni o'qiladigan segmentlarga bo'lish
**Parametrlar**:
- `number`: Bo'linadigan raqam
**Qaytaradi**: Raqam segmentlari massivi
**Foydalanish**: Katta raqam ko'rsatish, sahifalash

#### `allowOnlyNumbers(input)`
**Joylashuvi**: `src/utils/allowOnlyNumbers.js`
**Maqsadi**: Faqat raqamli belgilarni ruxsat berish uchun kirishni filtrlash
**Parametrlar**:
- `input`: Filtrlanadigan kirish satri
**Qaytaradi**: Faqat raqamli satr
**Foydalanish**: Telefon raqami kiritish, raqamli forma maydonlari

### Satr va Matn Qayta Ishlash

#### `normalizeName(name)`
**Joylashuvi**: `src/utils/normalizeName.js`
**Maqsadi**: Izchil ko'rsatish va saqlash uchun ismlarni normalizatsiya qilish
**Parametrlar**:
- `name`: Normalizatsiya qilinadigan ism satri
**Qaytaradi**: Normalizatsiya qilingan ism satri
**Xususiyatlar**:
- Bosh harf standartlashtirish
- Maxsus belgilar boshqaruvi
- Bo'shliq normalizatsiyasi
**Foydalanish**: Foydalanuvchi ismlari, kompaniya nomlari, manzil formatlash

#### `convertLatinToCyril(text)`
**Joylashuvi**: `src/utils/convertLatinToCyril.js`
**Maqsadi**: O'zbek tili qo'llab-quvvatlash uchun lotin matnini kirillga aylantirish
**Parametrlar**:
- `text`: Aylantiriladi lotin matni
**Qaytaradi**: Kirill matn satri
**Foydalanish**: Xalqarolashtirish, matn kiritish konvertatsiyasi

#### `stringsToarray(strings)`
**Joylashuvi**: `src/utils/stringsToarray.js`
**Maqsadi**: Satr ma'lumotlarini massiv formatiga aylantirish
**Parametrlar**:
- `strings`: Satr yoki vergul bilan ajratilgan qiymatlar
**Qaytaradi**: Satr qiymatlari massivi
**Foydalanish**: Ma'lumot tahlil, API javob qayta ishlash

#### `translateArray(array, locale)`
**Joylashuvi**: `src/utils/translateArray.js`
**Maqsadi**: Lokal asosida massiv elementlarini tarjima qilish
**Parametrlar**:
- `array`: Tarjima qilinadigan elementlar massivi
- `locale`: Maqsadli lokal kodi
**Qaytaradi**: Tarjima qilingan massiv
**Foydalanish**: Dropdown variantlari, menyu elementlari

### Telefon Raqami va Aloqa Utilitalar

#### `formatPhoneNumber(phone, format)`
**Joylashuvi**: `src/utils/formatPhoneNumber.js`
**Maqsadi**: Ko'rsatish va tekshirish uchun telefon raqamlarini formatlash
**Parametrlar**:
- `phone`: Telefon raqami satri
- `format`: Formatlash namunasi
**Qaytaradi**: Formatlangan telefon raqami
**Xususiyatlar**:
- Xalqaro format qo'llab-quvvatlash
- O'zbekistonga xos formatlash
- Tekshirish integratsiyasi
**Foydalanish**: Aloqa formalari, foydalanuvchi profillari, muloqot

### Tekshirish va Ma'lumot Qayta Ishlash

#### `isValidJSON(jsonString)`
**Joylashuvi**: `src/utils/isValidJSON.js`
**Maqsadi**: JSON satr formatini tekshirish
**Parametrlar**:
- `jsonString`: JSON sifatida tekshiriladigan satr
**Qaytaradi**: To'g'ri JSON ekanligini ko'rsatuvchi Boolean
**Foydalanish**: API javob tekshiruvi, ma'lumot tahlil

#### `extractUrlInfo(url)`
**Joylashuvi**: `src/utils/extractUrlInfo.js`
**Maqsadi**: URL'lardan ma'lumot chiqarish
**Parametrlar**:
- `url`: Tahlil qilinadigan URL satri
**Qaytaradi**: URL komponentlari bilan obyekt
**Foydalanish**: Link qayta ishlash, navigatsiya boshqaruvi

#### `findChangedLogs(oldData, newData)`
**Joylashuvi**: `src/utils/findChangedLogs.js`
**Maqsadi**: Ma'lumot obyektlarini solishtirish va o'zgarishlarni aniqlash
**Parametrlar**:
- `oldData`: Asl ma'lumot obyekti
- `newData`: Yangilangan ma'lumot obyekti
**Qaytaradi**: O'zgarish tavsiflari massivi
**Foydalanish**: Audit logging, o'zgarish kuzatuvi

### UI va Vizual Utilitalar

#### `rem(px)`
**Joylashuvi**: `src/utils/common.js`
**Maqsadi**: Responsive dizayn uchun piksel qiymatlarini rem birliklariga aylantirish
**Parametrlar**:
- `px`: Aylantiriladi piksel qiymati
**Qaytaradi**: Rem qiymat satri (masalan, "1.000rem")
**Amalga oshirish**:
```javascript
const rootFontSize = 16;
export const rem = (px) => {
  return px ? `${(Math.abs(px) / rootFontSize).toFixed(3)}rem` : "0rem";
};
```
**Foydalanish**: CSS-in-JS uslublash, responsive dizayn

#### `getSVGIcon(tempValue, type)`
**Joylashuvi**: `src/utils/getSVGIcon.js`
**Maqsadi**: Xarita belgilari uchun ichki matn bilan dinamik SVG ikonkalar yaratish
**Parametrlar**:
- `tempValue`: Ikonda ko'rsatiladigan matn (standart: "$2000")
- `type`: Ikon turi ("occupied_cargo" ko'k uchun, standart yashil)
**Qaytaradi**: SVG ikon uchun Data URL satri
**Xususiyatlar**:
- Dinamik matn kiritish
- Rang variantlari (ko'k/yashil)
- Xarita belgisi optimallashtirish
**Foydalanish**: GPS kuzatuv belgilari, yuk holat ko'rsatkichlari
**Texnik Tafsilotlar**:
- Ichki matn bilan inline SVG yaratadi
- To'g'ridan-to'g'ri foydalanish uchun base64 data URL qaytaradi
- Yandex Maps integratsiyasi uchun optimallashtirilgan

#### `isVisibleInViewport(element)`
**Joylashuvi**: `src/utils/isVisibleInViewport.js`
**Maqsadi**: DOM elementi viewport da ko'rinishini tekshirish
**Parametrlar**:
- `element`: Tekshiriladigan DOM elementi
**Qaytaradi**: Ko'rinishni ko'rsatuvchi Boolean
**Texnik Qarz**: 🚨 Debug `console.log` bayonoti mavjud
**Foydalanish**: Kech yuklash, scroll asosidagi animatsiyalar

### Animatsiya va UI Effektlar

#### `animation`
**Joylashuvi**: `src/utils/animation.js`
**Maqsadi**: Animatsiya utility funksiyalari va konfiguratsiyalar
**Foydalanish**: UI o'tishlar, yuklash holatlari

#### `animationSetting`
**Joylashuvi**: `src/utils/animationSetting.js`
**Maqsadi**: Animatsiya konfiguratsiyasi va sozlamalar
**Foydalanish**: Komponentlar bo'ylab izchil animatsiya vaqti

### Autentifikatsiya va Xavfsizlik

#### `getToken()`
**Joylashuvi**: `src/utils/getToken.js`
**Maqsadi**: Saqlashdan autentifikatsiya tokenini olish
**Qaytaradi**: Autentifikatsiya token satri
**Foydalanish**: API so'rovlar, autentifikatsiya tekshiruvlari

#### `fribaseAuth`
**Joylashuvi**: `src/utils/fribaseAuth.js`
**Maqsadi**: Firebase autentifikatsiya utilitalar
**Foydalanish**: Ijtimoiy login integratsiyasi (Google, Apple)

### Ma'lumot Konstantalar va Konfiguratsiya

#### `constants`
**Joylashuvi**: `src/utils/constants.js`
**Maqsadi**: Dastur bo'ylab konstantalar va konfiguratsiya qiymatlari
**Foydalanish**: API endpointlar, standart qiymatlar, konfiguratsiya

#### `country`
**Joylashuvi**: `src/utils/country.js`
**Maqsadi**: Mamlakat ma'lumotlari va utilitalar
**Foydalanish**: Mamlakat tanlash, xalqarolashtirish

#### `flegCountry`
**Joylashuvi**: `src/utils/flegCountry.js`
**Maqsadi**: Mamlakat bayrog'i utilitalar va ma'lumotlar
**Foydalanish**: Mamlakat bayrog'i ko'rsatish, lokal tanlash

### Rol va Foydalanuvchi Boshqaruvi

#### `roleName(roleId)`
**Joylashuvi**: `src/utils/roleName.js`
**Maqsadi**: Rol ID'larini odam o'qiy oladigan rol nomlariga aylantirish
**Parametrlar**:
- `roleId`: UUID rol identifikatori
**Qaytaradi**: Lokalizatsiya qilingan rol nomi satri
**Foydalanish**: Foydalanuvchi interfeysi, rol ko'rsatish

#### `actionComment(action, user)`
**Joylashuvi**: `src/utils/actionComment.js`
**Maqsadi**: Audit loglar uchun harakat sharhlarini yaratish
**Parametrlar**:
- `action`: Harakat turi
- `user`: Harakatni bajaruvchi foydalanuvchi
**Qaytaradi**: Formatlangan sharh satri
**Foydalanish**: Faoliyat logging, audit izlar

### Server Tomoni Utilitalar

#### `isServer()`
**Joylashuvi**: `src/utils/isServer.js`
**Maqsadi**: Server tomoni rendering muhitini aniqlash
**Qaytaradi**: Server muhitini ko'rsatuvchi Boolean
**Foydalanish**: SSR/CSR shartli logika

### Forma Tekshiruvi

#### `yupResolver`
**Joylashuvi**: `src/utils/yupResolver.js`
**Maqsadi**: React Hook Form integratsiyasi uchun maxsus Yup resolver
**Foydalanish**: Forma tekshiruvi, schema tekshiruvi

## Maxsus Hook'lar

### Masofa Hisoblash

#### `useGetDistance({ origin, destination, referencePoints })`
**Joylashuvi**: `src/hooks/useGetDistance.js`
**Maqsadi**: Yandex Maps yordamida nuqtalar orasidagi masofa va davomiylikni hisoblash
**Parametrlar**:
- `origin`: Boshlang'ich nuqta koordinatalari
- `destination`: Yakuniy nuqta koordinatalari
- `referencePoints`: Ko'p nuqtali yo'llar uchun koordinata juftliklari massivi
**Qaytaradi**: Masofa (km) va davomiylik bilan obyekt
**Bog'liqliklar**: Yandex Maps API
**Texnik Qarz**: 🚨 Muvaffaqiyatsiz hisob-kitoblar uchun `console.error` mavjud
**Foydalanish**: Yo'l rejalashtirish, yetkazib berish baholash

### Til va Lokalizatsiya

#### `useGetLang()`
**Joylashuvi**: `src/hooks/useGetLang.js`
**Maqsadi**: Joriy dastur tili/lokalini olish
**Qaytaradi**: Joriy lokal satri
**Foydalanish**: Xalqarolashtirish, kontent lokalizatsiyasi

### Ma'lumot Kirish Hook'lari

#### `useGetStoreData()`
**Joylashuvi**: `src/hooks/useGetStoreData.js`
**Maqsadi**: React integratsiyasi bilan MobX store ma'lumotlariga kirish
**Qaytaradi**: Store ma'lumot obyekti
**Foydalanish**: Global holat kirish

#### `useGetUserInfo()`
**Joylashuvi**: `src/hooks/useGetUserInfo.js`
**Maqsadi**: Joriy foydalanuvchi ma'lumotlarini olish
**Qaytaradi**: Foydalanuvchi ma'lumot obyekti
**Foydalanish**: Foydalanuvchi profili, autentifikatsiya holati

#### `useDebounce(value, delay)`
**Joylashuvi**: `src/hooks/useDebounce.js`
**Maqsadi**: Ishlash optimallashtirish uchun qiymat o'zgarishlarini debounce qilish
**Parametrlar**:
- `value`: Debounce qilinadigan qiymat
- `delay`: Debounce kechikish millisekundlarda
**Qaytaradi**: Debounce qilingan qiymat
**Foydalanish**: Qidiruv kirishlari, API chaqiruv optimallashtirish

## Foydalanish Namunalari va Eng Yaxshi Amaliyotlar

### Yuqori Foydalanish Utilitalar (Muhim)
1. **formatDate** - Sana ko'rsatish uchun 20+ komponentda foydalaniladi
2. **formatPhoneNumber** - Barcha aloqa bog'liq formalarda foydalaniladi
3. **rem** - CSS-in-JS uslublashda keng foydalaniladi
4. **getSVGIcon** - GPS kuzatuv xarita belgilari uchun muhim
5. **normalizeName** - Foydalanuvchi va kompaniya nomi qayta ishlashda foydalaniladi

### O'rtacha Foydalanish Utilitalar (Muhim)
1. **formatSum** - Moliyaviy ko'rsatishlarda foydalaniladi
2. **convertLatinToCyril** - O'zbek tili qo'llab-quvvatlashda foydalaniladi
3. **isVisibleInViewport** - Scroll asosidagi xususiyatlarda foydalaniladi
4. **roleName** - Foydalanuvchi interfeysi rol ko'rsatishlarida foydalaniladi

### Past Foydalanish Utilitalar (Maxsus)
1. **findChangedLogs** - Audit logging spetsifik
2. **extractUrlInfo** - URL qayta ishlash spetsifik
3. **translateArray** - Lokalizatsiya spetsifik

### 🔧 Yaxshilash Imkoniyatlari

#### Sana Utilitalar Birlashtirish
- **formatDate** va **formatDateTime** bir-biriga o'xshash funksionallikka ega
- Variantlar bilan yagona sana formatlash utility ko'rib chiqilsin
- Vaqt zonasi boshqaruvi yondashuvini standartlashtirish

#### Raqam Formatlash Birlashtirish
- **formatSum**, **formatNumber**, **splitNumber** birlashtirish mumkin
- Lokal-xabardor raqam formatlash tizimini amalga oshirish
- Valyuta boshqaruvida takrorlashni kamaytirish

#### Tekshirish Utilitalar
- **isValidDate** va **isValidJSON** kattaroq tekshirish utility qismi bo'lishi mumkin
- Yaxshiroq tekshirish uchun TypeScript turlarini qo'shish
- Keng qamrovli tekshirish kutubxonasini amalga oshirish

#### Satr Qayta Ishlash Optimallashtirish
- **normalizeName** va **convertLatinToCyril** optimallashtirilishi mumkin
- Matn qayta ishlash uchun o'rnatilgan kutubxonalardan foydalanishni ko'rib chiqish
- Qimmat operatsiyalar uchun keshlashni amalga oshirish

## Ishlash Mulohazalari

### Optimallashtirish Imkoniyatlari
1. **getSVGIcon**: Qayta yaratishdan qochish uchun yaratilgan SVG satrlarini keshlash
2. **useGetDistance**: Tez koordinata o'zgarishlari uchun so'rov debouncing amalga oshirish
3. **convertLatinToCyril**: Takroriy matn uchun konvertatsiya natijalarini keshlash
4. **formatPhoneNumber**: Yaxshiroq ishlash uchun regex namunalarini optimallashtirish

### Xotira Foydalanish
- Ko'pchilik utilitalar holatga ega emas va xotira samarali
- **getSVGIcon** katta SVG satrlar yaratadi - optimallashtirish ko'rib chiqilsin
- **useGetDistance** Yandex Maps obyektlarini yaratadi - to'g'ri tozalashni ta'minlash

## Test Tavsiyalari

### Testlar Talab Qiladigan Muhim Utilitalar
1. **formatDate** - Sana formatlash chekka holatlari
2. **formatPhoneNumber** - Xalqaro raqam tekshiruvi
3. **getSVGIcon** - SVG yaratish va kodlash
4. **useGetDistance** - Masofa hisoblash aniqligi
5. **normalizeName** - Ism qayta ishlash chekka holatlari

### Test Qamrov Bo'shliqlari
- Utility funksiyalar uchun unit testlar topilmadi
- Maxsus hook'lar uchun integratsiya testlari yo'q
- Qimmat operatsiyalar uchun ishlash benchmark'lari yo'q

## Hujjatlashtirish Yaxshilash

### Yo'qolgan Hujjatlashtirish
- Funksiya parametr turlari va tekshiruvi
- Xato boshqaruvi va chekka holatlar
- Ishlash xususiyatlari
- Brauzer muvofiqlik eslatmalari

### Foydalanish Misollari Kerak
- Murakkab utility kombinatsiyalari
- React komponentlari bilan integratsiya
- Xato boshqaruvi namunalari
- Ishlash optimallashtirish texnikalari

Ushbu utility funksiya ma'lumotnomasi yordamchi funksiyalar va maxsus hook'lar bilan ishlaydigan dasturchilar uchun keng qamrovli qo'llanma taqdim etadi, logistika platformasining utility qatlamini samarali rivojlantirish va saqlashni ta'minlaydi.
