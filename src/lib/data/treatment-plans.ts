import type { TreatmentPlan, SubscriptionCadence } from '../types'

/**
 * Treatment Plans Database
 *
 * Each medication has 3 plan types:
 * 1. Month-to-Month: Pay as you go, full price
 * 2. Subscription 3-Month: 20% discount, billed upfront or split
 * 3. New Patient Titration: Graduated dosing over 3 months with dose increases
 *
 * Pricing notes:
 * - Prices are fake/representative for POC purposes
 * - New patient titration shows starting month price but includes full 3-month schedule
 * - 3-month subscriptions get 20% off the total
 */

// ============================================
// SUBSCRIPTION CADENCE OPTIONS
// ============================================

export const SUBSCRIPTION_CADENCES: SubscriptionCadence[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    intervalDays: 30,
    intervalMonths: 1,
    discountPercent: 0,
    description: 'Flexible month-to-month billing. Cancel anytime.',
  },
  {
    id: '3-month',
    label: '3-Month Subscription',
    intervalDays: 90,
    intervalMonths: 3,
    discountPercent: 20,
    isRecommended: true,
    description: 'Save 20% with quarterly billing. Best value for ongoing treatment.',
  },
]

// ============================================
// SEMAGLUTIDE TREATMENT PLANS
// ============================================

export const SEMAGLUTIDE_PLANS: TreatmentPlan[] = [
  // Month-to-Month
  {
    id: 'sema-monthly',
    medicationId: 'semaglutide',
    planType: 'month-to-month',
    name: 'Semaglutide Monthly',
    description: 'Flexible month-to-month semaglutide treatment. Ideal for patients wanting flexibility.',
    durationMonths: 1,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'sema-025', pricePerMonth: 299 },
      { doseId: 'sema-050', pricePerMonth: 349 },
      { doseId: 'sema-100', pricePerMonth: 399 },
      { doseId: 'sema-170', pricePerMonth: 449 },
      { doseId: 'sema-240', pricePerMonth: 499 },
    ],
    eligiblePatientTypes: ['existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },

  // 3-Month Subscription (20% discount)
  {
    id: 'sema-3month',
    medicationId: 'semaglutide',
    planType: 'subscription-3month',
    name: 'Semaglutide 3-Month Subscription',
    description: 'Save 20% with our 3-month subscription. Consistent dosing with maximum savings.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'sema-025', pricePerMonth: 239 }, // 299 * 0.8
      { doseId: 'sema-050', pricePerMonth: 279 }, // 349 * 0.8
      { doseId: 'sema-100', pricePerMonth: 319 }, // 399 * 0.8
      { doseId: 'sema-170', pricePerMonth: 359 }, // 449 * 0.8
      { doseId: 'sema-240', pricePerMonth: 399 }, // 499 * 0.8
    ],
    eligiblePatientTypes: ['existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'quarterly',
  },

  // New Patient Titration - Month-to-Month
  {
    id: 'sema-new-patient-monthly',
    medicationId: 'semaglutide',
    planType: 'new-patient-titration',
    name: 'Semaglutide New Patient (Monthly)',
    description: 'Gradual dose increase over 3 months for new patients. Start low, increase as tolerated.',
    durationMonths: 3,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'sema-025', pricePerMonth: 299 }, // Starting dose price shown
    ],
    titrationSchedule: [
      { month: 1, doseId: 'sema-025', doseLabel: '0.25mg', priceForMonth: 299 },
      { month: 2, doseId: 'sema-050', doseLabel: '0.5mg', priceForMonth: 349 },
      { month: 3, doseId: 'sema-100', doseLabel: '1.0mg', priceForMonth: 399 },
    ],
    eligiblePatientTypes: ['new'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },

  // New Patient Titration - 3-Month (20% discount, different doses each month)
  {
    id: 'sema-new-patient-3month',
    medicationId: 'semaglutide',
    planType: 'new-patient-titration',
    name: 'Semaglutide New Patient (3-Month Bundle)',
    description: 'Complete 3-month titration program with 20% savings. Different doses shipped each month.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'sema-025', pricePerMonth: 279 }, // Average discounted price
    ],
    titrationSchedule: [
      { month: 1, doseId: 'sema-025', doseLabel: '0.25mg', priceForMonth: 239 }, // 299 * 0.8
      { month: 2, doseId: 'sema-050', doseLabel: '0.5mg', priceForMonth: 279 },   // 349 * 0.8
      { month: 3, doseId: 'sema-100', doseLabel: '1.0mg', priceForMonth: 319 },   // 399 * 0.8
    ],
    eligiblePatientTypes: ['new'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },
]

