'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { heroContainerVariants, heroTextVariants, glowButtonVariants } from '@/lib/animations'

interface LandingHeroProps {
  onStart: () => void
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={heroContainerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Badge */}
        <motion.div
          variants={heroTextVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-white/70">Personalized Treatment Plans</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={heroTextVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">Your treatment</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            awaits.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={heroTextVariants}
          className="text-xl text-white/50 mb-12 max-w-lg mx-auto"
        >
          Science-backed peptide medications, personalized to your goals.
          Find your perfect treatment plan in minutes.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={heroTextVariants}>
          <motion.div
            variants={glowButtonVariants}
            initial="initial"
            animate="animate"
            className="inline-block rounded-2xl"
          >
            <Button
              size="lg"
              onClick={onStart}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-lg px-10"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={heroTextVariants}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-white/30"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Licensed Physicians</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Free Shipping</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </div>
  )
}

