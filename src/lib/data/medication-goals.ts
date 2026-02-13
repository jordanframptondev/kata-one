/**
 * Medication Goals & Indicators
 *
 * Maps patient goals to recommended medications.
 * Used for the "What medication is best for me?" feature.
 */

// ============================================
// GOAL DEFINITIONS
// ============================================

export type GoalId =
  | 'weight-loss'
  | 'appetite-control'
  | 'blood-sugar'
  | 'energy'
  | 'anti-aging'
  | 'muscle-recovery'
  | 'sleep'
  | 'libido'
  | 'gut-health'
  | 'cognitive'
  | 'body-composition'

export interface Goal {
  id: GoalId
  label: string
  description: string
  icon: string // Lucide icon name
}

export const GOALS: Goal[] = [
  {
    id: 'weight-loss',
    label: 'Lose Weight',
    description: 'Reduce body weight and body fat percentage',
    icon: 'Scale',
  },
  {
    id: 'appetite-control',
    label: 'Control Appetite',
    description: 'Reduce cravings and feel fuller longer',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'blood-sugar',
    label: 'Manage Blood Sugar',
    description: 'Improve glycemic control and A1C levels',
    icon: 'Activity',
  },
  {
    id: 'energy',
    label: 'Boost Energy',
    description: 'Increase daily energy and reduce fatigue',
    icon: 'Zap',
  },
  {
    id: 'anti-aging',
    label: 'Anti-Aging',
    description: 'Support longevity and cellular health',
    icon: 'Sparkles',
  },
  {
    id: 'muscle-recovery',
    label: 'Muscle & Recovery',
    description: 'Build muscle and speed up recovery',
    icon: 'Dumbbell',
  },
  {
    id: 'sleep',
    label: 'Better Sleep',
    description: 'Improve sleep quality and recovery',
    icon: 'Moon',
  },
  {
    id: 'libido',
    label: 'Improve Libido',
    description: 'Enhance sexual desire and function',
    icon: 'Heart',
  },
  {
    id: 'gut-health',
    label: 'Gut Health',
    description: 'Support digestive health and healing',
    icon: 'Leaf',
  },
  {
    id: 'cognitive',
    label: 'Mental Clarity',
    description: 'Improve focus, memory, and brain function',
    icon: 'Brain',
  },
  {
    id: 'body-composition',
    label: 'Body Recomposition',
    description: 'Lose fat while maintaining or gaining muscle',
    icon: 'TrendingUp',
  },
]

// ============================================
// MEDICATION GOAL MAPPINGS
// ============================================

export interface MedicationGoalMapping {
  medicationId: string
  goals: GoalId[]
  primaryGoals: GoalId[] // Top 1-2 goals this medication is best for
  effectiveness: Record<GoalId, 1 | 2 | 3 | 4 | 5> // 1-5 rating
  keyBenefits: string[]
  bestFor: string // One-liner for who this is best for
}

