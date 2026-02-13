'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LOADING_MESSAGES = [
  'Analyzing your preferences...',
  'Selecting optimal dosing...',
  'Calculating savings...',
  'Finalizing your plan...',
]

interface LoadingAnimationProps {
  onComplete: () => void
  duration?: number
}

export function LoadingAnimation({ onComplete, duration = 4000 }: LoadingAnimationProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, duration / LOADING_MESSAGES.length)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, duration / 50)

    const timeout = setTimeout(onComplete, duration)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
      clearTimeout(timeout)
    }
  }, [onComplete, duration])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative w-full max-w-md">
        {/* Animated orb */}
        <div className="relative w-32 h-32 mx-auto mb-12">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-blue-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute inset-8 rounded-full border-2 border-blue-500/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center glow */}
          <motion.div
            className="absolute inset-10 rounded-full bg-blue-500/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Orbiting dots */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-blue-400"
              style={{
                top: '50%',
                left: '50%',
                marginTop: -6,
                marginLeft: -6,
              }}
              animate={{
                x: Math.cos((i * Math.PI) / 2) * 50,
                y: Math.sin((i * Math.PI) / 2) * 50,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Loading message */}
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center mb-8"
        >
          <p className="text-xl text-white font-medium">
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress text */}
        <div className="mt-4 text-center">
          <span className="text-sm text-white/40">
            Building your treatment plan...
          </span>
        </div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
      </div>
    </div>
  )
}

