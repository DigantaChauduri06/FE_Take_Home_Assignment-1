export type AccountType = 'personal' | 'business' | null;

export interface FormData {
  accountType: AccountType;
  phoneCountryCode: string;
  phoneNumber: string;
  otp: string[];
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  accountType?: string;
  phoneNumber?: string;
  otp?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
}

export enum Step {
  ACCOUNT_TYPE = 0,
  PHONE_NUMBER = 1,
  OTP_VERIFY = 2,
  NAME = 3,
  PASSWORD = 4,
  SUCCESS = 5,
}

export interface StepMeta {
  step: Step;
  progressPercent: number;
}
