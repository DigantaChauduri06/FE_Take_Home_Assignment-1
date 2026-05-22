import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FormData } from '@/types';
import { capitalize, formatPhoneDisplay } from '@/utils/formatters';

interface Props {
  formData: FormData;
  onDashboard: () => void;
}

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between py-2.5 px-4">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-navy-900">{value}</span>
    </div>
  );
}

export function StepSuccess({ formData, onDashboard }: Props) {
  const fullName =
    [formData.firstName, formData.lastName].filter(Boolean).join(' ') || '—';
  const phone = formatPhoneDisplay(formData.phoneNumber);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-sm bg-white rounded-3xl shadow-card-lg p-8 flex flex-col items-center gap-5 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <CheckCircle size={52} className="text-brand-blue" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-navy-900">You're all set!</h2>
          <p className="text-sm text-gray-500">
            Here's a quick summary of your account details
          </p>
        </div>

        <div className="w-full rounded-2xl bg-gray-50 divide-y divide-gray-100">
          <SummaryRow
            label="Account Type"
            value={capitalize(formData.accountType ?? 'personal')}
          />
          <SummaryRow label="Email" value="jo••••@example.com" />
          <SummaryRow label="Name" value={fullName} />
          <SummaryRow label="Mobile Number" value={phone} />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <ShieldCheck size={14} className="text-green-500" />
          <span>Your account is secured with bank-grade security</span>
        </div>

        <Button variant="primary" fullWidth onClick={onDashboard}>
          Go To Dashboard
        </Button>
      </motion.div>
    </motion.div>
  );
}
