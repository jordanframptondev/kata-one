/**
 * Data Layer Index
 *
 * Re-exports all data and types for easy importing throughout the app.
 *
 * Usage:
 *   import { MEDICATIONS, TREATMENT_PLANS, getMedicationById } from '@/lib/data'
 */

// Types
export * from '../types'

// Medications
export {
  MEDICATIONS,
  getMedicationById,
  getMedicationsByCategory,
  getDoseById,
} from './medications'

// Treatment Plans
export {
  SUBSCRIPTION_CADENCES,
  SEMAGLUTIDE_PLANS,
  TIRZEPATIDE_PLANS,
  RETATRUTIDE_PLANS,
  SERMORELIN_PLANS,
  NAD_INJECTION_PLANS,
  BPC157_PLANS,
  ALL_TREATMENT_PLANS,
  getPlansByMedication,
  getPlansByType,
  getPlansForPatientType,
  getPlanById,
  calculateTotalPrice,
  calculateMonthlySavings,
} from './treatment-plans'

// Eligibility
export {
  ELIGIBILITY_SCREENINGS,
  BMI_REQUIREMENTS,
  getEligibilityForMedication,
  checkBMIEligibility,
} from './eligibility'

// Pricing utilities
export {
  formatPrice,
  formatPricePerMonth,
  calculateSavingsPercent,
} from './pricing-utils'

// Dosing Reference (industry standard doses)
export {
  ALL_DOSING_REFERENCES,
  SEMAGLUTIDE_DOSING,
  TIRZEPATIDE_DOSING,
  LIRAGLUTIDE_DOSING,
  RETATRUTIDE_DOSING,
  SERMORELIN_DOSING,
  IPAMORELIN_DOSING,
  CJC1295_DOSING,
  TESAMORELIN_DOSING,
  NAD_INJECTION_DOSING,
  BPC157_DOSING,
  TB500_DOSING,
  PT141_DOSING,
  getDosingReference,
  getStandardDoses,
  getStartingDose,
  getTitrationSchedule,
  getMaximumDose,
  estimateDoseByWeeksOnMedication,
  getNextDose,
  isMaintenanceDose,
  getDoseTier,
  getDosesWithTiers,
  getDosesByTier,
  getQuickSelectDoses,
  type DosingReference,
  type TitrationStep,
  type DoseTier,
  type DoseWithTier,
} from './dosing-reference'

// Medication Goals (for "What medication is best for me?")
export {
  GOALS,
  MEDICATION_GOAL_MAPPINGS,
  getGoalById,
  getMedicationGoals,
  getMedicationsForGoal,
  getTopMedicationsForGoal,
  getMedicationsWithPrimaryGoal,
  getRecommendedMedications,
  getBestMedicationForGoal,
  type GoalId,
  type Goal,
  type MedicationGoalMapping,
} from './medication-goals'

// Dosing Calculator (for existing patients who don't know their dose)
export {
  getCalculatorQuestions,
  calculateEstimatedDose,
  type CalculatorQuestion,
  type CalculatorOption,
  type CalculatorAnswer,
  type CalculatorResult,
} from './dosing-calculator'

