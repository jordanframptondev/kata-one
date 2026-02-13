'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useTreatmentFlow, type TreatmentFlowStep } from '@/hooks/useTreatmentFlow'
import { pageVariants, pageVariantsReverse } from '@/lib/animations'

// Step components
import { LandingHero } from './steps/LandingHero'
import { MedicationSelect } from './steps/MedicationSelect'
import { GoalSelect } from './steps/GoalSelect'
import { PatientTypeSelect } from './steps/PatientTypeSelect'
import { DoseSelect } from './steps/DoseSelect'
import { PlanSelect } from './steps/PlanSelect'
import { LoadingAnimation } from './steps/LoadingAnimation'
import { TreatmentSummary } from './steps/TreatmentSummary'
import { StickyFooter } from './StickyFooter'

export function TreatmentFlow() {
  const flow = useTreatmentFlow()

  const variants = flow.direction === 'forward' ? pageVariants : pageVariantsReverse

  const renderStep = () => {
    switch (flow.currentStep) {
      case 'landing':
        return <LandingHero onStart={() => flow.goToStep('medication')} />
      case 'medication':
        return (
          <MedicationSelect
            selectedMedication={flow.selectedMedication}
            onSelect={flow.selectMedication}
            onShowGoals={() => flow.goToStep('goals')}
          />
        )
      case 'goals':
        return (
          <GoalSelect
            selectedGoals={flow.selectedGoals}
            onGoalsChange={flow.setGoals}
            onSelectMedication={(med) => {
              flow.selectMedication(med)
              flow.goToStep('patient-type')
            }}
          />
        )
      case 'patient-type':
        return (
          <PatientTypeSelect
            medication={flow.selectedMedication}
            selectedType={flow.patientType}
            onSelect={flow.selectPatientType}
          />
        )
      case 'dose':
        return (
          <DoseSelect
            medication={flow.selectedMedication}
            patientType={flow.patientType}
            selectedDose={flow.selectedDose}
            onSelect={flow.selectDose}
          />
        )
      case 'plan':
        return (
          <PlanSelect
            medication={flow.selectedMedication}
            patientType={flow.patientType}
            selectedDose={flow.selectedDose}
            availablePlans={flow.availablePlans}
            selectedPlan={flow.selectedPlan}
            onSelect={flow.selectPlan}
          />
        )
      case 'loading':
        return (
          <LoadingAnimation
            onComplete={() => flow.goToStep('summary')}
          />
        )
      case 'summary':
        return (
          <TreatmentSummary
            medication={flow.selectedMedication}
            dose={flow.selectedDose}
            plan={flow.selectedPlan}
            patientType={flow.patientType}
            totalPrice={flow.totalPrice}
            monthlyPrice={flow.monthlyPrice}
            savings={flow.savings}
            onStartOver={flow.reset}
          />
        )
      default:
        return null
    }
  }

  const showFooter = !['landing', 'loading', 'summary'].includes(flow.currentStep)
  const showBackButton = flow.currentStep !== 'medication'

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={flow.currentStep}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {showFooter && (
        <StickyFooter
          currentStep={flow.getStepNumber()}
          totalSteps={flow.getTotalSteps()}
          canGoNext={flow.canGoNext()}
          showBack={showBackButton}
          onBack={flow.goBack}
          onNext={() => {
            if (flow.currentStep === 'plan') {
              flow.goToStep('loading')
            } else {
              flow.goNext()
            }
          }}
        />
      )}
    </div>
  )
}

