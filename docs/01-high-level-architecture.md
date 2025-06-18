# High-Level Architecture Document

## Overview

**Sarbon Logistics Platform** is a comprehensive freight exchange and logistics management system built with Next.js 14, serving as a digital marketplace connecting cargo owners, carriers, drivers, and dispatchers. The platform facilitates efficient freight transportation through real-time GPS tracking, automated cargo-to-driver matching, and role-based workflow management.

## Technology Stack

### Core Framework
- **Next.js 14** with App Router pattern
- **TypeScript/JavaScript** for type safety and development
- **React 18.2.0** for component architecture
- **Node.js ≥18.0.0** runtime requirement

### State Management & Data Fetching
- **MobX 6.12.0** for global state management with persistence
- **React Query 4** (@tanstack/react-query) for server state and caching
- **mobx-persist-store** for localStorage persistence
- **nookies** for cookie-based session management

### UI Framework & Styling
- **Chakra UI 2.8.0** as primary component library
- **Emotion** for CSS-in-JS styling
- **Framer Motion 12.4.2** for animations
- **Sass** for additional styling capabilities

### External Integrations
- **Yandex Maps** (@pbe/react-yandex-maps) for mapping and geocoding
- **Stream Chat** for real-time communication
- **Firebase 11.4.0** for social authentication (Google, Apple)
- **Sentry** for error monitoring and performance tracking

### Development Tools
- **ESLint** with Next.js configuration
- **Prettier** for code formatting
- **Husky** for git hooks and pre-commit validation

## Project Structure

```
src/
├── app/[locale]/                 # Next.js App Router with internationalization
│   ├── auth/                     # Authentication pages and components
│   ├── dashboard*/               # Role-specific dashboard pages
│   ├── gps-tracking*/           # GPS tracking interfaces by role
│   ├── my-*/                    # User resource management pages
│   └── globals.scss             # Global styles
├── modules/                     # Business logic modules (35+ modules)
│   ├── MyLoadsMain/             # Primary cargo order management
│   ├── CargoTest/               # Multi-step cargo creation
│   ├── GpsTracking*/           # GPS tracking by user role
│   ├── Dashboard*/             # Analytics and reporting
│   └── MyCarsDispatcher/       # Vehicle and driver management
├── components/                  # Reusable UI components (50+ components)
├── services/                    # API integration layer
│   ├── api/                     # Domain-specific services
│   ├── request/                 # HTTP client configuration
│   └── requestInvoke/          # Secondary HTTP client
├── store/                       # Global state management (MobX)
├── layouts/                     # Application layouts with navigation
├── hooks/                       # Custom React hooks
├── utils/                       # Helper functions and utilities
└── middleware.js               # Role-based route protection
```

## Architecture Patterns

### 1. Role-Based Access Control (RBAC)

The application implements comprehensive role-based access control through middleware.js with five distinct user roles:

- **Carrier** (`f81d3c3d-228d-479e-a2b1-9948c98640f2`)
- **Customer** (`48871d27-7361-4f69-8fe4-b54daf270739`)
- **Dispatcher** (`785678f2-fae7-4a00-8766-99ea67d3784f` + `first_dispatcher`)
- **DispatcherTop** (`785678f2-fae7-4a00-8766-99ea67d3784f` + `top_dispatcher`)
- **CEO** (`527d2017-2dc2-4449-9eeb-08fc1aafa469`)

Each role has specific page access permissions defined in middleware.js, with automatic redirects for unauthorized access attempts.

### 2. Modular Business Logic Architecture

The platform organizes business logic into 35+ specialized modules, each containing:
- Main component file
- Custom hooks for business logic (`useModuleNameProps.js`)
- Sub-components for specific functionality
- Data transformation utilities

### 3. Layered API Architecture

```
Frontend Components → Custom Hooks → API Services → HTTP Clients → Backend APIs
```

- **Custom Hooks**: React Query-based hooks for data fetching and mutations
- **API Services**: Domain-specific service layers (auth, functions, items, object)
- **HTTP Clients**: Two Axios instances with authentication interceptors
- **Backend Integration**: RESTful APIs with automatic token refresh

### 4. State Management Strategy

**Global State (MobX)**:
- `authStore`: User authentication and session management
- `formStore`: Form data persistence across navigation

**Server State (React Query)**:
- API data caching and synchronization
- Optimistic updates for user interactions
- Background refetching and error handling

