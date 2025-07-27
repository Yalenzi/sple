'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Question, Subject, QuizSession, QuizResult } from '@/types'
import { generateId } from '@/lib/utils'

interface QuestionStore {
  questions: Question[]
  currentSession: QuizSession | null
  quizResults: QuizResult[]
  isLoading: boolean
  questionsLoaded: boolean

  // Actions
  addQuestion: (question: Omit<Question, 'id'>) => void
  updateQuestion: (id: string, question: Partial<Question>) => void
  deleteQuestion: (id: string) => void
  getQuestionsBySubject: (subject: Subject) => Question[]

  // Quiz session management
  startQuiz: (subject: Subject, questionCount?: number) => void
  answerQuestion: (questionId: string, answer: string) => void
  nextQuestion: () => void
  previousQuestion: () => void
  setCurrentQuestionIndex: (index: number) => void
  finishQuiz: () => QuizResult | null

  // Data management
  loadQuestionsFromFile: () => Promise<void>
  importQuestions: (questions: Record<string, any>) => void
  exportQuestions: () => Question[]
  clearAllData: () => void
}

// Sample questions data
const sampleQuestions: Question[] = [
  {
    id: '1',
    question_text: 'ما هو الاسم العلمي للأسبرين؟',
    option_a: 'حمض الأسيتيل ساليسيليك',
    option_b: 'حمض الساليسيليك',
    option_c: 'الباراسيتامول',
    option_d: 'الإيبوبروفين',
    correct_choice: 'A',
    rationale: 'الأسبرين هو حمض الأسيتيل ساليسيليك (Acetylsalicylic acid) وهو مضاد للالتهاب غير ستيرويدي.',
    subject: 'Pharmaceutical Sciences',
    exam_id: 'SPLE2024',
    examname: 'SPLE',
    file_name: '2024'
  },
  {
    id: '2',
    question_text: 'ما هي الجرعة القصوى اليومية للباراسيتامول للبالغين؟',
    option_a: '2 جرام',
    option_b: '3 جرام',
    option_c: '4 جرام',
    option_d: '5 جرام',
    correct_choice: 'C',
    rationale: 'الجرعة القصوى اليومية للباراسيتامول للبالغين هي 4 جرام (4000 مجم) موزعة على جرعات.',
    subject: 'Clinical Sciences',
    exam_id: 'SPLE2024',
    examname: 'SPLE',
    file_name: '2024'
  },
  {
    id: '3',
    question_text: 'أي من التالي يعتبر من مضادات الهيستامين من الجيل الأول؟',
    option_a: 'لوراتادين',
    option_b: 'سيتيريزين',
    option_c: 'ديفينهيدرامين',
    option_d: 'فيكسوفينادين',
    correct_choice: 'C',
    rationale: 'ديفينهيدرامين هو من مضادات الهيستامين من الجيل الأول والذي يسبب النعاس.',
    subject: 'Pharmaceutical Sciences',
    exam_id: 'SPLE2024',
    examname: 'SPLE',
    file_name: '2024'
  }
]

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set, get) => ({
      questions: sampleQuestions, // Start with sample questions
      currentSession: null,
      quizResults: [],
      isLoading: false,
      questionsLoaded: false,

      addQuestion: (questionData) => {
        const newQuestion: Question = {
          ...questionData,
          id: generateId(),
        }
        set((state) => ({
          questions: [...state.questions, newQuestion],
        }))
      },

      updateQuestion: (id, updates) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, ...updates } : q
          ),
        }))
      },

      deleteQuestion: (id) => {
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        }))
      },

      getQuestionsBySubject: (subject) => {
        const questions = get().questions.filter((q) => q.subject === subject)
        console.log(`getQuestionsBySubject(${subject}): found ${questions.length} questions`)
        return questions
      },

      startQuiz: (subject, questionCount = 10) => {
        console.log(`Starting quiz for subject: ${subject}`)
        const allQuestions = get().questions
        console.log(`Total questions available: ${allQuestions.length}`)

        const questions = get().getQuestionsBySubject(subject)
        console.log(`Questions found for ${subject}: ${questions.length}`)

        // If no questions found for the subject, don't start the quiz
        if (questions.length === 0) {
          console.warn(`No questions found for subject: ${subject}`)
          const availableSubjects = Array.from(new Set(allQuestions.map(q => q.subject)))
          console.log('Available subjects:', availableSubjects)
          return
        }

        const shuffledQuestions = questions
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.min(questionCount, questions.length))

        console.log(`Starting quiz with ${shuffledQuestions.length} questions`)

        const session: QuizSession = {
          id: generateId(),
          questions: shuffledQuestions,
          currentQuestionIndex: 0,
          answers: {},
          startTime: new Date(),
          subject,
          isCompleted: false,
        }

        set({ currentSession: session })
        console.log('Quiz session created successfully')
      },

      answerQuestion: (questionId, answer) => {
        set((state) => {
          if (!state.currentSession) return state
          
          return {
            currentSession: {
              ...state.currentSession,
              answers: {
                ...state.currentSession.answers,
                [questionId]: answer,
              },
            },
          }
        })
      },

      nextQuestion: () => {
        set((state) => {
          if (!state.currentSession) return state
          
          const nextIndex = state.currentSession.currentQuestionIndex + 1
          if (nextIndex >= state.currentSession.questions.length) {
            return state
          }
          
          return {
            currentSession: {
              ...state.currentSession,
              currentQuestionIndex: nextIndex,
            },
          }
        })
      },

      previousQuestion: () => {
        set((state) => {
          if (!state.currentSession) return state

          const prevIndex = state.currentSession.currentQuestionIndex - 1
          if (prevIndex < 0) return state

          return {
            currentSession: {
              ...state.currentSession,
              currentQuestionIndex: prevIndex,
            },
          }
        })
      },

      setCurrentQuestionIndex: (index: number) => {
        set((state) => {
          if (!state.currentSession) return state

          const maxIndex = state.currentSession.questions.length - 1
          const newIndex = Math.max(0, Math.min(index, maxIndex))

          return {
            currentSession: {
              ...state.currentSession,
              currentQuestionIndex: newIndex,
            },
          }
        })
      },

      finishQuiz: () => {
        const state = get()
        if (!state.currentSession) return null

        const session = state.currentSession
        const endTime = new Date()
        const timeSpent = Math.round((endTime.getTime() - session.startTime.getTime()) / 1000 / 60) // minutes

        let correctAnswers = 0
        const answers = session.questions.map((question) => {
          const selectedAnswer = session.answers[question.id] || ''
          const isCorrect = selectedAnswer === question.correct_choice
          if (isCorrect) correctAnswers++

          return {
            questionId: question.id,
            selectedAnswer,
            correctAnswer: question.correct_choice,
            isCorrect,
          }
        })

        const score = Math.round((correctAnswers / session.questions.length) * 100)

        const result: QuizResult = {
          sessionId: session.id,
          score,
          totalQuestions: session.questions.length,
          correctAnswers,
          timeSpent,
          subject: session.subject,
          completedAt: endTime,
          answers,
        }

        set((state) => ({
          currentSession: {
            ...session,
            endTime,
            score,
            isCompleted: true,
          },
          quizResults: [...state.quizResults, result],
        }))

        return result
      },

      loadQuestionsFromFile: async () => {
        console.log('Starting to load questions from file...')
        set({ isLoading: true })
        try {
          const response = await fetch('/data/questions.json')
          if (!response.ok) {
            throw new Error(`Failed to load questions: ${response.status}`)
          }
          const questionsData = await response.json()
          console.log('Raw questions data loaded, processing...')

          const questions: Question[] = Object.values(questionsData).map((q: any) => ({
            id: q.id || generateId(),
            question_text: q.question_text,
            option_a: q.option_a,
            option_b: q.option_b,
            option_c: q.option_c,
            option_d: q.option_d,
            correct_choice: q.correct_choice,
            rationale: q.rationale,
            subject: q.subject,
            exam_id: q.exam_id,
            examname: q.examname,
            file_name: q.file_name,
          }))

          console.log(`Processed ${questions.length} questions`)

          // Count questions by subject
          const subjectCounts = questions.reduce((acc, q) => {
            acc[q.subject] = (acc[q.subject] || 0) + 1
            return acc
          }, {} as Record<string, number>)
          console.log('Questions by subject:', subjectCounts)

          // Always update with loaded questions
          set({
            questions: questions,
            isLoading: false,
            questionsLoaded: true
          })
          console.log('Questions loaded successfully')
        } catch (error) {
          console.error('Error loading questions:', error)
          // Fallback to sample questions if file loading fails
          set({
            questions: sampleQuestions,
            isLoading: false,
            questionsLoaded: true
          })
          console.log('Fallback to sample questions')
        }
      },

      importQuestions: (questionsData) => {
        const questions: Question[] = Object.values(questionsData).map((q: any) => ({
          id: q.id || generateId(),
          question_text: q.question_text,
          option_a: q.option_a,
          option_b: q.option_b,
          option_c: q.option_c,
          option_d: q.option_d,
          correct_choice: q.correct_choice,
          rationale: q.rationale,
          subject: q.subject,
          exam_id: q.exam_id,
          examname: q.examname,
          file_name: q.file_name,
        }))

        set((state) => ({
          questions: [...state.questions, ...questions],
        }))
      },

      exportQuestions: () => {
        return get().questions
      },

      clearAllData: () => {
        set({
          questions: [],
          currentSession: null,
          quizResults: [],
        })
      },
    }),
    {
      name: 'pharmaquest-data',
      partialize: (state) => ({
        // Only persist quiz results, not questions to avoid localStorage quota issues
        quizResults: state.quizResults,
      }),
    }
  )
)