// ============================================
// TIRZEPATIDE TREATMENT PLANS
// ============================================

export const TIRZEPATIDE_PLANS: TreatmentPlan[] = [
  // Month-to-Month
  {
    id: 'tirz-monthly',
    medicationId: 'tirzepatide',
    planType: 'month-to-month',
    name: 'Tirzepatide Monthly',
    description: 'Flexible month-to-month tirzepatide treatment. Premium dual-agonist therapy.',
    durationMonths: 1,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'tirz-250', pricePerMonth: 449 },
      { doseId: 'tirz-500', pricePerMonth: 499 },
      { doseId: 'tirz-750', pricePerMonth: 549 },
      { doseId: 'tirz-1000', pricePerMonth: 599 },
      { doseId: 'tirz-1250', pricePerMonth: 649 },
      { doseId: 'tirz-1500', pricePerMonth: 699 },
    ],
    eligiblePatientTypes: ['existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },

  // 3-Month Subscription
  {
    id: 'tirz-3month',
    medicationId: 'tirzepatide',
    planType: 'subscription-3month',
    name: 'Tirzepatide 3-Month Subscription',
    description: 'Save 20% on tirzepatide with 3-month commitment.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'tirz-250', pricePerMonth: 359 },
      { doseId: 'tirz-500', pricePerMonth: 399 },
      { doseId: 'tirz-750', pricePerMonth: 439 },
      { doseId: 'tirz-1000', pricePerMonth: 479 },
      { doseId: 'tirz-1250', pricePerMonth: 519 },
      { doseId: 'tirz-1500', pricePerMonth: 559 },
    ],
    eligiblePatientTypes: ['existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'quarterly',
  },

  // New Patient Titration - Monthly
  {
    id: 'tirz-new-patient-monthly',
    medicationId: 'tirzepatide',
    planType: 'new-patient-titration',
    name: 'Tirzepatide New Patient (Monthly)',
    description: 'Start tirzepatide with gradual dose escalation. Monthly billing with dose increases.',
    durationMonths: 3,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'tirz-250', pricePerMonth: 449 },
    ],
    titrationSchedule: [
      { month: 1, doseId: 'tirz-250', doseLabel: '2.5mg', priceForMonth: 449 },
      { month: 2, doseId: 'tirz-500', doseLabel: '5.0mg', priceForMonth: 499 },
      { month: 3, doseId: 'tirz-750', doseLabel: '7.5mg', priceForMonth: 549 },
    ],
    eligiblePatientTypes: ['new'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },

  // New Patient Titration - 3-Month Bundle
  {
    id: 'tirz-new-patient-3month',
    medicationId: 'tirzepatide',
    planType: 'new-patient-titration',
    name: 'Tirzepatide New Patient (3-Month Bundle)',
    description: 'Complete titration program with 20% savings. All 3 months of graduated doses.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'tirz-250', pricePerMonth: 399 },
    ],
    titrationSchedule: [
      { month: 1, doseId: 'tirz-250', doseLabel: '2.5mg', priceForMonth: 359 },
      { month: 2, doseId: 'tirz-500', doseLabel: '5.0mg', priceForMonth: 399 },
      { month: 3, doseId: 'tirz-750', doseLabel: '7.5mg', priceForMonth: 439 },
    ],
    eligiblePatientTypes: ['new'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },
]

// ============================================
// RETATRUTIDE TREATMENT PLANS
// ============================================