**Local State (React)**:
- Component-specific UI state
- Form inputs and validation
- Temporary data transformations

## Data Flow Architecture

### 1. Authentication Flow

```
Login Page → Phone Verification → OTP Validation → Role Assignment → Dashboard Redirect
```

1. User enters phone number
2. SMS OTP sent via backend API
3. OTP verification with role determination
4. Session data stored in cookies and localStorage
5. Middleware redirects to role-appropriate dashboard

### 2. Cargo Management Flow

```
Cargo Creation → Driver Assignment → GPS Tracking → Status Updates → Completion
```

1. **Cargo Creation**: Multi-step form in CargoTest module
2. **Driver Search**: Real-time filtering and assignment
3. **GPS Tracking**: Live location updates with route visualization
4. **Status Management**: Workflow state transitions
5. **Completion**: Final delivery confirmation and analytics

### 3. GPS Tracking Data Flow

```
Driver Mobile App → Backend APIs → WebSocket/Polling → Frontend Updates → Map Visualization
```

1. Driver location transmitted from mobile app
2. Backend processes and stores GPS coordinates
3. Frontend polls for updates via API calls
4. Real-time map updates with route history
5. Status notifications to relevant stakeholders

## Key Architectural Components

### 1. Internationalization (i18n)

- **i18next** with browser language detection
- Locale-based routing (`/[locale]/`)
- Dynamic resource loading for performance
- Support for Russian and Uzbek languages

### 2. Real-time Communication

- **Stream Chat** integration for messaging
- Push notifications for cargo updates
- Audio alerts for critical events
- Role-based notification filtering

### 3. Map Integration

- **Yandex Maps** for primary mapping functionality
- Geocoding for address resolution
- Route calculation and optimization
- Real-time GPS tracking visualization
- Distance calculation utilities

### 4. Error Handling & Monitoring

- **Sentry** integration for error tracking
- Global error boundaries in layouts
- API error interceptors with retry logic
- Performance monitoring and analytics

## Security Architecture

### 1. Authentication & Authorization

- JWT-based authentication with refresh tokens
- Role-based page access control via middleware
- Secure cookie storage with httpOnly flags
- Session timeout and automatic refresh

### 2. API Security

- Request/response interceptors for token management
- Automatic token refresh on expiration
- CORS configuration for cross-origin requests
- Environment-based API endpoint configuration

### 3. Data Protection

- Sensitive data encryption in transit
- Secure storage of authentication tokens
- Input validation and sanitization
- XSS protection through React's built-in mechanisms

## Performance Optimizations

### 1. Code Splitting

- Next.js automatic code splitting by pages
- Dynamic imports for heavy components
- Lazy loading of non-critical modules
- Bundle size optimization

### 2. Data Fetching

- React Query caching strategies
- Background data synchronization
- Optimistic updates for better UX
- Pagination for large datasets

### 3. Asset Optimization

- Next.js Image component for optimization
- SVG icon system for scalability
- CSS-in-JS for component-scoped styles
- Production build optimizations

## Deployment Architecture

### Development Environment
- Local development server on port 8080
- Hot module replacement for rapid development
- ESLint and Prettier for code quality
- Git hooks for pre-commit validation

### Production Considerations
- Static generation where possible
- Server-side rendering for SEO
- CDN integration for asset delivery
- Environment-specific configuration

## Integration Points

### 1. Mobile Application
- Shared API endpoints with mobile app
- Consistent data models and validation
- Real-time synchronization of GPS data
- Push notification coordination

### 2. Backend Services
- RESTful API integration
- WebSocket connections for real-time features
- File upload and processing services
- AI-powered document processing

### 3. Third-party Services
- Payment processing integration
- SMS gateway for OTP delivery
- Email services for notifications
- Analytics and reporting tools

## Scalability Considerations

### 1. Frontend Scalability
- Component-based architecture for reusability
- Modular business logic organization
- Efficient state management patterns
- Performance monitoring and optimization

### 2. Data Management
- Efficient caching strategies
- Pagination for large datasets
- Background data synchronization
- Optimistic UI updates

### 3. User Experience
- Progressive loading strategies
- Offline capability considerations
- Mobile-responsive design
- Accessibility compliance

This architecture supports the complex logistics workflows while maintaining performance, security, and scalability for the growing user base across different roles and regions.
