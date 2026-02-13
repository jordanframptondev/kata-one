'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressBar({ currentStep, totalSteps, className }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/50">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-white/50">{Math.round(progress)}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

