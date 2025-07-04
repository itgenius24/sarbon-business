# Utility Function Reference

## Overview

The Sarbon Logistics Platform contains 30+ utility functions organized in the `src/utils/` directory, providing essential helper functionality for data formatting, validation, internationalization, and UI operations. This reference documents each utility function's purpose, parameters, return values, and usage patterns.

## Utility Categories

### Date and Time Utilities

#### `formatDate(date, dateFormat)`
**Location**: `src/utils/formatDate.js`
**Purpose**: Format dates with validation and error handling
**Parameters**:
- `date`: Date object or date string to format
- `dateFormat`: Format string (default: "dd.MM.yyyy")
**Returns**: Formatted date string or empty string if invalid
**Dependencies**: `date-fns` library
**Usage Example**:
```javascript
import { formatDate } from '@/utils/formatDate';
const formatted = formatDate(new Date(), 'dd/MM/yyyy'); // "18/06/2025"
```
**Status**: ✅ Active - Used across date inputs and displays

#### `formatDateTime(date)`
**Location**: `src/utils/formatDateTime.js`
**Purpose**: Format datetime with timezone adjustment and relative time display
**Parameters**:
- `date`: Date object or date string
**Returns**: Formatted datetime string with relative indicators
**Features**:
- Timezone adjustment (-5 hours)
- "Today", "Yesterday" relative formatting
- Time display for recent dates
**Usage**: Cargo timestamps, GPS tracking history

#### `addDaysToDate(date, days)`
**Location**: `src/utils/addDaysToDate.js`
**Purpose**: Add specified number of days to a date
**Parameters**:
- `date`: Base date
- `days`: Number of days to add
**Returns**: New date object
**Usage**: Deadline calculations, scheduling

#### `isValidDate(date)`
**Location**: `src/utils/isValidDate.js`
**Purpose**: Validate if a value is a valid date
**Parameters**:
- `date`: Value to validate
**Returns**: Boolean indicating validity
**Usage**: Form validation, data processing

### Number and Currency Formatting

#### `formatSum(amount, currency)`
**Location**: `src/utils/formatSum.js`
**Purpose**: Format monetary amounts with currency symbols
**Parameters**:
- `amount`: Numeric amount
- `currency`: Currency code (USD, UZS, etc.)
**Returns**: Formatted currency string
**Usage**: Price displays, financial calculations

#### `formatNumber(number, options)`
**Location**: `src/utils/formatNumber.js`
**Purpose**: Format numbers with locale-specific formatting
**Parameters**:
- `number`: Number to format
- `options`: Formatting options (decimals, separators)
**Returns**: Formatted number string
**Usage**: Statistics, measurements, quantities

#### `splitNumber(number)`
**Location**: `src/utils/splitNumber.js`
**Purpose**: Split numbers into readable segments
**Parameters**:
- `number`: Number to split
**Returns**: Array of number segments
**Usage**: Large number display, pagination

#### `allowOnlyNumbers(input)`
**Location**: `src/utils/allowOnlyNumbers.js`
**Purpose**: Filter input to allow only numeric characters
**Parameters**:
- `input`: Input string to filter
**Returns**: Numeric-only string
**Usage**: Phone number inputs, numeric form fields

### String and Text Processing

#### `normalizeName(name)`
**Location**: `src/utils/normalizeName.js`
**Purpose**: Normalize names for consistent display and storage
**Parameters**:
- `name`: Name string to normalize
**Returns**: Normalized name string
**Features**:
- Capitalization standardization
- Special character handling
- Whitespace normalization
**Usage**: User names, company names, address formatting

#### `convertLatinToCyril(text)`
**Location**: `src/utils/convertLatinToCyril.js`
**Purpose**: Convert Latin text to Cyrillic for Uzbek language support
**Parameters**:
- `text`: Latin text to convert
**Returns**: Cyrillic text string
**Usage**: Internationalization, text input conversion

#### `stringsToarray(strings)`
**Location**: `src/utils/stringsToarray.js`
**Purpose**: Convert string data to array format
**Parameters**:
- `strings`: String or comma-separated values
**Returns**: Array of string values
**Usage**: Data parsing, API response processing

#### `translateArray(array, locale)`
**Location**: `src/utils/translateArray.js`
**Purpose**: Translate array elements based on locale
**Parameters**:
- `array`: Array of translatable items
- `locale`: Target locale code
**Returns**: Translated array
**Usage**: Dropdown options, menu items

### Phone Number and Contact Utilities

#### `formatPhoneNumber(phone, format)`
**Location**: `src/utils/formatPhoneNumber.js`
**Purpose**: Format phone numbers for display and validation
**Parameters**:
- `phone`: Phone number string
- `format`: Formatting pattern
**Returns**: Formatted phone number
**Features**:
- International format support
- Uzbekistan-specific formatting
- Validation integration
**Usage**: Contact forms, user profiles, communication

