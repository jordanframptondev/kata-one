import type { Medication } from '../types'

/**
 * Comprehensive list of peptide medications
 *
 * Categories:
 * - GLP-1 Agonists: Semaglutide, Liraglutide
 * - Dual GIP/GLP-1 Agonists: Tirzepatide
 * - Triple Agonists: Retatrutide
 * - Growth Hormone Peptides: Sermorelin, Ipamorelin, CJC-1295, Tesamorelin
 * - NAD+ Precursors: NAD+, NMN
 * - Other Peptides: BPC-157, TB-500, PT-141
 */

export const MEDICATIONS: Medication[] = [
  // ============================================
  // GLP-1 AGONISTS
  // ============================================
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    genericName: 'semaglutide',
    brandNames: ['Ozempic', 'Wegovy', 'Rybelsus'],
    description: 'GLP-1 receptor agonist that helps regulate blood sugar and appetite. FDA-approved for type 2 diabetes and chronic weight management.',
    category: 'glp1-agonist',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'sema-025', amount: 0.25, unit: 'mg', label: '0.25mg' },
      { id: 'sema-050', amount: 0.5, unit: 'mg', label: '0.5mg' },
      { id: 'sema-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
      { id: 'sema-170', amount: 1.7, unit: 'mg', label: '1.7mg' },
      { id: 'sema-240', amount: 2.4, unit: 'mg', label: '2.4mg' },
    ],
    contraindications: [
      'Personal or family history of medullary thyroid carcinoma',
      'Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)',
      'Known hypersensitivity to semaglutide',
      'Pregnancy or planning to become pregnant',
    ],
    sideEffects: [
      'Nausea',
      'Vomiting',
      'Diarrhea',
      'Constipation',
      'Abdominal pain',
      'Headache',
      'Fatigue',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  {
    id: 'liraglutide',
    name: 'Liraglutide',
    genericName: 'liraglutide',
    brandNames: ['Victoza', 'Saxenda'],
    description: 'GLP-1 receptor agonist for type 2 diabetes and weight management. Daily injection formulation.',
    category: 'glp1-agonist',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'lira-060', amount: 0.6, unit: 'mg', label: '0.6mg' },
      { id: 'lira-120', amount: 1.2, unit: 'mg', label: '1.2mg' },
      { id: 'lira-180', amount: 1.8, unit: 'mg', label: '1.8mg' },
      { id: 'lira-240', amount: 2.4, unit: 'mg', label: '2.4mg' },
      { id: 'lira-300', amount: 3.0, unit: 'mg', label: '3.0mg' },
    ],
    contraindications: [
      'Personal or family history of medullary thyroid carcinoma',
      'Multiple Endocrine Neoplasia syndrome type 2',
      'Known hypersensitivity to liraglutide',
    ],
    sideEffects: [
      'Nausea',
      'Hypoglycemia',
      'Diarrhea',
      'Constipation',
      'Headache',
      'Dyspepsia',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  // ============================================
  // DUAL GIP/GLP-1 AGONISTS
  // ============================================
  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    genericName: 'tirzepatide',
    brandNames: ['Mounjaro', 'Zepbound'],
    description: 'Dual GIP and GLP-1 receptor agonist. Highly effective for type 2 diabetes and significant weight loss.',
    category: 'gip-glp1-agonist',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'tirz-250', amount: 2.5, unit: 'mg', label: '2.5mg' },
      { id: 'tirz-500', amount: 5.0, unit: 'mg', label: '5.0mg' },
      { id: 'tirz-750', amount: 7.5, unit: 'mg', label: '7.5mg' },
      { id: 'tirz-1000', amount: 10.0, unit: 'mg', label: '10.0mg' },
      { id: 'tirz-1250', amount: 12.5, unit: 'mg', label: '12.5mg' },
      { id: 'tirz-1500', amount: 15.0, unit: 'mg', label: '15.0mg' },
    ],
    contraindications: [
      'Personal or family history of medullary thyroid carcinoma',
      'Multiple Endocrine Neoplasia syndrome type 2',
      'Known hypersensitivity to tirzepatide',
      'Pregnancy',
    ],
    sideEffects: [
      'Nausea',
      'Diarrhea',
      'Decreased appetite',
      'Vomiting',
      'Constipation',
      'Dyspepsia',
      'Abdominal pain',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  // ============================================
  // TRIPLE AGONISTS
  // ============================================
  {
    id: 'retatrutide',
    name: 'Retatrutide',
    genericName: 'retatrutide',
    brandNames: [],
    description: 'Triple hormone receptor agonist (GIP, GLP-1, and glucagon). Investigational medication showing exceptional weight loss results in clinical trials.',
    category: 'multi-agonist',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'reta-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
      { id: 'reta-200', amount: 2.0, unit: 'mg', label: '2.0mg' },
      { id: 'reta-400', amount: 4.0, unit: 'mg', label: '4.0mg' },
      { id: 'reta-800', amount: 8.0, unit: 'mg', label: '8.0mg' },
      { id: 'reta-1200', amount: 12.0, unit: 'mg', label: '12.0mg' },
    ],
    contraindications: [
      'Personal or family history of medullary thyroid carcinoma',
      'Multiple Endocrine Neoplasia syndrome type 2',
      'Known hypersensitivity',
      'Pregnancy or breastfeeding',
    ],
    sideEffects: [
      'Nausea',
      'Diarrhea',
      'Vomiting',
      'Constipation',
      'Injection site reactions',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  // ============================================
  // GROWTH HORMONE PEPTIDES
  // ============================================
  {
    id: 'sermorelin',
    name: 'Sermorelin',
    genericName: 'sermorelin acetate',
    brandNames: ['Geref'],
    description: 'Growth hormone-releasing hormone (GHRH) analog that stimulates natural growth hormone production. Used for anti-aging and body composition.',
    category: 'growth-hormone',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'serm-100', amount: 100, unit: 'mcg', label: '100mcg' },
      { id: 'serm-200', amount: 200, unit: 'mcg', label: '200mcg' },
      { id: 'serm-300', amount: 300, unit: 'mcg', label: '300mcg' },
      { id: 'serm-500', amount: 500, unit: 'mcg', label: '500mcg' },
    ],
    contraindications: [
      'Active malignancy',
      'Hypersensitivity to sermorelin',
      'Pregnancy or breastfeeding',
    ],
    sideEffects: [
      'Injection site reactions',
      'Headache',
      'Flushing',
      'Dizziness',
      'Sleepiness',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    genericName: 'ipamorelin',
    brandNames: [],
    description: 'Selective growth hormone secretagogue that stimulates GH release with minimal effect on cortisol and prolactin.',
    category: 'growth-hormone',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'ipam-100', amount: 100, unit: 'mcg', label: '100mcg' },
      { id: 'ipam-200', amount: 200, unit: 'mcg', label: '200mcg' },
      { id: 'ipam-300', amount: 300, unit: 'mcg', label: '300mcg' },
    ],
    contraindications: [
      'Active malignancy',
      'Pregnancy or breastfeeding',
    ],
    sideEffects: [
      'Headache',
      'Flushing',
      'Dizziness',
      'Injection site reactions',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  {
    id: 'cjc1295',
    name: 'CJC-1295',
    genericName: 'cjc-1295',
    brandNames: [],
    description: 'Long-acting growth hormone releasing hormone (GHRH) analog. Often combined with Ipamorelin for synergistic GH release.',
    category: 'growth-hormone',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'cjc-100', amount: 100, unit: 'mcg', label: '100mcg' },
      { id: 'cjc-200', amount: 200, unit: 'mcg', label: '200mcg' },
      { id: 'cjc-300', amount: 300, unit: 'mcg', label: '300mcg' },
    ],
    contraindications: [
      'Active malignancy',
      'Pregnancy or breastfeeding',
      'Pituitary disorders',
    ],
    sideEffects: [
      'Water retention',
      'Tingling in extremities',
      'Headache',
      'Injection site reactions',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  {
    id: 'tesamorelin',
    name: 'Tesamorelin',
    genericName: 'tesamorelin acetate',
    brandNames: ['Egrifta'],
    description: 'GHRH analog FDA-approved for reducing visceral adipose tissue in HIV patients. Also used off-label for body composition.',
    category: 'growth-hormone',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'tesa-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
      { id: 'tesa-200', amount: 2.0, unit: 'mg', label: '2.0mg' },
    ],
    contraindications: [
      'Disruption of hypothalamic-pituitary axis',
      'Active malignancy',
      'Pregnancy',
      'Known hypersensitivity',
    ],
    sideEffects: [
      'Injection site reactions',
      'Arthralgia',
      'Pain in extremities',
      'Peripheral edema',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  // ============================================
  // NAD+ PRECURSORS
  // ============================================
  {
    id: 'nad-plus',
    name: 'NAD+',
    genericName: 'nicotinamide adenine dinucleotide',
    brandNames: [],
    description: 'Essential coenzyme for cellular energy and metabolism. Used for anti-aging, cognitive function, and metabolic support.',
    category: 'nad-precursor',
    administrationRoute: 'iv-infusion',
    availableDoses: [
      { id: 'nad-250', amount: 250, unit: 'mg', label: '250mg' },
      { id: 'nad-500', amount: 500, unit: 'mg', label: '500mg' },
      { id: 'nad-750', amount: 750, unit: 'mg', label: '750mg' },
      { id: 'nad-1000', amount: 1000, unit: 'mg', label: '1000mg' },
    ],
    contraindications: [
      'Severe cardiac conditions',
      'Uncontrolled hypertension',
    ],
    sideEffects: [
      'Nausea',
      'Headache',
      'Fatigue during infusion',
      'Chest tightness',
      'Cramping',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  {
    id: 'nad-injection',
    name: 'NAD+ Injection',
    genericName: 'nicotinamide adenine dinucleotide',
    brandNames: [],
    description: 'Subcutaneous NAD+ injection for convenient at-home administration. Supports cellular energy and longevity.',
    category: 'nad-precursor',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'nad-inj-50', amount: 50, unit: 'mg', label: '50mg' },
      { id: 'nad-inj-100', amount: 100, unit: 'mg', label: '100mg' },
      { id: 'nad-inj-200', amount: 200, unit: 'mg', label: '200mg' },
    ],
    contraindications: [
      'Severe cardiac conditions',
    ],
    sideEffects: [
      'Injection site reactions',
      'Mild nausea',
      'Flushing',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  // ============================================
  // OTHER PEPTIDES
  // ============================================
  {
    id: 'bpc157',
    name: 'BPC-157',
    genericName: 'body protection compound-157',
    brandNames: [],
    description: 'Synthetic peptide derived from human gastric juice. Used for tissue healing, gut health, and injury recovery.',
    category: 'peptide-other',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'bpc-250', amount: 250, unit: 'mcg', label: '250mcg' },
      { id: 'bpc-500', amount: 500, unit: 'mcg', label: '500mcg' },
      { id: 'bpc-750', amount: 750, unit: 'mcg', label: '750mcg' },
    ],
    contraindications: [
      'Active cancer',
      'Pregnancy or breastfeeding',
    ],
    sideEffects: [
      'Injection site reactions',
      'Nausea',
      'Dizziness',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  {
    id: 'tb500',
    name: 'TB-500',
    genericName: 'thymosin beta-4',
    brandNames: [],
    description: 'Synthetic peptide that promotes tissue repair, wound healing, and reduces inflammation.',
    category: 'peptide-other',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'tb-250', amount: 2.5, unit: 'mg', label: '2.5mg' },
      { id: 'tb-500', amount: 5.0, unit: 'mg', label: '5.0mg' },
      { id: 'tb-1000', amount: 10.0, unit: 'mg', label: '10.0mg' },
    ],
    contraindications: [
      'Active cancer',
      'Pregnancy',
    ],
    sideEffects: [
      'Headache',
      'Nausea',
      'Injection site irritation',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },

  {
    id: 'pt141',
    name: 'PT-141',
    genericName: 'bremelanotide',
    brandNames: ['Vyleesi'],
    description: 'FDA-approved for hypoactive sexual desire disorder. Melanocortin receptor agonist that works on the central nervous system.',
    category: 'peptide-other',
    administrationRoute: 'subcutaneous-injection',
    availableDoses: [
      { id: 'pt-075', amount: 0.75, unit: 'mg', label: '0.75mg' },
      { id: 'pt-100', amount: 1.0, unit: 'mg', label: '1.0mg' },
      { id: 'pt-175', amount: 1.75, unit: 'mg', label: '1.75mg' },
    ],
    contraindications: [
      'Uncontrolled hypertension',
      'Cardiovascular disease',
      'Pregnancy',
    ],
    sideEffects: [
      'Nausea',
      'Flushing',
      'Headache',
      'Injection site reactions',
      'Transient hypertension',
    ],
    requiresPrescription: true,
    isControlledSubstance: false,
  },
]

// Helper functions
export function getMedicationById(id: string): Medication | undefined {
  return MEDICATIONS.find(med => med.id === id)
}

export function getMedicationsByCategory(category: Medication['category']): Medication[] {
  return MEDICATIONS.filter(med => med.category === category)
}

export function getDoseById(medicationId: string, doseId: string): Medication['availableDoses'][number] | undefined {
  const medication = getMedicationById(medicationId)
  return medication?.availableDoses.find(dose => dose.id === doseId)
}

