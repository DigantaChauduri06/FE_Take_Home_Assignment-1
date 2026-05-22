import { User, Briefcase } from 'lucide-react';
import { SelectionCard } from '@/components/ui/SelectionCard';
import { FormData, FormErrors, AccountType } from '@/types';

interface Props {
  formData: FormData;
  errors: FormErrors;
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onClearError: (field: keyof FormErrors) => void;
}

export function StepAccountType({ formData, errors, onChange, onClearError }: Props) {
  function handleSelect(type: AccountType) {
    onChange('accountType', type);
    onClearError('accountType');
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-navy-900 leading-snug">
          To join us tell us{' '}
          <span className="font-extrabold">what type of account</span>
          {' '}you are opening
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <SelectionCard
          label="Personal"
          icon={<User size={20} />}
          selected={formData.accountType === 'personal'}
          onSelect={() => handleSelect('personal')}
        />
        <SelectionCard
          label="Business"
          icon={<Briefcase size={20} />}
          selected={formData.accountType === 'business'}
          onSelect={() => handleSelect('business')}
        />
      </div>

      {errors.accountType && (
        <p className="text-xs text-red-500">{errors.accountType}</p>
      )}
    </div>
  );
}
