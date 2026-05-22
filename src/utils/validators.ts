import { FormData, FormErrors, Step } from '@/types';
import { isValidPhoneNumber } from 'react-phone-number-input';

export function validateStep(step: Step, formData: FormData): FormErrors {
  const errors: FormErrors = {};

  switch (step) {
    case Step.ACCOUNT_TYPE:
      if (!formData.accountType) {
        errors.accountType = 'Please select an account type to continue.';
      }
      break;

    case Step.PHONE_NUMBER:
      if (!formData.phoneNumber) {
        errors.phoneNumber = 'Mobile number is required.';
      } else if (!isValidPhoneNumber(formData.phoneNumber)) {
        errors.phoneNumber = 'Please enter a valid phone number.';
      }
      break;

    case Step.OTP_VERIFY:
      if (formData.otp.some((d) => d === '')) {
        errors.otp = 'Please enter all 4 digits of the OTP.';
      }
      break;

    case Step.NAME:
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required.';
      }
      break;

    case Step.PASSWORD:
      if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
      }
      if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = 'Both passwords must match.';
      }
      break;

    default:
      break;
  }

  return errors;
}
