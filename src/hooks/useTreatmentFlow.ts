'use client'

import { useState, useCallback, useMemo } from 'react'
import type {
  Medication,
  Dose,
  TreatmentPlan,
  PatientType,
  FlowStep,
} from '@/lib/data'
import {
  getMedicationById,
  getPlansForPatientType,
  getStartingDose,
  calculateTotalPrice,
  formatPrice,
} from '@/lib/data'

// ============================================
// TYPES
// ============================================

export type TreatmentFlowStep =
  | 'landing'
  | 'medication'
  | 'goals'
  | 'patient-type'
  | 'dose'
  | 'plan'
  | 'loading'
  | 'summary'

export interface TreatmentFlowState {
  currentStep: TreatmentFlowStep
  direction: 'forward' | 'back'

  // User selections
  selectedMedication: Medication | null
  selectedGoals: string[]
  patientType: PatientType | null
  selectedDose: Dose | null
  selectedPlan: TreatmentPlan | null

  // Computed
  availablePlans: TreatmentPlan[]
}

export interface TreatmentFlowActions {
  // Navigation
  goToStep: (step: TreatmentFlowStep) => void
  goBack: () => void
  goNext: () => void
  reset: () => void

  // Selections
  selectMedication: (medication: Medication) => void
  setGoals: (goals: string[]) => void
  selectPatientType: (type: PatientType) => void
  selectDose: (dose: Dose) => void
  selectPlan: (plan: TreatmentPlan) => void

  // Helpers
  canGoNext: () => boolean
  getStepNumber: () => number
  getTotalSteps: () => number
}

export interface TreatmentFlowReturn extends TreatmentFlowState, TreatmentFlowActions {
  // Computed pricing
  totalPrice: number
  monthlyPrice: number
  savings: number
  formattedTotalPrice: string
  formattedMonthlyPrice: string
  formattedSavings: string
}

// ============================================
// STEP ORDER
// ============================================

const STEP_ORDER: TreatmentFlowStep[] = [
  'landing',
  'medication',
  'patient-type',
  'dose',
  'plan',
  'loading',
  'summary',
]

const STEP_WITH_GOALS: TreatmentFlowStep[] = [
  'landing',
  'medication',
  'goals',
  'patient-type',
  'dose',
  'plan',
  'loading',
  'summary',
]

// ============================================
// INITIAL STATE
// ============================================

const initialState: TreatmentFlowState = {
  currentStep: 'landing',
  direction: 'forward',
  selectedMedication: null,
  selectedGoals: [],
  patientType: null,
  selectedDose: null,
  selectedPlan: null,
  availablePlans: [],
}

// ============================================
// HOOK
// ============================================

