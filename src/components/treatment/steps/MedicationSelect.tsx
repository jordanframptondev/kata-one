'use client'

import { motion } from 'framer-motion'
import { Pill, HelpCircle, ChevronRight } from 'lucide-react'
import { SelectionCard } from '@/components/ui/SelectionCard'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import { MEDICATIONS, getMedicationGoals, formatPrice } from '@/lib/data'
import type { Medication } from '@/lib/data'

// Filter medications to show main ones for the selector
const FEATURED_MEDICATIONS = MEDICATIONS.filter(med =>
  ['semaglutide', 'tirzepatide', 'retatrutide', 'sermorelin', 'nad-injection'].includes(med.id)
)

interface MedicationSelectProps {
  selectedMedication: Medication | null
  onSelect: (medication: Medication) => void
  onShowGoals: () => void
}

export function MedicationSelect({
  selectedMedication,
  onSelect,
  onShowGoals,
}: MedicationSelectProps) {
  return (
    <div className="min-h-screen flex flex-col px-6 py-12 pb-40">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 mb-6">
            <Pill className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Select your medication
          </h1>
          <p className="text-lg text-white/50">
            Choose the medication you&apos;d like to start or continue
          </p>
        </motion.div>

        {/* Help me choose button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onShowGoals}
          className="w-full mb-8 p-4 rounded-2xl border border-dashed border-white/20 hover:border-white/40
                     bg-white/5 hover:bg-white/10 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-white">Not sure which medication?</p>
                <p className="text-sm text-white/50">Help me choose based on my goals</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
          </div>
        </motion.button>

        {/* Medication grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="initial"
          animate="animate"
          className="grid gap-4 md:grid-cols-2"
        >
          {FEATURED_MEDICATIONS.map((medication) => {
            const goals = getMedicationGoals(medication.id)
            const primaryGoal = goals?.primaryGoals[0]

            return (
              <motion.div key={medication.id} variants={staggerItemVariants}>
                <SelectionCard
                  isSelected={selectedMedication?.id === medication.id}
                  onClick={() => onSelect(medication)}
                  icon={<Pill className="w-5 h-5" />}
                  title={medication.name}
                  description={medication.description}
                  badge={primaryGoal ? formatGoalBadge(primaryGoal) : undefined}
                  badgeVariant="highlight"
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Show all medications link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <button className="text-sm text-white/40 hover:text-white/60 transition-colors">
            View all {MEDICATIONS.length} medications →
          </button>
        </motion.div>
      </div>
    </div>
  )
}

function formatGoalBadge(goalId: string): string {
  const labels: Record<string, string> = {
    'weight-loss': 'Weight Loss',
    'appetite-control': 'Appetite Control',
    'blood-sugar': 'Blood Sugar',
    'energy': 'Energy',
    'anti-aging': 'Anti-Aging',
    'muscle-recovery': 'Recovery',
    'sleep': 'Sleep',
    'libido': 'Libido',
    'gut-health': 'Gut Health',
    'cognitive': 'Mental Clarity',
    'body-composition': 'Body Comp',
  }
  return labels[goalId] ?? goalId
}

