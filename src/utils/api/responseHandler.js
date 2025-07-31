/**
 * Standardized API response handling utilities
 * Provides consistent patterns for processing API responses and errors
 */

/**
 * Standard API response structure
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {any} data - Response data
 * @property {string} message - Response message
 * @property {Object} meta - Metadata (pagination, etc.)
 * @property {Array} errors - Array of error messages
 */

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * Error types for consistent error handling
 */
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  AUTHORIZATION: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  SERVER: 'SERVER_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

/**
 * Normalize API response to standard format
 * @param {Object} response - Axios response object
 * @returns {ApiResponse} Normalized response
 */
export const normalizeResponse = (response) => {
  const { data, status, statusText } = response;

  // Handle nested data structures (common in the current API)
  let normalizedData = data;
  if (data?.data?.data?.data) {
    normalizedData = data.data.data.data;
  } else if (data?.data?.data) {
    normalizedData = data.data.data;
  } else if (data?.data) {
    normalizedData = data.data;
  }

  return {
    success: status >= 200 && status < 300,
    data: normalizedData,
    message: data?.message || statusText || 'Success',
    meta: {
      status,
      statusText,
      timestamp: new Date().toISOString(),
      ...data?.meta,
    },
    errors: data?.errors || [],
  };
};

/**
 * Normalize API error to standard format
 * @param {Object} error - Axios error object
 * @returns {Object} Normalized error
 */
export const normalizeError = (error) => {
  if (!error.response) {
    // Network error or request timeout
    return {
      type: error.code === 'ECONNABORTED' ? ERROR_TYPES.TIMEOUT : ERROR_TYPES.NETWORK,
      message: error.message || 'Ошибка сети',
      status: null,
      data: null,
      errors: [error.message || 'Ошибка сети'],
    };
  }

  const { response } = error;
  const { status, data } = response;

  // Determine error type based on status code
  let errorType = ERROR_TYPES.UNKNOWN;
  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
    case HTTP_STATUS.UNPROCESSABLE_ENTITY:
      errorType = ERROR_TYPES.VALIDATION;
      break;
    case HTTP_STATUS.UNAUTHORIZED:
      errorType = ERROR_TYPES.AUTHENTICATION;
      break;
    case HTTP_STATUS.FORBIDDEN:
      errorType = ERROR_TYPES.AUTHORIZATION;
      break;
    case HTTP_STATUS.NOT_FOUND:
      errorType = ERROR_TYPES.NOT_FOUND;
      break;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
    case HTTP_STATUS.BAD_GATEWAY:
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      errorType = ERROR_TYPES.SERVER;
      break;
  }

  return {
    type: errorType,
    message: data?.message || getDefaultErrorMessage(status),
    status,
    data: data?.data || null,
    errors: data?.errors || [data?.message || getDefaultErrorMessage(status)],
  };
};

/**
 * Get default error message for HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Default error message
 */
const getDefaultErrorMessage = (status) => {
  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
      return 'Неверный запрос';
    case HTTP_STATUS.UNAUTHORIZED:
      return 'Необходима авторизация';
    case HTTP_STATUS.FORBIDDEN:
      return 'Доступ запрещен';
    case HTTP_STATUS.NOT_FOUND:
      return 'Ресурс не найден';
    case HTTP_STATUS.CONFLICT:
      return 'Конфликт данных';
    case HTTP_STATUS.UNPROCESSABLE_ENTITY:
      return 'Ошибка валидации данных';
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return 'Внутренняя ошибка сервера';
    case HTTP_STATUS.BAD_GATEWAY:
      return 'Ошибка шлюза';
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      return 'Сервис недоступен';
    default:
      return 'Произошла ошибка';
  }
};

/**
 * Check if error is of specific type
 * @param {Object} error - Normalized error object
 * @param {string} type - Error type to check
 * @returns {boolean} Whether error is of specified type
 */
export const isErrorType = (error, type) => {
  return error?.type === type;
};

/**
 * Check if error is retryable (network, timeout, server errors)
 * @param {Object} error - Normalized error object
 * @returns {boolean} Whether error is retryable
 */
export const isRetryableError = (error) => {
  return [
    ERROR_TYPES.NETWORK,
    ERROR_TYPES.TIMEOUT,
    ERROR_TYPES.SERVER,
  ].includes(error?.type);
};

/**
 * Extract validation errors from API response
 * @param {Object} error - Normalized error object
 * @returns {Object} Field-specific validation errors
 */
export const extractValidationErrors = (error) => {
  if (!isErrorType(error, ERROR_TYPES.VALIDATION)) {
    return {};
  }

  const errors = {};
  if (error.data && typeof error.data === 'object') {
    Object.entries(error.data).forEach(([field, messages]) => {
      errors[field] = Array.isArray(messages) ? messages[0] : messages;
    });
  }

  return errors;
};

/**
 * Create success response
 * @param {any} data - Response data
 * @param {string} message - Success message
 * @param {Object} meta - Additional metadata
 * @returns {ApiResponse} Success response
 */
export const createSuccessResponse = (data, message = 'Success', meta = {}) => {
  return {
    success: true,
    data,
    message,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
    errors: [],
  };
};

/**
 * Create error response
 * @param {string} message - Error message
 * @param {string} type - Error type
 * @param {Array} errors - Array of error messages
 * @returns {Object} Error response
 */
export const createErrorResponse = (message, type = ERROR_TYPES.UNKNOWN, errors = []) => {
  return {
    type,
    message,
    status: null,
    data: null,
    errors: errors.length > 0 ? errors : [message],
  };
};
