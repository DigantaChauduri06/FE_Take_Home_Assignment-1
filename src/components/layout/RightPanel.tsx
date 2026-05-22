import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';

interface RightPanelProps {
  progressPercent: number;
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  isLoading?: boolean;
  children: React.ReactNode;
  hideNavigation?: boolean;
}

export function RightPanel({
  progressPercent,
  onBack,
  onContinue,
  continueLabel = 'Continue',
  isLoading = false,
  children,
  hideNavigation = false,
}: RightPanelProps) {
  return (
    <div className="flex flex-col bg-white min-h-full overflow-hidden">
      <ProgressBar percent={progressPercent} />

      <div className="flex flex-col flex-1 px-8 sm:px-12 py-10 overflow-hidden">
        <div className="flex-1">{children}</div>

        {!hideNavigation && (
          <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-100">
            {onBack ? (
              <Button variant="secondary" onClick={onBack}>
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button variant="primary" isLoading={isLoading} onClick={onContinue}>
              {continueLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
