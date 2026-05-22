import clsx from 'clsx';

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  onFocus?: () => void;
  error?: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  autoFocus?: boolean;
  helperText?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  error,
  type = 'text',
  required,
  autoFocus,
  helperText,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-600">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        autoFocus={autoFocus}
        className={clsx(
          'w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors duration-150',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10',
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-gray-400">{helperText}</p>
      )}
    </div>
  );
}
