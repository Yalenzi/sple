'use client'

import React from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { useQuestionStore } from '@/store/useQuestionStore'
import { Navbar } from '@/components/layout/Navbar'
import { ProgressChart } from '@/components/progress/ProgressChart'
import { Subject } from '@/types'
import { User, Calendar, Trophy, BookOpen } from 'lucide-react'

export default function ProfilePage() {
  const { t } = useLanguage()
  const { questions, quizResults } = useQuestionStore()

  // Mock user data
  const user = {
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    joinDate: new Date('2024-01-15'),
    avatar: null
  }

  // Calculate progress data for each subject
  const subjects: Subject[] = [
    'Basic Medical Sciences',
    'Pharmaceutical Sciences',
    'Social & Behavioral Sciences',
    'Clinical Sciences',
    'Pharmaceutical Calculations',
    'Medicinal Chemistry'
  ]

  const progressData = subjects.map(subject => {
    const subjectQuestions = (questions || []).filter(q => q.subject === subject)
    const subjectResults = (quizResults || []).filter(r => r.subject === subject)
    
    const totalQuestions = subjectQuestions.length
    const completedQuestions = subjectResults.length
    const correctAnswers = subjectResults.reduce((sum, result) => sum + result.correctAnswers, 0)
    const averageScore = subjectResults.length > 0 
      ? Math.round(subjectResults.reduce((sum, result) => sum + result.score, 0) / subjectResults.length)
      : 0
    const timeSpent = subjectResults.reduce((sum, result) => sum + result.timeSpent, 0)
    const lastStudied = subjectResults.length > 0 
      ? new Date(Math.max(...subjectResults.map(r => new Date(r.completedAt).getTime())))
      : undefined

    return {
      subject,
      totalQuestions,
      completedQuestions,
      correctAnswers,
      averageScore,
      timeSpent,
      lastStudied
    }
  })

  const totalQuizzes = (quizResults || []).length
  const totalTimeSpent = (quizResults || []).reduce((sum, result) => sum + result.timeSpent, 0)
  const averageScore = quizResults && quizResults.length > 0
    ? Math.round(quizResults.reduce((sum, result) => sum + result.score, 0) / quizResults.length)
    : 0

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} دقيقة`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours} ساعة${remainingMinutes > 0 ? ` و ${remainingMinutes} دقيقة` : ''}`
  }

  const getAchievementLevel = (score: number) => {
    if (score >= 90) return { level: 'ممتاز', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900' }
    if (score >= 80) return { level: 'جيد جداً', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900' }
    if (score >= 70) return { level: 'جيد', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900' }
    if (score >= 60) return { level: 'مقبول', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900' }
    return { level: 'يحتاج تحسين', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' }
  }

  const achievement = getAchievementLevel(averageScore)

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>انضم في {user.joinDate.toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className={`px-4 py-2 rounded-lg ${achievement.bg}`}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Trophy className={`w-5 h-5 ${achievement.color}`} />
                  <span className={`font-medium ${achievement.color}`}>
                    {achievement.level}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">الاختبارات المكتملة</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalQuizzes}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">متوسط النتائج</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageScore}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">وقت الدراسة الإجمالي</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatTime(totalTimeSpent)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Charts */}
        <ProgressChart progressData={progressData} />

        {/* Recent Activity */}
        {quizResults.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              النشاط الأخير
            </h2>
            
            <div className="space-y-4">
              {quizResults.slice(-10).reverse().map((result, index) => (
                <div key={result.sessionId} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {result.subject}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(result.completedAt).toLocaleDateString('ar-SA')} - 
                        {new Date(result.completedAt).toLocaleTimeString('ar-SA', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right rtl:text-left">
                    <div className={`text-lg font-bold ${
                      result.score >= 80 ? 'text-green-600' : 
                      result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {result.score}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {result.correctAnswers}/{result.totalQuestions} صحيح
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
