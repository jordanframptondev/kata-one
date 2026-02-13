# Patient Treatment Selector

## Overview

A simple patient treatment selector flow that guides users from medication selection to viewing their recommended treatment plan. The flow assumes eligibility/contraindication screening has already been completed.

---

## Core Flow (Updated)

```
┌─────────────────────────────────────────────────────────────┐
│                     1. LANDING PAGE                         │
│              "Your personalized treatment awaits"           │
│                      [Get Started]                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  2. SELECT MEDICATION                       │
│                                                             │
│   "Which medication are you interested in?"                 │
│                                                             │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│   │  Sema-  │  │  Tirze- │  │  Reta-  │  │  Sermo- │       │
│   │ glutide │  │ patide  │  │ trutide │  │  relin  │       │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│                                                             │
│         ─────── OR ───────                                  │
│                                                             │
│   "Not sure? Help me choose based on my goals"              │
│         [What medication is best for me?]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼                               ▼
┌───────────────────────┐    ┌───────────────────────────────┐
│                       │    │                               │
│  2a. GOAL SELECTION   │    │  (Skip if medication         │
│     (Optional)        │    │   directly selected)          │
│                       │    │                               │
│  "What are your       │    └───────────────────────────────┘
│   main goals?"        │
│                       │
│  □ Lose Weight        │
│  □ Control Appetite   │
│  □ Boost Energy       │
│  □ Anti-Aging         │
│  □ Muscle Recovery    │
│  □ Better Sleep       │
│                       │
│  → Shows recommended  │
│    medications        │
│                       │
└───────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  3. PATIENT TYPE                            │
│                                                             │
│         "Have you taken [medication] before?"               │
│                                                             │
│         ┌──────────────┐    ┌──────────────┐               │
│         │  I'm new to  │    │  I've taken  │               │
│         │     this     │    │  this before │               │
│         └──────────────┘    └──────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌───────────────────────┐    ┌───────────────────────────────┐
│                       │    │                               │
│  4a. NEW PATIENT      │    │  4b. EXISTING PATIENT         │
│                       │    │      CURRENT DOSE             │
│  "We'll start you at  │    │                               │
│   the recommended     │    │  "What dose are you           │
│   starting dose"      │    │   currently taking?"          │
│                       │    │                               │
│  ✓ [Starting dose]    │    │   ○ 0.25mg                    │
│    shown with info    │    │   ○ 0.5mg                     │
│                       │    │   ○ 1.0mg                     │
│                       │    │   ○ 1.7mg                     │
│                       │    │   ○ 2.4mg                     │
│                       │    │                               │
│                       │    │   [I don't know my dose]      │
│                       │    │   → Opens Dosing Calculator   │
│                       │    │                               │
└───────────────────────┘    └───────────────────────────────┘
                            │
                            ▼
            (If "I don't know my dose" selected)
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              4c. DOSING CALCULATOR                          │
│                                                             │
│  "Let's figure out your dose"                               │
│                                                             │
│  Q1: How long have you been taking this medication?         │
│      ○ Less than 1 month                                    │
│      ○ 1-2 months                                           │
│      ○ 2-3 months                                           │
│      ○ 3-4 months                                           │
│      ○ More than 4 months                                   │
│                                                             │
│  Q2: Have you had any dose increases since starting?        │
│      ○ No, still on starting dose                           │
│      ○ Yes, 1 increase                                      │
│      ○ Yes, 2 increases                                     │
│      ○ Yes, 3+ increases                                    │
│      ○ I'm not sure                                         │
│                                                             │
│  Q3: What pen strength are you using? (if applicable)       │
│      ○ 0.25mg or 0.5mg pen                                  │
│      ○ 1.0mg pen                                            │
│      ○ 1.7mg or 2.4mg pen                                   │
│      ○ I'm not sure                                         │
│                                                             │
│  → Result: "Based on your answers, you're likely taking     │
│            [DOSE]. Does this sound right?"                  │
│                                                             │
│     [Yes, that's my dose]    [No, let me select manually]   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  5. SELECT PLAN                             │
│                                                             │
│           "Choose your treatment plan"                      │
│                                                             │
│   ┌─────────────────┐  ┌─────────────────┐                 │
│   │   MONTHLY       │  │   3-MONTH       │                 │
│   │   $299/mo       │  │   $239/mo       │                 │
│   │                 │  │   SAVE 20%      │                 │
│   │   Flexible      │  │   Best Value    │                 │
│   └─────────────────┘  └─────────────────┘                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              6. BUILDING YOUR PLAN                          │
│                 (3-5 second animation)                      │
│                                                             │
│                      [◉ ◉ ◉]                               │
│                                                             │
│           "Creating your personalized plan..."              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              7. YOUR TREATMENT PLAN                         │
│                                                             │
│                  ✓ Plan Created                             │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  SEMAGLUTIDE - 3-Month Program                      │   │
│   │                                                     │   │
│   │  Month 1: 0.25mg - $239                             │   │
│   │  Month 2: 0.5mg  - $279                             │   │
│   │  Month 3: 1.0mg  - $319                             │   │
│   │                                                     │   │
│   │  Total: $837 (Save $210)                            │   │
│   │                                                     │   │
│   │  ✓ Includes supplies                                │   │
│   │  ✓ Monthly consultations                            │   │
│   │  ✓ Free shipping                                    │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│         [Start Over]        [Continue to Checkout]          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Screens & Components

### 1. Landing Page (Hero)

**Purpose:** Welcome users and start the treatment selection flow

**Requirements:**
- Apple-style dark aesthetic
- Compelling headline and subtext
- Single prominent CTA button
- Smooth transition to next step

---

### 2. Medication Selection Screen

**Purpose:** Allow user to select from available medications OR get help choosing

**Requirements:**
- Display list of available medications as cards
- Each medication should show:
  - Name
  - Brief description
  - Key benefits (from goal mappings)
  - Starting price
- **"What medication is best for me?"** link/button
  - Opens goal selection flow
  - Shows recommended medications based on selected goals
- Single selection only
- "Continue" button to proceed

**Data Needed:**
```typescript
// See medication-goals.ts for full implementation
interface MedicationGoalMapping {
  medicationId: string
  goals: GoalId[]
  primaryGoals: GoalId[]
  effectiveness: Record<GoalId, 1 | 2 | 3 | 4 | 5>
  keyBenefits: string[]
  bestFor: string
}
```

---

### 2a. Goal Selection Screen (Optional)

**Purpose:** Help users who don't know which medication to choose

**Requirements:**
- Display list of health goals with icons
- Multi-select allowed (1-3 recommended)
- Show top recommended medications based on selections
- Goals include:
  - Lose Weight
  - Control Appetite
  - Manage Blood Sugar
  - Boost Energy
  - Anti-Aging
  - Muscle & Recovery
  - Better Sleep
  - Improve Libido
  - Gut Health
  - Mental Clarity

---

### 3. Patient Type Selection Screen

**Purpose:** Determine if patient is new or existing

**Requirements:**
- Two clear options: "New Patient" / "Existing Patient"
- Brief explanation of each path
- Selection leads to appropriate next step

---

### 4a. New Patient - Starting Dose Screen

**Purpose:** Show new patients their recommended starting dose

**Requirements:**
- Display the clinically recommended starting dose
- Show titration schedule preview (dose progression)
- Educational content about why starting low is important
- Automatic progression (no dose selection needed for new patients)

---

### 4b. Existing Patient - Current Dosing Screen

**Purpose:** Capture existing patient's current dosing information

**Requirements:**
- Show available dose options for selected medication
- Radio/card selection for known doses
- **"I don't know my dose"** option
  - Triggers dosing calculator flow
- Validate dose selection

---

### 4c. Dosing Calculator (Conditional)

**Purpose:** Help existing patients estimate their current dose when unknown

**Requirements:**
- Series of 3-4 questions:
  1. How long on medication?
  2. Number of dose increases?
  3. Pen type (if applicable)?
  4. How tolerating medication?
- Calculate estimated dose based on answers
- Show result with confidence level
- Allow confirmation or manual selection

**Reference:** Similar to https://glpeak.ai/dosage-calculator

**Data Needed:**
```typescript
// See dosing-calculator.ts for full implementation
interface CalculatorResult {
  estimatedDose: Dose
  confidence: 'high' | 'medium' | 'low'
  explanation: string
  alternativeDoses?: Dose[]
  recommendation: string
}
```

---

### 5. Plan Selection Screen

**Purpose:** Choose between monthly and subscription plans

**Requirements:**
- Display available plans for patient type
- Show pricing with savings highlighted
- For new patients: Show titration schedule
- For existing patients: Show consistent dosing
- Recommend 3-month subscription (best value)

---

### 6. Loading Animation Screen

**Purpose:** Build anticipation while "creating" the plan

**Requirements:**
- 3-5 second animated loading sequence
- Rotating status messages:
  - "Analyzing your preferences..."
  - "Selecting optimal dosing..."
  - "Calculating savings..."
  - "Finalizing your plan..."
- Smooth transition to results

---

### 7. Treatment Plan Summary Screen

**Purpose:** Display final treatment plan for user review

**Requirements:**
- Show complete treatment plan:
  - Selected medication name
  - Dose(s) and schedule
  - Plan type and duration
  - Pricing breakdown with savings
  - What's included (supplies, consultations)
- "Confirm" or "Continue to Checkout" CTA
- "Start Over" option to restart flow
- Show pricing differences (if any)
- Highlight recommended cadence
- Allow single selection

**Data Needed:**
```typescript
interface SubscriptionCadence {
  id: string
  label: string // e.g., "Weekly", "Monthly"
  intervalDays: number
  priceModifier?: number // for pricing differences
  isRecommended?: boolean
}
```

---

### 5. Treatment Plan Summary Screen

**Purpose:** Display final treatment plan for user review

**Requirements:**
- Show complete treatment plan:
  - Selected medication name
  - Selected dose
  - Subscription cadence
  - Patient type (new/existing)
- "Confirm" or "Start Treatment" CTA
- "Edit" option to go back and modify selections
- Clear, readable summary format

**Data Needed:**
```typescript
interface TreatmentPlan {
  medication: Medication
  dose: Dose
  cadence: SubscriptionCadence
  patientType: 'new' | 'existing'
  estimatedStartDate?: Date
}
```

---

## State Management

### Application State

```typescript
interface TreatmentSelectorState {
  // Current step in the flow
  currentStep: 'medication' | 'patient-type' | 'dosing' | 'cadence' | 'summary'
  
