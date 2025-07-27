'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { SectionCard as SectionCardType } from '@/types'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { 
  Microscope, 
  Pill, 
  Users, 
  Stethoscope, 
  Calculator, 
  Atom,
  Play,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap = {
  'microscope': Microscope,
  'pill': Pill,
  'users': Users,
  'stethoscope': Stethoscope,
  'calculator': Calculator,
  'atom': Atom,
}

interface SectionCardProps {
  section: SectionCardType
  className?: string
}

export function SectionCard({ section, className }: SectionCardProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const Icon = iconMap[section.icon as keyof typeof iconMap] || Microscope

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if clicking on the card itself, not on interactive elements
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.card-content')) {
      console.log('Card clicked, navigating to:', section.href)
      router.push(section.href)
    }
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    console.log('Button clicked, navigating to:', section.href)
    router.push(section.href)
  }
  
  const progressPercentage = section.totalQuestions > 0 
    ? Math.round((section.completedQuestions / section.totalQuestions) * 100)
    : 0

  const getStatusColor = () => {
    if (progressPercentage === 0) return 'text-gray-500'
    if (progressPercentage < 50) return 'text-warning-600'
    if (progressPercentage < 100) return 'text-primary-600'
    return 'text-success-600'
  }

  const getStatusText = () => {
    if (progressPercentage === 0) return t('dashboard.notStarted')
    if (progressPercentage < 100) return t('dashboard.inProgress')
    return t('dashboard.completed')
  }

  return (
    <div
      className={cn(
        'group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-600 cursor-pointer',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 card-content">
        <div className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110',
          section.color
        )}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="text-right rtl:text-left">
          <div className={cn('text-sm font-medium', getStatusColor())}>
            {getStatusText()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {section.completedQuestions} / {section.totalQuestions} {t('quiz.question')}
          </div>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-4 card-content">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {t(section.title)}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {t(section.description)}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {t('dashboard.progress')}
          </span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {progressPercentage}%
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          <BarChart3 className="w-3 h-3" />
          <span>
            {section.averageScore > 0 ? `${section.averageScore}%` : '--'}
          </span>
        </div>
        <div>
          {section.totalQuestions} {t('quiz.question')}
        </div>
      </div>

      {/* Action Button */}
      <div className="space-y-2">
        <Button
          onClick={handleButtonClick}
          className="w-full group-hover:bg-primary-700 transition-colors"
          size="sm"
        >
          <Play className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
          {progressPercentage === 0 ? t('common.start') : t('common.continue')}
        </Button>

        {/* Backup simple button for testing */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            console.log('Simple button clicked for:', section.title)
            window.location.href = section.href
          }}
          className="w-full px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          🚀 Go to {section.title} (Test Button)
        </button>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}
