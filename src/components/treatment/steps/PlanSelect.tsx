'use client'

import { motion } from 'framer-motion'
import { Calendar, Check, Sparkles } from 'lucide-react'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import {
  formatPrice,
  type Medication,
  type Dose,
  type TreatmentPlan,
  type PatientType,
} from '@/lib/data'
import { cn } from '@/lib/utils'

interface PlanSelectProps {
  medication: Medication | null
  patientType: PatientType | null
  selectedDose: Dose | null
  availablePlans: TreatmentPlan[]
  selectedPlan: TreatmentPlan | null
  onSelect: (plan: TreatmentPlan) => void
}

export function PlanSelect({
  medication,
  patientType,
  selectedDose,
  availablePlans,
  selectedPlan,
  onSelect,
}: PlanSelectProps) {
  if (!medication || !patientType || !selectedDose) return null

  // Group plans by type
  const monthlyPlan = availablePlans.find(p => p.planType === 'month-to-month')
  const subscriptionPlan = availablePlans.find(p => p.planType === 'subscription-3month')
  const titrationPlans = availablePlans.filter(p => p.planType === 'new-patient-titration')

  // For new patients, show titration plans
  // For existing patients, show monthly vs subscription
  const plansToShow = patientType === 'new'
    ? titrationPlans
    : [monthlyPlan, subscriptionPlan].filter(Boolean) as TreatmentPlan[]

  const getPriceForPlan = (plan: TreatmentPlan): number => {
    if (plan.titrationSchedule && plan.titrationSchedule.length > 0) {
      return plan.titrationSchedule[0].priceForMonth
    }
    const pricing = plan.pricing.find(p => p.doseId === selectedDose.id)
    return pricing?.pricePerMonth ?? 0
  }

  const getTotalForPlan = (plan: TreatmentPlan): number => {
    if (plan.titrationSchedule) {
      return plan.titrationSchedule.reduce((sum, step) => sum + step.priceForMonth, 0)
    }
    const pricing = plan.pricing.find(p => p.doseId === selectedDose.id)
    return (pricing?.pricePerMonth ?? 0) * plan.durationMonths
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 pb-40">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 mb-6">
            <Calendar className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Choose your plan
          </h1>
          <p className="text-lg text-white/50">
            Select how you&apos;d like to receive your {medication.name}
          </p>
        </motion.div>

        {/* Plans */}
        <motion.div
          variants={staggerContainerVariants}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          {plansToShow.map((plan, index) => {
            const isSelected = selectedPlan?.id === plan.id
            const price = getPriceForPlan(plan)
            const total = getTotalForPlan(plan)
            const isRecommended = plan.planType === 'subscription-3month' ||
              (plan.planType === 'new-patient-titration' && plan.billingCycle === 'upfront')

            return (
              <motion.button
                key={plan.id}
                variants={staggerItemVariants}
                onClick={() => onSelect(plan)}
                className={cn(
                  'relative w-full p-6 rounded-2xl text-left transition-all border',
                  isSelected
                    ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                    : 'bg-[#141414] border-white/10 hover:border-white/20'
                )}
              >
                {/* Recommended badge */}
                {isRecommended && (
                  <div className="absolute -top-3 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                    <Sparkles className="w-3 h-3" />
                    Best Value
                  </div>
                )}

                {/* Selected check */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-white/50 mb-3">
                      {plan.description}
                    </p>

                    {/* Titration schedule for new patient plans */}
                    {plan.titrationSchedule && (
                      <div className="flex items-center gap-2 mt-3">
                        {plan.titrationSchedule.map((step, i) => (
                          <div key={step.doseId} className="flex items-center">
                            <span className="text-xs px-2 py-1 rounded bg-white/5 text-white/60">
                              M{step.month}: {step.doseLabel}
                            </span>
                            {i < plan.titrationSchedule!.length - 1 && (
                              <span className="mx-1 text-white/20">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {plan.includesSupplies && (
                        <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">
                          ✓ Supplies included
                        </span>
                      )}
                      {plan.includesConsultation && (
                        <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">
                          ✓ Consultations
                        </span>
                      )}
                      {plan.discountPercent && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                          Save {plan.discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-right md:min-w-[120px]">
                    <p className="text-3xl font-bold text-white">
                      {formatPrice(price)}
                      <span className="text-base font-normal text-white/50">/mo</span>
                    </p>
                    {plan.durationMonths > 1 && (
                      <p className="text-sm text-white/40 mt-1">
                        {formatPrice(total)} total
                      </p>
                    )}
                    <p className="text-xs text-white/30 mt-1">
                      {plan.billingCycle === 'upfront' ? 'Billed upfront' : 'Billed monthly'}
                    </p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

