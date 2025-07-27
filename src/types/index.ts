export interface Question {
  id: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_choice: 'A' | 'B' | 'C' | 'D'
  rationale: string
  subject: Subject
  exam_id: string
  examname: string
  file_name: string
  // Enhanced educational fields
  difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced'
  key_concepts?: string[]
  memory_tips?: string[]
  clinical_relevance?: string
  common_mistakes?: string[]
  related_questions?: string[]
}

export type Subject = 
  | 'Basic Medical Sciences'
  | 'Pharmaceutical Sciences'
  | 'Social & Behavioral Sciences'
  | 'Clinical Sciences'
  | 'Pharmaceutical Calculations'
  | 'Medicinal Chemistry'

export interface QuizSession {
  id: string
  questions: Question[]
  currentQuestionIndex: number
  answers: Record<string, string>
  startTime: Date
  endTime?: Date
  score?: number
  subject: Subject
  isCompleted: boolean
}

export interface UserProgress {
  userId: string
  subject: Subject
  totalQuestions: number
  completedQuestions: number
  correctAnswers: number
  lastStudied: Date
  averageScore: number
  timeSpent: number // in minutes
}

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'admin'
  createdAt: Date
  lastLogin: Date
  progress: UserProgress[]
}

export interface SectionCard {
  id: string
  title: string
  description: string
  icon: string
  subject: Subject
  totalQuestions: number
  completedQuestions: number
  averageScore: number
  color: string
  href: string
}

export interface QuizResult {
  sessionId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  subject: Subject
  completedAt: Date
  answers: Array<{
    questionId: string
    selectedAnswer: string
    correctAnswer: string
    isCorrect: boolean
  }>
}

export interface AdminStats {
  totalUsers: number
  totalQuestions: number
  questionsBySubject: Record<Subject, number>
  averageScores: Record<Subject, number>
  activeUsers: number
  recentActivity: Array<{
    id: string
    type: 'quiz_completed' | 'user_registered' | 'question_added'
    description: string
    timestamp: Date
  }>
}

export interface ChemicalStructure {
  id: string
  name: string
  formula: string
  smiles: string
  molData: string
  category: string
  description: string
}

export interface CalculatorInput {
  type: 'dosage' | 'concentration' | 'conversion'
  inputs: Record<string, number | string>
  result?: number | string
  unit?: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  studyReminders: boolean
  newContent: boolean
  achievements: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: string
  unlockedAt?: Date
  progress: number
  maxProgress: number
}
