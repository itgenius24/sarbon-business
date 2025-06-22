# Komponent Katalogi

## Umumiy Ko'rinish

Sarbon Logistika Platformasi `src/components/` katalogida tashkil etilgan 50+ qayta foydalaniladigan UI komponentlarini o'z ichiga oladi. Ushbu katalog har bir komponentning maqsadi, props, foydalanish namunalari va potentsial optimallashtirish imkoniyatlarini hujjatlashtiradi.

## Komponent Tashkiloti

### Asosiy UI Komponentlari

#### BreadCrumb
**Maqsadi**: Sahifa ierarxiyasi uchun navigatsiya breadcrumb izi
**Joylashuvi**: `src/components/BreadCrumb/`
**Foydalanish**: Sahifa navigatsiyasi va foydalanuvchi yo'nalishi
**Props**: 
- `items`: Label va linklar bilan breadcrumb elementlari massivi
- `separator`: Elementlar orasidagi maxsus ajratuvchi
**Holati**: ✅ Faol - Ko'plab sahifalarda foydalaniladi

#### Container
**Maqsadi**: Izchil bo'shliq va tartib bilan asosiy kontent o'rami
**Joylashuvi**: `src/components/Container/`
**Foydalanish**: Sahifa tartibini standartlashtirish
**Props**:
- `children`: React children elementlari
- `maxWidth`: Container maksimal kengligi
- `padding`: Maxsus padding qiymatlari
**Holati**: ✅ Faol - Asosiy tartib komponenti

#### ContainerAnalitik
**Maqsadi**: Analitika va dashboard kontent uchun maxsus container
**Joylashuvi**: `src/components/ContainerAnalitik/`
**Foydalanish**: Dashboard va analitika sahifalari
**Props**: Container bilan o'xshash, analitikaga xos uslublash bilan
**Holati**: ✅ Faol - Dashboard-spetsifik foydalanish
**Eslatma**: 🔍 Container komponenti bilan potentsial takrorlash

#### ContainerNav
**Maqsadi**: Responsive xatti-harakat bilan navigatsiya container
**Joylashuvi**: `src/components/ContainerNav/`
**Foydalanish**: Navigatsiya tartib o'rami
**Props**: Navigatsiyaga xos tartib xususiyatlari
**Holati**: ✅ Faol - Navigatsiya tartiblar
**Eslatma**: 🔍 Asosiy Container bilan birlashtirish ko'rib chiqilsin

### Forma Komponentlari

#### Input
**Maqsadi**: Tekshirish va uslublash bilan standart matn kiritish
**Joylashuvi**: `src/components/Input/`
**Foydalanish**: Forma matn kiritish maydonlari
**Props**:
- `value`: Kirish qiymati
- `onChange`: O'zgarish handler funksiyasi
- `placeholder`: Placeholder matni
- `error`: Xato xabari
- `disabled`: Disabled holati
**Holati**: ✅ Faol - Barcha formalarda keng foydalaniladi

#### FormInternationalInput
**Maqsadi**: Xalqaro telefon raqami kiritish uchun maxsus input
**Joylashuvi**: `src/components/Input/FormInternationalInput.jsx`
**Foydalanish**: Telefon raqami kiritish formalari
**Props**: Mamlakat kodi tanlash va telefon formatlash
**Holati**: ✅ Faol - Autentifikatsiya va profil formalari