export const MEDICATION_GOAL_MAPPINGS: MedicationGoalMapping[] = [
  // ============================================
  // GLP-1 AGONISTS
  // ============================================
  {
    medicationId: 'semaglutide',
    goals: ['weight-loss', 'appetite-control', 'blood-sugar', 'body-composition'],
    primaryGoals: ['weight-loss', 'appetite-control'],
    effectiveness: {
      'weight-loss': 5,
      'appetite-control': 5,
      'blood-sugar': 5,
      'energy': 3,
      'anti-aging': 2,
      'muscle-recovery': 1,
      'sleep': 2,
      'libido': 1,
      'gut-health': 2,
      'cognitive': 2,
      'body-composition': 4,
    },
    keyBenefits: [
      'Average 15-20% body weight loss',
      'Significantly reduces appetite and cravings',
      'Improves A1C and blood sugar control',
      'Once-weekly injection',
      'FDA-approved for weight loss',
    ],
    bestFor: 'People focused on significant weight loss with proven, FDA-approved medication',
  },

  {
    medicationId: 'liraglutide',
    goals: ['weight-loss', 'appetite-control', 'blood-sugar'],
    primaryGoals: ['weight-loss', 'blood-sugar'],
    effectiveness: {
      'weight-loss': 4,
      'appetite-control': 4,
      'blood-sugar': 5,
      'energy': 2,
      'anti-aging': 2,
      'muscle-recovery': 1,
      'sleep': 2,
      'libido': 1,
      'gut-health': 2,
      'cognitive': 2,
      'body-composition': 3,
    },
    keyBenefits: [
      'Average 8-10% body weight loss',
      'Daily dosing for consistent appetite control',
      'Strong blood sugar management',
      'Established safety profile',
    ],
    bestFor: 'Those who prefer daily dosing or have primarily blood sugar management goals',
  },

  // ============================================
  // DUAL AGONISTS
  // ============================================
  {
    medicationId: 'tirzepatide',
    goals: ['weight-loss', 'appetite-control', 'blood-sugar', 'body-composition'],
    primaryGoals: ['weight-loss', 'blood-sugar'],
    effectiveness: {
      'weight-loss': 5,
      'appetite-control': 5,
      'blood-sugar': 5,
      'energy': 3,
      'anti-aging': 2,
      'muscle-recovery': 2,
      'sleep': 2,
      'libido': 1,
      'gut-health': 2,
      'cognitive': 2,
      'body-composition': 5,
    },
    keyBenefits: [
      'Average 20-25% body weight loss (highest among GLP-1s)',
      'Dual GIP/GLP-1 action for enhanced results',
      'Superior A1C reduction',
      'Once-weekly injection',
      'Better muscle preservation than other GLP-1s',
    ],
    bestFor: 'People seeking maximum weight loss with superior body composition preservation',
  },

  // ============================================
  // TRIPLE AGONISTS
  // ============================================
  {
    medicationId: 'retatrutide',
    goals: ['weight-loss', 'appetite-control', 'blood-sugar', 'body-composition', 'energy'],
    primaryGoals: ['weight-loss', 'body-composition'],
    effectiveness: {
      'weight-loss': 5,
      'appetite-control': 5,
      'blood-sugar': 5,
      'energy': 4,
      'anti-aging': 3,
      'muscle-recovery': 2,
      'sleep': 2,
      'libido': 2,
      'gut-health': 2,
      'cognitive': 2,
      'body-composition': 5,
    },
    keyBenefits: [
      'Clinical trials show up to 24% weight loss',
      'Triple hormone action (GIP/GLP-1/Glucagon)',
      'Enhanced energy expenditure from glucagon',
      'Potential for better fat-specific loss',
      'Cutting-edge peptide therapy',
    ],
    bestFor: 'Those wanting the most advanced weight loss technology with enhanced metabolism',
  },

  // ============================================
  // GROWTH HORMONE PEPTIDES
  // ============================================
  {
    medicationId: 'sermorelin',
    goals: ['anti-aging', 'sleep', 'muscle-recovery', 'energy', 'body-composition'],
    primaryGoals: ['anti-aging', 'sleep'],
    effectiveness: {
      'weight-loss': 2,
      'appetite-control': 1,
      'blood-sugar': 2,
      'energy': 4,
      'anti-aging': 5,
      'muscle-recovery': 4,
      'sleep': 5,
      'libido': 3,
      'gut-health': 2,
      'cognitive': 3,
      'body-composition': 3,
    },
    keyBenefits: [
      'Stimulates natural growth hormone production',
      'Improves deep sleep quality',
      'Supports muscle growth and recovery',
      'Anti-aging effects on skin and energy',
      'Relatively affordable GH peptide',
    ],
    bestFor: 'Adults 30+ seeking anti-aging benefits and improved sleep quality',
  },

  {
    medicationId: 'ipamorelin',
    goals: ['anti-aging', 'muscle-recovery', 'sleep', 'body-composition'],
    primaryGoals: ['muscle-recovery', 'anti-aging'],
    effectiveness: {
      'weight-loss': 2,
      'appetite-control': 1,
      'blood-sugar': 2,
      'energy': 4,
      'anti-aging': 4,
      'muscle-recovery': 5,
      'sleep': 4,
      'libido': 3,
      'gut-health': 2,
      'cognitive': 3,
      'body-composition': 4,
    },
    keyBenefits: [
      'Selective GH release without cortisol spike',
      'Excellent for muscle building',
      'Minimal side effects',
      'Often combined with CJC-1295 for enhanced effect',
    ],
    bestFor: 'Athletes and fitness enthusiasts focused on muscle growth and recovery',
  },

  {
    medicationId: 'cjc1295',
    goals: ['anti-aging', 'muscle-recovery', 'sleep', 'body-composition', 'energy'],
    primaryGoals: ['anti-aging', 'muscle-recovery'],
    effectiveness: {
      'weight-loss': 2,
      'appetite-control': 1,
      'blood-sugar': 2,
      'energy': 4,
      'anti-aging': 5,
      'muscle-recovery': 5,
      'sleep': 4,
      'libido': 3,
      'gut-health': 2,
      'cognitive': 3,
      'body-composition': 4,
    },
    keyBenefits: [
      'Long-acting growth hormone releasing hormone',
      'Sustained GH elevation',
      'Synergistic with Ipamorelin',
      'Weekly dosing option with DAC variant',
    ],
    bestFor: 'Those wanting sustained GH benefits with less frequent dosing',
  },

  {
    medicationId: 'tesamorelin',
    goals: ['body-composition', 'anti-aging', 'energy'],
    primaryGoals: ['body-composition'],
    effectiveness: {
      'weight-loss': 3,
      'appetite-control': 1,
      'blood-sugar': 3,
      'energy': 4,
      'anti-aging': 4,
      'muscle-recovery': 3,
      'sleep': 3,
      'libido': 2,
      'gut-health': 2,
      'cognitive': 3,
      'body-composition': 5,
    },
    keyBenefits: [
      'FDA-approved for visceral fat reduction',
      'Specifically targets abdominal fat',
      'Proven efficacy in clinical trials',
      'Fixed dosing (simple protocol)',
    ],
    bestFor: 'People specifically targeting stubborn belly fat with FDA-approved therapy',
  },

  // ============================================
  // NAD+ PRECURSORS
  // ============================================
  {
    medicationId: 'nad-plus',
    goals: ['anti-aging', 'energy', 'cognitive', 'muscle-recovery'],
    primaryGoals: ['anti-aging', 'energy'],
    effectiveness: {
      'weight-loss': 1,
      'appetite-control': 1,
      'blood-sugar': 2,
      'energy': 5,
      'anti-aging': 5,
      'muscle-recovery': 3,
      'sleep': 3,
      'libido': 2,
      'gut-health': 2,
      'cognitive': 5,
      'body-composition': 2,
    },
    keyBenefits: [
      'Essential coenzyme for cellular energy',
      'Supports DNA repair and longevity pathways',
      'Enhances mental clarity and focus',
      'IV infusion for maximum absorption',
      'Foundational anti-aging therapy',
    ],
    bestFor: 'Biohackers and those focused on longevity and cognitive performance',
  },

  {
    medicationId: 'nad-injection',
    goals: ['anti-aging', 'energy', 'cognitive'],
    primaryGoals: ['energy', 'anti-aging'],
    effectiveness: {
      'weight-loss': 1,
      'appetite-control': 1,
      'blood-sugar': 2,
      'energy': 4,
      'anti-aging': 4,
      'muscle-recovery': 3,
      'sleep': 3,
      'libido': 2,
      'gut-health': 2,
      'cognitive': 4,
      'body-composition': 2,
    },
    keyBenefits: [
      'Convenient at-home administration',
      'More affordable than IV NAD+',
      'Consistent cellular energy support',
      'Easy to combine with other therapies',
    ],
    bestFor: 'Those wanting NAD+ benefits with convenient home administration',
  },

  // ============================================
  // HEALING PEPTIDES
  // ============================================
  {
    medicationId: 'bpc157',
    goals: ['gut-health', 'muscle-recovery'],
    primaryGoals: ['gut-health', 'muscle-recovery'],
    effectiveness: {
      'weight-loss': 1,
      'appetite-control': 1,
      'blood-sugar': 1,
      'energy': 2,
      'anti-aging': 2,
      'muscle-recovery': 5,
      'sleep': 2,
      'libido': 1,
      'gut-health': 5,
      'cognitive': 2,
      'body-composition': 1,
    },
    keyBenefits: [
      'Accelerates tissue and wound healing',
      'Supports gut lining repair',
      'Reduces inflammation',
      'Helps heal tendons, ligaments, muscles',
      'Protective against NSAID damage',
    ],
    bestFor: 'People recovering from injuries or with gut health issues',
  },

  {
    medicationId: 'tb500',
    goals: ['muscle-recovery'],
    primaryGoals: ['muscle-recovery'],
    effectiveness: {
      'weight-loss': 1,
      'appetite-control': 1,
      'blood-sugar': 1,
      'energy': 2,
      'anti-aging': 2,
      'muscle-recovery': 5,
      'sleep': 1,
      'libido': 1,
      'gut-health': 2,
      'cognitive': 1,
      'body-composition': 1,
    },
    keyBenefits: [
      'Powerful tissue repair and regeneration',
      'Reduces inflammation systemically',
      'Promotes blood vessel growth',
      'Often combined with BPC-157',
    ],
    bestFor: 'Athletes recovering from injuries or surgeries',
  },

  // ============================================
  // SEXUAL HEALTH
  // ============================================
  {
    medicationId: 'pt141',
    goals: ['libido'],
    primaryGoals: ['libido'],
    effectiveness: {
      'weight-loss': 1,
      'appetite-control': 1,
      'blood-sugar': 1,
      'energy': 2,
      'anti-aging': 1,
      'muscle-recovery': 1,
      'sleep': 1,
      'libido': 5,
      'gut-health': 1,
      'cognitive': 1,
      'body-composition': 1,
    },
    keyBenefits: [
      'FDA-approved for sexual desire disorder',
      'Works on central nervous system (not vascular)',
      'Effective for both men and women',
      'As-needed dosing',
    ],
    bestFor: 'Adults experiencing low libido or sexual desire issues',
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getGoalById(goalId: GoalId): Goal | undefined {
  return GOALS.find(g => g.id === goalId)
}

export function getMedicationGoals(medicationId: string): MedicationGoalMapping | undefined {
  return MEDICATION_GOAL_MAPPINGS.find(m => m.medicationId === medicationId)
}

export function getMedicationsForGoal(goalId: GoalId): MedicationGoalMapping[] {
  return MEDICATION_GOAL_MAPPINGS
    .filter(m => m.goals.includes(goalId))
    .sort((a, b) => (b.effectiveness[goalId] ?? 0) - (a.effectiveness[goalId] ?? 0))
}

export function getTopMedicationsForGoal(goalId: GoalId, limit: number = 3): MedicationGoalMapping[] {
  return getMedicationsForGoal(goalId).slice(0, limit)
}

export function getMedicationsWithPrimaryGoal(goalId: GoalId): MedicationGoalMapping[] {
  return MEDICATION_GOAL_MAPPINGS.filter(m => m.primaryGoals.includes(goalId))
}

/**
 * Get recommended medications based on multiple selected goals
 * Returns medications sorted by total effectiveness score for selected goals
 */
export function getRecommendedMedications(selectedGoals: GoalId[]): {
  medicationId: string
  totalScore: number
  matchedGoals: GoalId[]
  mapping: MedicationGoalMapping
}[] {
  if (selectedGoals.length === 0) return []

  const scored = MEDICATION_GOAL_MAPPINGS.map(mapping => {
    const matchedGoals = selectedGoals.filter(g => mapping.goals.includes(g))
    const totalScore = matchedGoals.reduce((sum, g) => sum + (mapping.effectiveness[g] ?? 0), 0)

    return {
      medicationId: mapping.medicationId,
      totalScore,
      matchedGoals,
      mapping,
    }
  })

  return scored
    .filter(s => s.matchedGoals.length > 0)
    .sort((a, b) => b.totalScore - a.totalScore)
}

/**
 * Get best medication for a single primary goal
 */
export function getBestMedicationForGoal(goalId: GoalId): MedicationGoalMapping | undefined {
  const meds = getMedicationsForGoal(goalId)
  return meds[0]
}

