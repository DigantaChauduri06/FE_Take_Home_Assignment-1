import { Input } from '@/components/ui/Input';
import { FormData, FormErrors } from '@/types';

interface Props {
  formData: FormData;
  errors: FormErrors;
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onClearError: (field: keyof FormErrors) => void;
}

export function StepName({ formData, errors, onChange, onClearError }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-navy-900">What is your name?</h2>

      <div className="flex flex-col gap-4">
        <Input
          label="First Name"
          placeholder="Oliver"
          value={formData.firstName}
          onChange={(val) => {
            onChange('firstName', val);
            onClearError('firstName');
          }}
          error={errors.firstName}
          required
          autoFocus
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(val) => onChange('lastName', val)}
          error={errors.lastName}
        />
      </div>
    </div>
  );
}
