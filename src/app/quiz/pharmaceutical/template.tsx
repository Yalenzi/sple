'use client'

import React, { useEffect } from 'react'

interface PharmaceuticalQuizTemplateProps {
  children: React.ReactNode
}

export default function PharmaceuticalQuizTemplate({ children }: PharmaceuticalQuizTemplateProps) {
  useEffect(() => {
    // Set LTR direction for pharmaceutical quiz
    const originalDir = document.documentElement.dir
    const originalLang = document.documentElement.lang
    
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
    
    // Cleanup function
    return () => {
      document.documentElement.dir = originalDir
      document.documentElement.lang = originalLang
    }
  }, [])

  return (
    <div className="pharmaceutical-quiz-page" suppressHydrationWarning>
      {children}
    </div>
  )
}
