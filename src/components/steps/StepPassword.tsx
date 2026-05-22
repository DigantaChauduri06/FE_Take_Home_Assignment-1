import { PasswordInput } from '@/components/ui/PasswordInput';
import { FormData, FormErrors } from '@/types';

interface Props {
  formData: FormData;
  errors: FormErrors;
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onClearError: (field: keyof FormErrors) => void;
}

export function StepPassword({ formData, errors, onChange, onClearError }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-navy-900">
        Create Password for your account
      </h2>

      <div className="flex flex-col gap-4">
        <PasswordInput
          label="Enter new password"
          placeholder="Enter new password"
          value={formData.password}
          onChange={(val) => {
            onChange('password', val);
            onClearError('password');
          }}
          error={errors.password}
          helperText="Must be atleast 6 characters"
        />
        <PasswordInput
          label="Confirm password"
          placeholder="Confirm  password"
          value={formData.confirmPassword}
          onChange={(val) => {
            onChange('confirmPassword', val);
            onClearError('confirmPassword');
          }}
          error={errors.confirmPassword}
          helperText="Both passwords must match"
        />
      </div>
    </div>
  );
}
