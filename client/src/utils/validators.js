export const nameValidation = {
  required: 'Name is required',
  minLength: {
    value: 20,
    message: 'Name must be at least 20 characters',
  },
  maxLength: {
    value: 60,
    message: 'Name must not exceed 60 characters',
  },
};

export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Please enter a valid email address',
  },
};

export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
  maxLength: {
    value: 16,
    message: 'Password must not exceed 16 characters',
  },
  validate: (value) => {
    if (!/(?=.*[A-Z])/.test(value)) {
      return 'Password must contain at least 1 uppercase letter';
    }
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value)) {
      return 'Password must contain at least 1 special character';
    }
    return true;
  },
};

export const addressValidation = {
  required: 'Address is required',
  maxLength: {
    value: 400,
    message: 'Address must not exceed 400 characters',
  },
};

export const confirmPasswordValidation = (getValues) => ({
  required: 'Please confirm your password',
  validate: (value) =>
    value === getValues('password') || 'Passwords do not match',
});
