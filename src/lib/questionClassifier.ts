import { Subject } from '@/types'

// Keywords for each subject category
const subjectKeywords = {
  'Basic Medical Sciences': [
    // Anatomy & Physiology
    'anatomy', 'physiology', 'cell', 'tissue', 'organ', 'system', 'blood', 'heart', 'lung', 'kidney', 'liver', 'brain', 'nervous', 'muscle', 'bone', 'skeleton',
    'cardiovascular', 'respiratory', 'digestive', 'endocrine', 'immune', 'reproductive', 'urinary', 'lymphatic',
    
    // Biochemistry
    'biochemistry', 'enzyme', 'protein', 'amino acid', 'carbohydrate', 'lipid', 'metabolism', 'glucose', 'insulin', 'hormone',
    'DNA', 'RNA', 'gene', 'chromosome', 'genetic', 'heredity', 'mutation',
    
    // Microbiology
    'bacteria', 'virus', 'fungus', 'microorganism', 'infection', 'pathogen', 'antibiotic resistance', 'culture',
    'gram positive', 'gram negative', 'streptococcus', 'staphylococcus', 'escherichia', 'salmonella',
    
    // Pathology
    'pathology', 'disease', 'inflammation', 'tumor', 'cancer', 'neoplasm', 'metastasis', 'diagnosis'
  ],

  'Pharmaceutical Sciences': [
    // Pharmaceutics
    'tablet', 'capsule', 'suspension', 'solution', 'ointment', 'cream', 'gel', 'suppository', 'injection',
    'bioavailability', 'bioequivalence', 'dissolution', 'absorption', 'distribution', 'excretion',
    'formulation', 'stability', 'shelf life', 'storage', 'packaging', 'quality control',
    'dosage form', 'drug delivery', 'controlled release', 'sustained release', 'immediate release',
    
    // Pharmacokinetics
    'pharmacokinetics', 'ADME', 'clearance', 'half-life', 'volume of distribution', 'first-pass',
    'steady state', 'plasma concentration', 'AUC', 'Cmax', 'Tmax',
    
    // Drug Development
    'clinical trial', 'phase I', 'phase II', 'phase III', 'FDA', 'approval', 'regulatory',
    'good manufacturing practice', 'GMP', 'validation', 'pharmaceutical industry'
  ],

  'Clinical Sciences': [
    // Pharmacology
    'mechanism of action', 'receptor', 'agonist', 'antagonist', 'efficacy', 'potency',
    'side effect', 'adverse effect', 'contraindication', 'drug interaction', 'toxicity',
    'therapeutic index', 'dose response', 'ED50', 'LD50', 'tolerance', 'dependence',
    
    // Therapeutics
    'treatment', 'therapy', 'indication', 'dosing', 'monitoring', 'patient', 'clinical',
    'hypertension', 'diabetes', 'asthma', 'depression', 'anxiety', 'pain', 'fever',
    'antibiotic', 'antiviral', 'antifungal', 'analgesic', 'anti-inflammatory',
    
    // Drug Names & Classes
    'aspirin', 'paracetamol', 'ibuprofen', 'warfarin', 'digoxin', 'insulin', 'metformin',
    'amlodipine', 'lisinopril', 'atorvastatin', 'omeprazole', 'albuterol', 'prednisone',
    'ACE inhibitor', 'beta blocker', 'calcium channel blocker', 'diuretic', 'statin',
    'NSAID', 'anticoagulant', 'bronchodilator', 'corticosteroid'
  ],

  'Social & Behavioral Sciences': [
    // Pharmacy Practice
    'counseling', 'patient education', 'communication', 'consultation', 'adherence', 'compliance',
    'medication therapy management', 'MTM', 'pharmaceutical care', 'clinical pharmacy',
    'community pharmacy', 'hospital pharmacy', 'ambulatory care',
    
    // Ethics & Law
    'ethics', 'confidentiality', 'informed consent', 'professional responsibility',
    'pharmacy law', 'regulation', 'controlled substance', 'prescription', 'dispensing',
    'HIPAA', 'privacy', 'documentation', 'record keeping',
    
    // Healthcare Systems
    'healthcare', 'insurance', 'formulary', 'prior authorization', 'cost effectiveness',
    'health economics', 'outcomes research', 'quality improvement',
    'interprofessional', 'collaboration', 'team-based care'
  ],

  'Pharmaceutical Calculations': [
    // Mathematical Concepts
    'calculation', 'dose', 'concentration', 'dilution', 'ratio', 'proportion', 'percentage',
    'mg/kg', 'units/kg', 'mL/hr', 'drops/min', 'parts per million', 'ppm',
    'milligram', 'microgram', 'gram', 'kilogram', 'milliliter', 'liter',
    
    // Dosing Calculations
    'pediatric dose', 'geriatric dose', 'body weight', 'body surface area', 'BSA',
    'creatinine clearance', 'renal adjustment', 'hepatic adjustment',
    'loading dose', 'maintenance dose', 'infusion rate',
    
    // Business Calculations
    'insurance copay', 'markup', 'discount', 'AWP', 'acquisition cost',
    'days supply', 'quantity', 'refill', 'inventory', 'turnover'
  ],

  'Medicinal Chemistry': [
    // Chemical Structure
    'structure', 'molecular', 'chemical', 'synthesis', 'stereochemistry', 'isomer',
    'functional group', 'benzene', 'aromatic', 'aliphatic', 'heterocyclic',
    'chirality', 'enantiomer', 'racemic', 'optical activity',
    
    // Drug Design
    'SAR', 'structure activity relationship', 'QSAR', 'lead compound', 'optimization',
    'prodrug', 'metabolite', 'active metabolite', 'biotransformation',
    'cytochrome P450', 'CYP', 'phase I', 'phase II', 'conjugation',
    
    // Chemical Properties
    'lipophilicity', 'hydrophilicity', 'pKa', 'solubility', 'permeability',
    'molecular weight', 'polar surface area', 'hydrogen bonding'
  ]
}

