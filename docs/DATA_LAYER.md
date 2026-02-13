# Data Layer Summary

## Files Created

```
src/lib/
├── types.ts                      # Core TypeScript interfaces
└── data/
    ├── index.ts                  # Re-exports for easy imports
    ├── medications.ts            # 14 peptide medications
    ├── treatment-plans.ts        # 24 treatment plans with pricing
    ├── eligibility.ts            # BMI & screening questions
    ├── pricing-utils.ts          # Price formatting helpers
    ├── dosing-reference.ts       # Industry standard doses per medication
    ├── medication-goals.ts       # Goal-to-medication mappings
    └── dosing-calculator.ts      # Calculator for unknown doses
```

---

## Medications Included

| Category | Medications |
|----------|-------------|
| **GLP-1 Agonists** | Semaglutide, Liraglutide |
| **Dual GIP/GLP-1** | Tirzepatide |
| **Triple Agonist** | Retatrutide |
| **Growth Hormone** | Sermorelin, Ipamorelin, CJC-1295, Tesamorelin |
| **NAD+** | NAD+ IV Infusion, NAD+ Injection |
| **Other Peptides** | BPC-157, TB-500, PT-141 |

---

## Treatment Plan Structure

Each medication has **3-4 plans**:

| Plan Type | Example (Semaglutide) | Billing |
|-----------|----------------------|---------|
| Month-to-Month | $299-$499/mo | Monthly |
| 3-Month Subscription | $239-$399/mo (20% off) | Upfront |
| New Patient Titration (Monthly) | $299 → $349 → $399 | Monthly |
| New Patient Titration (3-Month) | $239 → $279 → $319 (20% off) | Upfront |

### Titration Schedule Example

```typescript
titrationSchedule: [
  { month: 1, doseId: 'sema-025', doseLabel: '0.25mg', priceForMonth: 299 },
  { month: 2, doseId: 'sema-050', doseLabel: '0.5mg', priceForMonth: 349 },
  { month: 3, doseId: 'sema-100', doseLabel: '1.0mg', priceForMonth: 399 },
]
```

**Key Points:**
- New patient titration plans have **different doses each month** (not the same dose)
- Starting month price is displayed, but full schedule is included
- 3-month bundles get 20% discount on all months

---

## Usage in Components

```typescript
import { 
  MEDICATIONS, 
  getMedicationById,
  getPlansForPatientType,
  formatPrice,
  checkBMIEligibility 
} from '@/lib/data'

// Get all medications
const meds = MEDICATIONS

// Get plans for a new patient on Semaglutide
const plans = getPlansForPatientType('semaglutide', 'new')

// Format a price
formatPrice(299) // "$299"

// Check BMI eligibility
checkBMIEligibility('semaglutide', { heightInches: 70, weightLbs: 220 })
```

---

## Available Helper Functions

### Medications (`medications.ts`)

| Function | Description |
|----------|-------------|
| `getMedicationById(id)` | Get single medication by ID |
| `getMedicationsByCategory(category)` | Get medications by category |
| `getDoseById(medicationId, doseId)` | Get specific dose |

### Treatment Plans (`treatment-plans.ts`)

| Function | Description |
|----------|-------------|
| `getPlansByMedication(medicationId)` | All plans for a medication |
| `getPlansByType(planType)` | All plans of a specific type |
| `getPlansForPatientType(medicationId, patientType)` | Plans eligible for new/existing patients |
| `getPlanById(planId)` | Get single plan by ID |
| `calculateTotalPrice(plan, doseId)` | Calculate total cost for a plan |
| `calculateMonthlySavings(monthlyPlan, subPlan, doseId)` | Calculate savings between plans |

### Eligibility (`eligibility.ts`)

| Function | Description |
|----------|-------------|
| `getEligibilityForMedication(medicationId)` | Get screening questions |
| `getBMIRequirement(medicationId)` | Get BMI requirements |
| `calculateBMI(heightInches, weightLbs)` | Calculate BMI |
| `checkBMIEligibility(medicationId, metrics, hasComorbidity)` | Check if patient qualifies |
| `isDisqualifyingAnswer(questionId, answer, screening)` | Check if answer disqualifies |

### Pricing (`pricing-utils.ts`)

| Function | Description |
|----------|-------------|
| `formatPrice(amount)` | Format as "$299" |
| `formatPricePerMonth(amount)` | Format as "$299/mo" |
| `calculateSavingsPercent(original, discounted)` | Calculate % savings |
| `calculateSubscriptionTotal(monthly, months, discount)` | Calculate subscription totals |
| `formatBillingDescription(planType, billingCycle)` | Get billing description text |

### Dosing Reference (`dosing-reference.ts`)

Industry-standard doses for each medication based on FDA labels and clinical protocols.

