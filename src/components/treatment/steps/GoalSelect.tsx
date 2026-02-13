'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Scale, UtensilsCrossed, Activity, Zap, Sparkles,
  Dumbbell, Moon, Heart, Leaf, Brain, TrendingUp,
  ChevronRight
} from 'lucide-react'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import { GOALS, getRecommendedMedications, getMedicationById, type GoalId } from '@/lib/data'
import type { Medication } from '@/lib/data'
import { cn } from '@/lib/utils'

const GOAL_ICONS: Record<GoalId, React.ReactNode> = {
  'weight-loss': <Scale className="w-5 h-5" />,
  'appetite-control': <UtensilsCrossed className="w-5 h-5" />,
  'blood-sugar': <Activity className="w-5 h-5" />,
  'energy': <Zap className="w-5 h-5" />,
  'anti-aging': <Sparkles className="w-5 h-5" />,
  'muscle-recovery': <Dumbbell className="w-5 h-5" />,
  'sleep': <Moon className="w-5 h-5" />,
  'libido': <Heart className="w-5 h-5" />,
  'gut-health': <Leaf className="w-5 h-5" />,
  'cognitive': <Brain className="w-5 h-5" />,
  'body-composition': <TrendingUp className="w-5 h-5" />,
}

interface GoalSelectProps {
  selectedGoals: string[]
  onGoalsChange: (goals: string[]) => void
  onSelectMedication: (medication: Medication) => void
}

export function GoalSelect({
  selectedGoals,
  onGoalsChange,
  onSelectMedication,
}: GoalSelectProps) {
  const [showRecommendations, setShowRecommendations] = useState(false)

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      onGoalsChange(selectedGoals.filter(g => g !== goalId))
    } else if (selectedGoals.length < 3) {
      onGoalsChange([...selectedGoals, goalId])
    }
  }

  const recommendations = getRecommendedMedications(selectedGoals as GoalId[])

  const handleShowRecommendations = () => {
    if (selectedGoals.length > 0) {
      setShowRecommendations(true)
    }
  }

  if (showRecommendations && recommendations.length > 0) {
    return (
      <div className="min-h-screen flex flex-col px-6 py-12 pb-40">
        <div className="max-w-3xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/10 mb-6">
              <Sparkles className="w-7 h-7 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Your recommended medications
            </h1>
            <p className="text-lg text-white/50">
              Based on your goals, here are our top picks
            </p>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            variants={staggerContainerVariants}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            {recommendations.slice(0, 3).map((rec, index) => {
              const medication = getMedicationById(rec.medicationId)
              if (!medication) return null

              return (
                <motion.button
                  key={rec.medicationId}
                  variants={staggerItemVariants}
                  onClick={() => onSelectMedication(medication)}
                  className={cn(
                    'w-full p-5 rounded-2xl text-left transition-all',
                    'bg-[#141414] border hover:bg-[#1a1a1a]',
                    index === 0
                      ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                      : 'border-white/10 hover:border-white/20'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {index === 0 && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                            Best Match
                          </span>
                        )}
                        <span className="text-xs text-white/40">
                          Score: {rec.totalScore}/{selectedGoals.length * 5}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {medication.name}
                      </h3>
                      <p className="text-sm text-white/50 mb-3">
                        {rec.mapping.bestFor}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {rec.matchedGoals.map(goalId => (
                          <span
                            key={goalId}
                            className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60"
                          >
                            {GOALS.find(g => g.id === goalId)?.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/30" />
                  </div>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setShowRecommendations(false)}
            className="mt-6 w-full text-center text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            ← Change my goals
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 pb-40">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/10 mb-6">
            <Sparkles className="w-7 h-7 text-purple-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            What are your goals?
          </h1>
          <p className="text-lg text-white/50">
            Select up to 3 goals to find your perfect medication
          </p>
        </motion.div>

        {/* Goals grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {GOALS.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id)
            const isDisabled = !isSelected && selectedGoals.length >= 3

            return (
              <motion.button
                key={goal.id}
                variants={staggerItemVariants}
                onClick={() => !isDisabled && toggleGoal(goal.id)}
                disabled={isDisabled}
                className={cn(
                  'p-4 rounded-xl text-left transition-all',
                  'border flex flex-col gap-2',
                  isSelected
                    ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20',
                  isDisabled && 'opacity-40 cursor-not-allowed'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  isSelected ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-white/50'
                )}>
                  {GOAL_ICONS[goal.id]}
                </div>
                <span className={cn(
                  'text-sm font-medium',
                  isSelected ? 'text-white' : 'text-white/70'
                )}>
                  {goal.label}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Show recommendations button */}
        {selectedGoals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleShowRecommendations}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
            >
              Show my recommendations
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

