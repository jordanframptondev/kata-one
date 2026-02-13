import type { Dose } from '../types'

/**
 * Standard Dosing Reference Database
 *
 * Industry-standard dose amounts for each medication based on:
 * - FDA approved labeling
 * - Clinical trial protocols
 * - Manufacturer guidelines
 *
 * Each medication includes:
 * - Standard doses (FDA approved or common clinical doses)
 * - Starting dose for new patients
 * - Maintenance dose range
 * - Maximum dose
 * - Titration schedule recommendations
 */

export interface DosingReference {
  medicationId: string
  standardDoses: Dose[]
  startingDose: Dose
  maintenanceDoseRange: {
    min: Dose
    max: Dose
  }
  maximumDose: Dose
  titrationSchedule: TitrationStep[]
  dosingFrequency: string
  administrationNotes?: string
}

export interface TitrationStep {
  week: number
  doseId: string
  doseLabel: string
  duration: string
  notes?: string
}

// ============================================
// SEMAGLUTIDE (Ozempic/Wegovy)
// ============================================
// Reference: FDA Wegovy label, Ozempic prescribing information
// Weekly subcutaneous injection

export const SEMAGLUTIDE_DOSING: DosingReference = {
  medicationId: 'semaglutide',
  standardDoses: [
    { id: 'sema-025', amount: 0.25, unit: 'mg', label: '0.25mg' },
    { id: 'sema-050', amount: 0.5, unit: 'mg', label: '0.5mg' },
    { id: 'sema-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
    { id: 'sema-170', amount: 1.7, unit: 'mg', label: '1.7mg' },
    { id: 'sema-240', amount: 2.4, unit: 'mg', label: '2.4mg' },
  ],
  startingDose: { id: 'sema-025', amount: 0.25, unit: 'mg', label: '0.25mg' },
  maintenanceDoseRange: {
    min: { id: 'sema-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
    max: { id: 'sema-240', amount: 2.4, unit: 'mg', label: '2.4mg' },
  },
  maximumDose: { id: 'sema-240', amount: 2.4, unit: 'mg', label: '2.4mg' },
  dosingFrequency: 'Once weekly',
  titrationSchedule: [
    { week: 1, doseId: 'sema-025', doseLabel: '0.25mg', duration: 'Weeks 1-4', notes: 'Starting dose' },
    { week: 5, doseId: 'sema-050', doseLabel: '0.5mg', duration: 'Weeks 5-8' },
    { week: 9, doseId: 'sema-100', doseLabel: '1.0mg', duration: 'Weeks 9-12' },
    { week: 13, doseId: 'sema-170', doseLabel: '1.7mg', duration: 'Weeks 13-16' },
    { week: 17, doseId: 'sema-240', doseLabel: '2.4mg', duration: 'Week 17+', notes: 'Maintenance dose' },
  ],
  administrationNotes: 'Inject subcutaneously in abdomen, thigh, or upper arm. Same day each week.',
}

// ============================================
// TIRZEPATIDE (Mounjaro/Zepbound)
// ============================================
// Reference: FDA Mounjaro/Zepbound label
// Weekly subcutaneous injection

export const TIRZEPATIDE_DOSING: DosingReference = {
  medicationId: 'tirzepatide',
  standardDoses: [
    { id: 'tirz-250', amount: 2.5, unit: 'mg', label: '2.5mg' },
    { id: 'tirz-500', amount: 5.0, unit: 'mg', label: '5.0mg' },
    { id: 'tirz-750', amount: 7.5, unit: 'mg', label: '7.5mg' },
    { id: 'tirz-1000', amount: 10.0, unit: 'mg', label: '10.0mg' },
    { id: 'tirz-1250', amount: 12.5, unit: 'mg', label: '12.5mg' },
    { id: 'tirz-1500', amount: 15.0, unit: 'mg', label: '15.0mg' },
  ],
  startingDose: { id: 'tirz-250', amount: 2.5, unit: 'mg', label: '2.5mg' },
  maintenanceDoseRange: {
    min: { id: 'tirz-500', amount: 5.0, unit: 'mg', label: '5.0mg' },
    max: { id: 'tirz-1500', amount: 15.0, unit: 'mg', label: '15.0mg' },
  },
  maximumDose: { id: 'tirz-1500', amount: 15.0, unit: 'mg', label: '15.0mg' },
  dosingFrequency: 'Once weekly',
  titrationSchedule: [
    { week: 1, doseId: 'tirz-250', doseLabel: '2.5mg', duration: 'Weeks 1-4', notes: 'Starting dose' },
    { week: 5, doseId: 'tirz-500', doseLabel: '5.0mg', duration: 'Weeks 5-8' },
    { week: 9, doseId: 'tirz-750', doseLabel: '7.5mg', duration: 'Weeks 9-12' },
    { week: 13, doseId: 'tirz-1000', doseLabel: '10.0mg', duration: 'Weeks 13-16' },
    { week: 17, doseId: 'tirz-1250', doseLabel: '12.5mg', duration: 'Weeks 17-20' },
    { week: 21, doseId: 'tirz-1500', doseLabel: '15.0mg', duration: 'Week 21+', notes: 'Maximum maintenance' },
  ],
  administrationNotes: 'Inject subcutaneously in abdomen, thigh, or upper arm. Same day each week.',
}

// ============================================
// LIRAGLUTIDE (Saxenda/Victoza)
// ============================================
// Reference: FDA Saxenda label
// Daily subcutaneous injection

export const LIRAGLUTIDE_DOSING: DosingReference = {
  medicationId: 'liraglutide',
  standardDoses: [
    { id: 'lira-060', amount: 0.6, unit: 'mg', label: '0.6mg' },
    { id: 'lira-120', amount: 1.2, unit: 'mg', label: '1.2mg' },
    { id: 'lira-180', amount: 1.8, unit: 'mg', label: '1.8mg' },
    { id: 'lira-240', amount: 2.4, unit: 'mg', label: '2.4mg' },
    { id: 'lira-300', amount: 3.0, unit: 'mg', label: '3.0mg' },
  ],
  startingDose: { id: 'lira-060', amount: 0.6, unit: 'mg', label: '0.6mg' },
  maintenanceDoseRange: {
    min: { id: 'lira-180', amount: 1.8, unit: 'mg', label: '1.8mg' },
    max: { id: 'lira-300', amount: 3.0, unit: 'mg', label: '3.0mg' },
  },
  maximumDose: { id: 'lira-300', amount: 3.0, unit: 'mg', label: '3.0mg' },
  dosingFrequency: 'Once daily',
  titrationSchedule: [
    { week: 1, doseId: 'lira-060', doseLabel: '0.6mg', duration: 'Week 1', notes: 'Starting dose' },
    { week: 2, doseId: 'lira-120', doseLabel: '1.2mg', duration: 'Week 2' },
    { week: 3, doseId: 'lira-180', doseLabel: '1.8mg', duration: 'Week 3' },
    { week: 4, doseId: 'lira-240', doseLabel: '2.4mg', duration: 'Week 4' },
    { week: 5, doseId: 'lira-300', doseLabel: '3.0mg', duration: 'Week 5+', notes: 'Maintenance dose' },
  ],
  administrationNotes: 'Inject subcutaneously once daily at any time, independent of meals.',
}

// ============================================
// RETATRUTIDE (Investigational)
// ============================================
// Reference: Phase 2 clinical trial data (Eli Lilly)
// Weekly subcutaneous injection

export const RETATRUTIDE_DOSING: DosingReference = {
  medicationId: 'retatrutide',
  standardDoses: [
    { id: 'reta-050', amount: 0.5, unit: 'mg', label: '0.5mg' },
    { id: 'reta-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
    { id: 'reta-200', amount: 2.0, unit: 'mg', label: '2.0mg' },
    { id: 'reta-400', amount: 4.0, unit: 'mg', label: '4.0mg' },
    { id: 'reta-800', amount: 8.0, unit: 'mg', label: '8.0mg' },
    { id: 'reta-1200', amount: 12.0, unit: 'mg', label: '12.0mg' },
  ],
  startingDose: { id: 'reta-050', amount: 0.5, unit: 'mg', label: '0.5mg' },
  maintenanceDoseRange: {
    min: { id: 'reta-400', amount: 4.0, unit: 'mg', label: '4.0mg' },
    max: { id: 'reta-1200', amount: 12.0, unit: 'mg', label: '12.0mg' },
  },
  maximumDose: { id: 'reta-1200', amount: 12.0, unit: 'mg', label: '12.0mg' },
  dosingFrequency: 'Once weekly',
  titrationSchedule: [
    { week: 1, doseId: 'reta-050', doseLabel: '0.5mg', duration: 'Weeks 1-4', notes: 'Starting dose' },
    { week: 5, doseId: 'reta-100', doseLabel: '1.0mg', duration: 'Weeks 5-8' },
    { week: 9, doseId: 'reta-200', doseLabel: '2.0mg', duration: 'Weeks 9-12' },
    { week: 13, doseId: 'reta-400', doseLabel: '4.0mg', duration: 'Weeks 13-16' },
    { week: 17, doseId: 'reta-800', doseLabel: '8.0mg', duration: 'Weeks 17-20' },
    { week: 21, doseId: 'reta-1200', doseLabel: '12.0mg', duration: 'Week 21+', notes: 'Maximum dose' },
  ],
  administrationNotes: 'Weekly subcutaneous injection. Triple agonist (GIP/GLP-1/Glucagon).',
}

// ============================================
// SERMORELIN
// ============================================
// Reference: Clinical protocols for GHRH therapy
// Daily subcutaneous injection (typically at bedtime)

export const SERMORELIN_DOSING: DosingReference = {
  medicationId: 'sermorelin',
  standardDoses: [
    { id: 'serm-100', amount: 100, unit: 'mcg', label: '100mcg' },
    { id: 'serm-200', amount: 200, unit: 'mcg', label: '200mcg' },
    { id: 'serm-300', amount: 300, unit: 'mcg', label: '300mcg' },
    { id: 'serm-500', amount: 500, unit: 'mcg', label: '500mcg' },
    { id: 'serm-1000', amount: 1000, unit: 'mcg', label: '1000mcg (1mg)' },
  ],
  startingDose: { id: 'serm-200', amount: 200, unit: 'mcg', label: '200mcg' },
  maintenanceDoseRange: {
    min: { id: 'serm-200', amount: 200, unit: 'mcg', label: '200mcg' },
    max: { id: 'serm-500', amount: 500, unit: 'mcg', label: '500mcg' },
  },
  maximumDose: { id: 'serm-1000', amount: 1000, unit: 'mcg', label: '1000mcg (1mg)' },
  dosingFrequency: 'Once daily at bedtime',
  titrationSchedule: [
    { week: 1, doseId: 'serm-100', doseLabel: '100mcg', duration: 'Weeks 1-2', notes: 'Starting dose' },
    { week: 3, doseId: 'serm-200', doseLabel: '200mcg', duration: 'Weeks 3-4' },
    { week: 5, doseId: 'serm-300', doseLabel: '300mcg', duration: 'Weeks 5+', notes: 'Typical maintenance' },
  ],
  administrationNotes: 'Inject subcutaneously at bedtime on empty stomach. GH release peaks during sleep.',
}

// ============================================
// IPAMORELIN
// ============================================
// Reference: Clinical peptide therapy protocols
// 2-3x daily subcutaneous injection

export const IPAMORELIN_DOSING: DosingReference = {
  medicationId: 'ipamorelin',
  standardDoses: [
    { id: 'ipam-100', amount: 100, unit: 'mcg', label: '100mcg' },
    { id: 'ipam-200', amount: 200, unit: 'mcg', label: '200mcg' },
    { id: 'ipam-300', amount: 300, unit: 'mcg', label: '300mcg' },
  ],
  startingDose: { id: 'ipam-100', amount: 100, unit: 'mcg', label: '100mcg' },
  maintenanceDoseRange: {
    min: { id: 'ipam-200', amount: 200, unit: 'mcg', label: '200mcg' },
    max: { id: 'ipam-300', amount: 300, unit: 'mcg', label: '300mcg' },
  },
  maximumDose: { id: 'ipam-300', amount: 300, unit: 'mcg', label: '300mcg' },
  dosingFrequency: '2-3 times daily',
  titrationSchedule: [
    { week: 1, doseId: 'ipam-100', doseLabel: '100mcg', duration: 'Weeks 1-2', notes: '2x daily' },
    { week: 3, doseId: 'ipam-200', doseLabel: '200mcg', duration: 'Weeks 3+', notes: '2-3x daily maintenance' },
  ],
  administrationNotes: 'Best taken on empty stomach. Common protocol: morning and bedtime.',
}

// ============================================
// CJC-1295 (with/without DAC)
// ============================================
// Reference: Clinical peptide therapy protocols

export const CJC1295_DOSING: DosingReference = {
  medicationId: 'cjc1295',
  standardDoses: [
    { id: 'cjc-100', amount: 100, unit: 'mcg', label: '100mcg' },
    { id: 'cjc-200', amount: 200, unit: 'mcg', label: '200mcg' },
    { id: 'cjc-300', amount: 300, unit: 'mcg', label: '300mcg' },
    { id: 'cjc-1000', amount: 1000, unit: 'mcg', label: '1000mcg (with DAC)' },
    { id: 'cjc-2000', amount: 2000, unit: 'mcg', label: '2000mcg (with DAC)' },
  ],
  startingDose: { id: 'cjc-100', amount: 100, unit: 'mcg', label: '100mcg' },
  maintenanceDoseRange: {
    min: { id: 'cjc-100', amount: 100, unit: 'mcg', label: '100mcg' },
    max: { id: 'cjc-300', amount: 300, unit: 'mcg', label: '300mcg' },
  },
  maximumDose: { id: 'cjc-2000', amount: 2000, unit: 'mcg', label: '2000mcg (with DAC)' },
  dosingFrequency: 'Without DAC: 2-3x daily | With DAC: 1-2x weekly',
  titrationSchedule: [
    { week: 1, doseId: 'cjc-100', doseLabel: '100mcg', duration: 'Weeks 1-2', notes: 'Without DAC' },
    { week: 3, doseId: 'cjc-200', doseLabel: '200mcg', duration: 'Weeks 3+', notes: 'Maintenance' },
  ],
  administrationNotes: 'Often combined with Ipamorelin for synergistic GH release.',
}

// ============================================
// TESAMORELIN (Egrifta)
// ============================================
// Reference: FDA Egrifta label

export const TESAMORELIN_DOSING: DosingReference = {
  medicationId: 'tesamorelin',
  standardDoses: [
    { id: 'tesa-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
    { id: 'tesa-200', amount: 2.0, unit: 'mg', label: '2.0mg' },
  ],
  startingDose: { id: 'tesa-200', amount: 2.0, unit: 'mg', label: '2.0mg' },
  maintenanceDoseRange: {
    min: { id: 'tesa-200', amount: 2.0, unit: 'mg', label: '2.0mg' },
    max: { id: 'tesa-200', amount: 2.0, unit: 'mg', label: '2.0mg' },
  },
  maximumDose: { id: 'tesa-200', amount: 2.0, unit: 'mg', label: '2.0mg' },
  dosingFrequency: 'Once daily',
  titrationSchedule: [
    { week: 1, doseId: 'tesa-200', doseLabel: '2.0mg', duration: 'Week 1+', notes: 'Fixed dose' },
  ],
  administrationNotes: 'FDA-approved fixed dose of 2mg daily. Inject in abdomen.',
}

// ============================================
// NAD+ INJECTION
// ============================================
// Reference: Clinical NAD+ therapy protocols

export const NAD_INJECTION_DOSING: DosingReference = {
  medicationId: 'nad-injection',
  standardDoses: [
    { id: 'nad-inj-25', amount: 25, unit: 'mg', label: '25mg' },
    { id: 'nad-inj-50', amount: 50, unit: 'mg', label: '50mg' },
    { id: 'nad-inj-100', amount: 100, unit: 'mg', label: '100mg' },
    { id: 'nad-inj-200', amount: 200, unit: 'mg', label: '200mg' },
  ],
  startingDose: { id: 'nad-inj-25', amount: 25, unit: 'mg', label: '25mg' },
  maintenanceDoseRange: {
    min: { id: 'nad-inj-50', amount: 50, unit: 'mg', label: '50mg' },
    max: { id: 'nad-inj-200', amount: 200, unit: 'mg', label: '200mg' },
  },
  maximumDose: { id: 'nad-inj-200', amount: 200, unit: 'mg', label: '200mg' },
  dosingFrequency: '2-3 times weekly',
  titrationSchedule: [
    { week: 1, doseId: 'nad-inj-25', doseLabel: '25mg', duration: 'Week 1', notes: 'Test dose' },
    { week: 2, doseId: 'nad-inj-50', doseLabel: '50mg', duration: 'Weeks 2-4' },
    { week: 5, doseId: 'nad-inj-100', doseLabel: '100mg', duration: 'Weeks 5+', notes: 'Typical maintenance' },
  ],
  administrationNotes: 'Subcutaneous injection. May cause flushing and warmth.',
}

// ============================================
// BPC-157
// ============================================
// Reference: Research protocols and clinical use

export const BPC157_DOSING: DosingReference = {
  medicationId: 'bpc157',
  standardDoses: [
    { id: 'bpc-200', amount: 200, unit: 'mcg', label: '200mcg' },
    { id: 'bpc-250', amount: 250, unit: 'mcg', label: '250mcg' },
    { id: 'bpc-500', amount: 500, unit: 'mcg', label: '500mcg' },
    { id: 'bpc-750', amount: 750, unit: 'mcg', label: '750mcg' },
  ],
  startingDose: { id: 'bpc-250', amount: 250, unit: 'mcg', label: '250mcg' },
  maintenanceDoseRange: {
    min: { id: 'bpc-250', amount: 250, unit: 'mcg', label: '250mcg' },
    max: { id: 'bpc-500', amount: 500, unit: 'mcg', label: '500mcg' },
  },
  maximumDose: { id: 'bpc-750', amount: 750, unit: 'mcg', label: '750mcg' },
  dosingFrequency: '1-2 times daily',
  titrationSchedule: [
    { week: 1, doseId: 'bpc-250', doseLabel: '250mcg', duration: 'Weeks 1-2', notes: '1x daily' },
    { week: 3, doseId: 'bpc-500', doseLabel: '500mcg', duration: 'Weeks 3+', notes: 'Or split 250mcg 2x daily' },
  ],
  administrationNotes: 'Inject near injury site when possible. Typical course: 4-12 weeks.',
}

// ============================================
// TB-500 (Thymosin Beta-4)
// ============================================
// Reference: Research and clinical protocols

export const TB500_DOSING: DosingReference = {
  medicationId: 'tb500',
  standardDoses: [
    { id: 'tb-250', amount: 2.5, unit: 'mg', label: '2.5mg' },
    { id: 'tb-500', amount: 5.0, unit: 'mg', label: '5.0mg' },
    { id: 'tb-1000', amount: 10.0, unit: 'mg', label: '10.0mg' },
  ],
  startingDose: { id: 'tb-250', amount: 2.5, unit: 'mg', label: '2.5mg' },
  maintenanceDoseRange: {
    min: { id: 'tb-250', amount: 2.5, unit: 'mg', label: '2.5mg' },
    max: { id: 'tb-500', amount: 5.0, unit: 'mg', label: '5.0mg' },
  },
  maximumDose: { id: 'tb-1000', amount: 10.0, unit: 'mg', label: '10.0mg' },
  dosingFrequency: '2x weekly (loading) then 1x weekly (maintenance)',
  titrationSchedule: [
    { week: 1, doseId: 'tb-500', doseLabel: '5.0mg', duration: 'Weeks 1-4', notes: '2x weekly loading' },
    { week: 5, doseId: 'tb-250', doseLabel: '2.5mg', duration: 'Weeks 5+', notes: '1x weekly maintenance' },
  ],
  administrationNotes: 'Subcutaneous or intramuscular. Loading phase followed by maintenance.',
}

// ============================================
// PT-141 (Bremelanotide)
// ============================================
// Reference: FDA Vyleesi label

export const PT141_DOSING: DosingReference = {
  medicationId: 'pt141',
  standardDoses: [
    { id: 'pt-075', amount: 0.75, unit: 'mg', label: '0.75mg' },
    { id: 'pt-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
    { id: 'pt-175', amount: 1.75, unit: 'mg', label: '1.75mg' },
  ],
  startingDose: { id: 'pt-175', amount: 1.75, unit: 'mg', label: '1.75mg' },
  maintenanceDoseRange: {
    min: { id: 'pt-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
    max: { id: 'pt-175', amount: 1.75, unit: 'mg', label: '1.75mg' },
  },
  maximumDose: { id: 'pt-175', amount: 1.75, unit: 'mg', label: '1.75mg' },
  dosingFrequency: 'As needed, at least 45 minutes before activity',
  titrationSchedule: [
    { week: 1, doseId: 'pt-175', doseLabel: '1.75mg', duration: 'As needed', notes: 'Standard dose' },
  ],
  administrationNotes: 'Max 1 dose per 24 hours. Max 8 doses per month. Inject in abdomen or thigh.',
}

// ============================================
// ALL DOSING REFERENCES
// ============================================

export const ALL_DOSING_REFERENCES: DosingReference[] = [
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
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getDosingReference(medicationId: string): DosingReference | undefined {
  return ALL_DOSING_REFERENCES.find(ref => ref.medicationId === medicationId)
}

export function getStandardDoses(medicationId: string): Dose[] {
  const ref = getDosingReference(medicationId)
  return ref?.standardDoses ?? []
}

export function getStartingDose(medicationId: string): Dose | undefined {
  const ref = getDosingReference(medicationId)
  return ref?.startingDose
}

export function getTitrationSchedule(medicationId: string): TitrationStep[] {
  const ref = getDosingReference(medicationId)
  return ref?.titrationSchedule ?? []
}

export function getMaximumDose(medicationId: string): Dose | undefined {
  const ref = getDosingReference(medicationId)
  return ref?.maximumDose
}

/**
 * Estimate current dose based on weeks on medication
 * Useful for dosing calculator when patient knows duration but not exact dose
 */
export function estimateDoseByWeeksOnMedication(
  medicationId: string,
  weeksOnMedication: number
): Dose | undefined {
  const ref = getDosingReference(medicationId)
  if (!ref) return undefined

  // Find the appropriate dose based on titration schedule
  let currentDose = ref.startingDose

  for (const step of ref.titrationSchedule) {
    if (weeksOnMedication >= step.week) {
      const dose = ref.standardDoses.find(d => d.id === step.doseId)
      if (dose) currentDose = dose
    }
  }

  return currentDose
}

/**
 * Get next dose in titration sequence
 */
export function getNextDose(medicationId: string, currentDoseId: string): Dose | undefined {
  const ref = getDosingReference(medicationId)
  if (!ref) return undefined

  const currentIndex = ref.standardDoses.findIndex(d => d.id === currentDoseId)
  if (currentIndex === -1 || currentIndex >= ref.standardDoses.length - 1) {
    return undefined // Already at max or not found
  }

  return ref.standardDoses[currentIndex + 1]
}

/**
 * Check if dose is at or above maintenance level
 */
export function isMaintenanceDose(medicationId: string, doseId: string): boolean {
  const ref = getDosingReference(medicationId)
  if (!ref) return false

  const dose = ref.standardDoses.find(d => d.id === doseId)
  if (!dose) return false

  return dose.amount >= ref.maintenanceDoseRange.min.amount
}

// ============================================
// DOSE TIER CLASSIFICATION
// ============================================

export type DoseTier = 'starting' | 'titrating' | 'maintenance' | 'max'

export interface DoseWithTier extends Dose {
  tier: DoseTier
  tierLabel: string
  tierDescription: string
}

/**
 * Get dose tier classification for quick selection UI
 * - Starting: First/lowest dose for new patients
 * - Titrating: Building up doses (between starting and maintenance)
 * - Maintenance: Therapeutic range doses
 * - Max: Maximum allowed dose
 */
export function getDoseTier(medicationId: string, doseId: string): DoseTier {
  const ref = getDosingReference(medicationId)
  if (!ref) return 'titrating'

  const dose = ref.standardDoses.find(d => d.id === doseId)
  if (!dose) return 'titrating'

  // Check if starting dose
  if (dose.id === ref.startingDose.id) {
    return 'starting'
  }

  // Check if max dose
  if (dose.id === ref.maximumDose.id) {
    return 'max'
  }

  // Check if maintenance (at or above min maintenance)
  if (dose.amount >= ref.maintenanceDoseRange.min.amount) {
    return 'maintenance'
  }

  // Otherwise titrating
  return 'titrating'
}

/**
 * Get all doses with tier information for a medication
 */
export function getDosesWithTiers(medicationId: string): DoseWithTier[] {
  const ref = getDosingReference(medicationId)
  if (!ref) return []

  return ref.standardDoses.map(dose => {
    const tier = getDoseTier(medicationId, dose.id)

    const tierLabels: Record<DoseTier, string> = {
      starting: 'Starting',
      titrating: 'Building Up',
      maintenance: 'Maintenance',
      max: 'Maximum',
    }

    const tierDescriptions: Record<DoseTier, string> = {
      starting: 'Recommended starting dose for new patients',
      titrating: 'Intermediate dose during titration phase',
      maintenance: 'Therapeutic maintenance dose range',
      max: 'Maximum recommended dose',
    }

    return {
      ...dose,
      tier,
      tierLabel: tierLabels[tier],
      tierDescription: tierDescriptions[tier],
    }
  })
}

/**
 * Get doses grouped by tier for quick selection
 */
export function getDosesByTier(medicationId: string): Record<DoseTier, DoseWithTier[]> {
  const doses = getDosesWithTiers(medicationId)

  return {
    starting: doses.filter(d => d.tier === 'starting'),
    titrating: doses.filter(d => d.tier === 'titrating'),
    maintenance: doses.filter(d => d.tier === 'maintenance'),
    max: doses.filter(d => d.tier === 'max'),
  }
}

/**
 * Get representative dose for each tier (for quick selection buttons)
 */
export function getQuickSelectDoses(medicationId: string): {
  tier: DoseTier
  label: string
  dose: DoseWithTier
}[] {
  const ref = getDosingReference(medicationId)
  if (!ref) return []

  const doses = getDosesWithTiers(medicationId)
  const result: { tier: DoseTier; label: string; dose: DoseWithTier }[] = []

  // Starting dose
  const startingDose = doses.find(d => d.tier === 'starting')
  if (startingDose) {
    result.push({ tier: 'starting', label: 'Starting', dose: startingDose })
  }

  // Middle/titrating dose (pick middle one)
  const titratingDoses = doses.filter(d => d.tier === 'titrating')
  if (titratingDoses.length > 0) {
    const midIndex = Math.floor(titratingDoses.length / 2)
    result.push({ tier: 'titrating', label: 'Middle', dose: titratingDoses[midIndex] })
  }

  // Maintenance dose (pick min maintenance, exclude max since it's a separate tier)
  const maintenanceDoses = doses.filter(d => d.tier === 'maintenance')
  if (maintenanceDoses.length > 0) {
    result.push({ tier: 'maintenance', label: 'Maintenance', dose: maintenanceDoses[0] })
  }

  // Max dose
  const maxDose = doses.find(d => d.tier === 'max')
  if (maxDose) {
    result.push({ tier: 'max', label: 'Max', dose: maxDose })
  }

  return result
}


