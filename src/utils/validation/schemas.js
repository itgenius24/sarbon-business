import * as yup from "yup";

/**
 * Common validation schemas for forms across the application
 * Provides reusable validation rules with internationalization support
 */

// Phone number validation patterns
const PHONE_PATTERNS = {
  // Uzbekistan phone pattern
  UZ: /^[\+]?998[0-9]{9}$/,
  // General international pattern
  INTERNATIONAL: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
};

// Email validation pattern
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Password validation pattern (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

/**
 * Common field validation schemas
 */
export const fieldSchemas = {
  // Phone number validation
  phone: (required = true, pattern = PHONE_PATTERNS.INTERNATIONAL) => {
    let schema = yup
      .string()
      .matches(pattern, "Неправильный номер телефона")
      .transform((value) => value?.replace(/\s/g, "")); // Remove spaces
    
    return required ? schema.required("Обязательное поле") : schema;
  },

  // Email validation
  email: (required = true) => {
    let schema = yup
      .string()
      .matches(EMAIL_PATTERN, "Неправильный формат email")
      .email("Неправильный формат email");
    
    return required ? schema.required("Обязательное поле") : schema;
  },

  // Password validation
  password: (required = true, minLength = 8) => {
    let schema = yup
      .string()
      .min(minLength, `Пароль должен содержать минимум ${minLength} символов`)
      .matches(
        PASSWORD_PATTERN,
        "Пароль должен содержать минимум 8 символов, включая заглавную букву, строчную букву и цифру"
      );
    
    return required ? schema.required("Обязательное поле") : schema;
  },

  // Password confirmation
  passwordConfirm: (required = true) => {
    let schema = yup
      .string()
      .oneOf([yup.ref("password"), null], "Пароли не совпадают");
    
    return required ? schema.required("Обязательное поле") : schema;
  },

  // Name validation
  name: (required = true, minLength = 2, maxLength = 50) => {
    let schema = yup
      .string()
      .min(minLength, `Имя должно содержать минимум ${minLength} символа`)
      .max(maxLength, `Имя должно содержать максимум ${maxLength} символов`)
      .matches(/^[a-zA-Zа-яА-Я\s]+$/, "Имя может содержать только буквы и пробелы");
    
    return required ? schema.required("Обязательное поле") : schema;
  },

  // Car number validation
  carNumber: (required = true) => {
    let schema = yup
      .string()
      .matches(/^[A-Z0-9]{6,10}$/, "Неправильный формат номера автомобиля")
      .transform((value) => value?.toUpperCase());
    
    return required ? schema.required("Обязательное поле") : schema;
  },

  // Date validation
  date: (required = true) => {
    let schema = yup
      .date()
      .typeError("Неправильный формат даты");
    
    return required ? schema.required("Обязательное поле") : schema;
  },

  // Number validation
  number: (required = true, min = 0, max = null) => {
    let schema = yup
      .number()
      .typeError("Должно быть числом")
      .min(min, `Значение должно быть больше ${min}`);
    
    if (max !== null) {
      schema = schema.max(max, `Значение должно быть меньше ${max}`);
    }
    
    return required ? schema.required("Обязательное поле") : schema;
  },

  // Text validation
  text: (required = true, minLength = 1, maxLength = 1000) => {
    let schema = yup
      .string()
      .min(minLength, `Текст должен содержать минимум ${minLength} символов`)
      .max(maxLength, `Текст должен содержать максимум ${maxLength} символов`);
    
    return required ? schema.required("Обязательное поле") : schema;
  },

  // URL validation
  url: (required = true) => {
    let schema = yup
      .string()
      .url("Неправильный формат URL");
    
    return required ? schema.required("Обязательное поле") : schema;
  },
};

/**
 * Pre-built form schemas for common use cases
 */
export const formSchemas = {
  // Authentication forms
  login: yup.object({
    phone: fieldSchemas.phone(),
  }),

  registration: yup.object({
    phone: fieldSchemas.phone(),
    name: fieldSchemas.name(),
    email: fieldSchemas.email(false), // Optional email
  }),

  forgotPassword: yup.object({
    phone: fieldSchemas.phone(),
  }),

  resetPassword: yup.object({
    password: fieldSchemas.password(),
    passwordConfirm: fieldSchemas.passwordConfirm(),
  }),

  // Profile forms
  profile: yup.object({
    name: fieldSchemas.name(),
    email: fieldSchemas.email(false),
    phone: fieldSchemas.phone(),
  }),

  // Vehicle forms
  vehicle: yup.object({
    carNumber: fieldSchemas.carNumber(),
    carBrand: fieldSchemas.text(true, 2, 50),
    carModel: fieldSchemas.text(true, 2, 50),
    carYear: fieldSchemas.number(true, 1900, new Date().getFullYear()),
  }),

  // Contact forms
  contact: yup.object({
    name: fieldSchemas.name(),
    email: fieldSchemas.email(),
    phone: fieldSchemas.phone(false),
    message: fieldSchemas.text(true, 10, 1000),
  }),
};

/**
 * Validation error messages in different languages
 */
export const validationMessages = {
  ru: {
    required: "Обязательное поле",
    email: "Неправильный формат email",
    phone: "Неправильный номер телефона",
    password: "Пароль должен содержать минимум 8 символов",
    passwordMatch: "Пароли не совпадают",
    minLength: (min) => `Минимум ${min} символов`,
    maxLength: (max) => `Максимум ${max} символов`,
    number: "Должно быть числом",
    url: "Неправильный формат URL",
  },
  en: {
    required: "Required field",
    email: "Invalid email format",
    phone: "Invalid phone number",
    password: "Password must contain at least 8 characters",
    passwordMatch: "Passwords do not match",
    minLength: (min) => `Minimum ${min} characters`,
    maxLength: (max) => `Maximum ${max} characters`,
    number: "Must be a number",
    url: "Invalid URL format",
  },
};

export default formSchemas;