  // User selections
  selectedMedication: Medication | null
  patientType: 'new' | 'existing' | null
  selectedDose: Dose | null
  selectedCadence: SubscriptionCadence | null
  
  // For existing patients
  currentDosing?: CurrentDosing
  
  // Final plan
  treatmentPlan: TreatmentPlan | null
}
```

---

## Navigation Rules

1. **Medication Selection** → **Patient Type Selection** (when medication selected)
2. **Patient Type Selection** → **Existing Patient Dosing** (if "Existing" selected)
3. **Patient Type Selection** → **New Patient Options** (if "New" selected)
4. **Dosing/Options** → **Subscription Cadence** (when dose selected)
5. **Subscription Cadence** → **Treatment Summary** (when cadence selected)
6. **Treatment Summary** → Can navigate back to any previous step to edit

---

## Mock Data

```typescript
const MEDICATIONS: Medication[] = [
  {
    id: 'med-001',
    name: 'Semaglutide',
    description: 'GLP-1 receptor agonist for weight management',
    availableDoses: [
      { id: 'dose-001', amount: 0.25, unit: 'mg', label: '0.25mg' },
      { id: 'dose-002', amount: 0.5, unit: 'mg', label: '0.5mg' },
      { id: 'dose-003', amount: 1.0, unit: 'mg', label: '1.0mg' },
      { id: 'dose-004', amount: 1.7, unit: 'mg', label: '1.7mg' },
      { id: 'dose-005', amount: 2.4, unit: 'mg', label: '2.4mg' },
    ]
  },
  {
    id: 'med-002',
    name: 'Tirzepatide',
    description: 'Dual GIP/GLP-1 receptor agonist',
    availableDoses: [
      { id: 'dose-006', amount: 2.5, unit: 'mg', label: '2.5mg' },
      { id: 'dose-007', amount: 5.0, unit: 'mg', label: '5.0mg' },
      { id: 'dose-008', amount: 7.5, unit: 'mg', label: '7.5mg' },
      { id: 'dose-009', amount: 10.0, unit: 'mg', label: '10.0mg' },
      { id: 'dose-010', amount: 12.5, unit: 'mg', label: '12.5mg' },
      { id: 'dose-011', amount: 15.0, unit: 'mg', label: '15.0mg' },
    ]
  }
]

