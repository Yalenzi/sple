'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Question {
  id: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_choice: 'A' | 'B' | 'C' | 'D'
  rationale: string
}

export default function PharmaceuticalQuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [canProceed, setCanProceed] = useState(false)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const questions = [
    {
      id: 1,
      question_text: 'What is the scientific name of Aspirin?',
      option_a: 'Acetylsalicylic acid',
      option_b: 'Salicylic acid',
      option_c: 'Paracetamol',
      option_d: 'Ibuprofen',
      correct_choice: 'A' as const,
      rationale: 'Aspirin is chemically known as acetylsalicylic acid, which is derived from salicylic acid.'
    },
    {
      id: 2,
      question_text: 'Which route of administration provides 100% bioavailability?',
      option_a: 'Oral',
      option_b: 'Intramuscular',
      option_c: 'Intravenous',
      option_d: 'Sublingual',
      correct_choice: 'C' as const,
      rationale: 'Intravenous administration provides 100% bioavailability as the drug is directly administered into the systemic circulation.'
    },
    {
      id: 3,
      question_text: 'What is the half-life of a drug?',
      option_a: 'Time for drug concentration to reach maximum',
      option_b: 'Time for 50% of the drug to be eliminated',
      option_c: 'Time for drug to start working',
      option_d: 'Time for complete elimination',
      correct_choice: 'B' as const,
      rationale: 'Half-life is the time required for the plasma concentration of a drug to decrease by 50%.'
    },
    {
      id: 4,
      question_text: 'Which factor affects drug absorption?',
      option_a: 'pH of the stomach',
      option_b: 'Blood flow to absorption site',
      option_c: 'Drug particle size',
      option_d: 'All of the above',
      correct_choice: 'D' as const,
      rationale: 'All these factors significantly affect drug absorption from the gastrointestinal tract.'
    },
    {
      id: 5,
      question_text: 'What is bioequivalence?',
      option_a: 'Same chemical structure',
      option_b: 'Same therapeutic effect',
      option_c: 'Similar bioavailability profiles',
      option_d: 'Same side effects',
      correct_choice: 'C' as const,
      rationale: 'Bioequivalence means two pharmaceutical products have similar bioavailability when administered under similar conditions.'
    }
  ]

  const currentQ = questions[currentQuestion]

  // Load saved answer when question changes
  useEffect(() => {
    const savedAnswer = answers[currentQuestion] || ''
    setSelectedAnswer(savedAnswer)
    setShowCorrectAnswer(!!savedAnswer)
    setCanProceed(!!savedAnswer)
  }, [currentQuestion, answers])

  const handleAnswerSelect = (answer: string) => {
    if (showCorrectAnswer) return
    
    setSelectedAnswer(answer)
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }))
    setShowCorrectAnswer(true)
    setCanProceed(true)
  }

  const handleNext = () => {
    if (!canProceed) {
      alert('Please select an answer before proceeding.')
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const finishQuiz = () => {
    let correctCount = 0
    questions.forEach((q, index) => {
      if (answers[index] === q.correct_choice) {
        correctCount++
      }
    })
    setScore(Math.round((correctCount / questions.length) * 100))
    setIsQuizCompleted(true)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer('')
    setAnswers({})
    setShowCorrectAnswer(false)
    setCanProceed(false)
    setIsQuizCompleted(false)
    setScore(0)
  }

  const goHome = () => {
    router.push('/')
  }

  if (isQuizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">{score}%</div>
            <p className="text-gray-600 mb-6">
              You answered {Object.keys(answers).filter(key => answers[parseInt(key)] === questions[parseInt(key)].correct_choice).length} out of {questions.length} questions correctly.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={restartQuiz}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take Quiz Again
              </button>
              <button
                onClick={goHome}
                className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">Pharmaceutical Sciences Quiz</h1>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Question */}
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4 leading-relaxed">
              {currentQ.question_text}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {['A', 'B', 'C', 'D'].map((option) => {
              const optionText = currentQ[`option_${option.toLowerCase()}` as keyof Question] as string
              const isSelected = selectedAnswer === option
              const isCorrect = option === currentQ.correct_choice
              const showResult = showCorrectAnswer

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showCorrectAnswer}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : isSelected
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-500 text-white'
                          : isSelected
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-gray-300 text-gray-500'
                        : isSelected
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 text-gray-500'
                    }`}>
                      {option}
                    </span>
                    <span className="flex-1">{optionText}</span>
                    {showResult && isCorrect && (
                      <span className="text-green-600">✓</span>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <span className="text-red-600">✗</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showCorrectAnswer && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Explanation:</h3>
              <p className="text-blue-800 text-sm leading-relaxed">{currentQ.rationale}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
