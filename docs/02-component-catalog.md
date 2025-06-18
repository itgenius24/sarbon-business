# Component Catalog

## Overview

The Sarbon Logistics Platform contains 50+ reusable UI components organized in the `src/components/` directory. This catalog documents each component's purpose, props, usage patterns, and identifies potential optimization opportunities.

## Component Organization

### Core UI Components

#### BreadCrumb
**Purpose**: Navigation breadcrumb trail for page hierarchy
**Location**: `src/components/BreadCrumb/`
**Usage**: Page navigation and user orientation
**Props**: 
- `items`: Array of breadcrumb items with labels and links
- `separator`: Custom separator between items
**Status**: ✅ Active - Used across multiple pages

#### Container
**Purpose**: Main content wrapper with consistent spacing and layout
**Location**: `src/components/Container/`
**Usage**: Page layout standardization
**Props**:
- `children`: React children elements
- `maxWidth`: Container maximum width
- `padding`: Custom padding values
**Status**: ✅ Active - Core layout component

#### ContainerAnalitik
**Purpose**: Specialized container for analytics and dashboard content
**Location**: `src/components/ContainerAnalitik/`
**Usage**: Dashboard and analytics pages
**Props**: Similar to Container with analytics-specific styling
**Status**: ✅ Active - Dashboard-specific usage
**Note**: 🔍 Potential duplication with Container component

#### ContainerNav
**Purpose**: Navigation container with responsive behavior
**Location**: `src/components/ContainerNav/`
**Usage**: Navigation layout wrapper
**Props**: Navigation-specific layout properties
**Status**: ✅ Active - Navigation layouts
**Note**: 🔍 Consider consolidation with main Container

### Form Components

#### Input
**Purpose**: Standard text input with validation and styling
**Location**: `src/components/Input/`
**Usage**: Form inputs across the application
**Props**:
- `value`: Input value
- `onChange`: Change handler
- `placeholder`: Placeholder text
- `error`: Error message display
- `disabled`: Disabled state
**Status**: ✅ Active - Heavily used
**Variants**: Multiple input types and validation states

#### CustomTextarea
**Purpose**: Multi-line text input with custom styling
**Location**: `src/components/CustomTextarea/`
**Usage**: Comments, descriptions, and long text inputs
**Props**:
- `value`: Textarea value
- `onChange`: Change handler
- `rows`: Number of rows
- `placeholder`: Placeholder text
**Status**: ✅ Active - Form components

#### DatePicker
**Purpose**: Date selection component with calendar interface
**Location**: `src/components/DatePicker/`
**Usage**: Date inputs for cargo scheduling and filtering
**Props**:
- `selected`: Selected date
- `onChange`: Date change handler
- `minDate`: Minimum selectable date
- `maxDate`: Maximum selectable date
**Status**: ✅ Active - Scheduling features

#### DatePickerStep
**Purpose**: Multi-step date picker for complex date selection
**Location**: `src/components/DatePickerStep/`
**Usage**: Advanced date selection workflows
**Props**: Extended DatePicker props with step functionality
**Status**: ✅ Active - Complex forms
**Note**: 🔍 Potential consolidation with DatePicker

#### TextField
**Purpose**: Enhanced text field with additional features
**Location**: `src/components/TextField/`
**Usage**: Advanced text inputs with validation
**Props**: Extended Input props with additional features
**Status**: ✅ Active - Form components
**Note**: 🔍 Overlap with Input component - consider consolidation

#### TextFieldWithAddition
**Purpose**: Text field with additional UI elements (buttons, icons)
**Location**: `src/components/TextFieldWithAddition/`
**Usage**: Complex input scenarios with additional actions
**Props**: TextField props plus additional element configuration
**Status**: ✅ Active - Specialized forms
**Note**: 🔍 Consider making this a variant of TextField

### Selection Components

#### Dropdown
**Purpose**: Standard dropdown selection component
**Location**: `src/components/Dropdown/`
**Usage**: Single selection from predefined options
**Props**:
- `options`: Array of selectable options
- `value`: Selected value
- `onChange`: Selection change handler
- `placeholder`: Placeholder text
**Status**: ✅ Active - Form selections

#### DropdownWrapper
**Purpose**: Enhanced dropdown with additional wrapper functionality
**Location**: `src/components/DropdownWrapper/`
**Usage**: Complex dropdown scenarios
**Props**: Extended Dropdown props with wrapper features
**Status**: ✅ Active - Advanced selections
**Note**: 🔍 Potential duplication with Dropdown