const CADENCE_OPTIONS: SubscriptionCadence[] = [
  { id: 'weekly', label: 'Weekly', intervalDays: 7 },
  { id: 'biweekly', label: 'Bi-weekly', intervalDays: 14 },
  { id: 'monthly', label: 'Monthly', intervalDays: 30, isRecommended: true },
  { id: 'quarterly', label: 'Quarterly', intervalDays: 90 }
]
```

---

## Technical Requirements

- **Framework:** Next.js with App Router
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **State:** React state (useState/useReducer) or URL state for persistence

---

## File Structure (Suggested)

```
src/
├── app/
│   ├── page.tsx                    # Home/landing or redirect to flow
│   └── treatment/
│       ├── page.tsx                # Treatment flow container
│       ├── layout.tsx              # Shared layout for flow
│       └── components/
│           ├── MedicationSelect.tsx
│           ├── PatientTypeSelect.tsx
│           ├── ExistingPatientDosing.tsx
│           ├── NewPatientOptions.tsx
│           ├── CadenceSelect.tsx
│           └── TreatmentSummary.tsx
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   └── data.ts                     # Mock data
└── components/
    └── ui/                         # Shared UI components
        ├── Button.tsx
        ├── Card.tsx
        └── RadioGroup.tsx
```

---

## Acceptance Criteria

- [ ] User can select a medication from a list
- [ ] User can indicate if they are a new or existing patient
- [ ] Existing patients can input/select their current dosing
- [ ] New patients can view and select from treatment options
- [ ] User can select a subscription cadence
- [ ] Final summary displays all selections clearly
- [ ] User can navigate back to edit any selection
- [ ] Flow is responsive and works on mobile devices

---

## Data Layer Structure

```
src/lib/
├── types.ts                 # All TypeScript interfaces
└── data/
    ├── index.ts             # Re-exports everything
    ├── medications.ts       # All peptide medications
    ├── treatment-plans.ts   # Plans with pricing & titration schedules
    ├── eligibility.ts       # BMI requirements & screening questions
    └── pricing-utils.ts     # Price formatting & calculations
