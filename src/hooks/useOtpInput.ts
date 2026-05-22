import { useRef, KeyboardEvent, ClipboardEvent } from 'react';

export function useOtpInput(
  otp: string[],
  onChange: (otp: string[]) => void,
) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

  function handleChange(index: number, value: string) {
    const char = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    onChange(newOtp);
    if (char && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      if (otp[index] !== '') {
        const newOtp = [...otp];
        newOtp[index] = '';
        onChange(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        onChange(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newOtp = ['', '', '', ''];
    pasted.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    onChange(newOtp);
    const lastIndex = Math.min(pasted.length - 1, 3);
    if (lastIndex >= 0) {
      inputRefs.current[lastIndex]?.focus();
    }
  }

  return { inputRefs, handleChange, handleKeyDown, handlePaste };
}
