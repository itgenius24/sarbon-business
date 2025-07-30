import { useForm } from "react-hook-form";
import { yupResolver } from "@/utils/yupResolver";
import { formSchemas } from "@/utils/validation/schemas";

/**
 * Custom hook for form validation with pre-configured schemas
 * @param {Object} options - Configuration options
 * @param {string} options.schema - Schema name from formSchemas or custom yup schema
 * @param {Object} options.defaultValues - Default form values
 * @param {string} options.mode - Validation mode: "onSubmit", "onBlur", "onChange", "onTouched", "all"
 * @param {boolean} options.reValidateMode - Re-validation mode
 * @returns {Object} React Hook Form methods and validation state
 */
export const useFormValidation = ({
  schema = "login",
  defaultValues = {},
  mode = "onSubmit",
  reValidateMode = "onChange",
}) => {
  // Get schema - either from predefined schemas or use custom schema
  const validationSchema = typeof schema === "string" ? formSchemas[schema] : schema;

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode,
    reValidateMode,
  });

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    getValues,
    reset,
    clearErrors,
    setError,
    formState: { errors, isValid, isSubmitting, isDirty, touchedFields },
  } = formMethods;

  /**
   * Enhanced submit handler with error handling
   * @param {Function} onSubmit - Submit callback function
   * @param {Function} onError - Error callback function
   * @returns {Function} Submit handler
   */
  const createSubmitHandler = (onSubmit, onError) => {
    return handleSubmit(
      async (data) => {
        try {
          await onSubmit(data);
        } catch (error) {
          console.error("Form submission error:", error);
          if (onError) {
            onError(error);
          }
        }
      },
      (errors) => {
        console.warn("Form validation errors:", errors);
        if (onError) {
          onError(errors);
        }
      }
    );
  };

  /**
   * Get error message for a specific field
   * @param {string} fieldName - Field name
   * @returns {string|undefined} Error message
   */
  const getFieldError = (fieldName) => {
    return errors[fieldName]?.message;
  };

  /**
   * Check if a specific field has an error
   * @param {string} fieldName - Field name
   * @returns {boolean} Whether field has error
   */
  const hasFieldError = (fieldName) => {
    return !!errors[fieldName];
  };

  /**
   * Set multiple field values at once
   * @param {Object} values - Object with field names as keys and values
   */
  const setMultipleValues = (values) => {
    Object.entries(values).forEach(([fieldName, value]) => {
      setValue(fieldName, value, { shouldValidate: true, shouldDirty: true });
    });
  };

  /**
   * Reset form with new default values
   * @param {Object} newDefaultValues - New default values
   */
  const resetWithValues = (newDefaultValues = {}) => {
    reset({ ...defaultValues, ...newDefaultValues });
  };

  /**
   * Validate specific field
   * @param {string} fieldName - Field name to validate
   * @returns {Promise<boolean>} Validation result
   */
  const validateField = async (fieldName) => {
    try {
      await validationSchema.validateAt(fieldName, getValues());
      clearErrors(fieldName);
      return true;
    } catch (error) {
      setError(fieldName, { message: error.message });
      return false;
    }
  };

  return {
    // React Hook Form methods
    register,
    control,
    watch,
    setValue,
    getValues,
    reset,
    clearErrors,
    setError,
    
    // Form state
    errors,
    isValid,
    isSubmitting,
    isDirty,
    touchedFields,
    
    // Enhanced methods
    createSubmitHandler,
    getFieldError,
    hasFieldError,
    setMultipleValues,
    resetWithValues,
    validateField,
    
    // Original form methods (for compatibility)
    ...formMethods,
  };
};

/**
 * Hook for specific form types with pre-configured validation
 */
export const useLoginForm = (options = {}) => {
  return useFormValidation({ schema: "login", ...options });
};

export const useRegistrationForm = (options = {}) => {
  return useFormValidation({ schema: "registration", ...options });
};

export const useProfileForm = (options = {}) => {
  return useFormValidation({ schema: "profile", ...options });
};

export const useVehicleForm = (options = {}) => {
  return useFormValidation({ schema: "vehicle", ...options });
};

export const useContactForm = (options = {}) => {
  return useFormValidation({ schema: "contact", ...options });
};

export default useFormValidation;
