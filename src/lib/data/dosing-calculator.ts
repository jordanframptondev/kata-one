import type { Dose } from '../types'
import {
  getDosingReference,
  estimateDoseByWeeksOnMedication,
  type DosingReference
} from './dosing-reference'

/**
 * Dosing Calculator
 *
 * Helps existing patients estimate their current dose when they don't know it.
 * Similar to: https://glpeak.ai/dosage-calculator
 *
 * The calculator works by asking a series of questions:
 * 1. Which medication are you taking?
 * 2. How long have you been on this medication?
 * 3. Have you had any dose increases?
 * 4. What's your current injection volume/pen clicks? (optional)
 */

// ============================================
// CALCULATOR QUESTION TYPES
// ============================================

export interface CalculatorQuestion {
  id: string
  question: string
  helpText?: string
  type: 'select' | 'number' | 'boolean'
  options?: CalculatorOption[]
  unit?: string
  min?: number
  max?: number
}

export interface CalculatorOption {
  value: string | number
  label: string
  description?: string
}

export interface CalculatorAnswer {
  questionId: string
  value: string | number | boolean
}

export interface CalculatorResult {
  estimatedDose: Dose
  confidence: 'high' | 'medium' | 'low'
  explanation: string
  alternativeDoses?: Dose[]
  recommendation: string
}

// ============================================
// CALCULATOR QUESTIONS BY MEDICATION
// ============================================

export function getCalculatorQuestions(medicationId: string): CalculatorQuestion[] {
  const baseQuestions: CalculatorQuestion[] = [
    {
      id: 'duration',
      question: 'How long have you been taking this medication?',
      helpText: 'This helps us estimate where you might be in your titration schedule.',
      type: 'select',
      options: [
        { value: 'less-than-1-month', label: 'Less than 1 month' },
        { value: '1-2-months', label: '1-2 months' },
        { value: '2-3-months', label: '2-3 months' },
        { value: '3-4-months', label: '3-4 months' },
        { value: '4-6-months', label: '4-6 months' },
        { value: 'more-than-6-months', label: 'More than 6 months' },
      ],
    },
    {
      id: 'dose-increases',
      question: 'Have you had any dose increases since starting?',
      helpText: 'Most patients increase their dose every 4 weeks.',
      type: 'select',
      options: [
        { value: 0, label: 'No, still on starting dose' },
        { value: 1, label: 'Yes, 1 increase' },
        { value: 2, label: 'Yes, 2 increases' },
        { value: 3, label: 'Yes, 3 increases' },
        { value: 4, label: 'Yes, 4 or more increases' },
        { value: -1, label: "I'm not sure" },
      ],
    },
    {
      id: 'side-effects',
      question: 'How are you tolerating the medication?',
      helpText: 'This can indicate if you\'re at an appropriate dose level.',
      type: 'select',
      options: [
        { value: 'well', label: 'Very well, minimal side effects' },
        { value: 'moderate', label: 'Some nausea or GI symptoms' },
        { value: 'significant', label: 'Significant side effects' },
      ],
    },
  ]

  // Add medication-specific questions
  const ref = getDosingReference(medicationId)
  if (ref && isPenMedication(medicationId)) {
    baseQuestions.push({
      id: 'pen-type',
      question: 'What pen strength are you using?',
      helpText: 'This is usually printed on your pen or box.',
      type: 'select',
      options: getPenOptions(medicationId),
    })
  }

  return baseQuestions
}

// ============================================
// PEN MEDICATION HELPERS
// ============================================

function isPenMedication(medicationId: string): boolean {
  return ['semaglutide', 'tirzepatide', 'liraglutide'].includes(medicationId)
}