| Function | Description |
|----------|-------------|
| `getDosingReference(medicationId)` | Get full dosing reference for medication |
| `getStandardDoses(medicationId)` | Get array of standard doses |
| `getStartingDose(medicationId)` | Get recommended starting dose |
| `getTitrationSchedule(medicationId)` | Get titration steps |
| `getMaximumDose(medicationId)` | Get maximum allowed dose |
| `estimateDoseByWeeksOnMedication(medicationId, weeks)` | Estimate dose based on treatment duration |
| `getNextDose(medicationId, currentDoseId)` | Get next dose in sequence |
| `isMaintenanceDose(medicationId, doseId)` | Check if dose is at maintenance level |

**Example:**
```typescript
const semaRef = getDosingReference('semaglutide')
// {
//   standardDoses: [0.25mg, 0.5mg, 1.0mg, 1.7mg, 2.4mg],
//   startingDose: 0.25mg,
//   maximumDose: 2.4mg,
//   dosingFrequency: 'Once weekly',
//   titrationSchedule: [...]
// }
```

### Medication Goals (`medication-goals.ts`)

Maps patient goals to recommended medications. Powers the "What medication is best for me?" feature.

| Function | Description |
|----------|-------------|
| `getGoalById(goalId)` | Get goal details |
| `getMedicationGoals(medicationId)` | Get goal mappings for medication |
| `getMedicationsForGoal(goalId)` | Get medications sorted by effectiveness |
| `getTopMedicationsForGoal(goalId, limit)` | Get top N medications for a goal |
| `getRecommendedMedications(selectedGoals)` | Get recommendations for multiple goals |
| `getBestMedicationForGoal(goalId)` | Get single best medication |

**Available Goals:**
- `weight-loss` - Lose Weight
- `appetite-control` - Control Appetite
- `blood-sugar` - Manage Blood Sugar
- `energy` - Boost Energy
- `anti-aging` - Anti-Aging
- `muscle-recovery` - Muscle & Recovery
- `sleep` - Better Sleep
- `libido` - Improve Libido
- `gut-health` - Gut Health
- `cognitive` - Mental Clarity
- `body-composition` - Body Recomposition

**Example:**
```typescript
const recommendations = getRecommendedMedications(['weight-loss', 'energy'])
// Returns medications sorted by combined effectiveness score
```

### Dosing Calculator (`dosing-calculator.ts`)

Helps existing patients estimate their current dose when they don't know it.

| Function | Description |
|----------|-------------|
| `getCalculatorQuestions(medicationId)` | Get questions for medication |
| `calculateEstimatedDose(medicationId, answers)` | Calculate dose from answers |

**Calculator Flow:**
1. How long on medication? (duration)
2. Number of dose increases?
3. Pen type? (for applicable medications)
4. Side effect tolerance?

**Example:**
```typescript
const questions = getCalculatorQuestions('semaglutide')
const result = calculateEstimatedDose('semaglutide', [
  { questionId: 'duration', value: '2-3-months' },
  { questionId: 'dose-increases', value: 2 },
])
// {
//   estimatedDose: { label: '1.0mg', ... },
//   confidence: 'high',
//   explanation: 'Based on your answers...',
//   recommendation: 'You appear to be in the titration phase...'
// }
```

---

## Type Definitions

### Core Types

```typescript
interface Medication {
  id: string
  name: string
  genericName?: string
  brandNames?: string[]
  description: string
  category: MedicationCategory
  administrationRoute: AdministrationRoute
  availableDoses: Dose[]
  contraindications?: string[]
  sideEffects?: string[]
  requiresPrescription: boolean
  isControlledSubstance: boolean
}

interface Dose {
  id: string
  amount: number
  unit: 'mg' | 'ml' | 'mcg' | 'iu'
  label: string
}

interface TreatmentPlan {
  id: string
  medicationId: string
  planType: PlanType
  name: string
  description: string
  durationMonths: number
  billingCycle: 'monthly' | 'upfront' | 'split'
  pricing: PricingTier[]
  discountPercent?: number
  titrationSchedule?: TitrationSchedule[]
  eligiblePatientTypes: PatientType[]
  includesSupplies?: boolean
  includesConsultation?: boolean
  consultationFrequency?: 'initial' | 'monthly' | 'quarterly'
}

type PlanType = 'month-to-month' | 'subscription-3month' | 'new-patient-titration'
type PatientType = 'new' | 'existing'
```

---

## Suggested Additional Data Files

| File | Purpose | Priority |
|------|---------|----------|
| `faq.ts` | FAQs per medication | Medium |
| `shipping.ts` | Shipping options/costs | Medium |
| `states.ts` | State availability restrictions | High (compliance) |
| `promotions.ts` | Discount codes | Low |



