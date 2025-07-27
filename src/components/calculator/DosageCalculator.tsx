'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { Button } from '@/components/ui/Button'
import { Calculator, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DosageResult {
  dose: number
  frequency: number
  dailyDose: number
  unit: string
}

export function DosageCalculator() {
  const { t } = useLanguage()
  
  const [inputs, setInputs] = useState({
    weight: '',
    dosePerKg: '',
    frequency: '1',
    unit: 'mg'
  })
  
  const [result, setResult] = useState<DosageResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateInputs = () => {
    const newErrors: Record<string, string> = {}
    
    if (!inputs.weight || parseFloat(inputs.weight) <= 0) {
      newErrors.weight = 'يرجى إدخال وزن صحيح'
    }
    
    if (!inputs.dosePerKg || parseFloat(inputs.dosePerKg) <= 0) {
      newErrors.dosePerKg = 'يرجى إدخال جرعة صحيحة لكل كيلوجرام'
    }
    
    if (!inputs.frequency || parseInt(inputs.frequency) <= 0) {
      newErrors.frequency = 'يرجى إدخال عدد مرات صحيح'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateDosage = () => {
    if (!validateInputs()) return

    const weight = parseFloat(inputs.weight)
    const dosePerKg = parseFloat(inputs.dosePerKg)
    const frequency = parseInt(inputs.frequency)
    
    const singleDose = weight * dosePerKg
    const dailyDose = singleDose * frequency
    
    setResult({
      dose: singleDose,
      frequency,
      dailyDose,
      unit: inputs.unit
    })
  }

  const resetCalculator = () => {
    setInputs({
      weight: '',
      dosePerKg: '',
      frequency: '1',
      unit: 'mg'
    })
    setResult(null)
    setErrors({})
  }

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
          <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          حاسبة الجرعات
        </h2>
      </div>

      <div className="space-y-4">
        {/* Weight Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            وزن المريض (كيلوجرام)
          </label>
          <input
            type="number"
            value={inputs.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder="70"
            className={cn(
              'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
              errors.weight ? 'border-error-500' : 'border-gray-300'
            )}
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-error-600">{errors.weight}</p>
          )}
        </div>

        {/* Dose per kg */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            الجرعة لكل كيلوجرام
          </label>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <input
              type="number"
              value={inputs.dosePerKg}
              onChange={(e) => handleInputChange('dosePerKg', e.target.value)}
              placeholder="10"
              className={cn(
                'flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
                errors.dosePerKg ? 'border-error-500' : 'border-gray-300'
              )}
            />
            <select
              value={inputs.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="mg">مجم</option>
              <option value="g">جرام</option>
              <option value="mcg">ميكروجرام</option>
              <option value="IU">وحدة دولية</option>
            </select>
          </div>
          {errors.dosePerKg && (
            <p className="mt-1 text-sm text-error-600">{errors.dosePerKg}</p>
          )}
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            عدد المرات في اليوم
          </label>
          <select
            value={inputs.frequency}
            onChange={(e) => handleInputChange('frequency', e.target.value)}
            className={cn(
              'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
              errors.frequency ? 'border-error-500' : 'border-gray-300'
            )}
          >
            <option value="1">مرة واحدة يومياً</option>
            <option value="2">مرتين يومياً</option>
            <option value="3">ثلاث مرات يومياً</option>
            <option value="4">أربع مرات يومياً</option>
            <option value="6">كل 4 ساعات</option>
            <option value="8">كل 3 ساعات</option>
          </select>
          {errors.frequency && (
            <p className="mt-1 text-sm text-error-600">{errors.frequency}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 rtl:space-x-reverse pt-4">
          <Button onClick={calculateDosage} className="flex-1">
            حساب الجرعة
          </Button>
          <Button variant="outline" onClick={resetCalculator}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
              نتائج الحساب:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-800 dark:text-blue-200">الجرعة الواحدة:</span>
                <span className="font-medium text-blue-900 dark:text-blue-100">
                  {result.dose.toFixed(2)} {result.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800 dark:text-blue-200">عدد المرات:</span>
                <span className="font-medium text-blue-900 dark:text-blue-100">
                  {result.frequency} مرة/يوم
                </span>
              </div>
              <div className="flex justify-between border-t border-blue-200 dark:border-blue-700 pt-2">
                <span className="text-blue-800 dark:text-blue-200 font-medium">الجرعة اليومية الإجمالية:</span>
                <span className="font-bold text-blue-900 dark:text-blue-100">
                  {result.dailyDose.toFixed(2)} {result.unit}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
