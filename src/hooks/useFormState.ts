import { useState, useCallback } from 'react';
import { FormData, FormErrors, Step } from '@/types';
import { INITIAL_FORM_DATA } from '@/constants/steps';
import { validateStep } from '@/utils/validators';

type Direction = 'forward' | 'backward';

export function useFormState() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.ACCOUNT_TYPE);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState<Direction>('forward');

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const clearError = useCallback((field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const goBack = useCallback(() => {
    setDirection('backward');
    setErrors({});
    setCurrentStep((prev) => Math.max(0, prev - 1) as Step);
  }, []);

  const goNext = useCallback(async () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});

    const stepsWithDelay = [Step.PHONE_NUMBER, Step.OTP_VERIFY, Step.PASSWORD];
    if (stepsWithDelay.includes(currentStep)) {
      setIsLoading(true);
      const delay = currentStep === Step.OTP_VERIFY ? 1000 : 1500;
      await new Promise((res) => setTimeout(res, delay));
      setIsLoading(false);
    }

    setDirection('forward');
    setCurrentStep((prev) => (prev + 1) as Step);
  }, [currentStep, formData]);

  return {
    currentStep,
    formData,
    errors,
    isLoading,
    direction,
    updateField,
    clearError,
    goBack,
    goNext,
  };
}
