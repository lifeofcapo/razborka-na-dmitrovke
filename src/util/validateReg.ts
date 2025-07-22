interface PasswordValidationResult {
  isValid: boolean;
  requirements: {
    minLength: number;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    message: string;
  };
}

interface BasicValidationResult {
  isValid: boolean;
  message?: string;
}

export const validatePassword = (
  password: string
): PasswordValidationResult => {
  const minLength = 10;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid =
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar;

  return {
    isValid,
    requirements: {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      message: isValid
        ? ""
        : "Пароль должен состоять минимум из 10 символов, включая заглавную и строчные буквы, цифры, и специальный символ",
    },
  };
};

export function validatePhone(phone: string): BasicValidationResult {
  if (!phone.startsWith("+7")) {
    return { isValid: false, message: "Phone must start with +7" };
  }
  if (phone.replace(/\D/g, "").length !== 11) {
    return {
      isValid: false,
      message: "Phone must be +7 followed by 10 digits",
    };
  }
  return { isValid: true };
}

export function validateEmail(email: string): BasicValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(email),
    message: "Пожалуйста введите настоящий email адрес ",
  };
}
