'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { useQuestionStore } from '@/store/useQuestionStore'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Subject } from '@/types'
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  RotateCcw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface QuizInterfaceProps {
  subject: Subject
}

export function QuizInterface({ subject }: QuizInterfaceProps) {
  const { t, direction } = useLanguage()
  const router = useRouter()
  const { 
    currentSession, 
    startQuiz, 
    answerQuestion, 
    nextQuestion, 
    previousQuestion, 
    finishQuiz 
  } = useQuestionStore()
  
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)

  // Timer effect
  useEffect(() => {
    if (!currentSession || currentSession.isCompleted) return

    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [currentSession])

  // Initialize quiz if not started
  useEffect(() => {
    if (!currentSession) {
      startQuiz(subject, 10)
    }
  }, [subject, currentSession, startQuiz])

  // Load saved answer when question changes
  useEffect(() => {
    if (currentSession) {
      const currentQuestion = currentSession.questions[currentSession.currentQuestionIndex]
      const savedAnswer = currentSession.answers[currentQuestion?.id] || ''
      setSelectedAnswer(savedAnswer)
      setIsAnswered(!!savedAnswer)
      setShowExplanation(false)
    }
  }, [currentSession?.currentQuestionIndex, currentSession])

  if (!currentSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  const currentQuestion = currentSession.questions[currentSession.currentQuestionIndex]
  const progress = ((currentSession.currentQuestionIndex + 1) / currentSession.questions.length) * 100
  const isLastQuestion = currentSession.currentQuestionIndex === currentSession.questions.length - 1
  const isFirstQuestion = currentSession.currentQuestionIndex === 0

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    answerQuestion(currentQuestion.id, answer)
    setIsAnswered(true)
  }

  const handleShowExplanation = () => {
    if (!selectedAnswer) {
      toast.error('يرجى اختيار إجابة أولاً')
      return
    }
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      handleFinishQuiz()
    } else {
      nextQuestion()
    }
  }

  const handleFinishQuiz = () => {
    const result = finishQuiz()
    if (result) {
      toast.success(`تم إنهاء الاختبار! النتيجة: ${result.score}%`)
      router.push(`/quiz/result/${result.sessionId}`)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getAnswerStatus = (option: string) => {
    if (!showExplanation) return 'default'
    if (option === currentQuestion.correct_choice) return 'correct'
    if (option === selectedAnswer && option !== currentQuestion.correct_choice) return 'incorrect'
    return 'default'
  }

  const getAnswerIcon = (option: string) => {
    const status = getAnswerStatus(option)
    if (status === 'correct') return <CheckCircle className="w-5 h-5 text-success-600" />
    if (status === 'incorrect') return <XCircle className="w-5 h-5 text-error-600" />
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t(`section.${subject.toLowerCase().replace(/\s+/g, '')}`)}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('quiz.question')} {currentSession.currentQuestionIndex + 1} {t('quiz.of')} {currentSession.questions.length}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-400">
              <Clock className="w-5 h-5" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
            >
              العودة للرئيسية
            </Button>
          </div>
        </div>
        
        <Progress value={progress} className="h-3" />
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
          {currentQuestion.question_text}
        </h2>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {[
            { key: 'A', text: currentQuestion.option_a },
            { key: 'B', text: currentQuestion.option_b },
            { key: 'C', text: currentQuestion.option_c },
            { key: 'D', text: currentQuestion.option_d },
          ].map((option) => {
            const status = getAnswerStatus(option.key)
            const isSelected = selectedAnswer === option.key
            
            return (
              <button
                key={option.key}
                onClick={() => !showExplanation && handleAnswerSelect(option.key)}
                disabled={showExplanation}
                className={cn(
                  'w-full p-4 text-right rtl:text-right border-2 rounded-lg transition-all duration-200 flex items-center justify-between',
                  {
                    'border-primary-300 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-600': isSelected && status === 'default',
                    'border-success-300 bg-success-50 dark:bg-success-900/20 dark:border-success-600': status === 'correct',
                    'border-error-300 bg-error-50 dark:bg-error-900/20 dark:border-error-600': status === 'incorrect',
                    'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600': !isSelected && status === 'default',
                    'cursor-not-allowed opacity-75': showExplanation,
                  }
                )}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={cn(
                    'w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold',
                    {
                      'border-primary-500 bg-primary-500 text-white': isSelected && status === 'default',
                      'border-success-500 bg-success-500 text-white': status === 'correct',
                      'border-error-500 bg-error-500 text-white': status === 'incorrect',
                      'border-gray-300 dark:border-gray-600': !isSelected && status === 'default',
                    }
                  )}>
                    {option.key}
                  </div>
                  <span className="text-gray-900 dark:text-white">{option.text}</span>
                </div>
                
                {getAnswerIcon(option.key)}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {t('quiz.explanation')}
                </h4>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  {currentQuestion.rationale}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Button
              variant="outline"
              onClick={() => previousQuestion()}
              disabled={isFirstQuestion}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              {direction === 'rtl' ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
              <span>{t('quiz.previous')}</span>
            </Button>
          </div>

          <div className="flex space-x-3 rtl:space-x-reverse">
            {isAnswered && !showExplanation && (
              <Button
                variant="outline"
                onClick={handleShowExplanation}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{t('quiz.explanation')}</span>
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <span>{isLastQuestion ? t('quiz.submit') : t('quiz.next')}</span>
              {direction === 'rtl' ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
