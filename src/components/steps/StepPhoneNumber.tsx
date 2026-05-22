import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FormData, FormErrors } from '@/types';
import { E164Number } from 'libphonenumber-js/core';

interface Props {
  formData: FormData;
  errors: FormErrors;
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onClearError: (field: keyof FormErrors) => void;
}

export function StepPhoneNumber({ formData, errors, onChange, onClearError }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-navy-900">OTP Verification</h2>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">
          Mobile Number<span className="text-red-500 ml-0.5">*</span>
        </label>
        <PhoneInput
          international
          defaultCountry="US"
          value={formData.phoneNumber as E164Number}
          onChange={(value) => {
            onChange('phoneNumber', value ?? '');
            onClearError('phoneNumber');
          }}
          className="phone-input-wrapper"
        />
        {errors.phoneNumber && (
          <p className="text-xs text-red-500">{errors.phoneNumber}</p>
        )}
      </div>
    </div>
  );
}
