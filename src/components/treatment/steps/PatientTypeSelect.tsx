'use client'

import { motion } from 'framer-motion'
import { UserPlus, UserCheck, Users } from 'lucide-react'
import { SelectionCard } from '@/components/ui/SelectionCard'
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations'
import type { Medication, PatientType } from '@/lib/data'

interface PatientTypeSelectProps {
  medication: Medication | null
  selectedType: PatientType | null
  onSelect: (type: PatientType) => void
}

export function PatientTypeSelect({
  medication,
  selectedType,
  onSelect,
}: PatientTypeSelectProps) {
  if (!medication) return null

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 pb-40">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 mb-6">
            <Users className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Have you taken {medication.name} before?
          </h1>
          <p className="text-lg text-white/50">
            This helps us create the right treatment plan for you
          </p>
        </motion.div>

        {/* Options */}
        <motion.div
          variants={staggerContainerVariants}
          initial="initial"
          animate="animate"
          className="grid gap-4 md:grid-cols-2"
        >
          <motion.div variants={staggerItemVariants}>
            <SelectionCard
              isSelected={selectedType === 'new'}
              onClick={() => onSelect('new')}
              icon={<UserPlus className="w-5 h-5" />}
              title="I'm new to this"
              description="This will be my first time taking this medication. Start me at the recommended dose."
              className="h-full"
            />
          </motion.div>

          <motion.div variants={staggerItemVariants}>
            <SelectionCard
              isSelected={selectedType === 'existing'}
              onClick={() => onSelect('existing')}
              icon={<UserCheck className="w-5 h-5" />}
              title="I've taken this before"
              description="I'm already on this medication or have taken it previously. I know my dose."
              className="h-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

