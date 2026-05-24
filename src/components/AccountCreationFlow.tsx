import { AnimatePresence, motion } from 'framer-motion';
import { useFormState } from '@/hooks/useFormState';
import { Step } from '@/types';
import { STEP_META, CONTINUE_LABELS } from '@/constants/steps';
import { LeftPanel } from '@/components/layout/LeftPanel';
import { RightPanel } from '@/components/layout/RightPanel';
import { StepAccountType } from '@/components/steps/StepAccountType';
import { StepPhoneNumber } from '@/components/steps/StepPhoneNumber';
import { StepOtpVerify } from '@/components/steps/StepOtpVerify';
import { StepName } from '@/components/steps/StepName';
import { StepPassword } from '@/components/steps/StepPassword';
import { StepSuccess } from '@/components/steps/StepSuccess';

const slideVariants = {
  enter: (dir: string) => ({
    x: dir === 'forward' ? '60%' : '-60%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: string) => ({
    x: dir === 'forward' ? '-60%' : '60%',
    opacity: 0,
  }),
};

export function AccountCreationFlow() {
  const {
    currentStep,
    formData,
    errors,
    isLoading,
    direction,
    updateField,
    clearError,
    goBack,
    goNext,
  } = useFormState();

  const stepMeta = STEP_META[currentStep];
  const isSuccess = currentStep === Step.SUCCESS;

  const sharedProps = {
    formData,
    errors,
    onChange: updateField,
    onClearError: clearError,
  };

  function renderStep() {
    switch (currentStep) {
      case Step.ACCOUNT_TYPE:
        return <StepAccountType {...sharedProps} />;
      case Step.PHONE_NUMBER:
        return <StepPhoneNumber {...sharedProps} />;
      case Step.OTP_VERIFY:
        return <StepOtpVerify {...sharedProps} />;
      case Step.NAME:
        return <StepName {...sharedProps} />;
      case Step.PASSWORD:
      case Step.SUCCESS:
        return <StepPassword {...sharedProps} />;
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[70rem] grid lg:grid-cols-[2fr_3fr] rounded-2xl overflow-hidden min-h-[540px]">
        <LeftPanel />

        <RightPanel
          progressPercent={stepMeta.progressPercent}
          onBack={currentStep > Step.ACCOUNT_TYPE && !isSuccess ? goBack : undefined}
          onContinue={!isSuccess ? goNext : undefined}
          continueLabel={CONTINUE_LABELS[currentStep]}
          isLoading={isLoading}
          hideNavigation={isSuccess}
        >
          <div className="relative overflow-hidden h-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="w-full"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </RightPanel>
      </div>

      {isSuccess && (
        <StepSuccess
          formData={formData}
          onDashboard={() => window.location.reload()}
        />
      )}
    </div>
  );
}