#### DatePicker
**Maqsadi**: Sana tanlash uchun kalendar interfeysi
**Joylashuvi**: `src/components/DatePicker/`
**Foydalanish**: Sana kiritish maydonlari
**Props**:
- `value`: Tanlangan sana
- `onChange`: Sana o'zgarish handler
- `minDate`: Minimal sana
- `maxDate**: Maksimal sana
**Holati**: ✅ Faol - Yuk yaratish va filtrlash

#### Checkbox
**Maqsadi**: Boolean qiymatlar uchun checkbox input
**Joylashuvi**: `src/components/Checkbox/`
**Foydalanish**: Forma tanlov maydonlari
**Props**:
- `checked`: Belgilangan holati
- `onChange`: O'zgarish handler
- `label`: Checkbox yorlig'i
**Holati**: ✅ Faol - Forma va filtr komponentlari

### Dropdown va Tanlash Komponentlari

#### Dropdown
**Maqsadi**: Asosiy dropdown tanlash komponenti
**Joylashuvi**: `src/components/Dropdown/`
**Foydalanish**: Oddiy tanlash maydonlari
**Props**:
- `options`: Tanlash variantlari massivi
- `value`: Tanlangan qiymat
- `onChange`: Tanlash o'zgarish handler
**Holati**: ✅ Faol - Forma tanlash maydonlari

#### ChakraSelect
**Maqsadi**: Chakra UI asosidagi select komponenti
**Joylashuvi**: `src/components/ChakraSelect/`
**Foydalanish**: Chakra UI bilan integratsiya qilingan tanlash
**Props**: Chakra UI select props bilan
**Holati**: ✅ Faol - Chakra UI formalari
**Eslatma**: 🔍 Dropdown bilan takrorlash

#### LocaleDropdown
**Maqsadi**: Til tanlash uchun maxsus dropdown
**Joylashuvi**: `src/components/LocaleDropdown/`
**Foydalanish**: Til o'zgartirish interfeysi
**Props**: Mavjud tillar va joriy til
**Holati**: ✅ Faol - Header navigatsiya

### Fayl Yuklash Komponentlari

#### UploadImg
**Maqsadi**: Rasm yuklash uchun asosiy komponent
**Joylashuvi**: `src/components/UploadImg/`
**Foydalanish**: Rasm yuklash maydonlari
**Props**:
- `onUpload`: Yuklash handler funksiyasi
- `accept`: Qabul qilinadigan fayl turlari
- `maxSize`: Maksimal fayl hajmi
**Holati**: ✅ Faol - Profil va hujjat yuklash

#### UploadImgRigister
**Maqsadi**: Ro'yxatdan o'tish uchun maxsus rasm yuklash
**Joylashuvi**: `src/components/UploadImgRigister/`
**Foydalanish**: Ro'yxatdan o'tish jarayonida hujjat yuklash
**Props**: UploadImg bilan o'xshash, ro'yxatdan o'tishga xos
**Holati**: ✅ Faol - Foydalanuvchi ro'yxatdan o'tish
**Eslatma**: 🔍 UploadImg bilan takrorlash

#### UploadFile
**Maqsadi**: Umumiy fayl yuklash komponenti
**Joylashuvi**: `src/components/UploadFile/`
**Foydalanish**: Har qanday turdagi fayl yuklash
**Props**: Fayl turlari va yuklash konfiguratsiyasi
**Holati**: ✅ Faol - Hujjat boshqaruvi

### Navigatsiya va Layout Komponentlari

#### Header
**Maqsadi**: Asosiy dastur header navigatsiya
**Joylashuvi**: `src/components/Header/`
**Foydalanish**: Barcha sahifalarda yuqori navigatsiya
**Props**:
- `user`: Foydalanuvchi ma'lumotlari
- `onLogout`: Chiqish handler
**Holati**: ✅ Faol - Asosiy layout komponenti

#### Footer
**Maqsadi**: Dastur footer ma'lumotlari
**Joylashuvi**: `src/components/Footer/`
**Foydalanish**: Sahifa pastki qismi
**Props**: Footer kontenti va linklar
**Holati**: ✅ Faol - Layout komponenti

#### Sidebar
**Maqsadi**: Yon navigatsiya paneli
**Joylashuvi**: `src/components/Sidebar/`
**Foydalanish**: Dashboard navigatsiya
**Props**: Navigatsiya elementlari va faol holat
**Holati**: ✅ Faol - Dashboard layout

### Ma'lumot Ko'rsatish Komponentlari

#### SarbonTable
**Maqsadi**: Yuk va haydovchi ma'lumotlarini ko'rsatish uchun maxsus jadval
**Joylashuvi**: `src/components/SarbonTable/`
**Foydalanish**: Ma'lumot jadvallari saralash bilan
**Props**:
- `data`: Jadval ma'lumotlari
- `columns`: Ustun konfiguratsiyasi
- `onSort`: Saralash handler
**Holati**: ✅ Faol - Ko'plab modullarda foydalaniladi

#### Stages
**Maqsadi**: Yuk ish jarayoni progress va holat o'tishlarini ko'rsatish
**Joylashuvi**: `src/components/Stages/`
**Foydalanish**: Buyurtma kuzatuvi, holat vizualizatsiyasi
**Props**:
- `currentStage`: Joriy bosqich
- `stages`: Bosqichlar massivi
**Holati**: ✅ Faol - Yuk holat ko'rsatish

#### LoadingSpinner
**Maqsadi**: Yuklash holati ko'rsatkichi
**Joylashuvi**: `src/components/LoadingSpinner/`
**Foydalanish**: Asinxron operatsiyalar uchun yuklash
**Props**:
- `size`: Spinner hajmi
- `color`: Spinner rangi
**Holati**: ✅ Faol - Barcha yuklash holatlari

### Modal va Dialog Komponentlari

#### Modal
**Maqsadi**: Asosiy modal dialog komponenti
**Joylashuvi**: `src/components/Modal/`
**Foydalanish**: Dialog va popup oynalar
**Props**:
- `isOpen`: Modal ochiq holati
- `onClose`: Yopish handler
- `title`: Modal sarlavhasi
**Holati**: ✅ Faol - Dialog interfeyslari

#### ConfirmDialog
**Maqsadi**: Tasdiqlash dialogi
**Joylashuvi**: `src/components/ConfirmDialog/`
**Foydalanish**: O'chirish va muhim amallar tasdiqi
**Props**:
- `message`: Tasdiqlash xabari
- `onConfirm`: Tasdiqlash handler
- `onCancel**: Bekor qilish handler
**Holati**: ✅ Faol - Xavfli amallar

