/**
 * Accessibility utilities for consistent a11y implementation
 * Provides helper functions and constants for better accessibility
 */

/**
 * ARIA roles commonly used in the application
 */
export const ARIA_ROLES = {
  BUTTON: 'button',
  LINK: 'link',
  TAB: 'tab',
  TABPANEL: 'tabpanel',
  TABLIST: 'tablist',
  DIALOG: 'dialog',
  ALERT: 'alert',
  STATUS: 'status',
  BANNER: 'banner',
  NAVIGATION: 'navigation',
  MAIN: 'main',
  COMPLEMENTARY: 'complementary',
  CONTENTINFO: 'contentinfo',
  SEARCH: 'search',
  FORM: 'form',
  LIST: 'list',
  LISTITEM: 'listitem',
  GRID: 'grid',
  GRIDCELL: 'gridcell',
  ROW: 'row',
  COLUMNHEADER: 'columnheader',
  ROWHEADER: 'rowheader',
  IMG: 'img',
  PROGRESSBAR: 'progressbar',
  SLIDER: 'slider',
  SPINBUTTON: 'spinbutton',
  TEXTBOX: 'textbox',
  COMBOBOX: 'combobox',
  LISTBOX: 'listbox',
  OPTION: 'option',
  MENU: 'menu',
  MENUITEM: 'menuitem',
  MENUBAR: 'menubar',
  TOOLTIP: 'tooltip',
};

/**
 * Common keyboard keys for navigation
 */
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
};

/**
 * Generate unique ID for accessibility attributes
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export const generateA11yId = (prefix = 'a11y') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create keyboard event handler for clickable elements
 * @param {Function} onClick - Click handler function
 * @param {Array} keys - Array of keys that should trigger the action (default: Enter and Space)
 * @returns {Function} Keyboard event handler
 */
export const createKeyboardHandler = (onClick, keys = [KEYBOARD_KEYS.ENTER, KEYBOARD_KEYS.SPACE]) => {
  return (event) => {
    if (keys.includes(event.key)) {
      event.preventDefault();
      onClick(event);
    }
  };
};

/**
 * Get ARIA attributes for a clickable element that's not a button
 * @param {Object} options - Configuration options
 * @param {string} options.label - Accessible label
 * @param {boolean} options.pressed - Whether element is pressed (for toggle buttons)
 * @param {boolean} options.expanded - Whether element is expanded (for dropdowns)
 * @param {boolean} options.disabled - Whether element is disabled
 * @param {string} options.describedBy - ID of element that describes this one
 * @returns {Object} ARIA attributes
 */
export const getClickableAriaProps = ({
  label,
  pressed,
  expanded,
  disabled = false,
  describedBy,
} = {}) => {
  const props = {
    role: ARIA_ROLES.BUTTON,
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled,
  };

  if (label) props['aria-label'] = label;
  if (typeof pressed === 'boolean') props['aria-pressed'] = pressed;
  if (typeof expanded === 'boolean') props['aria-expanded'] = expanded;
  if (describedBy) props['aria-describedby'] = describedBy;

  return props;
};

/**
 * Get ARIA attributes for form fields
 * @param {Object} options - Configuration options
 * @param {string} options.label - Field label
 * @param {string} options.error - Error message
 * @param {string} options.description - Field description
 * @param {boolean} options.required - Whether field is required
 * @param {boolean} options.invalid - Whether field has validation error
 * @returns {Object} ARIA attributes and helper IDs
 */
export const getFormFieldAriaProps = ({
  label,
  error,
  description,
  required = false,
  invalid = false,
} = {}) => {
  const fieldId = generateA11yId('field');
  const errorId = error ? generateA11yId('error') : null;
  const descriptionId = description ? generateA11yId('description') : null;

  const describedBy = [errorId, descriptionId].filter(Boolean).join(' ');

  return {
    fieldProps: {
      id: fieldId,
      'aria-label': label,
      'aria-required': required,
      'aria-invalid': invalid,
      'aria-describedby': describedBy || undefined,
    },
    labelProps: { htmlFor: fieldId, },
    errorProps: errorId ? {
      id: errorId,
      role: ARIA_ROLES.ALERT,
      'aria-live': 'polite',
    } : {},
    descriptionProps: descriptionId ? { id: descriptionId, } : {},
  };
};

