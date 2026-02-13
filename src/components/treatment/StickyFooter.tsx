'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface StickyFooterProps {
  currentStep: number
  totalSteps: number
  canGoNext: boolean
  showBack?: boolean
  onBack: () => void
  onNext: () => void
  nextLabel?: string
}

export function StickyFooter({
  currentStep,
  totalSteps,
  canGoNext,
  showBack = true,
  onBack,
  onNext,
  nextLabel = 'Continue',
}: StickyFooterProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 pb-6 pt-8">
        {/* Progress bar */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          className="mb-4"
        />

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          {showBack ? (
            <Button
              variant="outline"
              onClick={onBack}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            variant="primary"
            onClick={onNext}
            disabled={!canGoNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="min-w-[140px]"
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

