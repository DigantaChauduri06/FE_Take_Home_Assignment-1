import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SelectionCardProps {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

export function SelectionCard({ label, icon, selected, onSelect }: SelectionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={clsx(
        'w-full flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
        selected
          ? 'border-brand-blue bg-brand-blue-light'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
      )}
    >
      <span
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200',
          selected ? 'text-brand-blue' : 'text-gray-400',
        )}
      >
        {icon}
      </span>
      <span
        className={clsx(
          'flex-1 text-sm font-semibold transition-colors duration-200',
          selected ? 'text-brand-blue' : 'text-gray-700',
        )}
      >
        {label}
      </span>
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-brand-blue"
        >
          <CheckCircle2 size={22} fill="currentColor" className="text-brand-blue" />
        </motion.span>
      )}
    </motion.button>
  );
}
