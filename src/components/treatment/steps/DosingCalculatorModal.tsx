'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronRight, Check, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import {
  getCalculatorQuestions,
  calculateEstimatedDose,
  getDosesWithTiers,
  type Medication,
  type Dose,
  type CalculatorAnswer,
} from '@/lib/data'
import { cn } from '@/lib/utils'

interface DosingCalculatorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  medication: Medication
  onSelectDose: (dose: Dose) => void
}

export function DosingCalculatorModal({
  open,
  onOpenChange,
  medication,
  onSelectDose,
}: DosingCalculatorModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<CalculatorAnswer[]>([])
  const [showResult, setShowResult] = useState(false)

  const questions = getCalculatorQuestions(medication.id)
  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (value: string | number | boolean) => {
    const newAnswers = [...answers]
    const existingIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id)

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId: currentQuestion.id, value }
    } else {
      newAnswers.push({ questionId: currentQuestion.id, value })
    }

    setAnswers(newAnswers)

    // Auto-advance to next question or show result
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300)
    } else {
      setTimeout(() => setShowResult(true), 300)
    }
  }

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion?.id)?.value
  }

  const resetCalculator = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setShowResult(false)
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(resetCalculator, 300)
  }

  const result = showResult ? calculateEstimatedDose(medication.id, answers) : null
  const doses = getDosesWithTiers(medication.id)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-purple-400" />
            Dosing Calculator
          </DialogTitle>
          <DialogDescription>
            Answer a few questions to estimate your current dose
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <AnimatePresence mode="wait">
            {!showResult && currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Progress */}
                <div className="flex items-center gap-2 mb-6">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1 flex-1 rounded-full transition-all',
                        i <= currentQuestionIndex ? 'bg-purple-500' : 'bg-white/10'
                      )}
                    />
                  ))}
                </div>

                {/* Question */}
                <h3 className="text-lg font-medium text-white mb-2">
                  {currentQuestion.question}
                </h3>
                {currentQuestion.helpText && (
                  <p className="text-sm text-white/50 mb-4">{currentQuestion.helpText}</p>
                )}

                {/* Options */}
                <div className="space-y-2">
                  {currentQuestion.options?.map((option) => {
                    const isSelected = getCurrentAnswer() === option.value

                    return (
                      <button
                        key={String(option.value)}
                        onClick={() => handleAnswer(option.value)}
                        className={cn(
                          'w-full p-3 rounded-xl text-left transition-all border',
                          isSelected
                            ? 'bg-purple-500/20 border-purple-500'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">{option.label}</p>
                            {option.description && (
                              <p className="text-sm text-white/50">{option.description}</p>
                            )}
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Back button */}
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="mt-4 text-sm text-white/40 hover:text-white/60 transition-colors"
                  >
                    ← Previous question
                  </button>
                )}
              </motion.div>
            )}

            {showResult && result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {/* Confidence indicator */}
                <div className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg mb-4',
                  result.confidence === 'high' && 'bg-green-500/20',
                  result.confidence === 'medium' && 'bg-yellow-500/20',
                  result.confidence === 'low' && 'bg-red-500/20'
                )}>
                  {result.confidence === 'high' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <AlertCircle className={cn(
                      'w-4 h-4',
                      result.confidence === 'medium' ? 'text-yellow-400' : 'text-red-400'
                    )} />
                  )}
                  <span className={cn(
                    'text-sm',
                    result.confidence === 'high' && 'text-green-400',
                    result.confidence === 'medium' && 'text-yellow-400',
                    result.confidence === 'low' && 'text-red-400'
                  )}>
                    {result.confidence === 'high' ? 'High confidence' :
                     result.confidence === 'medium' ? 'Medium confidence' : 'Low confidence'}
                  </span>
                </div>

                {/* Estimated dose */}
                <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/30 mb-4">
                  <p className="text-sm text-purple-400 mb-1">Estimated dose</p>
                  <p className="text-3xl font-bold text-white">{result.estimatedDose.label}</p>
                </div>

                {/* Explanation */}
                <p className="text-sm text-white/60 mb-4">{result.explanation}</p>

                {/* Alternative doses */}
                {result.alternativeDoses && result.alternativeDoses.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-white/40 mb-2">Or select manually:</p>
                    <div className="flex flex-wrap gap-2">
                      {doses.map((dose) => (
                        <button
                          key={dose.id}
                          onClick={() => onSelectDose(dose)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-sm transition-all border',
                            dose.id === result.estimatedDose.id
                              ? 'bg-purple-500 border-purple-500 text-white'
                              : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                          )}
                        >
                          {dose.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    className="flex-1"
                  >
                    Try again
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => onSelectDose(result.estimatedDose)}
                    className="flex-1"
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Use this dose
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