function getPenOptions(medicationId: string): CalculatorOption[] {
  switch (medicationId) {
    case 'semaglutide':
      return [
        { value: 'pen-0.25-0.5', label: '0.25mg or 0.5mg pen', description: 'Starting pen' },
        { value: 'pen-1.0', label: '1.0mg pen' },
        { value: 'pen-1.7-2.4', label: '1.7mg or 2.4mg pen', description: 'Higher dose pen' },
        { value: 'unknown', label: 'I\'m not sure' },
      ]
    case 'tirzepatide':
      return [
        { value: 'pen-2.5', label: '2.5mg pen' },
        { value: 'pen-5.0', label: '5.0mg pen' },
        { value: 'pen-7.5', label: '7.5mg pen' },
        { value: 'pen-10.0', label: '10.0mg pen' },
        { value: 'pen-12.5', label: '12.5mg pen' },
        { value: 'pen-15.0', label: '15.0mg pen' },
        { value: 'unknown', label: 'I\'m not sure' },
      ]
    case 'liraglutide':
      return [
        { value: 'pen-multi', label: 'Multi-dose pen (3ml)' },
        { value: 'unknown', label: 'I\'m not sure' },
      ]
    default:
      return []
  }
}

// ============================================
// DOSE CALCULATION LOGIC
// ============================================

