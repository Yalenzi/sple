'use client'

import React from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { Progress } from '@/components/ui/Progress'
import { Subject } from '@/types'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock,
  Award,
  CheckCircle
} from 'lucide-react'

interface ProgressData {
  subject: Subject
  totalQuestions: number
  completedQuestions: number
  correctAnswers: number
  averageScore: number
  timeSpent: number // in minutes
  lastStudied?: Date
}

interface ProgressChartProps {
  progressData: ProgressData[]
}

export function ProgressChart({ progressData }: ProgressChartProps) {
  const { t } = useLanguage()

  const overallStats = progressData.reduce(
    (acc, data) => ({
      totalQuestions: acc.totalQuestions + data.totalQuestions,
      completedQuestions: acc.completedQuestions + data.completedQuestions,
      correctAnswers: acc.correctAnswers + data.correctAnswers,
      timeSpent: acc.timeSpent + data.timeSpent,
    }),
    { totalQuestions: 0, completedQuestions: 0, correctAnswers: 0, timeSpent: 0 }
  )

  const overallProgress = overallStats.totalQuestions > 0 
    ? Math.round((overallStats.completedQuestions / overallStats.totalQuestions) * 100)
    : 0

  const overallAccuracy = overallStats.completedQuestions > 0
    ? Math.round((overallStats.correctAnswers / overallStats.completedQuestions) * 100)
    : 0

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} دقيقة`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours} ساعة${remainingMinutes > 0 ? ` و ${remainingMinutes} دقيقة` : ''}`
  }

  const getSubjectIcon = (subject: Subject) => {
    switch (subject) {
      case 'Basic Medical Sciences': return '🧬'
      case 'Pharmaceutical Sciences': return '💊'
      case 'Social & Behavioral Sciences': return '👥'
      case 'Clinical Sciences': return '🏥'
      case 'Pharmaceutical Calculations': return '📐'
      case 'Medicinal Chemistry': return '🧫'
      default: return '📚'
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'success'
    if (percentage >= 60) return 'warning'
    return 'primary'
  }

  return (
    <div className="space-y-6">
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">التقدم العام</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <Progress value={overallProgress} className="mt-4" color={getProgressColor(overallProgress)} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">دقة الإجابات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallAccuracy}%</p>
            </div>
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-success-600 dark:text-success-400" />
            </div>
          </div>
          <Progress value={overallAccuracy} className="mt-4" color="success" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">الأسئلة المكتملة</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {overallStats.completedQuestions}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                من {overallStats.totalQuestions}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">وقت الدراسة</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatTime(overallStats.timeSpent)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <BarChart3 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            التقدم حسب الأقسام
          </h2>
        </div>

        <div className="space-y-4">
          {progressData.map((data) => {
            const completionPercentage = data.totalQuestions > 0 
              ? Math.round((data.completedQuestions / data.totalQuestions) * 100)
              : 0
            
            const accuracyPercentage = data.completedQuestions > 0
              ? Math.round((data.correctAnswers / data.completedQuestions) * 100)
              : 0

            return (
              <div key={data.subject} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-2xl">{getSubjectIcon(data.subject)}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {data.subject}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {data.completedQuestions} من {data.totalQuestions} سؤال
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right rtl:text-left">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {completionPercentage}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      دقة: {accuracyPercentage}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>التقدم</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <Progress 
                    value={completionPercentage} 
                    className="h-2" 
                    color={getProgressColor(completionPercentage)}
                  />
                  
                  {data.completedQuestions > 0 && (
                    <>
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>دقة الإجابات</span>
                        <span>{accuracyPercentage}%</span>
                      </div>
                      <Progress 
                        value={accuracyPercentage} 
                        className="h-2" 
                        color="success"
                      />
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    وقت الدراسة: {formatTime(data.timeSpent)}
                  </span>
                  {data.lastStudied && (
                    <span>
                      آخر دراسة: {new Date(data.lastStudied).toLocaleDateString('ar-SA')}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Award className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            تحليل الأداء
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div>
            <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3">
              نقاط القوة
            </h3>
            <div className="space-y-2">
              {progressData
                .filter(data => data.completedQuestions > 0 && (data.correctAnswers / data.completedQuestions) >= 0.8)
                .map(data => (
                  <div key={`strength-${data.subject}`} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {data.subject} - {Math.round((data.correctAnswers / data.completedQuestions) * 100)}% دقة
                    </span>
                  </div>
                ))}
              {progressData.filter(data => data.completedQuestions > 0 && (data.correctAnswers / data.completedQuestions) >= 0.8).length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  استمر في الدراسة لتحقيق نقاط قوة في الأقسام المختلفة
                </p>
              )}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div>
            <h3 className="font-semibold text-orange-700 dark:text-orange-400 mb-3">
              مجالات التحسين
            </h3>
            <div className="space-y-2">
              {progressData
                .filter(data => data.completedQuestions > 0 && (data.correctAnswers / data.completedQuestions) < 0.7)
                .map(data => (
                  <div key={`improvement-${data.subject}`} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <Target className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {data.subject} - {Math.round((data.correctAnswers / data.completedQuestions) * 100)}% دقة
                    </span>
                  </div>
                ))}
              {progressData.filter(data => data.completedQuestions > 0 && (data.correctAnswers / data.completedQuestions) < 0.7).length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  أداء ممتاز! استمر في المحافظة على هذا المستوى
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