export function classifyQuestion(questionText: string, options: string[], rationale?: string): Subject {
  const fullText = `${questionText} ${options.join(' ')} ${rationale || ''}`.toLowerCase()
  
  const scores: Record<Subject, number> = {
    'Basic Medical Sciences': 0,
    'Pharmaceutical Sciences': 0,
    'Clinical Sciences': 0,
    'Social & Behavioral Sciences': 0,
    'Pharmaceutical Calculations': 0,
    'Medicinal Chemistry': 0
  }

  // Score each subject based on keyword matches
  Object.entries(subjectKeywords).forEach(([subject, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi')
      const matches = fullText.match(regex)
      if (matches) {
        scores[subject as Subject] += matches.length
      }
    })
  })

  // Special rules for better classification
  
  // Pharmaceutical Calculations - look for numbers and units
  if (/\d+\s*(mg|g|ml|l|kg|mcg|units?|%|ratio|dose|concentration)/gi.test(fullText)) {
    scores['Pharmaceutical Calculations'] += 3
  }

  // Clinical Sciences - drug names and medical conditions
  if (/\b(aspirin|paracetamol|ibuprofen|warfarin|digoxin|insulin|metformin|amlodipine|lisinopril|atorvastatin|omeprazole|albuterol|prednisone)\b/gi.test(fullText)) {
    scores['Clinical Sciences'] += 5
  }

  // Medicinal Chemistry - chemical structures and synthesis
  if (/\b(structure|synthesis|molecular|chemical|benzene|aromatic|stereochemistry|isomer|enantiomer)\b/gi.test(fullText)) {
    scores['Medicinal Chemistry'] += 4
  }

  // Social & Behavioral Sciences - patient care and ethics
  if (/\b(patient|counseling|ethics|law|regulation|communication|adherence|compliance)\b/gi.test(fullText)) {
    scores['Social & Behavioral Sciences'] += 4
  }

  // Find the subject with the highest score
  const maxScore = Math.max(...Object.values(scores))
  const bestSubject = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as Subject

  // If no clear winner, use fallback logic
  if (maxScore === 0) {
    // Default fallback based on common patterns
    if (/\b(drug|medication|medicine|pharmaceutical|pharmacy)\b/gi.test(fullText)) {
      return 'Clinical Sciences'
    }
    return 'Basic Medical Sciences' // Default fallback
  }

  return bestSubject || 'Basic Medical Sciences'
}

export function getClassificationConfidence(questionText: string, options: string[], rationale?: string): number {
  const fullText = `${questionText} ${options.join(' ')} ${rationale || ''}`.toLowerCase()
  
  const scores: Record<Subject, number> = {
    'Basic Medical Sciences': 0,
    'Pharmaceutical Sciences': 0,
    'Clinical Sciences': 0,
    'Social & Behavioral Sciences': 0,
    'Pharmaceutical Calculations': 0,
    'Medicinal Chemistry': 0
  }

  Object.entries(subjectKeywords).forEach(([subject, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi')
      const matches = fullText.match(regex)
      if (matches) {
        scores[subject as Subject] += matches.length
      }
    })
  })

  const sortedScores = Object.values(scores).sort((a, b) => b - a)
  const maxScore = sortedScores[0]
  const secondMaxScore = sortedScores[1] || 0

  if (maxScore === 0) return 0.1 // Very low confidence
  if (secondMaxScore === 0) return 0.9 // High confidence
  
  // Calculate confidence based on the gap between top two scores
  const confidence = Math.min(0.9, 0.5 + (maxScore - secondMaxScore) / (maxScore + secondMaxScore) * 0.4)
  return confidence
}