### Validation and Data Processing

#### `isValidJSON(jsonString)`
**Location**: `src/utils/isValidJSON.js`
**Purpose**: Validate JSON string format
**Parameters**:
- `jsonString`: String to validate as JSON
**Returns**: Boolean indicating valid JSON
**Usage**: API response validation, data parsing

#### `extractUrlInfo(url)`
**Location**: `src/utils/extractUrlInfo.js`
**Purpose**: Extract information from URLs
**Parameters**:
- `url`: URL string to parse
**Returns**: Object with URL components
**Usage**: Link processing, navigation handling

#### `findChangedLogs(oldData, newData)`
**Location**: `src/utils/findChangedLogs.js`
**Purpose**: Compare data objects and identify changes
**Parameters**:
- `oldData`: Original data object
- `newData`: Updated data object
**Returns**: Array of change descriptions
**Usage**: Audit logging, change tracking

### UI and Visual Utilities

#### `rem(px)`
**Location**: `src/utils/common.js`
**Purpose**: Convert pixel values to rem units for responsive design
**Parameters**:
- `px`: Pixel value to convert
**Returns**: Rem value string (e.g., "1.000rem")
**Implementation**:
```javascript
const rootFontSize = 16;
export const rem = (px) => {
  return px ? `${(Math.abs(px) / rootFontSize).toFixed(3)}rem` : "0rem";
};
```
**Usage**: CSS-in-JS styling, responsive design

#### `getSVGIcon(tempValue, type)`
**Location**: `src/utils/getSVGIcon.js`
**Purpose**: Generate dynamic SVG icons with embedded text for map markers
**Parameters**:
- `tempValue`: Text to display in icon (default: "$2000")
- `type`: Icon type ("occupied_cargo" for blue, default green)
**Returns**: Data URL string for SVG icon
**Features**:
- Dynamic text embedding
- Color variants (blue/green)
- Map marker optimization
**Usage**: GPS tracking markers, cargo status indicators
**Technical Details**:
- Generates inline SVG with embedded text
- Returns base64 data URL for direct use
- Optimized for Yandex Maps integration

#### `isVisibleInViewport(element)`
**Location**: `src/utils/isVisibleInViewport.js`
**Purpose**: Check if DOM element is visible in viewport
**Parameters**:
- `element`: DOM element to check
**Returns**: Boolean indicating visibility
**Technical Debt**: 🚨 Contains debug `console.log` statement
**Usage**: Lazy loading, scroll-based animations

### Animation and UI Effects

#### `animation`
**Location**: `src/utils/animation.js`
**Purpose**: Animation utility functions and configurations
**Usage**: UI transitions, loading states

#### `animationSetting`
**Location**: `src/utils/animationSetting.js`
**Purpose**: Animation configuration and settings
**Usage**: Consistent animation timing across components

### Authentication and Security

#### `getToken()`
**Location**: `src/utils/getToken.js`
**Purpose**: Retrieve authentication token from storage
**Returns**: Authentication token string
**Usage**: API requests, authentication checks

#### `fribaseAuth`
**Location**: `src/utils/fribaseAuth.js`
**Purpose**: Firebase authentication utilities
**Usage**: Social login integration (Google, Apple)

### Data Constants and Configuration

#### `constants`
**Location**: `src/utils/constants.js`
**Purpose**: Application-wide constants and configuration values
**Usage**: API endpoints, default values, configuration

#### `country`
**Location**: `src/utils/country.js`
**Purpose**: Country data and utilities
**Usage**: Country selection, internationalization

#### `flegCountry`
**Location**: `src/utils/flegCountry.js`
**Purpose**: Country flag utilities and data
**Usage**: Country flag display, locale selection

### Role and User Management

#### `roleName(roleId)`
**Location**: `src/utils/roleName.js`
**Purpose**: Convert role IDs to human-readable role names
**Parameters**:
- `roleId`: UUID role identifier
**Returns**: Localized role name string
**Usage**: User interface, role display

#### `actionComment(action, user)`
**Location**: `src/utils/actionComment.js`
**Purpose**: Generate action comments for audit logs
**Parameters**:
- `action`: Action type
- `user`: User performing action
**Returns**: Formatted comment string
**Usage**: Activity logging, audit trails

### Server-Side Utilities

#### `isServer()`
**Location**: `src/utils/isServer.js`
**Purpose**: Detect server-side rendering environment
**Returns**: Boolean indicating server environment
**Usage**: SSR/CSR conditional logic

### Form Validation

#### `yupResolver`
**Location**: `src/utils/yupResolver.js`
**Purpose**: Custom Yup resolver for React Hook Form integration
**Usage**: Form validation, schema validation

## Custom Hooks

### Distance Calculation

#### `useGetDistance({ origin, destination, referencePoints })`
**Location**: `src/hooks/useGetDistance.js`
**Purpose**: Calculate distance and duration between points using Yandex Maps
**Parameters**:
- `origin`: Starting point coordinates
- `destination`: End point coordinates
- `referencePoints`: Array of coordinate pairs for multi-point routes
**Returns**: Object with distance (km) and duration
**Dependencies**: Yandex Maps API
**Technical Debt**: 🚨 Contains `console.error` for failed calculations
**Usage**: Route planning, delivery estimates

### Language and Localization

#### `useGetLang()`
**Location**: `src/hooks/useGetLang.js`
**Purpose**: Get current application language/locale
**Returns**: Current locale string
**Usage**: Internationalization, content localization

### Data Access Hooks

#### `useGetStoreData()`
**Location**: `src/hooks/useGetStoreData.js`
**Purpose**: Access MobX store data with React integration
**Returns**: Store data object
**Usage**: Global state access

#### `useGetUserInfo()`
**Location**: `src/hooks/useGetUserInfo.js`
**Purpose**: Get current user information
**Returns**: User data object
**Usage**: User profile, authentication state

#### `useDebounce(value, delay)`
**Location**: `src/hooks/useDebounce.js`
**Purpose**: Debounce value changes for performance optimization
**Parameters**:
- `value`: Value to debounce
- `delay`: Debounce delay in milliseconds
**Returns**: Debounced value
**Usage**: Search inputs, API call optimization

## Usage Patterns and Best Practices

### High-Usage Utilities (Critical)
1. **formatDate** - Used in 20+ components for date display
2. **formatPhoneNumber** - Used in all contact-related forms
3. **rem** - Used extensively in CSS-in-JS styling
4. **getSVGIcon** - Critical for GPS tracking map markers
5. **normalizeName** - Used in user and company name processing

### Medium-Usage Utilities (Important)
1. **formatSum** - Used in financial displays
2. **convertLatinToCyril** - Used in Uzbek language support
3. **isVisibleInViewport** - Used in scroll-based features
4. **roleName** - Used in user interface role displays

### Low-Usage Utilities (Specialized)
1. **findChangedLogs** - Audit logging specific
2. **extractUrlInfo** - URL processing specific
3. **translateArray** - Localization specific

## Technical Debt in Utilities

### 🔧 Improvement Opportunities

#### Date Utilities Consolidation
- **formatDate** and **formatDateTime** have overlapping functionality
- Consider unified date formatting utility with options
- Standardize timezone handling approach

#### Number Formatting Unification
- **formatSum**, **formatNumber**, **splitNumber** could be consolidated
- Implement locale-aware number formatting system
- Reduce duplication in currency handling

#### Validation Utilities
- **isValidDate** and **isValidJSON** could be part of larger validation utility
- Add TypeScript types for better validation
- Implement comprehensive validation library

#### String Processing Optimization
- **normalizeName** and **convertLatinToCyril** could be optimized
- Consider using established libraries for text processing
- Implement caching for expensive operations

## Performance Considerations

### Optimization Opportunities
1. **getSVGIcon**: Cache generated SVG strings to avoid regeneration
2. **useGetDistance**: Implement request debouncing for rapid coordinate changes
3. **convertLatinToCyril**: Cache conversion results for repeated text
4. **formatPhoneNumber**: Optimize regex patterns for better performance

### Memory Usage
- Most utilities are stateless and memory-efficient
- **getSVGIcon** generates large SVG strings - consider optimization
- **useGetDistance** creates Yandex Maps objects - ensure proper cleanup

## Testing Recommendations

### Critical Utilities Requiring Tests
1. **formatDate** - Date formatting edge cases
2. **formatPhoneNumber** - International number validation
3. **getSVGIcon** - SVG generation and encoding
4. **useGetDistance** - Distance calculation accuracy
5. **normalizeName** - Name processing edge cases

### Test Coverage Gaps
- No unit tests found for utility functions
- Missing integration tests for custom hooks
- No performance benchmarks for expensive operations

## Documentation Improvements

### Missing Documentation
- Function parameter types and validation
- Error handling and edge cases
- Performance characteristics
- Browser compatibility notes

### Usage Examples Needed
- Complex utility combinations
- Integration with React components
- Error handling patterns
- Performance optimization techniques

This utility function reference provides a comprehensive guide for developers working with the helper functions and custom hooks, enabling efficient development and maintenance of the logistics platform's utility layer.
