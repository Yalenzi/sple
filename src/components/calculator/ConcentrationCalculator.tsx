'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { Button } from '@/components/ui/Button'
import { Beaker, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConcentrationResult {
  concentration: number
  percentageStrength: number
  mgPerMl: number
  unit: string
}

export function ConcentrationCalculator() {
  const { t } = useLanguage()
  
  const [inputs, setInputs] = useState({
    amount: '',
    volume: '',
    amountUnit: 'mg',
    volumeUnit: 'ml'
  })
  
  const [result, setResult] = useState<ConcentrationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateInputs = () => {
    const newErrors: Record<string, string> = {}
    
    if (!inputs.amount || parseFloat(inputs.amount) <= 0) {
      newErrors.amount = 'يرجى إدخال كمية صحيحة'
    }
    
    if (!inputs.volume || parseFloat(inputs.volume) <= 0) {
      newErrors.volume = 'يرجى إدخال حجم صحيح'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateConcentration = () => {
    if (!validateInputs()) return

    let amount = parseFloat(inputs.amount)
    let volume = parseFloat(inputs.volume)
    
    // Convert to standard units (mg and ml)
    if (inputs.amountUnit === 'g') amount *= 1000
    if (inputs.amountUnit === 'mcg') amount /= 1000
    
    if (inputs.volumeUnit === 'L') volume *= 1000
    if (inputs.volumeUnit === 'dl') volume *= 100
    
    const mgPerMl = amount / volume
    const percentageStrength = (amount / (volume * 1000)) * 100 // mg/ml to percentage
    
    setResult({
      concentration: mgPerMl,
      percentageStrength,
      mgPerMl,
      unit: 'mg/ml'
    })
  }

  const resetCalculator = () => {
    setInputs({
      amount: '',
      volume: '',
      amountUnit: 'mg',
      volumeUnit: 'ml'
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
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
          <Beaker className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          حاسبة التراكيز
        </h2>
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            كمية المادة الفعالة
          </label>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <input
              type="number"
              value={inputs.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="500"
              className={cn(
                'flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
                errors.amount ? 'border-error-500' : 'border-gray-300'
              )}
            />
            <select
              value={inputs.amountUnit}
              onChange={(e) => handleInputChange('amountUnit', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="mg">مجم</option>
              <option value="g">جرام</option>
              <option value="mcg">ميكروجرام</option>
            </select>
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-error-600">{errors.amount}</p>
          )}
        </div>

        {/* Volume Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            حجم المحلول
          </label>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <input
              type="number"
              value={inputs.volume}
              onChange={(e) => handleInputChange('volume', e.target.value)}
              placeholder="100"
              className={cn(
                'flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
                errors.volume ? 'border-error-500' : 'border-gray-300'
              )}
            />
            <select
              value={inputs.volumeUnit}
              onChange={(e) => handleInputChange('volumeUnit', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="ml">مل</option>
              <option value="L">لتر</option>
              <option value="dl">ديسيلتر</option>
            </select>
          </div>
          {errors.volume && (
            <p className="mt-1 text-sm text-error-600">{errors.volume}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 rtl:space-x-reverse pt-4">
          <Button onClick={calculateConcentration} className="flex-1">
            حساب التركيز
          </Button>
          <Button variant="outline" onClick={resetCalculator}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              نتائج الحساب:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-800 dark:text-green-200">التركيز:</span>
                <span className="font-medium text-green-900 dark:text-green-100">
                  {result.concentration.toFixed(2)} mg/ml
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-800 dark:text-green-200">النسبة المئوية:</span>
                <span className="font-medium text-green-900 dark:text-green-100">
                  {result.percentageStrength.toFixed(4)}%
                </span>
              </div>
              <div className="flex justify-between border-t border-green-200 dark:border-green-700 pt-2">
                <span className="text-green-800 dark:text-green-200 font-medium">القوة:</span>
                <span className="font-bold text-green-900 dark:text-green-100">
                  {result.mgPerMl.toFixed(2)} mg/ml
                </span>
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="mt-4 pt-3 border-t border-green-200 dark:border-green-700">
              <p className="text-xs text-green-700 dark:text-green-300">
                <strong>ملاحظة:</strong> هذا التركيز يعني أن كل 1 مل من المحلول يحتوي على {result.mgPerMl.toFixed(2)} مجم من المادة الفعالة.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
