'use client'

import React from 'react'

interface PharmaceuticalQuizWrapperProps {
  children: React.ReactNode
}

export function PharmaceuticalQuizWrapper({ children }: PharmaceuticalQuizWrapperProps) {
  return (
    <div className="pharmaceutical-quiz-container" suppressHydrationWarning>
      {children}
    </div>
  )
}
