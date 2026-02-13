'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Calculator, HelpCircle, Check, ArrowRight, Sparkles } from 'lucide-react'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import {
  getDosesWithTiers,
  getQuickSelectDoses,
  getStartingDose,
  getTitrationSchedule,
  type DoseWithTier,
  type Dose,
  type Medication,
  type PatientType,
} from '@/lib/data'
import { cn } from '@/lib/utils'
import { DosingCalculatorModal } from './DosingCalculatorModal'

interface DoseSelectProps {
  medication: Medication | null
  patientType: PatientType | null
  selectedDose: Dose | null
  onSelect: (dose: Dose) => void
}

export function DoseSelect({
  medication,
  patientType,
  selectedDose,
  onSelect,
}: DoseSelectProps) {
  const [showCalculator, setShowCalculator] = useState(false)

  if (!medication || !patientType) return null

  // For new patients, show starting dose info
  if (patientType === 'new') {
    const startingDose = getStartingDose(medication.id)
    const titrationSchedule = getTitrationSchedule(medication.id)

    return (
      <div className="min-h-screen flex flex-col px-6 py-12 pb-40">
        <div className="max-w-2xl mx-auto w-full">
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
              Your starting dose
            </h1>
            <p className="text-lg text-white/50">
              We&apos;ll start you at the recommended dose and gradually increase
            </p>
          </motion.div>

          {/* Starting dose card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-[#141414] border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <Droplets className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-green-400 font-medium mb-1">Starting Dose</p>
                <p className="text-3xl font-bold text-white">{startingDose?.label}</p>
              </div>
            </div>

            {/* Titration preview */}
            {titrationSchedule.length > 0 && (
              <div>
                <p className="text-sm text-white/50 mb-4">Your titration schedule:</p>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {titrationSchedule.slice(0, 4).map((step, index) => (
                    <div key={step.doseId} className="flex items-center">
                      <div className={cn(
                        'flex flex-col items-center px-4 py-3 rounded-xl min-w-[80px]',
                        index === 0 ? 'bg-green-500/20' : 'bg-white/5'
                      )}>
                        <span className="text-xs text-white/50 mb-1">Month {index + 1}</span>
                        <span className={cn(
                          'font-semibold',
                          index === 0 ? 'text-green-400' : 'text-white/70'
                        )}>
                          {step.doseLabel}
                        </span>
                      </div>
                      {index < Math.min(titrationSchedule.length - 1, 3) && (
                        <ArrowRight className="w-4 h-4 text-white/20 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-green-400" />
                </div>
                <p className="text-sm text-white/60">
                  Starting low helps minimize side effects while your body adjusts.
                  Your provider will guide dose increases based on your response.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // For existing patients, show dose selection
  const doses = getDosesWithTiers(medication.id)
  const quickSelects = getQuickSelectDoses(medication.id)

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 pb-40">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 mb-6">
            <Droplets className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            What dose are you currently taking?
          </h1>
          <p className="text-lg text-white/50">
            Select your current {medication.name} dose
          </p>
        </motion.div>

        {/* Quick select buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-sm text-white/40 mb-3 text-center">Quick select:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickSelects.map(({ tier, label, dose }) => (
              <button
                key={tier}
                onClick={() => onSelect(dose)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  'border',
                  selectedDose?.id === dose.id
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                )}
              >
                {label}
                <span className="ml-1 text-white/40">({dose.label})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dose grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6"
        >
          {doses.map((dose) => (
            <motion.button
              key={dose.id}
              variants={staggerItemVariants}
              onClick={() => onSelect(dose)}
              className={cn(
                'relative p-4 rounded-xl text-left transition-all border',
                selectedDose?.id === dose.id
                  ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              )}
            >
              {/* Tier badge */}
              <span className={cn(
                'absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full',
                dose.tier === 'starting' && 'bg-green-500/20 text-green-400',
                dose.tier === 'titrating' && 'bg-yellow-500/20 text-yellow-400',
                dose.tier === 'maintenance' && 'bg-blue-500/20 text-blue-400',
                dose.tier === 'max' && 'bg-red-500/20 text-red-400'
              )}>
                {dose.tierLabel}
              </span>

              <p className="text-2xl font-bold text-white mt-4">{dose.label}</p>
              <p className="text-xs text-white/40 mt-1">{dose.tierDescription}</p>

              {selectedDose?.id === dose.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Help options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {/* Dosing calculator */}
          <button
            onClick={() => setShowCalculator(true)}
            className="w-full p-4 rounded-xl border border-dashed border-white/20 hover:border-white/40
                       bg-white/5 hover:bg-white/10 transition-all group flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-white">Not sure of your dose?</p>
              <p className="text-sm text-white/50">Use our dosing calculator</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
          </button>

          {/* Skip option */}
          <button
            onClick={() => {
              const startingDose = getStartingDose(medication.id)
              if (startingDose) onSelect(startingDose)
            }}
            className="w-full p-4 rounded-xl border border-white/10 hover:border-white/20
                       bg-white/5 hover:bg-white/10 transition-all group flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-white/50" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-white/70">Not sure - Skip</p>
              <p className="text-sm text-white/40">We&apos;ll recommend a safe starting point</p>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Dosing Calculator Modal */}
      <DosingCalculatorModal
        open={showCalculator}
        onOpenChange={setShowCalculator}
        medication={medication}
        onSelectDose={(dose) => {
          onSelect(dose)
          setShowCalculator(false)
        }}
      />
    </div>
  )
}

