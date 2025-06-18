# Xizmat Qatlami API Hujjatlari

## Umumiy Ko'rinish

Sarbon Logistika Platformasi domen-spetsifik API xizmatlari, maxsus React Query hook'lari va ikki tomonlama HTTP mijoz konfiguratsiyasi bilan keng qamrovli xizmat qatlami arxitekturasini amalga oshiradi. Xizmat qatlami autentifikatsiya, logistika operatsiyalari, ma'lumot boshqaruvi va real vaqtda muloqotni boshqaradi.

## Xizmat Arxitekturasi

```
Frontend Komponentlari → Maxsus Hook'lar → API Xizmatlari → HTTP Mijozlar → Backend API'lar
```

### HTTP Mijoz Konfiguratsiyasi

#### Asosiy HTTP Mijoz (`request`)
**Joylashuvi**: `src/services/request/`
**Maqsadi**: Autentifikatsiya qilingan so'rovlar uchun asosiy API aloqasi
**Xususiyatlar**:
- Avtomatik token kiritish
- So'rov/javob interceptor'lari
- Xato boshqaruvi va qayta urinish logikasi
- Asosiy URL konfiguratsiyasi

#### Ikkinchi HTTP Mijoz (`requestInvoke`)
**Joylashuvi**: `src/services/requestInvoke/`
**Maqsadi**: Logistika funksiya chaqiruvlari uchun maxsus mijoz
**Xususiyatlar**:
- Muqobil autentifikatsiya mexanizmi
- Logistikaga xos so'rov formatlash
- Maxsus xato boshqaruvi

#### Autentifikatsiya HTTP Mijoz (`authRequest`)
**Joylashuvi**: `src/services/authRequest/`
**Maqsadi**: Token talablarisiz autentifikatsiyaga xos so'rovlar
**Xususiyatlar**:
- Autentifikatsiya oldi so'rovlar
- Ro'yxatdan o'tish va kirish oqimlari
- OTP tekshiruvi

## API Xizmat Domenlari

### 1. Autentifikatsiya Xizmati

**Joylashuvi**: `src/services/api/auth/auth.service.js`
**Maqsadi**: Foydalanuvchi autentifikatsiyasi, ro'yxatdan o'tish va sessiya boshqaruvi

#### Xizmat Metodlari

##### `oneLogin(data)`
- **HTTP Metod**: POST
- **Endpoint**: `/auth/login`
- **Maqsad**: Telefon raqami va OTP bilan foydalanuvchi kirishi
- **So'rov Parametrlari**:
  - `phone`: Telefon raqami (string, majburiy)
  - `otp`: Bir martalik parol (string, majburiy)
- **Javob Tuzilishi**:
  ```json
  {
    "success": boolean,
    "data": {
      "token": string,
      "refresh_token": string,
      "user": {
        "id": string,
        "phone": string,
        "role_id": string,
        "dispatcher_type": string
      }
    }
  }
  ```
- **Xato Boshqaruvi**: Noto'g'ri OTP, bloklanган foydalanuvchi, tizim xatolari

##### `sendOtp(phone)`
- **HTTP Metod**: POST
- **Endpoint**: `/auth/send-otp`
- **Maqsad**: Telefon raqamiga SMS OTP yuborish
- **So'rov Parametrlari**:
  - `phone`: Telefon raqami (string, majburiy)
- **Javob Tuzilishi**:
  ```json
  {
    "success": boolean,
    "message": string,
    "data": {
      "otp_sent": boolean,
      "expires_at": string
    }
  }
  ```

##### `refreshToken(refreshToken)`
- **HTTP Metod**: POST
- **Endpoint**: `/auth/refresh`
- **Maqsad**: Kirish tokenini yangilash
- **So'rov Parametrlari**:
  - `refresh_token`: Yangilash tokeni (string, majburiy)
- **Javob Tuzilishi**: oneLogin bilan bir xil

##### `logout()`
- **HTTP Metod**: POST
- **Endpoint**: `/auth/logout`
- **Maqsad**: Foydalanuvchi sessiyasini tugatish
- **Xususiyatlar**: Token bekor qilish, sessiya tozalash

### 2. Funksiyalar Xizmati

**Joylashuvi**: `src/services/api/functions/functions.service.js`
**Maqsadi**: Logistika operatsiyalari, yuk boshqaruvi va GPS kuzatuv

#### Asosiy Metodlar

##### `LogistikaGetCargoList(params)`
- **HTTP Metod**: POST
- **Endpoint**: `/functions/LogistikaGetCargoList`
- **Maqsad**: Foydalanuvchi roliga ko'ra yuk ro'yxatini olish
- **So'rov Parametrlari**:
  - `page`: Sahifa raqami (number, ixtiyoriy)
  - `limit`: Sahifa hajmi (number, ixtiyoriy)
  - `status`: Yuk holati filtri (string, ixtiyoriy)
  - `date_from`: Boshlanish sanasi (string, ixtiyoriy)
  - `date_to`: Tugash sanasi (string, ixtiyoriy)
