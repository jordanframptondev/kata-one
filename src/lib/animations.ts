/**
 * Shared Animation Variants for Framer Motion
 * Following React best practices for consistent animations
 */

import type { Variants, Transition } from 'framer-motion'

// ============================================
// TRANSITION PRESETS
// ============================================

export const transitions = {
  fast: { duration: 0.15, ease: 'easeOut' } as Transition,
  medium: { duration: 0.3, ease: 'easeOut' } as Transition,
  slow: { duration: 0.5, ease: 'easeOut' } as Transition,
  page: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } as Transition,
  spring: { type: 'spring', stiffness: 300, damping: 25 } as Transition,
  springGentle: { type: 'spring', stiffness: 100, damping: 15 } as Transition,
  springBouncy: { type: 'spring', stiffness: 400, damping: 10 } as Transition,
}

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: transitions.page,
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.3 },
  },
}

export const pageVariantsReverse: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: transitions.page,
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: { duration: 0.3 },
  },
}

// ============================================
// FADE VARIANTS
// ============================================

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.medium },
  exit: { opacity: 0, transition: transitions.fast },
}

export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: transitions.medium },
  exit: { opacity: 0, y: -10, transition: transitions.fast },
}

export const fadeScaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: transitions.medium },
  exit: { opacity: 0, scale: 0.95, transition: transitions.fast },
}

// ============================================
// STAGGER CONTAINERS
// ============================================

export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

export const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.medium,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: transitions.fast,
  },
}

// ============================================
// CARD VARIANTS
// ============================================

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.medium,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: transitions.fast,
  },
  hover: {
    y: -2,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
}

export const selectionCardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.medium,
  },
  selected: {
    scale: 1,
    transition: transitions.spring,
  },
  hover: {
    y: -2,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.98,
  },
}

// ============================================
// BUTTON VARIANTS
// ============================================

export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, transition: transitions.fast },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
}

export const glowButtonVariants: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(59, 130, 246, 0.3)',
      '0 0 40px rgba(59, 130, 246, 0.5)',
      '0 0 20px rgba(59, 130, 246, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// ============================================
// LOADING VARIANTS
// ============================================

export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const orbitVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// ============================================
// PROGRESS VARIANTS
// ============================================

export const progressFillVariants: Variants = {
  initial: { width: 0 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: { duration: 0.5, ease: 'easeOut' },
  }),
}

// ============================================
// CHECKMARK DRAW VARIANT
// ============================================

export const checkmarkVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// ============================================
// HERO TEXT VARIANTS
// ============================================

export const heroTextVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export const heroContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// ============================================
// MODAL VARIANTS
// ============================================

export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.medium },
  exit: { opacity: 0, transition: transitions.fast },
}

export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.spring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: transitions.fast,
  },
}