### Xarita va GPS Komponentlari

#### YandexMap
**Maqsadi**: Yandex Maps integratsiya komponenti
**Joylashuvi**: `src/components/YandexMap/`
**Foydalanish**: Xarita ko'rsatish va GPS kuzatuv
**Props**:
- `center`: Xarita markazi
- `zoom`: Kattalashtirish darajasi
- `markers`: Belgilar massivi
**Holati**: ✅ Faol - GPS kuzatuv modullari

#### MapContainer
**Maqsadi**: Xarita uchun container wrapper
**Joylashuvi**: `src/components/MapContainer/`
**Foydalanish**: Xarita layout va responsive xatti-harakat
**Props**: Xarita o'lchami va konfiguratsiya
**Holati**: ✅ Faol - Xarita sahifalari

### Utility Komponentlari

#### ErrorBoundary
**Maqsadi**: React xato chegarasi komponenti
**Joylashuvi**: `src/components/ErrorBoundary/`
**Foydalanish**: Komponent xatolarini ushlash
**Props**: Xato fallback komponenti
**Holati**: ✅ Faol - Xato boshqaruvi

#### ProtectedRoute
**Maqsadi**: Autentifikatsiya himoyasi bilan yo'l komponenti
**Joylashuvi**: `src/components/ProtectedRoute/`
**Foydalanish**: Himoyalangan sahifalar
**Props**: Talab qilinadigan rollar va ruxsatlar
**Holati**: ✅ Faol - Yo'l himoyasi

## Komponent Foydalanish Tahlili

### Yuqori Foydalanish (10+ marta)
- **Input**: 25+ modullarda foydalaniladi
- **Container**: 20+ sahifalarda asosiy layout
- **SarbonTable**: 15+ ma'lumot ko'rsatish sahifalari
- **Header**: Barcha autentifikatsiya qilingan sahifalarda
- **LoadingSpinner**: Asinxron operatsiyalar uchun

### O'rtacha Foydalanish (5-10 marta)
- **Dropdown**: Forma tanlash maydonlari
- **DatePicker**: Sana kiritish formalari
- **Modal**: Dialog interfeyslari
- **YandexMap**: GPS kuzatuv sahifalari

