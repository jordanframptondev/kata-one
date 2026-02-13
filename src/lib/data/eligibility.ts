import type { EligibilityScreening, HealthMetrics } from '../types'

/**
 * Eligibility Screening Data
 *
 * Medical eligibility questions and requirements for each medication.
 * These would typically be reviewed/approved by a physician.
 */

// ============================================
// BMI REQUIREMENTS BY MEDICATION
// ============================================

export interface BMIRequirement {
  medicationId: string
  minimumBMI: number
  alternativeQualification?: string // e.g., "or BMI ≥27 with comorbidity"
  comorbidities?: string[]
}

export const BMI_REQUIREMENTS: BMIRequirement[] = [
  {
    medicationId: 'semaglutide',
    minimumBMI: 30,
    alternativeQualification: 'BMI ≥27 with at least one weight-related comorbidity',
    comorbidities: [
      'Type 2 diabetes',
      'Hypertension',
      'Dyslipidemia',
      'Obstructive sleep apnea',
      'Cardiovascular disease',
    ],
  },
  {
    medicationId: 'tirzepatide',
    minimumBMI: 30,
    alternativeQualification: 'BMI ≥27 with at least one weight-related comorbidity',
    comorbidities: [
      'Type 2 diabetes',
      'Hypertension',
      'Dyslipidemia',
      'Obstructive sleep apnea',
      'Cardiovascular disease',
    ],
  },
  {
    medicationId: 'retatrutide',
    minimumBMI: 30,
    alternativeQualification: 'BMI ≥27 with at least one weight-related comorbidity',
    comorbidities: [
      'Type 2 diabetes',
      'Hypertension',
      'Dyslipidemia',
    ],
  },
  {
    medicationId: 'liraglutide',
    minimumBMI: 30,
    alternativeQualification: 'BMI ≥27 with at least one weight-related comorbidity',
    comorbidities: [
      'Type 2 diabetes',
      'Hypertension',
      'Dyslipidemia',
    ],
  },
  // Growth hormone and other peptides typically don't have BMI requirements
  {
    medicationId: 'sermorelin',
    minimumBMI: 0, // No minimum
  },
  {
    medicationId: 'ipamorelin',
    minimumBMI: 0,
  },
  {
    medicationId: 'nad-injection',
    minimumBMI: 0,
  },
  {
    medicationId: 'bpc157',
    minimumBMI: 0,
  },
]

// ============================================
// ELIGIBILITY SCREENING QUESTIONS
// ============================================

export const ELIGIBILITY_SCREENINGS: EligibilityScreening[] = [
  // GLP-1 Agonists (Semaglutide, Tirzepatide, Liraglutide, Retatrutide)
  {
    medicationId: 'semaglutide',
    questions: [
      {
        id: 'mtc-history',
        question: 'Do you or any blood relatives have a history of medullary thyroid carcinoma (MTC)?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'men2',
        question: 'Have you been diagnosed with Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'pregnant',
        question: 'Are you currently pregnant, breastfeeding, or planning to become pregnant in the next 6 months?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'pancreatitis',
        question: 'Have you ever had pancreatitis?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'diabetic-retinopathy',
        question: 'Do you have diabetic retinopathy?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'kidney-disease',
        question: 'Do you have severe kidney disease or are you on dialysis?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'eating-disorder',
        question: 'Do you have a history of eating disorders (anorexia, bulimia)?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'current-glp1',
        question: 'Are you currently taking any other GLP-1 medications?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'age',
        question: 'What is your age?',
        type: 'number',
        required: true,
        disqualifyingAnswers: [], // Handled by range check
      },
    ],
  },

  {
    medicationId: 'tirzepatide',
    questions: [
      {
        id: 'mtc-history',
        question: 'Do you or any blood relatives have a history of medullary thyroid carcinoma (MTC)?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'men2',
        question: 'Have you been diagnosed with Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'pregnant',
        question: 'Are you currently pregnant, breastfeeding, or planning to become pregnant in the next 6 months?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'pancreatitis',
        question: 'Have you ever had pancreatitis?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'gallbladder',
        question: 'Do you have a history of gallbladder disease or gallstones?',
        type: 'boolean',
        required: true,
        // Not disqualifying, but requires physician review
      },
    ],
  },

  // Growth Hormone Peptides
  {
    medicationId: 'sermorelin',
    questions: [
      {
        id: 'cancer-history',
        question: 'Do you have any active cancer or history of cancer in the past 5 years?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'pregnant',
        question: 'Are you currently pregnant or breastfeeding?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'pituitary-disorder',
        question: 'Do you have any pituitary gland disorders?',
        type: 'boolean',
        required: true,
        // Not disqualifying, but requires review
      },
    ],
  },

  // NAD+
  {
    medicationId: 'nad-injection',
    questions: [
      {
        id: 'cardiac',
        question: 'Do you have any severe heart conditions or uncontrolled heart disease?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'hypertension',
        question: 'Do you have uncontrolled high blood pressure?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
    ],
  },

  // BPC-157
  {
    medicationId: 'bpc157',
    questions: [
      {
        id: 'cancer-active',
        question: 'Do you have any active cancer?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
      {
        id: 'pregnant',
        question: 'Are you currently pregnant or breastfeeding?',
        type: 'boolean',
        required: true,
        disqualifyingAnswers: [true],
      },
    ],
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getEligibilityForMedication(medicationId: string): EligibilityScreening | undefined {
  return ELIGIBILITY_SCREENINGS.find(e => e.medicationId === medicationId)
}

export function getBMIRequirement(medicationId: string): BMIRequirement | undefined {
  return BMI_REQUIREMENTS.find(r => r.medicationId === medicationId)
}

export function calculateBMI(heightInches: number, weightLbs: number): number {
  // BMI = (weight in pounds × 703) / (height in inches)²
  return (weightLbs * 703) / (heightInches * heightInches)
}

export function checkBMIEligibility(
  medicationId: string,
  metrics: HealthMetrics,
  hasComorbidity: boolean = false
): { eligible: boolean; reason?: string } {
  const requirement = getBMIRequirement(medicationId)

  if (!requirement || requirement.minimumBMI === 0) {
    return { eligible: true }
  }

  if (!metrics.heightInches || !metrics.weightLbs) {
    return { eligible: false, reason: 'Height and weight required for eligibility check' }
  }

  const bmi = calculateBMI(metrics.heightInches, metrics.weightLbs)

  if (bmi >= requirement.minimumBMI) {
    return { eligible: true }
  }

  // Check alternative qualification (BMI 27-30 with comorbidity)
  if (bmi >= 27 && hasComorbidity && requirement.alternativeQualification) {
    return { eligible: true }
  }

  return {
    eligible: false,
    reason: `BMI of ${bmi.toFixed(1)} does not meet minimum requirement of ${requirement.minimumBMI}. ${requirement.alternativeQualification || ''}`,
  }
}

export function isDisqualifyingAnswer(
  questionId: string,
  answer: string | boolean | number,
  screening: EligibilityScreening
): boolean {
  const question = screening.questions.find(q => q.id === questionId)
  if (!question || !question.disqualifyingAnswers) return false

  return question.disqualifyingAnswers.includes(answer)
}

