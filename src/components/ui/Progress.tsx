'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  color?: 'primary' | 'success' | 'warning' | 'error'
}

export function Progress({ 
  value, 
  max = 100, 
  className, 
  showLabel = false,
  color = 'primary'
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600',
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out rounded-full',
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 text-center">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}