- **Javob Tuzilishi**:
  ```json
  {
    "success": boolean,
    "data": {
      "items": Array<CargoItem>,
      "total": number,
      "page": number,
      "limit": number
    }
  }
  ```

##### `LogistikaAddCargo(cargoData)`
- **HTTP Metod**: POST
- **Endpoint**: `/functions/LogistikaAddCargo`
- **Maqsad**: Yangi yuk buyurtmasi yaratish
- **So'rov Parametrlari**:
  - `shipper_address`: Yuboruvchi manzili (object, majburiy)
  - `consignee_address`: Qabul qiluvchi manzili (object, majburiy)
  - `cargo_type`: Yuk turi (string, majburiy)
  - `weight`: Og'irligi (number, majburiy)
  - `volume`: Hajmi (number, ixtiyoriy)
  - `price`: Narxi (number, majburiy)
  - `deadline`: Muddati (string, majburiy)
- **Javob Tuzilishi**:
  ```json
  {
    "success": boolean,
    "data": {
      "cargo_guid": string,
      "status": string,
      "created_at": string
    }
  }
  ```

##### `LogistikaGpsTrackingFilterDriver(params)`
- **HTTP Metod**: POST
- **Endpoint**: `/functions/LogistikaGpsTrackingFilterDriver`
- **Maqsad**: GPS asosida haydovchi filtrlash va tayinlash
- **So'rov Parametrlari**:
  - `cargo_guid`: Yuk identifikatori (string, majburiy)
  - `radius`: Qidiruv radiusi km da (number, ixtiyoriy)
  - `vehicle_type`: Transport turi (string, ixtiyoriy)
  - `provisions`: Haydovchi holati (string, ixtiyoriy)
- **Javob Tuzilishi**:
  ```json
  {
    "success": boolean,
    "data": {
      "drivers": Array<DriverInfo>,
      "total_found": number,
      "search_radius": number
    }
  }
  ```

##### `LogistikaOfferFromCustomer(offerData)`
- **HTTP Metod**: POST
- **Endpoint**: `/functions/LogistikaOfferFromCustomer`
- **Maqsad**: Mijozdan haydovchiga yuk taklifi yaratish
- **So'rov Parametrlari**:
  - `cargo_guid`: Yuk identifikatori (string, majburiy)
  - `driver_id`: Haydovchi identifikatori (string, majburiy)
  - `offered_price`: Taklif qilingan narx (number, majburiy)
  - `prepayment`: Oldindan to'lov (number, ixtiyoriy)
  - `comment`: Izoh (string, ixtiyoriy)

##### `LogistikaGetGpsHistory(params)`
- **HTTP Metod**: POST
- **Endpoint**: `/functions/LogistikaGetGpsHistory`
- **Maqsad**: Haydovchi GPS tarixini olish
- **So'rov Parametrlari**:
  - `driver_id`: Haydovchi identifikatori (string, majburiy)
  - `date_from`: Boshlanish sanasi (string, majburiy)
  - `date_to`: Tugash sanasi (string, majburiy)
- **Javob Tuzilishi**:
  ```json
  {
    "success": boolean,
    "data": {
      "gps_history": Array<GPSPoint>,
      "total_distance": number,
      "route_summary": object
    }
  }
  ```

### 3. Elementlar Xizmati

**Joylashuvi**: `src/services/api/items/items.service.js`
**Maqsadi**: Tizim ma'lumotnomalar va statik ma'lumotlar

#### Metodlar

##### `getVehicleTypes()`
- **HTTP Metod**: GET
- **Endpoint**: `/items/vehicle-types`
- **Maqsad**: Mavjud transport turlarini olish
- **Javob**: Transport turlari ro'yxati

##### `getCargoTypes()`
- **HTTP Metod**: GET
- **Endpoint**: `/items/cargo-types`
- **Maqsad**: Yuk turlarini olish
- **Javob**: Yuk turlari ro'yxati

##### `getRegions()`
- **HTTP Metod**: GET
- **Endpoint**: `/items/regions`
- **Maqsad**: Mintaqalar ro'yxatini olish
- **Javob**: Mintaqalar va shaharlar

### 4. Obyekt Xizmati

**Joylashuvi**: `src/services/api/object/object.service.js`
**Maqsadi**: Fayl yuklash va hujjat boshqaruvi

#### Metodlar

