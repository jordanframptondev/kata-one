'use client'

import { motion } from 'framer-motion'
import { Check, Pill, Calendar, Package, Stethoscope, Truck, RotateCcw, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { staggerContainerVariants, staggerItemVariants, checkmarkVariants } from '@/lib/animations'
import { formatPrice, type Medication, type Dose, type TreatmentPlan, type PatientType } from '@/lib/data'

interface TreatmentSummaryProps {
  medication: Medication | null
  dose: Dose | null
  plan: TreatmentPlan | null
  patientType: PatientType | null
  totalPrice: number
  monthlyPrice: number
  savings: number
  onStartOver: () => void
}

export function TreatmentSummary({
  medication,
  dose,
  plan,
  patientType,
  totalPrice,
  monthlyPrice,
  savings,
  onStartOver,
}: TreatmentSummaryProps) {
  if (!medication || !dose || !plan || !patientType) return null

  const features = [
    { icon: Package, label: 'All injection supplies included' },
    { icon: Stethoscope, label: 'Monthly physician consultations' },
    { icon: Truck, label: 'Free priority shipping' },
    { icon: RotateCcw, label: 'Cancel anytime' },
  ]

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      <div className="max-w-2xl mx-auto w-full">
        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6"
          >
            <motion.svg
              className="w-10 h-10 text-green-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M20 6L9 17l-5-5"
                variants={checkmarkVariants}
                initial="initial"
                animate="animate"
              />
            </motion.svg>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Your plan is ready!
          </h1>
          <p className="text-lg text-white/50">
            Here&apos;s your personalized treatment summary
          </p>
        </motion.div>

        {/* Plan card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <Pill className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{medication.name}</h2>
                <p className="text-white/50">{plan.name}</p>
              </div>
            </div>
          </div>

          {/* Dosing schedule */}
          {plan.titrationSchedule && plan.titrationSchedule.length > 0 ? (
            <div className="p-6 border-b border-white/10">
              <h3 className="text-sm font-medium text-white/50 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Your Dosing Schedule
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {plan.titrationSchedule.map((step, index) => (
                  <motion.div
                    key={step.doseId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 text-center"
                  >
                    <p className="text-xs text-white/40 mb-1">Month {step.month}</p>
                    <p className="text-lg font-bold text-white">{step.doseLabel}</p>
                    <p className="text-sm text-white/50">{formatPrice(step.priceForMonth)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 border-b border-white/10">
              <h3 className="text-sm font-medium text-white/50 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Your Dose
              </h3>
              <div className="p-4 rounded-xl bg-white/5 inline-block">
                <p className="text-2xl font-bold text-white">{dose.label}</p>
                <p className="text-sm text-white/50">{formatPrice(monthlyPrice)}/month</p>
              </div>
            </div>
          )}

          {/* Pricing */}
          <div className="p-6 border-b border-white/10">
            <div className="space-y-3">
              <div className="flex justify-between text-white/60">
                <span>Subtotal ({plan.durationMonths} month{plan.durationMonths > 1 ? 's' : ''})</span>
                <span>{formatPrice(totalPrice + savings)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Savings ({plan.discountPercent}% off)</span>
                  <span>-{formatPrice(savings)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-white/10 flex justify-between text-white text-xl font-bold">
                <span>Due today</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <motion.div
            variants={staggerContainerVariants}
            initial="initial"
            animate="animate"
            className="p-6"
          >
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  variants={staggerItemVariants}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-sm text-white/60">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="outline"
            onClick={onStartOver}
            className="flex-1"
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Start Over
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Continue to Checkout
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-xs text-white/30"
        >
          Treatment requires physician approval. A licensed provider will review your information
          and may adjust your treatment plan as needed.
        </motion.p>
      </div>
    </div>
  )
}

