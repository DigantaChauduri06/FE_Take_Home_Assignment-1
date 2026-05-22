# Account Creation Flow

A multi-step account registration UI built with React 18, TypeScript, and Tailwind CSS.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Key Design Decisions](#key-design-decisions)
- [Possible Enhancements](#possible-enhancements)

---

## Getting Started

**Prerequisites:** Node.js 18+, npm

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

---

## Architecture

### Step flow

The registration is broken into 5 steps plus a success state, modelled as a numeric enum:

```
ACCOUNT_TYPE → PHONE_NUMBER → OTP_VERIFY → NAME → PASSWORD → SUCCESS
```

The `Step` enum uses sequential integers (0–5), which lets `goBack` and `goNext` in `useFormState` simply decrement/increment the value rather than managing an explicit list.

### State management — `useFormState`

All form state lives in a single custom hook ([src/hooks/useFormState.ts](src/hooks/useFormState.ts)). It owns:

| State | Purpose |
|---|---|
| `currentStep` | Which step is rendered |
| `formData` | Accumulated field values across all steps |
| `errors` | Per-field validation messages for the current step |
| `isLoading` | Simulated async delay (OTP send/verify, account creation) |
| `direction` | `'forward'` or `'backward'`, drives the slide animation |

Validation runs on every `goNext` call via `validateStep` ([src/utils/validators.ts](src/utils/validators.ts)), which is a pure switch-case function — easy to unit test and extend per step.

Three steps simulate network latency (`PHONE_NUMBER` → 1500ms, `OTP_VERIFY` → 1000ms, `PASSWORD` → 1500ms). This simulates real async calls without a backend.

### Component tree

```
App
└── AccountCreationFlow          # step router + AnimatePresence wrapper
    ├── LeftPanel                # decorative panel (illustration + copy)
    └── RightPanel               # progress bar + nav buttons + step slot
        └── Step{Name}           # one of six step components
```

`AccountCreationFlow` is the only component aware of the step machine. `RightPanel` is a pure layout shell — it receives `progressPercent`, `onBack`, `onContinue`, and `children`, and knows nothing about which step is active.

### Animations

Step transitions use Framer Motion's `AnimatePresence` with a `mode="wait"` slide. The `direction` state in `useFormState` is passed as a custom prop to `slideVariants`, so forward navigation slides content left-to-right and back navigation reverses it. The `ProgressBar` fill also animates independently via a `motion.div` with `animate={{ width }}`.

### OTP input — `useOtpInput`

The 4-digit OTP field is handled by a dedicated hook ([src/hooks/useOtpInput.ts](src/hooks/useOtpInput.ts)) that manages:

- **Auto-advance** on digit entry
- **Backspace** — clears the current cell first; if already empty, focuses and clears the previous cell
- **Arrow keys** — move focus left/right
- **Paste** — strips non-digits, fills all four cells, focuses the last filled cell

The OTP value is a `string[]` rather than a single string so each cell maps directly to an index with no parsing needed.

### Validation

`validateStep` ([src/utils/validators.ts](src/utils/validators.ts)) is decoupled from the hook and components — it's a pure function of `(step, formData) → FormErrors`. Phone validation delegates to `react-phone-number-input`'s `isValidPhoneNumber`, which handles international formats.

---

## Key Design Decisions

**Single `useFormState` hook for all steps.** Lifting state up to one hook keeps `formData` accumulated across steps (so going back doesn't wipe earlier input) and avoids prop-drilling through `AccountCreationFlow` into each step.

**Numeric enum for steps.** Arithmetic navigation (`prev + 1`, `Math.max(0, prev - 1)`) is simpler than a string enum with an ordered array lookup. The enum still gives readable names at call sites.

**`RightPanel` is layout-only.** Keeping the panel unaware of step identity means changes to step content or count don't require touching the shell. Navigation visibility (`hideNavigation`) is the only step-aware flag it receives.

**Validation is a pure function, not inline logic.** `validateStep` can be tested in isolation and extended per step without touching the hook or components.

**`useOtpInput` is extracted as its own hook.** OTP keyboard management is complex enough (backspace semantics, paste handling, ref array) that embedding it in the step component would obscure the component's intent. The hook is fully self-contained and could be reused or tested independently.

**Simulated async delays instead of real API calls.** The loading states and delays are in the hook, not the components, so swapping in real `fetch` calls later is a one-file change.

---

## Possible Enhancements

**Real API integration.** Replace the `setTimeout` delays in `useFormState` with actual calls (send OTP, verify OTP, create account). The hook's structure already isolates these — each is a single `await` that can be swapped.

**OTP resend timer.** Add a countdown on the OTP step with a "Resend" link that re-triggers the send-OTP call and resets the timer.

**Password strength indicator.** Show a strength meter below the password field using a scoring function (length, character variety). The `validators.ts` pattern makes this easy to add as a non-blocking hint separate from the hard validation.

**Persist draft to `sessionStorage`.** Pre-populate `INITIAL_FORM_DATA` from `sessionStorage` on mount and write to it on every `updateField` call, so a page refresh mid-flow doesn't lose entered data.

**Accessible focus management.** On step transition, move focus to the first interactive element in the new step. Currently Framer Motion handles visibility but focus stays on the Continue button.

**Unit tests for `validateStep` and `useOtpInput`.** Both are pure or near-pure — `validateStep` takes data and returns errors, `useOtpInput` manages a local ref array. These are the highest-value, lowest-effort tests in the codebase.

**Replace simulated OTP with real verification.** The current flow accepts any 4-digit input. A real backend would return a token on send and validate it on verify. No UI changes needed — only the `goNext` handler for `Step.OTP_VERIFY` changes.