##### `uploadFile(file, type)`
- **HTTP Metod**: POST
- **Endpoint**: `/object/upload`
- **Maqsad**: Fayllarni yuklash va saqlash
- **So'rov Parametrlari**:
  - `file`: Fayl ma'lumotlari (File, majburiy)
  - `type`: Fayl turi (string, majburiy)
- **Javob Tuzilishi**:
  ```json
  {
    "success": boolean,
    "data": {
      "file_url": string,
      "file_id": string,
      "file_size": number
    }
  }
  ```

##### `uploadAi(file, documentType)`
- **HTTP Metod**: POST
- **Endpoint**: `/object/upload-ai`
- **Maqsad**: AI bilan hujjat qayta ishlash
- **So'rov Parametrlari**:
  - `file`: Hujjat fayli (File, majburiy)
  - `document_type`: Hujjat turi (string, majburiy)
- **Javob Tuzilishi**:
  ```json
  {
    "success": boolean,
    "data": {
      "extracted_data": object,
      "confidence": number,
      "file_url": string
    }
  }
  ```

## React Query Hook'lari

### Autentifikatsiya Hook'lari

#### `useLogin()`
**Joylashuvi**: `src/hooks/auth/useLogin.js`
**Maqsad**: Login mutatsiyasini boshqarish
**Foydalanish**:
```javascript
const loginMutation = useLogin();
loginMutation.mutate({ phone, otp });
```

#### `useSendOtp()`
**Joylashuvi**: `src/hooks/auth/useSendOtp.js`
**Maqsad**: OTP yuborish mutatsiyasi
**Foydalanish**:
```javascript
const sendOtpMutation = useSendOtp();
sendOtpMutation.mutate({ phone });
```

### Yuk Boshqaruvi Hook'lari

#### `useGetCargoList(params)`
**Joylashuvi**: `src/hooks/cargo/useGetCargoList.js`
**Maqsad**: Yuk ro'yxatini olish va keshlash
**Xususiyatlar**:
- Avtomatik qayta olish
- Sahifalash qo'llab-quvvatlash
- Real vaqtda yangilanish
**Foydalanish**:
```javascript
const { data, isLoading, error } = useGetCargoList({
  page: 1,
  limit: 20,
  status: 'active'
});
```

#### `useAddCargo()`
**Joylashuvi**: `src/hooks/cargo/useAddCargo.js`
**Maqsad**: Yangi yuk qo'shish mutatsiyasi
**Xususiyatlar**:
- Optimistik yangilanishlar
- Xato boshqaruvi
- Muvaffaqiyat bildirishnomalari
**Foydalanish**:
```javascript
const addCargoMutation = useAddCargo();
addCargoMutation.mutate(cargoData);
```

#### `useUpdateCargoStatus()`
**Joylashuvi**: `src/hooks/cargo/useUpdateCargoStatus.js`
**Maqsad**: Yuk holatini yangilash
**Foydalanish**:
```javascript
const updateStatusMutation = useUpdateCargoStatus();
updateStatusMutation.mutate({ cargo_guid, status });
```

### GPS Kuzatuv Hook'lari

#### `useGpsTracking(driverId)`
**Joylashuvi**: `src/hooks/gps/useGpsTracking.js`
**Maqsad**: Real vaqtda GPS ma'lumotlarini olish
**Xususiyatlar**:
- 30 soniya interval bilan yangilanish
- Avtomatik xato qayta urinish
- Fon sinxronizatsiyasi
**Foydalanish**:
```javascript
const { data: gpsData, isLoading } = useGpsTracking(driverId);
```

#### `useGpsHistory(params)`
**Joylashuvi**: `src/hooks/gps/useGpsHistory.js`
**Maqsad**: GPS tarixini olish
**Foydalanish**:
```javascript
const { data: history } = useGpsHistory({
  driver_id,
  date_from,
  date_to
});
```

### Haydovchi Boshqaruvi Hook'lari

#### `useGetDriverList(params)`
**Joylashuvi**: `src/hooks/driver/useGetDriverList.js`
**Maqsad**: Haydovchilar ro'yxatini olish
**Xususiyatlar**:
- Filtrlash qo'llab-quvvatlash
- Sahifalash
- Qidiruv funksionallik
**Foydalanish**:
```javascript
const { data: drivers } = useGetDriverList({
  status: 'active',
  vehicle_type: 'truck'
});
```

#### `useAssignDriver()`
**Joylashuvi**: `src/hooks/driver/useAssignDriver.js`
**Maqsad**: Haydovchini yukga tayinlash
**Foydalanish**:
```javascript
const assignMutation = useAssignDriver();
assignMutation.mutate({ cargo_guid, driver_id });
```

## Xato Boshqaruvi

### Global Xato Interceptor'lari

