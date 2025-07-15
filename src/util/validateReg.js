export const validatePassword = (password) => {
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
        : "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character",
    },
  };
};

export function validatePhone(phone) {
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

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(email),
    message: "Please enter a valid email address",
  };
}
