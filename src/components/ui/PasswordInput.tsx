import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

interface PasswordInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  onFocus?: () => void;
  error?: string;
  helperText?: string;
}

export function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  error,
  helperText,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className={clsx(
            'w-full rounded-xl border px-4 py-3 pr-12 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors duration-150',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10',
          )}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          tabIndex={-1}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-gray-400">{helperText}</p>
      )}
    </div>
  );
}
