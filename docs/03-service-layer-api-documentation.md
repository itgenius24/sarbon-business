# Service Layer API Documentation

## Overview

The Sarbon Logistics Platform implements a comprehensive service layer architecture with domain-specific API services, custom React Query hooks, and dual HTTP client configuration. The service layer handles authentication, logistics operations, data management, and real-time communication.

## Service Architecture

```
Frontend Components → Custom Hooks → API Services → HTTP Clients → Backend APIs
```

### HTTP Client Configuration

#### Primary HTTP Client (`request`)
**Location**: `src/services/request/`
**Purpose**: Main API communication for authenticated requests
**Features**:
- Automatic token injection
- Request/response interceptors
- Error handling and retry logic
- Base URL configuration

#### Secondary HTTP Client (`requestInvoke`)
**Location**: `src/services/requestInvoke/`
**Purpose**: Specialized client for logistics function calls
**Features**:
- Alternative authentication mechanism
- Logistics-specific request formatting
- Custom error handling

#### Authentication HTTP Client (`authRequest`)
**Location**: `src/services/authRequest/`
**Purpose**: Authentication-specific requests without token requirements
**Features**:
- Pre-authentication requests
- Registration and login flows
- OTP verification

## API Service Domains

### 1. Authentication Service

**Location**: `src/services/api/auth/auth.service.js`
**Purpose**: User authentication, registration, and session management

#### Service Methods

##### `oneLogin(data)`
- **HTTP Method**: POST
- **Endpoint**: `/v2/multi-company/one-login?project_id=${projectId}`
- **Purpose**: Multi-company login authentication
- **Request Body**:
  ```javascript
  {
    phone: string,
    password: string,
    company_id: string
  }
  ```
- **Response**: Authentication token and user data
- **Hook**: `useOneLoginMutation()`

##### `login(data)`
- **HTTP Method**: POST
- **Endpoint**: `/v2/login?project_id=${projectId}`
- **Purpose**: Standard user login
- **Request Body**:
  ```javascript
  {
    phone: string,
    password: string
  }
  ```
- **Response**: JWT tokens and user profile
- **Hook**: `useLoginMutation()`

##### `phone(data)`
- **HTTP Method**: POST
- **Endpoint**: `/v2/auth/send-code?project_id=${projectId}`
- **Purpose**: Send OTP code to phone number
- **Request Body**:
  ```javascript
  {
    phone: string,
    type: "login" | "register"
  }
  ```
- **Response**: SMS ID for OTP verification
- **Hook**: `usePhoneMutation()`

##### `otp(data)`
- **HTTP Method**: POST
- **Endpoint**: `/v2/login/with-option?project-id=${projectId}`
- **Purpose**: Verify OTP code and complete authentication
- **Request Body**:
  ```javascript
  {
    phone: string,
    code: string,
    sms_id: string
  }
  ```
- **Response**: Authentication tokens and user data
- **Hook**: `useOtpMutation()`

##### `register(data)`
- **HTTP Method**: POST
- **Endpoint**: `/v2/register?project-id=${projectId}`
- **Purpose**: User registration
- **Request Body**:
  ```javascript
  {
    phone: string,
    full_name: string,
    role_id: string,
    password: string
  }
  ```
- **Response**: Registration confirmation
- **Hook**: `useRegisterMutation()`

##### `registerUser(data)`
- **HTTP Method**: POST
- **Endpoint**: `/v2/items/users`
- **Purpose**: Create user profile after registration
- **Request Body**: User profile data
- **Response**: Created user object
- **Hook**: `useRegisterUserMutation()`

##### `registerFirm(data)`
- **HTTP Method**: POST
- **Endpoint**: `/v2/items/firm`
- **Purpose**: Register company/firm information
- **Request Body**: Company registration data
- **Response**: Created firm object
- **Hook**: `useRegisterFirmMutation()`

##### `registerFirmEdit(data)`
- **HTTP Method**: PUT
- **Endpoint**: `/v2/items/firm`
- **Purpose**: Update company/firm information
- **Request Body**: Updated company data
- **Response**: Updated firm object
- **Hook**: `useRegisterFirEditmMutation()`

##### `getUserGpsBYData(params)`
- **HTTP Method**: GET
- **Endpoint**: `/v2/object-slim/get-list/users`
- **Purpose**: Get user GPS data for tracking
- **Query Parameters**: User filtering parameters
- **Response**: User location data array
- **Hook**: `useGetUseMutation()`

### 2. Functions Service (Logistics Operations)

**Location**: `src/services/api/functions/functions.service.js`
**Purpose**: Core logistics operations, GPS tracking, and cargo management

#### Cargo Management

