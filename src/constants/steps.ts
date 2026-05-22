import { Step, StepMeta, FormData } from '@/types';

export const STEP_META: StepMeta[] = [
  { step: Step.ACCOUNT_TYPE, progressPercent: 0 },
  { step: Step.PHONE_NUMBER, progressPercent: 33 },
  { step: Step.OTP_VERIFY, progressPercent: 33 },
  { step: Step.NAME, progressPercent: 66 },
  { step: Step.PASSWORD, progressPercent: 100 },
  { step: Step.SUCCESS, progressPercent: 100 },
];

export const INITIAL_FORM_DATA: FormData = {
  accountType: null,
  phoneCountryCode: 'US',
  phoneNumber: '',
  otp: ['', '', '', ''],
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

export const CONTINUE_LABELS: Record<Step, string> = {
  [Step.ACCOUNT_TYPE]: 'Continue',
  [Step.PHONE_NUMBER]: 'Send OTP',
  [Step.OTP_VERIFY]: 'Verify OTP',
  [Step.NAME]: 'Continue',
  [Step.PASSWORD]: 'Create Account',
  [Step.SUCCESS]: '',
};
