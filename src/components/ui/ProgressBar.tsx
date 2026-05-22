import { motion } from 'framer-motion';

interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <motion.div
      className="w-full h-1 bg-gray-200 overflow-hidden"
      animate={{ opacity: percent === 0 ? 0 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="h-full bg-brand-blue rounded-full"
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