#### DropdownWrapperCar
**Purpose**: Car-specific dropdown with vehicle data formatting
**Location**: `src/components/DropdownWrapperCar/`
**Usage**: Vehicle selection in cargo and GPS modules
**Props**: Vehicle-specific data structure and formatting
**Status**: ✅ Active - Vehicle management
**Note**: 🔍 Consider making this a variant of DropdownWrapper

#### ChakraSelect
**Purpose**: Chakra UI-based select component with custom styling
**Location**: `src/components/ChakraSelect/`
**Usage**: Styled select inputs throughout the application
**Props**: Chakra Select props with custom theming
**Status**: ✅ Active - UI consistency
**Note**: 🔍 Multiple select components - consolidation opportunity

#### Checkbox
**Purpose**: Standard checkbox input with custom styling
**Location**: `src/components/Checkbox/`
**Usage**: Boolean selections and multi-select scenarios
**Props**:
- `checked`: Checkbox state
- `onChange`: Change handler
- `label`: Checkbox label
- `disabled`: Disabled state
**Status**: ✅ Active - Form inputs

#### CheckboxModalPred
**Purpose**: Checkbox component specifically for modal predictions/offers
**Location**: `src/components/CheckboxModalPred/`
**Usage**: Modal-based selection scenarios
**Props**: Checkbox props with modal-specific behavior
**Status**: ✅ Active - Modal interactions
**Note**: 🔍 Very specific use case - consider generalization

### Data Display Components

#### SarbonTable
**Purpose**: Primary data table component with sorting, filtering, and pagination
**Location**: `src/components/SarbonTable/`
**Usage**: Data display across cargo, driver, and analytics modules
**Props**:
- `columns`: Table column configuration
- `data`: Table data array
- `loading`: Loading state
- `pagination`: Pagination configuration
- `onSort`: Sort handler
**Status**: ✅ Active - Critical component
**Usage Examples**:
- Cargo listings in MyLoadsMain
- Driver lists in GPS tracking
- Analytics data in dashboards

#### CTable
**Purpose**: Alternative table component with different styling
**Location**: `src/components/CTable/`
**Usage**: Specific table scenarios requiring different styling
**Props**: Similar to SarbonTable with different styling options
**Status**: ✅ Active - Specialized tables
**Note**: 🔍 Two table components - consolidation opportunity

#### DataList
**Purpose**: List component for displaying structured data
**Location**: `src/components/DataList/`
**Usage**: Alternative to table for simpler data display
**Props**:
- `items`: Array of data items
- `renderItem`: Item rendering function
- `loading`: Loading state
**Status**: ✅ Active - Data display

#### Pagination
**Purpose**: Pagination controls for data tables and lists
**Location**: `src/components/Pagination/`
**Usage**: Navigation through large datasets
**Props**:
- `current`: Current page number
- `total`: Total number of items
- `pageSize`: Items per page
- `onChange`: Page change handler
**Status**: ✅ Active - Data navigation

### UI Feedback Components

#### LoadBtn
**Purpose**: Button component with loading state indication
**Location**: `src/components/LoadBtn/`
**Usage**: Form submissions and async actions
**Props**:
- `loading`: Loading state
- `children`: Button content
- `onClick`: Click handler
- `disabled`: Disabled state
**Status**: ✅ Active - User interactions

#### Loaders
**Purpose**: Collection of loading indicator components
**Location**: `src/components/Loaders/`
**Usage**: Loading states throughout the application
**Variants**: Multiple loader types and sizes
**Status**: ✅ Active - Loading states

#### LoadingSpinner
**Purpose**: Standard loading spinner component
**Location**: `src/components/LoadingSpinner/`
**Usage**: General loading indication
**Props**: Size and color customization
**Status**: ✅ Active - Loading states
**Note**: 🔍 Overlap with Loaders - consolidation opportunity

#### LoadingSpinnerMap
**Purpose**: Map-specific loading spinner with positioning
**Location**: `src/components/LoadingSpinnerMap/`
**Usage**: Map loading states in GPS tracking
**Props**: Map-specific positioning and styling
**Status**: ✅ Active - Map components
**Note**: 🔍 Very specific use case - consider generalization

#### Skeleton
**Purpose**: Skeleton loading placeholders for content
**Location**: `src/components/Skeleton/`
**Usage**: Content loading placeholders
**Props**: Shape and size configuration
**Status**: ✅ Active - Loading UX

### Modal and Popup Components

