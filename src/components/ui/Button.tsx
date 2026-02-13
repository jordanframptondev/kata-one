'use client'

import { forwardRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/lib/animations'

export interface ButtonProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onClick,
      type = 'button',
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 font-medium',
      'rounded-xl transition-colors focus-visible:outline-none',
      'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      'focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50'
    )

    const variantStyles = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-white/10 text-white hover:bg-white/20',
      ghost: 'bg-transparent text-white/70 hover:text-white hover:bg-white/10',
      outline: 'border border-white/20 text-white/70 hover:text-white hover:border-white/40',
    }

    const sizeStyles = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || isLoading}
        onClick={onClick}
        variants={buttonVariants}
        whileHover={disabled ? undefined : 'hover'}
        whileTap={disabled ? undefined : 'tap'}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }



