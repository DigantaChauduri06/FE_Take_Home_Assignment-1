import { useState } from 'react';
import clsx from 'clsx';
import { FormData, FormErrors } from '@/types';
import { useOtpInput } from '@/hooks/useOtpInput';

interface Props {
  formData: FormData;
  errors: FormErrors;
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onClearError: (field: keyof FormErrors) => void;
}

export function StepOtpVerify({ formData, errors, onChange, onClearError }: Props) {
  const [resent, setResent] = useState(false);

  const { inputRefs, handleChange, handleKeyDown, handlePaste } = useOtpInput(
    formData.otp,
    (newOtp) => {
      onChange('otp', newOtp);
      onClearError('otp');
    },
  );

  function handleResend() {
    setResent(true);
    onChange('otp', ['', '', '', '']);
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-navy-900">OTP Verification</h2>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500">An OTP has been sent to your mobile number</p>

        <div className="flex gap-3" onPaste={handlePaste}>
          {formData.otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              autoFocus={i === 0}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`OTP digit ${i + 1}`}
              className={clsx(
                'h-14 w-14 rounded-xl border-2 text-center text-xl font-semibold text-navy-900 outline-none transition-all duration-150',
                errors.otp
                  ? 'border-red-400 focus:border-red-500'
                  : digit
                    ? 'border-brand-blue bg-brand-blue-light text-brand-blue'
                    : 'border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10',
              )}
            />
          ))}
        </div>

        {errors.otp && (
          <p className="text-xs text-red-500">{errors.otp}</p>
        )}

        <p className="text-sm text-gray-500">
          Did not receive OTP?{' '}
          <button
            type="button"
            onClick={handleResend}
            className="text-brand-blue font-medium hover:underline focus:outline-none"
          >
            {resent ? 'OTP Resent!' : 'Resend OTP'}
          </button>
        </p>
      </div>
    </div>
  );
}