export const RETATRUTIDE_PLANS: TreatmentPlan[] = [
  {
    id: 'reta-monthly',
    medicationId: 'retatrutide',
    planType: 'month-to-month',
    name: 'Retatrutide Monthly',
    description: 'Cutting-edge triple-agonist therapy. Premium pricing for investigational peptide.',
    durationMonths: 1,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'reta-100', pricePerMonth: 549 },
      { doseId: 'reta-200', pricePerMonth: 599 },
      { doseId: 'reta-400', pricePerMonth: 699 },
      { doseId: 'reta-800', pricePerMonth: 799 },
      { doseId: 'reta-1200', pricePerMonth: 899 },
    ],
    eligiblePatientTypes: ['existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },

  {
    id: 'reta-3month',
    medicationId: 'retatrutide',
    planType: 'subscription-3month',
    name: 'Retatrutide 3-Month Subscription',
    description: 'Save 20% on premium triple-agonist therapy.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'reta-100', pricePerMonth: 439 },
      { doseId: 'reta-200', pricePerMonth: 479 },
      { doseId: 'reta-400', pricePerMonth: 559 },
      { doseId: 'reta-800', pricePerMonth: 639 },
      { doseId: 'reta-1200', pricePerMonth: 719 },
    ],
    eligiblePatientTypes: ['existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'quarterly',
  },

  {
    id: 'reta-new-patient-monthly',
    medicationId: 'retatrutide',
    planType: 'new-patient-titration',
    name: 'Retatrutide New Patient (Monthly)',
    description: 'Careful titration for new patients starting triple-agonist therapy.',
    durationMonths: 3,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'reta-100', pricePerMonth: 549 },
    ],
    titrationSchedule: [
      { month: 1, doseId: 'reta-100', doseLabel: '1.0mg', priceForMonth: 549 },
      { month: 2, doseId: 'reta-200', doseLabel: '2.0mg', priceForMonth: 599 },
      { month: 3, doseId: 'reta-400', doseLabel: '4.0mg', priceForMonth: 699 },
    ],
    eligiblePatientTypes: ['new'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },

  {
    id: 'reta-new-patient-3month',
    medicationId: 'retatrutide',
    planType: 'new-patient-titration',
    name: 'Retatrutide New Patient (3-Month Bundle)',
    description: 'Complete titration with 20% savings on premium triple-agonist.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'reta-100', pricePerMonth: 492 },
    ],
    titrationSchedule: [
      { month: 1, doseId: 'reta-100', doseLabel: '1.0mg', priceForMonth: 439 },
      { month: 2, doseId: 'reta-200', doseLabel: '2.0mg', priceForMonth: 479 },
      { month: 3, doseId: 'reta-400', doseLabel: '4.0mg', priceForMonth: 559 },
    ],
    eligiblePatientTypes: ['new'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },
]

// ============================================
// SERMORELIN TREATMENT PLANS
// ============================================

export const SERMORELIN_PLANS: TreatmentPlan[] = [
  {
    id: 'serm-monthly',
    medicationId: 'sermorelin',
    planType: 'month-to-month',
    name: 'Sermorelin Monthly',
    description: 'Growth hormone optimization with flexible monthly billing.',
    durationMonths: 1,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'serm-100', pricePerMonth: 199 },
      { doseId: 'serm-200', pricePerMonth: 249 },
      { doseId: 'serm-300', pricePerMonth: 299 },
      { doseId: 'serm-500', pricePerMonth: 349 },
    ],
    eligiblePatientTypes: ['existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },

  {
    id: 'serm-3month',
    medicationId: 'sermorelin',
    planType: 'subscription-3month',
    name: 'Sermorelin 3-Month Subscription',
    description: 'Save 20% on growth hormone optimization therapy.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'serm-100', pricePerMonth: 159 },
      { doseId: 'serm-200', pricePerMonth: 199 },
      { doseId: 'serm-300', pricePerMonth: 239 },
      { doseId: 'serm-500', pricePerMonth: 279 },
    ],
    eligiblePatientTypes: ['existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'quarterly',
  },

  {
    id: 'serm-new-patient-monthly',
    medicationId: 'sermorelin',
    planType: 'new-patient-titration',
    name: 'Sermorelin New Patient (Monthly)',
    description: 'Start growth hormone therapy with gradual dose optimization.',
    durationMonths: 3,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'serm-100', pricePerMonth: 199 },
    ],
    titrationSchedule: [
      { month: 1, doseId: 'serm-100', doseLabel: '100mcg', priceForMonth: 199 },
      { month: 2, doseId: 'serm-200', doseLabel: '200mcg', priceForMonth: 249 },
      { month: 3, doseId: 'serm-300', doseLabel: '300mcg', priceForMonth: 299 },
    ],
    eligiblePatientTypes: ['new'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },

  {
    id: 'serm-new-patient-3month',
    medicationId: 'sermorelin',
    planType: 'new-patient-titration',
    name: 'Sermorelin New Patient (3-Month Bundle)',
    description: 'Complete titration program with 20% savings.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'serm-100', pricePerMonth: 199 },
    ],
    titrationSchedule: [
      { month: 1, doseId: 'serm-100', doseLabel: '100mcg', priceForMonth: 159 },
      { month: 2, doseId: 'serm-200', doseLabel: '200mcg', priceForMonth: 199 },
      { month: 3, doseId: 'serm-300', doseLabel: '300mcg', priceForMonth: 239 },
    ],
    eligiblePatientTypes: ['new'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'monthly',
  },
]

// ============================================
// NAD+ TREATMENT PLANS
// ============================================