export function useTreatmentFlow(): TreatmentFlowReturn {
  const [state, setState] = useState<TreatmentFlowState>(initialState)

  // Get step order based on whether goals flow was used
  const stepOrder = state.selectedGoals.length > 0 ? STEP_WITH_GOALS : STEP_ORDER

  // ============================================
  // NAVIGATION
  // ============================================

  const goToStep = useCallback((step: TreatmentFlowStep) => {
    setState(prev => {
      const currentIndex = stepOrder.indexOf(prev.currentStep)
      const nextIndex = stepOrder.indexOf(step)
      return {
        ...prev,
        currentStep: step,
        direction: nextIndex > currentIndex ? 'forward' : 'back',
      }
    })
  }, [stepOrder])

  const goBack = useCallback(() => {
    setState(prev => {
      const currentIndex = stepOrder.indexOf(prev.currentStep)
      if (currentIndex <= 0) return prev

      // Skip goals step if not used
      let prevIndex = currentIndex - 1
      if (stepOrder[prevIndex] === 'goals' && prev.selectedGoals.length === 0) {
        prevIndex--
      }

      return {
        ...prev,
        currentStep: stepOrder[Math.max(0, prevIndex)],
        direction: 'back',
      }
    })
  }, [stepOrder])

  const goNext = useCallback(() => {
    setState(prev => {
      const currentIndex = stepOrder.indexOf(prev.currentStep)
      if (currentIndex >= stepOrder.length - 1) return prev

      return {
        ...prev,
        currentStep: stepOrder[currentIndex + 1],
        direction: 'forward',
      }
    })
  }, [stepOrder])

  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  // ============================================
  // SELECTIONS
  // ============================================

  const selectMedication = useCallback((medication: Medication) => {
    setState(prev => ({
      ...prev,
      selectedMedication: medication,
      // Reset downstream selections
      selectedDose: null,
      selectedPlan: null,
      availablePlans: [],
    }))
  }, [])

  const setGoals = useCallback((goals: string[]) => {
    setState(prev => ({
      ...prev,
      selectedGoals: goals,
    }))
  }, [])

  const selectPatientType = useCallback((type: PatientType) => {
    setState(prev => {
      const plans = prev.selectedMedication
        ? getPlansForPatientType(prev.selectedMedication.id, type)
        : []

      // For new patients, auto-select starting dose
      let dose = prev.selectedDose
      if (type === 'new' && prev.selectedMedication) {
        dose = getStartingDose(prev.selectedMedication.id) ?? null
      } else if (type === 'existing') {
        dose = null // Will be selected in dose step
      }

      return {
        ...prev,
        patientType: type,
        selectedDose: dose,
        availablePlans: plans,
        selectedPlan: null,
      }
    })
  }, [])

  const selectDose = useCallback((dose: Dose) => {
    setState(prev => ({
      ...prev,
      selectedDose: dose,
    }))
  }, [])

  const selectPlan = useCallback((plan: TreatmentPlan) => {
    setState(prev => ({
      ...prev,
      selectedPlan: plan,
    }))
  }, [])

  // ============================================
  // HELPERS
  // ============================================

  const canGoNext = useCallback((): boolean => {
    switch (state.currentStep) {
      case 'landing':
        return true
      case 'medication':
        return state.selectedMedication !== null
      case 'goals':
        return state.selectedGoals.length > 0
      case 'patient-type':
        return state.patientType !== null
      case 'dose':
        return state.selectedDose !== null
      case 'plan':
        return state.selectedPlan !== null
      case 'loading':
        return false // Auto-advances
      case 'summary':
        return true
      default:
        return false
    }
  }, [state])

  const getStepNumber = useCallback((): number => {
    const hiddenSteps: TreatmentFlowStep[] = ['landing', 'loading', 'summary']
    const visibleSteps = stepOrder.filter(s => !hiddenSteps.includes(s))
    const currentVisible = visibleSteps.indexOf(state.currentStep)
    return Math.max(currentVisible + 1, 1)
  }, [state.currentStep, stepOrder])

  const getTotalSteps = useCallback((): number => {
    const hiddenSteps: TreatmentFlowStep[] = ['landing', 'loading', 'summary']
    return stepOrder.filter(s => !hiddenSteps.includes(s)).length
  }, [stepOrder])

  // ============================================
  // COMPUTED PRICING
  // ============================================

  const pricing = useMemo(() => {
    if (!state.selectedPlan || !state.selectedDose) {
      return { totalPrice: 0, monthlyPrice: 0, savings: 0 }
    }

    const totalPrice = calculateTotalPrice(state.selectedPlan, state.selectedDose.id)
    const monthlyPrice = totalPrice / state.selectedPlan.durationMonths

    // Calculate savings compared to month-to-month
    let savings = 0
    if (state.selectedPlan.discountPercent) {
      const fullPrice = totalPrice / (1 - state.selectedPlan.discountPercent / 100)
      savings = fullPrice - totalPrice
    }

    return { totalPrice, monthlyPrice, savings }
  }, [state.selectedPlan, state.selectedDose])

  // ============================================
  // RETURN
  // ============================================

  return {
    // State
    ...state,

    // Navigation
    goToStep,
    goBack,
    goNext,
    reset,

    // Selections
    selectMedication,
    setGoals,
    selectPatientType,
    selectDose,
    selectPlan,

    // Helpers
    canGoNext,
    getStepNumber,
    getTotalSteps,

    // Pricing
    ...pricing,
    formattedTotalPrice: formatPrice(pricing.totalPrice),
    formattedMonthlyPrice: formatPrice(pricing.monthlyPrice),
    formattedSavings: formatPrice(pricing.savings),
  }
}


