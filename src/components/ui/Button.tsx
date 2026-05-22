import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit';
}

export function Button({
  variant = 'primary',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        'relative flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        fullWidth && 'w-full',
        variant === 'primary' && [
          'bg-brand-blue text-white',
          'hover:bg-brand-blue-dark',
          'active:scale-[0.97]',
          'focus-visible:ring-brand-blue',
          'disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100',
        ],
        variant === 'secondary' && [
          'border border-gray-300 bg-white text-gray-700',
          'hover:bg-gray-50',
          'active:scale-[0.97]',
          'focus-visible:ring-gray-400',
        ],
      )}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