### Past Foydalanish (1-4 marta)
- **ContainerAnalitik**: Faqat dashboard sahifalari
- **UploadImgRigister**: Faqat ro'yxatdan o'tish
- **LocaleDropdown**: Faqat header navigatsiya

## Takrorlash va Optimallashtirish Imkoniyatlari

### Container Komponentlari Takrorlashi
**Muammo**: Uchta o'xshash container komponenti mavjud
- `Container` - asosiy layout
- `ContainerAnalitik` - analitika uchun
- `ContainerNav` - navigatsiya uchun

**Tavsiya**: Bitta moslashuvchan Container komponentiga birlashtirish:
```jsx
<Container variant="default|analytics|navigation" />
```

### Input Tizimi Takrorlashi
**Muammo**: Ko'plab input variantlari
- `Input` - asosiy matn kiritish
- `FormInternationalInput` - telefon raqami
- Har xil forma komponentlari

**Tavsiya**: Yagona Input tizimi yaratish:
```jsx
<Input type="text|phone|email|password" />
```

### Upload Komponentlari Takrorlashi
**Muammo**: Ikki o'xshash yuklash komponenti
- `UploadImg` - asosiy rasm yuklash
- `UploadImgRigister` - ro'yxatdan o'tish uchun

**Tavsiya**: Bitta moslashuvchan UploadImg komponentiga birlashtirish

### Dropdown Tizimi Takrorlashi
**Muammo**: Ko'plab tanlash komponentlari
- `Dropdown` - asosiy tanlash
- `ChakraSelect` - Chakra UI versiyasi
- `LocaleDropdown` - til tanlash

**Tavsiya**: Yagona Select tizimi yaratish

## Foydalanilmagan yoki Kam Foydalaniladigan Komponentlar

### Potentsial Foydalanilmagan Komponentlar
🔍 **Tekshirish talab qilinadi**:
- `ContainerAnalitik` - faqat dashboard sahifalarda
- `UploadImgRigister` - faqat ro'yxatdan o'tishda
- Ba'zi utility komponentlar

### Kam Foydalaniladigan Komponentlar
- `LocaleDropdown` - faqat header da
- `ErrorBoundary` - faqat yuqori darajada
- `ProtectedRoute` - faqat yo'l himoyasi uchun

## Dizayn Tizimi Tavsiyalari

### Komponent Kategoriyalari
1. **Layout**: Container, Header, Footer, Sidebar
2. **Forma**: Input, DatePicker, Checkbox, Select
3. **Ma'lumot**: SarbonTable, Stages, LoadingSpinner
4. **Navigatsiya**: BreadCrumb, ProtectedRoute
5. **Fayl**: UploadImg, UploadFile
6. **Modal**: Modal, ConfirmDialog
7. **Xarita**: YandexMap, MapContainer
8. **Utility**: ErrorBoundary, LoadingSpinner

### Standartlashtirish Tavsiyalari
1. **Props Interface**: Barcha komponentlar uchun izchil props nomlash
2. **Uslublash**: Chakra UI theme bilan izchil dizayn
3. **TypeScript**: Barcha komponentlar uchun tip ta'riflari
4. **Hujjatlashtirish**: Har bir komponent uchun Storybook
5. **Testing**: Unit testlar va komponent testlari

## Xulosa

Sarbon Logistics Platform kuchli komponent kutubxonasiga ega, ammo takrorlash va optimallashtirish imkoniyatlari mavjud. Asosiy tavsiyalar:

1. **Container komponentlarini birlashtirish** - 3 komponentdan 1 tagacha
2. **Input tizimini standartlashtirish** - yagona moslashuvchan Input
3. **Upload komponentlarini birlashtirish** - takrorlanishni kamaytirish
4. **Dropdown tizimini yagona qilish** - izchil tanlash interfeysi
5. **Dizayn tizimi yaratish** - komponentlar uchun yagona standart

Bu optimallashtirish kod sifatini yaxshilaydi, maintenance yukini kamaytiradi va rivojlantiruvchi tajribasini yaxshilaydi.
