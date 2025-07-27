'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { useQuestionStore } from '@/store/useQuestionStore'
import { Button } from '@/components/ui/Button'
import { Question, Subject } from '@/types'
import { X, Save, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface QuestionFormProps {
  question?: Question
  onClose: () => void
  onSave: () => void
}

const subjects: Subject[] = [
  'Basic Medical Sciences',
  'Pharmaceutical Sciences',
  'Social & Behavioral Sciences',
  'Clinical Sciences',
  'Pharmaceutical Calculations',
  'Medicinal Chemistry'
]

export function QuestionForm({ question, onClose, onSave }: QuestionFormProps) {
  const { t } = useLanguage()
  const { addQuestion, updateQuestion } = useQuestionStore()
  
  const [formData, setFormData] = useState({
    question_text: question?.question_text || '',
    option_a: question?.option_a || '',
    option_b: question?.option_b || '',
    option_c: question?.option_c || '',
    option_d: question?.option_d || '',
    correct_choice: question?.correct_choice || 'A' as 'A' | 'B' | 'C' | 'D',
    rationale: question?.rationale || '',
    subject: question?.subject || 'Pharmaceutical Sciences' as Subject,
    exam_id: question?.exam_id || 'SPLE2024',
    examname: question?.examname || 'SPLE',
    file_name: question?.file_name || '2024'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.question_text.trim()) {
      newErrors.question_text = 'نص السؤال مطلوب'
    }

    if (!formData.option_a.trim()) {
      newErrors.option_a = 'الخيار أ مطلوب'
    }

    if (!formData.option_b.trim()) {
      newErrors.option_b = 'الخيار ب مطلوب'
    }

    if (!formData.option_c.trim()) {
      newErrors.option_c = 'الخيار ج مطلوب'
    }

    if (!formData.option_d.trim()) {
      newErrors.option_d = 'الخيار د مطلوب'
    }

    if (!formData.rationale.trim()) {
      newErrors.rationale = 'التفسير مطلوب'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('يرجى تصحيح الأخطاء في النموذج')
      return
    }

    try {
      if (question) {
        updateQuestion(question.id, formData)
        toast.success('تم تحديث السؤال بنجاح')
      } else {
        addQuestion(formData)
        toast.success('تم إضافة السؤال بنجاح')
      }
      
      onSave()
      onClose()
    } catch (error) {
      toast.error('حدث خطأ أثناء حفظ السؤال')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {question ? t('admin.editQuestion') : t('admin.addQuestion')}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.questionText')} *
            </label>
            <textarea
              value={formData.question_text}
              onChange={(e) => handleInputChange('question_text', e.target.value)}
              rows={3}
              className={cn(
                'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
                errors.question_text ? 'border-error-500' : 'border-gray-300'
              )}
              placeholder="أدخل نص السؤال..."
            />
            {errors.question_text && (
              <p className="mt-1 text-sm text-error-600">{errors.question_text}</p>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['A', 'B', 'C', 'D'].map((option) => (
              <div key={option}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t(`admin.option${option}`)} *
                </label>
                <textarea
                  value={formData[`option_${option.toLowerCase()}` as keyof typeof formData] as string}
                  onChange={(e) => handleInputChange(`option_${option.toLowerCase()}`, e.target.value)}
                  rows={2}
                  className={cn(
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
                    errors[`option_${option.toLowerCase()}`] ? 'border-error-500' : 'border-gray-300'
                  )}
                  placeholder={`أدخل الخيار ${option}...`}
                />
                {errors[`option_${option.toLowerCase()}`] && (
                  <p className="mt-1 text-sm text-error-600">{errors[`option_${option.toLowerCase()}`]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Correct Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.correctAnswer')} *
            </label>
            <select
              value={formData.correct_choice}
              onChange={(e) => handleInputChange('correct_choice', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          {/* Rationale */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.explanation')} *
            </label>
            <textarea
              value={formData.rationale}
              onChange={(e) => handleInputChange('rationale', e.target.value)}
              rows={3}
              className={cn(
                'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
                errors.rationale ? 'border-error-500' : 'border-gray-300'
              )}
              placeholder="أدخل تفسير الإجابة الصحيحة..."
            />
            {errors.rationale && (
              <p className="mt-1 text-sm text-error-600">{errors.rationale}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.subject')} *
            </label>
            <select
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.examId')}
              </label>
              <input
                type="text"
                value={formData.exam_id}
                onChange={(e) => handleInputChange('exam_id', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="SPLE2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.examName')}
              </label>
              <input
                type="text"
                value={formData.examname}
                onChange={(e) => handleInputChange('examname', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="SPLE"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.fileName')}
              </label>
              <input
                type="text"
                value={formData.file_name}
                onChange={(e) => handleInputChange('file_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="2024"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Save className="w-4 h-4" />
              <span>{t('common.save')}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