##### `getCargoPost(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-get-cargo-with-filter`
- **Purpose**: Get filtered cargo listings
- **Request Body**:
  ```javascript
  {
    filters: {
      status: string,
      date_from: string,
      date_to: string,
      location: object
    },
    pagination: {
      page: number,
      limit: number
    }
  }
  ```
- **Response**: Paginated cargo listings
- **Hooks**: `useGetCargoMap()`, `useGetCargoPost()`

##### `getCar(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-get-cargo-list`
- **Purpose**: Get cargo list for specific criteria
- **Request Body**: Cargo filtering parameters
- **Response**: Cargo data array
- **Hooks**: `useGetCarData()`, `useGetCar()`

#### GPS Tracking

##### `getLogistikaGpsTrackingFilterDriver(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-gps-tracking-filter-driver`
- **Purpose**: Filter drivers based on GPS location and criteria
- **Request Body**:
  ```javascript
  {
    location: {
      latitude: number,
      longitude: number,
      radius: number
    },
    filters: {
      vehicle_type: string,
      status: string
    }
  }
  ```
- **Response**: Filtered driver list with GPS data
- **Hook**: `useLogistikaGpsTrackingFilterDriver()`

##### `getSortedGPSHistory(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-get-list-sorted-gps-history`
- **Purpose**: Get sorted GPS history for route analysis
- **Request Body**:
  ```javascript
  {
    driver_id: string,
    date_from: string,
    date_to: string,
    cargo_guid: string
  }
  ```
- **Response**: Sorted GPS coordinate history
- **Hook**: `useGetSortedGPSHistory()`

##### `getWidtLocation(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-get-users-with-location`
- **Purpose**: Get users with current location data
- **Request Body**: Location query parameters
- **Response**: Users with GPS coordinates
- **Hook**: `useGetWithLocation()`

##### `getLocation(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-get-cargo-for-map`
- **Purpose**: Get cargo data for map visualization
- **Request Body**: Map bounds and filters
- **Response**: Cargo locations for map display
- **Hook**: `useLocation()`

#### Notifications and Communication

##### `pushNotification(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-notification`
- **Purpose**: Send push notifications to users
- **Request Body**:
  ```javascript
  {
    user_id: string,
    message: string,
    type: "cargo_update" | "driver_assignment" | "system",
    data: object
  }
  ```
- **Response**: Notification delivery status
- **Hook**: `usePushNotificationMutation()`

##### `sendNotification(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-send-notification-new-cargo`
- **Purpose**: Send notifications for new cargo postings
- **Request Body**: Cargo notification data
- **Response**: Notification status
- **Hook**: `useSendNotification()`

##### `getNotification(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-notification`
- **Purpose**: Retrieve user notifications
- **Request Body**: User ID and pagination
- **Response**: Notification list
- **Hooks**: `useGetNotification()`, `useGetNotificationFirst()`

#### Cargo Operations

##### `offerFromCustomer(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-send-offer-from-customer`
- **Purpose**: Send cargo offer from customer to driver
- **Request Body**:
  ```javascript
  {
    cargo_id: string,
    driver_id: string,
    offer_price: number,
    message: string
  }
  ```
- **Response**: Offer creation status
- **Hook**: `useOfferFromCustomerMutation()`

##### `getNewPred(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-favourite-cargo`
- **Purpose**: Manage favorite/preferred cargo listings
- **Request Body**: Cargo preference data
- **Response**: Updated preferences
- **Hooks**: `useGetNewPredData()`, `useGetNewPredData2()`, `useGetNewPred()`

#### Address Management

##### `getLoadings(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-send-list-of-address-name`
- **Purpose**: Get address suggestions and geocoding
- **Request Body**:
  ```javascript
  {
    query: string,
    location: {
      latitude: number,
      longitude: number
    }
  }
  ```
- **Response**: Address suggestions array
- **Hook**: `useGetLoadingMutation()`

##### `createAddress(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-create-addres`
- **Purpose**: Create new address entry
- **Request Body**: Address data with coordinates
- **Response**: Created address object
- **Hooks**: `useGetCreateAddress()`, `useCreateAddressMutation()`

#### Vehicle and Driver Management

##### `getCarDispatcher(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-send-notification-new-cargo`
- **Purpose**: Get dispatcher-specific car data
- **Request Body**: Dispatcher filtering parameters
- **Response**: Car and driver data
- **Hooks**: `useGetCarDispatcherPost()`, `useGetCarDispatcher()`

##### `getCarRefueling(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-send-offer-notification`
- **Purpose**: Handle car refueling operations
- **Request Body**: Refueling data
- **Response**: Refueling status
- **Hook**: `useGetCarRefueling()`

##### `getCarTrackingFilter(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-gps-tracking-create-history`
- **Purpose**: Create GPS tracking history entries
- **Request Body**: GPS tracking data
- **Response**: Tracking history creation status
- **Hook**: `useGetCarTrackingFilter()`

