import {
    ERROR_TYPES,
    isRetryableError,
    normalizeError,
    normalizeResponse
} from '@/utils/api/responseHandler';
import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

/**
 * Custom hook for making API calls with standardized error handling
 * @param {Object} options - Configuration options
 * @param {boolean} options.showSuccessToast - Show success toast notification
 * @param {boolean} options.showErrorToast - Show error toast notification
 * @param {number} options.retryAttempts - Number of retry attempts for retryable errors
 * @param {number} options.retryDelay - Delay between retry attempts (ms)
 * @returns {Object} API call utilities
 */
export const useApiCall = ({
  showSuccessToast = false,
  showErrorToast = true,
  retryAttempts = 2,
  retryDelay = 1000,
} = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const toast = useToast();

  /**
   * Execute API call with error handling and retries
   * @param {Function} apiCall - Function that returns a Promise (API call)
   * @param {Object} options - Call-specific options
   * @returns {Promise} API call result
   */
  const execute = useCallback(async (apiCall, options = {}) => {
    const {
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      retries = retryAttempts,
    } = options;

    setLoading(true);
    setError(null);

    let lastError = null;
    let attempt = 0;

    while (attempt <= retries) {
      try {
        const response = await apiCall();
        const normalizedResponse = normalizeResponse(response);

        setData(normalizedResponse.data);
        setLoading(false);

        // Show success toast if enabled
        if (showSuccessToast && (successMessage || normalizedResponse.message)) {
          toast({
            title: 'Успех',
            description: successMessage || normalizedResponse.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }

        // Call success callback
        if (onSuccess) {
          onSuccess(normalizedResponse);
        }

        return normalizedResponse;
      } catch (err) {
        lastError = normalizeError(err);
        
        // Check if error is retryable and we have attempts left
        if (isRetryableError(lastError) && attempt < retries) {
          attempt++;
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          continue;
        }

        break;
      }
    }

    // All attempts failed
    setError(lastError);
    setLoading(false);

    // Show error toast if enabled
    if (showErrorToast) {
      const message = errorMessage || lastError.message;
      toast({
        title: 'Ошибка',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    // Call error callback
    if (onError) {
      onError(lastError);
    }

    throw lastError;
  }, [retryAttempts, retryDelay, showSuccessToast, showErrorToast, toast]);

  /**
   * Reset hook state
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  /**
   * Check if current error is of specific type
   * @param {string} type - Error type to check
   * @returns {boolean} Whether current error is of specified type
   */
  const isErrorOfType = useCallback((type) => {
    return error?.type === type;
  }, [error]);

  return {
    loading,
    error,
    data,
    execute,
    reset,
    isErrorOfType,
    // Convenience methods for common error types
    isNetworkError: isErrorOfType(ERROR_TYPES.NETWORK),
    isValidationError: isErrorOfType(ERROR_TYPES.VALIDATION),
    isAuthError: isErrorOfType(ERROR_TYPES.AUTHENTICATION),
    isNotFoundError: isErrorOfType(ERROR_TYPES.NOT_FOUND),
    isServerError: isErrorOfType(ERROR_TYPES.SERVER),
  };
};

/**
 * Hook for API calls that require authentication
 * Automatically handles auth errors and redirects to login
 */
export const useAuthenticatedApiCall = (options = {}) => {
  const apiCall = useApiCall({
    showErrorToast: true,
    ...options,
  });

  const executeWithAuth = useCallback(async (apiCallFn, callOptions = {}) => {
    try {
      return await apiCall.execute(apiCallFn, {
        ...callOptions,
        onError: (error) => {
          // Handle authentication errors
          if (error.type === ERROR_TYPES.AUTHENTICATION) {
            // Redirect to login or refresh token
            console.warn('Authentication error, redirecting to login');
            // You can add your auth logic here
          }
          
          // Call original error handler if provided
          if (callOptions.onError) {
            callOptions.onError(error);
          }
        },
      });
    } catch (error) {
      throw error;
    }
  }, [apiCall]);

  return {
    ...apiCall,
    execute: executeWithAuth,
  };
};

/**
 * Hook for form submission with validation error handling
 */
export const useFormApiCall = (options = {}) => {
  const [validationErrors, setValidationErrors] = useState({});
  const toast = useToast();

  const apiCall = useApiCall({
    showErrorToast: false, // Handle validation errors differently
    ...options,
  });

  const executeFormSubmit = useCallback(async (apiCallFn, callOptions = {}) => {
    setValidationErrors({});
    
    try {
      return await apiCall.execute(apiCallFn, {
        ...callOptions,
        onError: (error) => {
          if (error.type === ERROR_TYPES.VALIDATION) {
            // Extract field-specific validation errors
            const fieldErrors = {};
            if (error.data && typeof error.data === 'object') {
              Object.entries(error.data).forEach(([field, messages]) => {
                fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages;
              });
            }
            setValidationErrors(fieldErrors);
          } else {
            // Show toast for non-validation errors
            toast({
              title: 'Ошибка',
              description: error.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
          
          // Call original error handler if provided
          if (callOptions.onError) {
            callOptions.onError(error);
          }
        },
      });
    } catch (error) {
      throw error;
    }
  }, [apiCall]);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  return {
    ...apiCall,
    execute: executeFormSubmit,
    validationErrors,
    clearValidationErrors,
    hasValidationError: (field) => !!validationErrors[field],
    getValidationError: (field) => validationErrors[field],
  };
};

export default useApiCall;