```

### Medications Database (`medications.ts`)

Contains comprehensive list of peptide medications:
- **GLP-1 Agonists:** Semaglutide, Liraglutide
- **Dual Agonists:** Tirzepatide
- **Triple Agonists:** Retatrutide
- **Growth Hormone:** Sermorelin, Ipamorelin, CJC-1295, Tesamorelin
- **NAD+ Precursors:** NAD+ IV, NAD+ Injection
- **Other Peptides:** BPC-157, TB-500, PT-141

### Treatment Plans Database (`treatment-plans.ts`)

Each medication has 3-4 plan types:

| Plan Type | Description | Billing |
|-----------|-------------|---------|
| `month-to-month` | Flexible, full price | Monthly |
| `subscription-3month` | 20% discount, same dose | Upfront |
| `new-patient-titration` (monthly) | Dose escalation | Monthly |
| `new-patient-titration` (3-month) | Dose escalation + 20% off | Upfront |

**Key Concepts:**
- **Titration schedules** have different doses each month (not the same dose)
- **Pricing** varies by dose level
- **New patient plans** show starting dose price but include full 3-month schedule

### Eligibility Database (`eligibility.ts`)

- **BMI Requirements:** GLP-1 meds require BMI ≥30 (or ≥27 with comorbidity)
- **Screening Questions:** Medical history questions with disqualifying answers
- **Age Requirements:** 18+ for all medications

---

## Industry Best Practices for Treatment Selection

Based on telemedicine and digital health standards:

### 1. Eligibility Screening (Pre-Qualification)
- **BMI Verification:** Calculate from height/weight, not self-reported BMI
- **Medical History:** Screen for contraindications before showing medication options
- **Age Verification:** Ensure 18+ for prescription medications
- **Pregnancy Screening:** Required for GLP-1 medications

### 2. Informed Consent & Education
- **Side Effects Disclosure:** Show common side effects before selection
- **Titration Education:** Explain why doses increase gradually
- **Expectation Setting:** Weight loss timelines, injection frequency

### 3. Dosing Safety
- **Start Low:** New patients always start at lowest dose
- **Gradual Escalation:** Increase dose every 4 weeks typically
- **Maximum Dose Limits:** Don't allow selection above FDA max

### 4. Pricing Transparency
- **Show Total Cost:** Display both monthly and total cost
- **Savings Callout:** Highlight subscription savings clearly
- **What's Included:** List supplies, consultations, shipping

### 5. Patient Experience
- **Progress Indicator:** Show step progress in multi-step flows
- **Save Progress:** Allow users to return to incomplete flows
- **Mobile-First:** 70%+ of telemedicine users are on mobile
- **Clear CTAs:** One primary action per screen

### 6. Compliance Considerations
- **Prescription Required:** All medications require physician review
- **State Restrictions:** Some states have telemedicine limitations
- **Controlled Substances:** Special handling for scheduled drugs

---

## Additional Data Suggestions

Consider adding these data files as the app grows:

| File | Purpose |
|------|---------|
| `faq.ts` | Frequently asked questions per medication |
| `shipping.ts` | Shipping options, costs, delivery times |
| `states.ts` | State-specific availability & restrictions |
| `promotions.ts` | Discount codes, first-time offers |
| `physicians.ts` | Provider information for consultations |
| `testimonials.ts` | Patient success stories (for marketing) |