#### External Integrations

##### `googleRigister(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-get-current-location`
- **Purpose**: Google integration for location services
- **Request Body**: Google authentication data
- **Response**: Location data
- **Hook**: `useGoogleRigister()`

##### `getExcelFile(data)`
- **HTTP Method**: POST
- **Endpoint**: `logistika-get-list-sorted-gps-history`
- **Purpose**: Export GPS history to Excel format
- **Request Body**: Export parameters
- **Response**: Excel file data
- **Hook**: `useGetExcelPost()`

### 3. Items Service

**Location**: `src/services/api/items/`
**Purpose**: CRUD operations for business entities (users, cargo, vehicles)

### 4. Object Service

**Location**: `src/services/api/object/`
**Purpose**: Object management and metadata operations

## Authentication Mechanisms

### Token Management

#### JWT Token Structure
```javascript
{
  access_token: string,    // Short-lived access token
  refresh_token: string,   // Long-lived refresh token
  expires_in: number,      // Token expiration time
  token_type: "Bearer"     // Token type
}
```

#### Token Refresh Flow
1. Access token expires during API request
2. Interceptor catches 401 response
3. Automatic refresh using refresh_token
4. Retry original request with new token
5. Update stored tokens in cookies and localStorage

#### Session Management
- **Storage**: Cookies with 30-day expiration
- **Persistence**: localStorage for offline capability
- **Security**: httpOnly cookies for sensitive data
- **Cleanup**: Automatic cleanup on logout

### Role-Based API Access

Different API endpoints are accessible based on user roles:

- **Carrier**: Cargo search, GPS tracking, vehicle management
- **Customer**: Cargo posting, driver selection, tracking
- **Dispatcher**: Driver assignment, route optimization, analytics
- **DispatcherTop**: Advanced analytics, user management
- **CEO**: Full system access, reporting, administration

## Error Handling

### HTTP Status Codes

- **200**: Success
- **400**: Bad Request - Invalid parameters
- **401**: Unauthorized - Token expired or invalid
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource doesn't exist
- **422**: Validation Error - Invalid data format
- **500**: Internal Server Error

### Error Response Format
```javascript
{
  error: {
    code: string,
    message: string,
    details: object
  },
  timestamp: string,
  path: string
}
```

### Retry Logic
- Automatic retry for network failures
- Exponential backoff for rate limiting
- Maximum 3 retry attempts
- Circuit breaker for persistent failures

## Performance Optimizations

### Caching Strategy
- **React Query**: Automatic caching with stale-while-revalidate
- **Cache Keys**: Hierarchical cache invalidation
- **Background Refetch**: Automatic data synchronization
- **Optimistic Updates**: Immediate UI updates with rollback

### Request Optimization
- **Debouncing**: Search and filter requests
- **Pagination**: Large dataset handling
- **Compression**: Gzip compression for large responses
- **Parallel Requests**: Concurrent API calls where possible

## API Integration Examples

### Cargo Search with GPS Filtering
```javascript
const { data, isLoading } = useLogistikaGpsTrackingFilterDriver({
  location: {
    latitude: 41.2995,
    longitude: 69.2401,
    radius: 50
  },
  filters: {
    vehicle_type: "truck",
    status: "available"
  }
});
```

### Real-time Notification Handling
```javascript
const { mutate: sendNotification } = usePushNotificationMutation({
  onSuccess: (data) => {
    // Handle successful notification
    queryClient.invalidateQueries(['notifications']);
  },
  onError: (error) => {
    // Handle notification failure
    console.error('Notification failed:', error);
  }
});
```

### GPS History Export
```javascript
const { mutate: exportGPS } = useGetExcelPost({
  onSuccess: (data) => {
    // Download Excel file
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gps-history.xlsx';
    link.click();
  }
});
```

## Security Considerations

### Data Protection
- **Encryption**: HTTPS for all API communications
- **Validation**: Server-side input validation
- **Sanitization**: XSS protection for user inputs
- **Rate Limiting**: API abuse prevention

### Authentication Security
- **Token Rotation**: Regular token refresh
- **Secure Storage**: httpOnly cookies for sensitive data
- **Session Timeout**: Automatic logout after inactivity
- **CSRF Protection**: Cross-site request forgery prevention

## Monitoring and Logging

### API Monitoring
- **Response Times**: Performance tracking
- **Error Rates**: Failure monitoring
- **Usage Analytics**: API endpoint usage statistics
- **Health Checks**: Service availability monitoring

### Error Logging
- **Sentry Integration**: Automatic error reporting
- **Request Logging**: API request/response logging
- **Performance Metrics**: Response time tracking
- **User Context**: Error context with user information

This service layer documentation provides a comprehensive guide for developers working with the API integration, enabling efficient development and maintenance of the logistics platform's backend communication.
