'use client'

import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { selectionCardVariants } from '@/lib/animations'
import { Check } from 'lucide-react'

export interface SelectionCardProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  isSelected?: boolean
  icon?: React.ReactNode
  title: string
  description?: string
  badge?: string
  badgeVariant?: 'default' | 'success' | 'highlight'
  price?: string
  priceSubtext?: string
}

const SelectionCard = forwardRef<HTMLButtonElement, SelectionCardProps>(
  (
    {
      className,
      isSelected = false,
      icon,
      title,
      description,
      badge,
      badgeVariant = 'default',
      price,
      priceSubtext,
      ...props
    },
    ref
  ) => {
    const badgeStyles = {
      default: 'bg-white/10 text-white/70',
      success: 'bg-green-500/20 text-green-400',
      highlight: 'bg-blue-500/20 text-blue-400',
    }

    return (
      <motion.button
        ref={ref}
        type="button"
        className={cn(
          'relative flex flex-col items-start gap-3 p-5 rounded-2xl text-left',
          'bg-[#141414] border transition-all duration-300',
          'hover:bg-[#1a1a1a]',
          isSelected
            ? 'border-blue-500 shadow-[0_0_0_1px_#3b82f6,0_0_20px_rgba(59,130,246,0.3)]'
            : 'border-[#222] hover:border-[#444]',
          className
        )}
        variants={selectionCardVariants}
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {/* Selected checkmark */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* Badge */}
        {badge && (
          <span
            className={cn(
              'text-xs font-medium px-2.5 py-1 rounded-full',
              badgeStyles[badgeVariant]
            )}
          >
            {badge}
          </span>
        )}

        {/* Icon */}
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/70">
            {icon}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-white">{title}</h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-white/50 leading-relaxed">{description}</p>
        )}

        {/* Price */}
        {price && (
          <div className="mt-auto pt-3">
            <span className="text-2xl font-bold text-white">{price}</span>
            {priceSubtext && (
              <span className="text-sm text-white/50 ml-1">{priceSubtext}</span>
            )}
          </div>
        )}
      </motion.button>
    )
  }
)

SelectionCard.displayName = 'SelectionCard'

export { SelectionCard }