#### Modal
**Purpose**: Standard modal dialog component
**Location**: `src/components/Modal/`
**Usage**: Dialog interactions throughout the application
**Props**:
- `isOpen`: Modal visibility state
- `onClose`: Close handler
- `title`: Modal title
- `children`: Modal content
**Status**: ✅ Active - Dialog interactions

#### ModalMap
**Purpose**: Map-specific modal with map integration
**Location**: `src/components/ModalMap/`
**Usage**: Map selection and viewing in modals
**Props**: Modal props plus map configuration
**Status**: ✅ Active - Map interactions
**Note**: 🔍 Consider making this a variant of Modal

#### Popup
**Purpose**: Lightweight popup component for tooltips and notifications
**Location**: `src/components/Popup/`
**Usage**: Quick information display and notifications
**Props**: Position and content configuration
**Status**: ✅ Active - Information display

#### TooltipComponents
**Purpose**: Tooltip components for additional information
**Location**: `src/components/TooltipComponents/`
**Usage**: Contextual help and information
**Props**: Tooltip content and positioning
**Status**: ✅ Active - User guidance

### File Upload Components

#### FileUpload
**Purpose**: Standard file upload component
**Location**: `src/components/FileUpload/`
**Usage**: Document and image uploads
**Props**:
- `accept`: Accepted file types
- `multiple`: Multiple file selection
- `onUpload`: Upload handler
- `maxSize`: Maximum file size
**Status**: ✅ Active - File management

#### FileUploaderComponent
**Purpose**: Enhanced file uploader with progress and validation
**Location**: `src/components/FileUploaderComponent/`
**Usage**: Advanced file upload scenarios
**Props**: Extended FileUpload props with additional features
**Status**: ✅ Active - Document processing
**Note**: 🔍 Overlap with FileUpload - consolidation opportunity

#### UploadImg
**Purpose**: Image-specific upload component
**Location**: `src/components/UploadImg/`
**Usage**: Image uploads with preview
**Props**: Image-specific upload configuration
**Status**: ✅ Active - Image management

#### UploadImgMobile
**Purpose**: Mobile-optimized image upload component
**Location**: `src/components/UploadImgMobile/`
**Usage**: Mobile image uploads
**Props**: Mobile-specific upload behavior
**Status**: ✅ Active - Mobile experience
**Note**: 🔍 Device-specific component - consider responsive approach

#### UploadImgRigister
**Purpose**: Registration-specific image upload component
**Location**: `src/components/UploadImgRigister/`
**Usage**: User registration image uploads
**Props**: Registration-specific upload requirements
**Status**: ✅ Active - Registration flow
**Note**: 🔍 Very specific use case - consider generalization

### Navigation and Layout Components

#### Header
**Purpose**: Main application header with navigation and user controls
**Location**: `src/components/Header/`
**Usage**: Primary navigation across all pages
**Props**: User data and navigation configuration
**Status**: ✅ Active - Core navigation

#### Footer
**Purpose**: Application footer with links and information
**Location**: `src/components/Footer/`
**Usage**: Page footer across the application
**Props**: Footer content and link configuration
**Status**: ✅ Active - Page layout

#### Logo
**Purpose**: Main application logo component
**Location**: `src/components/Logo/`
**Usage**: Branding across the application
**Props**: Size and variant configuration
**Status**: ✅ Active - Branding

#### LogoMini
**Purpose**: Compact logo variant for small spaces
**Location**: `src/components/LogoMini/`
**Usage**: Compact navigation and mobile views
**Props**: Mini logo configuration
**Status**: ✅ Active - Responsive design
**Note**: 🔍 Consider making this a variant of Logo

#### LocaleDropdown
**Purpose**: Language selection dropdown
**Location**: `src/components/LocaleDropdown/`
**Usage**: Internationalization language switching
**Props**: Available locales and selection handler
**Status**: ✅ Active - Internationalization

### Utility Components

#### DeleteButton
**Purpose**: Standardized delete action button with confirmation
**Location**: `src/components/DeleteButton/`
**Usage**: Delete operations across the application
**Props**: Delete handler and confirmation configuration
**Status**: ✅ Active - Data management

#### Rating
**Purpose**: Star rating component for feedback and reviews
**Location**: `src/components/Rating/`
**Usage**: Driver and service ratings
**Props**: Rating value and interaction configuration
**Status**: ✅ Active - Feedback system

#### TopFilter
**Purpose**: Top-level filter component for data views
**Location**: `src/components/TopFilter/`
**Usage**: Data filtering across modules
**Props**: Filter configuration and handlers
**Status**: ✅ Active - Data filtering

