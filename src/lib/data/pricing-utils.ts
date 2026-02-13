/**
 * Pricing Utility Functions
 *
 * Helpers for formatting and calculating prices throughout the app.
 */

/**
 * Format a price as USD currency
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a price with "/mo" suffix
 */
export function formatPricePerMonth(amount: number): string {
  return `${formatPrice(amount)}/mo`
}

/**
 * Format a price with "/month" suffix (longer form)
 */
export function formatMonthlyPrice(amount: number): string {
  return `${formatPrice(amount)}/month`
}

/**
 * Calculate savings percentage between two prices
 */
export function calculateSavingsPercent(originalPrice: number, discountedPrice: number): number {
  if (originalPrice === 0) return 0
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

/**
 * Calculate total savings amount
 */
export function calculateSavingsAmount(originalPrice: number, discountedPrice: number): number {
  return originalPrice - discountedPrice
}

/**
 * Format savings display (e.g., "Save $60" or "Save 20%")
 */
export function formatSavings(
  originalPrice: number,
  discountedPrice: number,
  type: 'amount' | 'percent' = 'amount'
): string {
  if (type === 'percent') {
    const percent = calculateSavingsPercent(originalPrice, discountedPrice)
    return `Save ${percent}%`
  }

  const amount = calculateSavingsAmount(originalPrice, discountedPrice)
  return `Save ${formatPrice(amount)}`
}

/**
 * Calculate price per dose
 */
export function calculatePricePerDose(
  monthlyPrice: number,
  dosesPerMonth: number
): number {
  if (dosesPerMonth === 0) return 0
  return monthlyPrice / dosesPerMonth
}

/**
 * Format price range (e.g., "$299 - $499/mo")
 */
export function formatPriceRange(minPrice: number, maxPrice: number): string {
  return `${formatPrice(minPrice)} - ${formatPricePerMonth(maxPrice)}`
}

/**
 * Calculate 3-month total with discount
 */
export function calculateSubscriptionTotal(
  monthlyPrice: number,
  months: number = 3,
  discountPercent: number = 20
): {
  originalTotal: number
  discountedTotal: number
  savings: number
  pricePerMonth: number
} {
  const originalTotal = monthlyPrice * months
  const discountedTotal = originalTotal * (1 - discountPercent / 100)
  const savings = originalTotal - discountedTotal
  const pricePerMonth = discountedTotal / months

  return {
    originalTotal,
    discountedTotal,
    savings,
    pricePerMonth,
  }
}

/**
 * Format billing description based on plan type
 */
export function formatBillingDescription(
  planType: 'month-to-month' | 'subscription-3month' | 'new-patient-titration',
  billingCycle: 'monthly' | 'upfront' | 'split'
): string {
  switch (planType) {
    case 'month-to-month':
      return 'Billed monthly. Cancel anytime.'
    case 'subscription-3month':
      if (billingCycle === 'upfront') {
        return 'Billed upfront for 3 months.'
      }
      return 'Billed monthly for 3 months.'
    case 'new-patient-titration':
      if (billingCycle === 'upfront') {
        return 'Full 3-month program billed upfront.'
      }
      return 'Billed monthly. Dose increases each month.'
    default:
      return ''
  }
}