export const NAD_INJECTION_PLANS: TreatmentPlan[] = [
  {
    id: 'nad-inj-monthly',
    medicationId: 'nad-injection',
    planType: 'month-to-month',
    name: 'NAD+ Injection Monthly',
    description: 'Cellular energy support with convenient at-home injections.',
    durationMonths: 1,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'nad-inj-50', pricePerMonth: 199 },
      { doseId: 'nad-inj-100', pricePerMonth: 299 },
      { doseId: 'nad-inj-200', pricePerMonth: 399 },
    ],
    eligiblePatientTypes: ['new', 'existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'initial',
  },

  {
    id: 'nad-inj-3month',
    medicationId: 'nad-injection',
    planType: 'subscription-3month',
    name: 'NAD+ Injection 3-Month Subscription',
    description: 'Save 20% on cellular energy optimization.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'nad-inj-50', pricePerMonth: 159 },
      { doseId: 'nad-inj-100', pricePerMonth: 239 },
      { doseId: 'nad-inj-200', pricePerMonth: 319 },
    ],
    eligiblePatientTypes: ['new', 'existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'quarterly',
  },
]

// ============================================
// BPC-157 TREATMENT PLANS
// ============================================

export const BPC157_PLANS: TreatmentPlan[] = [
  {
    id: 'bpc-monthly',
    medicationId: 'bpc157',
    planType: 'month-to-month',
    name: 'BPC-157 Monthly',
    description: 'Tissue healing and recovery support with flexible billing.',
    durationMonths: 1,
    billingCycle: 'monthly',
    pricing: [
      { doseId: 'bpc-250', pricePerMonth: 179 },
      { doseId: 'bpc-500', pricePerMonth: 249 },
      { doseId: 'bpc-750', pricePerMonth: 319 },
    ],
    eligiblePatientTypes: ['new', 'existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'initial',
  },

  {
    id: 'bpc-3month',
    medicationId: 'bpc157',
    planType: 'subscription-3month',
    name: 'BPC-157 3-Month Subscription',
    description: 'Extended healing protocol with 20% savings.',
    durationMonths: 3,
    billingCycle: 'upfront',
    discountPercent: 20,
    pricing: [
      { doseId: 'bpc-250', pricePerMonth: 143 },
      { doseId: 'bpc-500', pricePerMonth: 199 },
      { doseId: 'bpc-750', pricePerMonth: 255 },
    ],
    eligiblePatientTypes: ['new', 'existing'],
    includesSupplies: true,
    includesConsultation: true,
    consultationFrequency: 'quarterly',
  },
]

// ============================================
// ALL PLANS COMBINED
// ============================================

export const ALL_TREATMENT_PLANS: TreatmentPlan[] = [
  ...SEMAGLUTIDE_PLANS,
  ...TIRZEPATIDE_PLANS,
  ...RETATRUTIDE_PLANS,
  ...SERMORELIN_PLANS,
  ...NAD_INJECTION_PLANS,
  ...BPC157_PLANS,
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getPlansByMedication(medicationId: string): TreatmentPlan[] {
  return ALL_TREATMENT_PLANS.filter(plan => plan.medicationId === medicationId)
}

export function getPlansByType(planType: TreatmentPlan['planType']): TreatmentPlan[] {
  return ALL_TREATMENT_PLANS.filter(plan => plan.planType === planType)
}

export function getPlansForPatientType(
  medicationId: string,
  patientType: 'new' | 'existing'
): TreatmentPlan[] {
  return ALL_TREATMENT_PLANS.filter(
    plan => plan.medicationId === medicationId &&
            plan.eligiblePatientTypes.includes(patientType)
  )
}

export function getPlanById(planId: string): TreatmentPlan | undefined {
  return ALL_TREATMENT_PLANS.find(plan => plan.id === planId)
}

export function calculateTotalPrice(plan: TreatmentPlan, doseId: string): number {
  if (plan.titrationSchedule) {
    // For titration plans, sum all months
    return plan.titrationSchedule.reduce((sum, month) => sum + month.priceForMonth, 0)
  }

  const pricing = plan.pricing.find(p => p.doseId === doseId)
  if (!pricing) return 0

  return pricing.pricePerMonth * plan.durationMonths
}

export function calculateMonthlySavings(
  monthlyPlan: TreatmentPlan,
  subscriptionPlan: TreatmentPlan,
  doseId: string
): number {
  const monthlyPrice = monthlyPlan.pricing.find(p => p.doseId === doseId)?.pricePerMonth ?? 0
  const subPrice = subscriptionPlan.pricing.find(p => p.doseId === doseId)?.pricePerMonth ?? 0

  return monthlyPrice - subPrice
}