#### MainContentCard
**Purpose**: Card component for main content areas
**Location**: `src/components/MainContentCard/`
**Usage**: Content organization and layout
**Props**: Card styling and content configuration
**Status**: ✅ Active - Content layout

#### ChatPopover
**Purpose**: Chat interface popover component
**Location**: `src/components/ChatPopover/`
**Usage**: Real-time chat integration
**Props**: Chat configuration and Stream Chat integration
**Status**: ✅ Active - Communication

## Component Usage Analysis

### High-Usage Components (Critical)
1. **SarbonTable** - Used in 15+ modules for data display
2. **Input** - Used in 20+ forms across the application
3. **Modal** - Used in 10+ modules for dialog interactions
4. **LoadBtn** - Used in all form submissions
5. **Header** - Core navigation component

### Medium-Usage Components (Important)
1. **Dropdown** variants - Used in filtering and selection
2. **DatePicker** - Used in scheduling and filtering
3. **FileUpload** variants - Used in document management
4. **Container** variants - Used in layout organization

### Low-Usage Components (Specialized)
1. **CheckboxModalPred** - Very specific modal use case
2. **UploadImgRigister** - Registration-specific upload
3. **LoadingSpinnerMap** - Map-specific loading
4. **DropdownWrapperCar** - Vehicle-specific dropdown

## Potential Unused Components

Based on static analysis, the following components may have limited usage:

⚠️ **Requires Investigation**:
- **ContainerAnalitik** - May be dashboard-specific with limited reuse
- **DatePickerStep** - Complex date picker with potential limited usage
- **TextFieldWithAddition** - Specialized text field variant
- **ModalMap** - Map-specific modal with limited use cases

## Component Duplication Issues

### 🔍 Consolidation Opportunities

1. **Container Components**:
   - `Container`, `ContainerAnalitik`, `ContainerNav`
   - **Recommendation**: Create single Container with variant props

2. **Input Components**:
   - `Input`, `TextField`, `TextFieldWithAddition`
   - **Recommendation**: Unified Input component with composition pattern

3. **Dropdown Components**:
   - `Dropdown`, `DropdownWrapper`, `DropdownWrapperCar`, `ChakraSelect`
   - **Recommendation**: Single Select component with customizable renderers

4. **Upload Components**:
   - `FileUpload`, `FileUploaderComponent`, `UploadImg`, `UploadImgMobile`, `UploadImgRigister`
   - **Recommendation**: Unified Upload component with type-specific variants

5. **Loading Components**:
   - `Loaders`, `LoadingSpinner`, `LoadingSpinnerMap`, `Skeleton`
   - **Recommendation**: Unified Loading system with different variants

6. **Table Components**:
   - `SarbonTable`, `CTable`
   - **Recommendation**: Single Table component with theme variants

7. **Logo Components**:
   - `Logo`, `LogoMini`
   - **Recommendation**: Single Logo component with size variants

## Component Quality Assessment

### ✅ Well-Designed Components
- **SarbonTable**: Comprehensive table with sorting, filtering, pagination
- **Modal**: Clean API with proper accessibility
- **Input**: Good validation and error handling
- **Header**: Proper role-based navigation

### 🔧 Components Needing Improvement
- **Multiple Container variants**: Inconsistent API and duplication
- **Upload components**: Too many specialized variants
- **Dropdown components**: Inconsistent behavior across variants
- **Loading components**: Scattered loading patterns

### 🚨 Components with Technical Debt
- **CheckboxModalPred**: Very specific use case, hard to maintain
- **UploadImgRigister**: Registration-specific logic should be externalized
- **LoadingSpinnerMap**: Map-specific positioning should be configurable

## Recommendations for Component Architecture

### 1. Component Consolidation
- Reduce 50+ components to ~30 by consolidating similar functionality
- Create variant-based components instead of separate components
- Implement composition patterns for complex components

### 2. Design System Implementation
- Establish consistent prop naming conventions
- Implement theme-based styling system
- Create component documentation with Storybook

### 3. Performance Optimization
- Implement React.memo for expensive components
- Add prop validation with TypeScript or PropTypes
- Optimize re-renders in table and list components

### 4. Accessibility Improvements
- Add ARIA labels and roles to interactive components
- Implement keyboard navigation for complex components
- Ensure color contrast and screen reader compatibility

### 5. Testing Strategy
- Add unit tests for critical components (SarbonTable, Modal, Input)
- Implement visual regression testing
- Create integration tests for complex component interactions

This component catalog provides a foundation for improving the component architecture and reducing technical debt while maintaining the rich functionality required by the logistics platform.