#### So'rov Interceptor'i
```javascript
request.interceptors.request.use(
  (config) => {
    // Token qo'shish
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

#### Javob Interceptor'i
```javascript
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token yangilash urinishi
      await refreshAuthToken();
      return request(error.config);
    }
    return Promise.reject(error);
  }
);
```

### Xato Turlari

#### Autentifikatsiya Xatolari
- `401 Unauthorized`: Token muddati tugagan yoki noto'g'ri
- `403 Forbidden`: Ruxsat etilmagan operatsiya
- `422 Validation Error`: Noto'g'ri kirish ma'lumotlari

#### Biznes Logika Xatolari
- `400 Bad Request`: Noto'g'ri so'rov parametrlari
- `404 Not Found`: Resurs topilmadi
- `409 Conflict`: Biznes qoidalar buzilishi

#### Tizim Xatolari
- `500 Internal Server Error`: Server ichki xatosi
- `503 Service Unavailable`: Xizmat vaqtinchalik mavjud emas
- `Network Error`: Tarmoq ulanish muammolari

## Ishlash Optimallashtirish

### Keshlash Strategiyalari

#### React Query Konfiguratsiyasi
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 daqiqa
      cacheTime: 10 * 60 * 1000, // 10 daqiqa
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});
```

#### Maxsus Keshlash Kalitlari
- `cargo-list-${userId}-${filters}`: Foydalanuvchiga xos yuk ro'yxati
- `gps-tracking-${driverId}`: Haydovchi GPS ma'lumotlari
- `driver-list-${region}-${status}`: Mintaqa bo'yicha haydovchilar

### So'rov Optimallashtirish

#### Batch So'rovlar
```javascript
const useBatchCargoData = (cargoIds) => {
  return useQuery(
    ['cargo-batch', cargoIds],
    () => Promise.all(cargoIds.map(id => getCargoDetails(id))),
    {
      enabled: cargoIds.length > 0,
      staleTime: 2 * 60 * 1000
    }
  );
};
```

#### Parallel So'rovlar
```javascript
const useCargoPageData = (cargoId) => {
  const cargoQuery = useQuery(['cargo', cargoId], () => getCargo(cargoId));
  const driversQuery = useQuery(['drivers', cargoId], () => getAvailableDrivers(cargoId));
  const historyQuery = useQuery(['cargo-history', cargoId], () => getCargoHistory(cargoId));
  
  return {
    cargo: cargoQuery.data,
    drivers: driversQuery.data,
    history: historyQuery.data,
    isLoading: cargoQuery.isLoading || driversQuery.isLoading || historyQuery.isLoading
  };
};
```

## Xavfsizlik Mulohazalari

### Token Boshqaruvi
- JWT tokenlar xavfsiz localStorage da saqlanadi
- Refresh tokenlar httpOnly cookie da
- Avtomatik token yangilash mexanizmi
- Token muddati tugashi boshqaruvi

### Ma'lumot Himoyasi
- Barcha API so'rovlar HTTPS orqali
- Sezgir ma'lumotlar shifrlash
- Kirish ma'lumotlari validatsiyasi
- XSS va CSRF himoyasi

### Rol Asosidagi Kirish
- API endpoint'larda rol tekshiruvi
- Frontend da rol asosidagi UI ko'rsatish
- Middleware orqali yo'l himoyasi
- Xavfsiz ma'lumot filtrlash

## Monitoring va Logging

### API So'rov Monitoring
```javascript
request.interceptors.request.use((config) => {
  console.log(`API So'rov: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

request.interceptors.response.use(
  (response) => {
    console.log(`API Javob: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`API Xato: ${error.response?.status} ${error.config?.url}`, error);
    return Promise.reject(error);
  }
);
```

### Sentry Integratsiyasi
- Avtomatik xato kuzatuvi
- Ishlash monitoring
- Foydalanuvchi sessiya qayd etish
- Custom xato konteksti

## Xulosa

Sarbon Logistics Platform kuchli va moslashuvchan API xizmat qatlamiga ega bo'lib, u:

1. **Keng qamrovli autentifikatsiya** - JWT, OTP, rol asosidagi kirish
2. **Logistika operatsiyalari** - yuk boshqaruvi, GPS kuzatuv, haydovchi tayinlash
3. **Real vaqtda ma'lumotlar** - GPS kuzatuv, holat yangilanishlari
4. **Fayl boshqaruvi** - AI bilan hujjat qayta ishlash
5. **Ishlash optimallashtirish** - keshlash, batch so'rovlar
6. **Xavfsizlik** - token boshqaruvi, ma'lumot himoyasi
7. **Monitoring** - xato kuzatuvi, ishlash tahlili

Bu arxitektura platformaning murakkab logistika talablarini qondirish uchun mustahkam asos yaratadi.
