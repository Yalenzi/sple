'use client'

import React from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { Button } from './Button'
import { Languages } from 'lucide-react'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">
        {language === 'ar' ? 'EN' : 'عر'}
      </span>
    </Button>
  )
}