export function calculateEstimatedDose(
  medicationId: string,
  answers: CalculatorAnswer[]
): CalculatorResult {
  const ref = getDosingReference(medicationId)
  if (!ref) {
    return {
      estimatedDose: { id: 'unknown', amount: 0, unit: 'mg', label: 'Unknown' },
      confidence: 'low',
      explanation: 'Unable to find dosing reference for this medication.',
      recommendation: 'Please consult with your healthcare provider.',
    }
  }

  // Extract answers
  const duration = answers.find(a => a.questionId === 'duration')?.value as string
  const doseIncreases = answers.find(a => a.questionId === 'dose-increases')?.value as number
  const penType = answers.find(a => a.questionId === 'pen-type')?.value as string
  const sideEffects = answers.find(a => a.questionId === 'side-effects')?.value as string

  // Convert duration to approximate weeks
  const weeksOnMedication = durationToWeeks(duration)

  // Method 1: Estimate based on duration
  const durationBasedDose = estimateDoseByWeeksOnMedication(medicationId, weeksOnMedication)

  // Method 2: Estimate based on number of increases
  const increaseBasedDose = estimateDoseByIncreases(ref, doseIncreases)

  // Method 3: If pen type is known, use that
  const penBasedDose = penType ? estimateDoseByPen(medicationId, penType) : undefined

  // Combine estimates with confidence scoring
  const { estimatedDose, confidence, alternativeDoses } = combineEstimates(
    ref,
    durationBasedDose,
    increaseBasedDose,
    penBasedDose,
    sideEffects
  )

  // Generate explanation
  const explanation = generateExplanation(
    estimatedDose,
    confidence,
    weeksOnMedication,
    doseIncreases,
    ref
  )

  // Generate recommendation
  const recommendation = generateRecommendation(estimatedDose, confidence, ref)

  return {
    estimatedDose,
    confidence,
    explanation,
    alternativeDoses,
    recommendation,
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function durationToWeeks(duration: string): number {
  switch (duration) {
    case 'less-than-1-month': return 2
    case '1-2-months': return 6
    case '2-3-months': return 10
    case '3-4-months': return 14
    case '4-6-months': return 20
    case 'more-than-6-months': return 28
    default: return 4
  }
}

function estimateDoseByIncreases(ref: DosingReference, increases: number): Dose | undefined {
  if (increases < 0) return undefined // "Not sure" selected

  const doseIndex = Math.min(increases, ref.standardDoses.length - 1)
  return ref.standardDoses[doseIndex]
}

function estimateDoseByPen(medicationId: string, penType: string): Dose | undefined {
  if (penType === 'unknown') return undefined

  const ref = getDosingReference(medicationId)
  if (!ref) return undefined

  // Map pen type to dose
  switch (medicationId) {
    case 'semaglutide':
      if (penType === 'pen-0.25-0.5') return ref.standardDoses.find(d => d.amount <= 0.5)
      if (penType === 'pen-1.0') return ref.standardDoses.find(d => d.amount === 1.0)
      if (penType === 'pen-1.7-2.4') return ref.standardDoses.find(d => d.amount >= 1.7)
      break
    case 'tirzepatide':
      const amount = parseFloat(penType.replace('pen-', ''))
      return ref.standardDoses.find(d => d.amount === amount)
  }

  return undefined
}

function combineEstimates(
  ref: DosingReference,
  durationDose: Dose | undefined,
  increaseDose: Dose | undefined,
  penDose: Dose | undefined,
  sideEffects: string
): {
  estimatedDose: Dose
  confidence: 'high' | 'medium' | 'low'
  alternativeDoses: Dose[]
} {
  const estimates: Dose[] = []

  if (penDose) estimates.push(penDose)
  if (increaseDose) estimates.push(increaseDose)
  if (durationDose) estimates.push(durationDose)

  if (estimates.length === 0) {
    // Fallback to starting dose
    return {
      estimatedDose: ref.startingDose,
      confidence: 'low',
      alternativeDoses: ref.standardDoses.slice(0, 3),
    }
  }

  // If pen-based dose exists, it's most reliable
  if (penDose) {
    const alternatives = ref.standardDoses.filter(d => d.id !== penDose.id)
    return {
      estimatedDose: penDose,
      confidence: 'high',
      alternativeDoses: alternatives.slice(0, 2),
    }
  }

  // If duration and increase-based agree, high confidence
  if (durationDose && increaseDose && durationDose.id === increaseDose.id) {
    const alternatives = ref.standardDoses.filter(d => d.id !== durationDose.id)
    return {
      estimatedDose: durationDose,
      confidence: 'high',
      alternativeDoses: alternatives.slice(0, 2),
    }
  }

  // If significant side effects, likely at appropriate or slightly high dose
  if (sideEffects === 'significant' && durationDose) {
    // They might be at the expected dose or even lower due to tolerance issues
    const currentIndex = ref.standardDoses.findIndex(d => d.id === durationDose.id)
    const adjustedDose = currentIndex > 0
      ? ref.standardDoses[currentIndex - 1]
      : durationDose

    return {
      estimatedDose: adjustedDose,
      confidence: 'medium',
      alternativeDoses: [durationDose, ref.standardDoses[0]],
    }
  }

  // Default to duration-based estimate
  const bestEstimate = durationDose || increaseDose || ref.startingDose
  const alternatives = ref.standardDoses
    .filter(d => d.id !== bestEstimate.id)
    .slice(0, 2)

  return {
    estimatedDose: bestEstimate,
    confidence: 'medium',
    alternativeDoses: alternatives,
  }
}

function generateExplanation(
  dose: Dose,
  confidence: 'high' | 'medium' | 'low',
  weeks: number,
  increases: number,
  ref: DosingReference
): string {
  if (confidence === 'high') {
    return `Based on your answers, you're most likely taking ${dose.label} ${ref.dosingFrequency.toLowerCase()}. This aligns with typical dosing at your stage of treatment.`
  }

  if (confidence === 'medium') {
    return `Based on ${weeks} weeks of treatment and ${increases >= 0 ? increases : 'an unknown number of'} dose increase(s), we estimate you're taking approximately ${dose.label}. However, please verify this with your prescription.`
  }

  return `We couldn't determine your exact dose with certainty. Based on limited information, we estimate ${dose.label}, but please check your prescription or contact your provider.`
}

function generateRecommendation(
  dose: Dose,
  confidence: 'high' | 'medium' | 'low',
  ref: DosingReference
): string {
  if (confidence === 'low') {
    return 'We recommend checking your prescription label or contacting your healthcare provider to confirm your current dose before proceeding.'
  }

  const isMaintenanceDose = dose.amount >= ref.maintenanceDoseRange.min.amount

  if (isMaintenanceDose) {
    return `You appear to be at a maintenance dose. You can continue with this dose or discuss optimization with your provider.`
  }

  return `You appear to be in the titration phase. Your provider may increase your dose at your next check-in if you're tolerating it well.`
}

