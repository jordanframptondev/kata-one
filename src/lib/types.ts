// ============================================
// Core Domain Types for Patient Treatment Selector
// ============================================

// --------------------------------------------
// Medication Types
// --------------------------------------------

export interface Dose {
  id: string
  amount: number
  unit: 'mg' | 'ml' | 'mcg' | 'iu'
  label: string // Display label e.g., "2.5mg"
}

export interface Medication {
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

export type MedicationCategory =
  | 'glp1-agonist'        // Semaglutide, Tirzepatide
  | 'gip-glp1-agonist'    // Tirzepatide (dual)
  | 'growth-hormone'      // Sermorelin, Ipamorelin
  | 'nad-precursor'       // NAD+
  | 'multi-agonist'       // Retatrutide (triple)
  | 'peptide-other'

export type AdministrationRoute =
  | 'subcutaneous-injection'
  | 'intramuscular-injection'
  | 'oral'
  | 'sublingual'
  | 'nasal'
  | 'iv-infusion'

// --------------------------------------------
// Treatment Plan Types
// --------------------------------------------

export type PlanType = 'month-to-month' | 'subscription-3month' | 'new-patient-titration'
export type PatientType = 'new' | 'existing'

export interface PricingTier {
  doseId: string
  pricePerMonth: number
  pricePerDose?: number
}

export interface TitrationSchedule {
  month: number
  doseId: string
  doseLabel: string
  priceForMonth: number
}

export interface TreatmentPlan {
  id: string
  medicationId: string
  planType: PlanType
  name: string
  description: string

  // Duration and billing
  durationMonths: number
  billingCycle: 'monthly' | 'upfront' | 'split'

  // Pricing
  pricing: PricingTier[]
  discountPercent?: number // For subscription plans

  // For titration plans (new patients)
  titrationSchedule?: TitrationSchedule[]

  // Eligibility
  eligiblePatientTypes: PatientType[]

  // Additional info
  includesSupplies?: boolean // Syringes, alcohol swabs, etc.
  includesConsultation?: boolean
  consultationFrequency?: 'initial' | 'monthly' | 'quarterly'
}

// --------------------------------------------
// Patient & Selection State Types
// --------------------------------------------

export interface CurrentDosing {
  medicationId: string
  currentDose: Dose
  weeklyFrequency: number
  startDate?: string
  lastRefillDate?: string
}

export interface PatientProfile {
  patientType: PatientType
  currentDosing?: CurrentDosing
  allergies?: string[]
  currentMedications?: string[]
}

export interface SubscriptionCadence {
  id: string
  label: string
  intervalDays: number
  intervalMonths: number
  discountPercent: number
  isRecommended?: boolean
  description?: string
}

// --------------------------------------------
// Application State Types
// --------------------------------------------

export type FlowStep =
  | 'medication'
  | 'patient-type'
  | 'dosing'
  | 'plan-selection'
  | 'cadence'
  | 'summary'

export interface TreatmentSelection {
  medication: Medication | null
  patientType: PatientType | null
  selectedDose: Dose | null
  selectedPlan: TreatmentPlan | null
  selectedCadence: SubscriptionCadence | null
  currentDosing?: CurrentDosing
}

export interface TreatmentSelectorState {
  currentStep: FlowStep
  selection: TreatmentSelection

  // Computed values
  totalPrice: number
  monthlyPrice: number
  savings: number
}

// --------------------------------------------
// Final Treatment Plan Summary
// --------------------------------------------

export interface FinalTreatmentPlan {
  id: string
  createdAt: string

  // Selections
  medication: Medication
  dose: Dose
  plan: TreatmentPlan
  cadence: SubscriptionCadence
  patientType: PatientType

  // Pricing breakdown
  basePrice: number
  discountAmount: number
  finalPrice: number
  pricePerMonth: number

  // Schedule (for titration)
  schedule?: TitrationSchedule[]

  // Estimated dates
  estimatedStartDate: string
  estimatedShipDate: string
  nextBillingDate: string
}

// --------------------------------------------
// Eligibility & Screening Types (Future)
// --------------------------------------------

export interface EligibilityQuestion {
  id: string
  question: string
  type: 'boolean' | 'select' | 'number' | 'text'
  options?: string[]
  required: boolean
  disqualifyingAnswers?: (string | boolean | number)[]
}

export interface EligibilityScreening {
  medicationId: string
  questions: EligibilityQuestion[]
}

// --------------------------------------------
// BMI & Health Metrics (Future)
// --------------------------------------------

export interface HealthMetrics {
  heightInches?: number
  weightLbs?: number
  bmi?: number
  a1c?: number
  bloodPressureSystolic?: number
  bloodPressureDiastolic?: number
}