/**
 * Get ARIA attributes for navigation elements
 * @param {Object} options - Configuration options
 * @param {string} options.label - Navigation label
 * @param {string} options.current - Current page/section indicator
 * @returns {Object} ARIA attributes
 */
export const getNavigationAriaProps = ({
  label,
  current,
} = {}) => {
  const props = { role: ARIA_ROLES.NAVIGATION, };

  if (label) props['aria-label'] = label;
  if (current) props['aria-current'] = current;

  return props;
};

/**
 * Get ARIA attributes for modal/dialog elements
 * @param {Object} options - Configuration options
 * @param {string} options.label - Modal title/label
 * @param {string} options.describedBy - ID of element describing the modal
 * @param {boolean} options.modal - Whether it's a modal dialog
 * @returns {Object} ARIA attributes
 */
export const getModalAriaProps = ({
  label,
  describedBy,
  modal = true,
} = {}) => {
  const props = {
    role: ARIA_ROLES.DIALOG,
    'aria-modal': modal,
  };

  if (label) props['aria-label'] = label;
  if (describedBy) props['aria-describedby'] = describedBy;

  return props;
};

/**
 * Get ARIA attributes for status/alert messages
 * @param {Object} options - Configuration options
 * @param {string} options.type - Type of message: 'status', 'alert', 'error'
 * @param {string} options.live - Live region politeness: 'polite', 'assertive'
 * @returns {Object} ARIA attributes
 */
export const getStatusAriaProps = ({
  type = 'status',
  live = 'polite',
} = {}) => {
  const roleMap = {
    status: ARIA_ROLES.STATUS,
    alert: ARIA_ROLES.ALERT,
    error: ARIA_ROLES.ALERT,
  };

  return {
    role: roleMap[type] || ARIA_ROLES.STATUS,
    'aria-live': live,
    'aria-atomic': true,
  };
};

/**
 * Get ARIA attributes for loading states
 * @param {Object} options - Configuration options
 * @param {string} options.label - Loading message
 * @param {number} options.progress - Progress percentage (0-100)
 * @returns {Object} ARIA attributes
 */
export const getLoadingAriaProps = ({
  label = 'Загрузка...',
  progress,
} = {}) => {
  const props = {
    'aria-label': label,
    'aria-live': 'polite',
  };

  if (typeof progress === 'number') {
    props.role = ARIA_ROLES.PROGRESSBAR;
    props['aria-valuenow'] = progress;
    props['aria-valuemin'] = 0;
    props['aria-valuemax'] = 100;
  }

  return props;
};

/**
 * Focus management utilities
 */
export const focusUtils = {
  /**
   * Focus the first focusable element within a container
   * @param {HTMLElement} container - Container element
   */
  focusFirst: (container) => {
    const focusable = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) focusable.focus();
  },

  /**
   * Focus the last focusable element within a container
   * @param {HTMLElement} container - Container element
   */
  focusLast: (container) => {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[focusable.length - 1].focus();
  },

  /**
   * Trap focus within a container (useful for modals)
   * @param {HTMLElement} container - Container element
   * @returns {Function} Cleanup function
   */
  trapFocus: (container) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === KEYBOARD_KEYS.TAB) {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Focus first element initially
    if (firstElement) firstElement.focus();

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  },
};

export default {
  ARIA_ROLES,
  KEYBOARD_KEYS,
  generateA11yId,
  createKeyboardHandler,
  getClickableAriaProps,
  getFormFieldAriaProps,
  getNavigationAriaProps,
  getModalAriaProps,
  getStatusAriaProps,
  getLoadingAriaProps,
  focusUtils,
};
