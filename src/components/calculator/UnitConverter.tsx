'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { Button } from '@/components/ui/Button'
import { ArrowUpDown, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConversionResult {
  value: number
  fromUnit: string
  toUnit: string
  formula: string
}

const conversionFactors = {
  weight: {
    'kg': { 'g': 1000, 'mg': 1000000, 'mcg': 1000000000, 'lb': 2.20462 },
    'g': { 'kg': 0.001, 'mg': 1000, 'mcg': 1000000, 'oz': 0.035274 },
    'mg': { 'kg': 0.000001, 'g': 0.001, 'mcg': 1000, 'gr': 0.015432 },
    'mcg': { 'kg': 0.000000001, 'g': 0.000001, 'mg': 0.001 },
    'lb': { 'kg': 0.453592, 'oz': 16 },
    'oz': { 'g': 28.3495, 'lb': 0.0625 },
    'gr': { 'mg': 64.79891 }
  },
  volume: {
    'L': { 'ml': 1000, 'dl': 10, 'cl': 100, 'fl oz': 33.814 },
    'ml': { 'L': 0.001, 'dl': 0.01, 'cl': 0.1, 'tsp': 0.202884, 'tbsp': 0.067628 },
    'dl': { 'L': 0.1, 'ml': 100, 'cl': 10 },
    'cl': { 'L': 0.01, 'ml': 10, 'dl': 0.1 },
    'fl oz': { 'L': 0.0295735, 'ml': 29.5735 },
    'tsp': { 'ml': 4.92892, 'tbsp': 0.333333 },
    'tbsp': { 'ml': 14.7868, 'tsp': 3 }
  },
  temperature: {
    'C': { 'F': (c: number) => (c * 9/5) + 32, 'K': (c: number) => c + 273.15 },
    'F': { 'C': (f: number) => (f - 32) * 5/9, 'K': (f: number) => ((f - 32) * 5/9) + 273.15 },
    'K': { 'C': (k: number) => k - 273.15, 'F': (k: number) => ((k - 273.15) * 9/5) + 32 }
  }
}

export function UnitConverter() {
  const { t } = useLanguage()
  
  const [inputs, setInputs] = useState({
    value: '',
    fromUnit: 'mg',
    toUnit: 'g',
    category: 'weight'
  })
  
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const unitOptions = {
    weight: [
      { value: 'kg', label: 'كيلوجرام (kg)' },
      { value: 'g', label: 'جرام (g)' },
      { value: 'mg', label: 'مليجرام (mg)' },
      { value: 'mcg', label: 'ميكروجرام (mcg)' },
      { value: 'lb', label: 'رطل (lb)' },
      { value: 'oz', label: 'أونصة (oz)' },
      { value: 'gr', label: 'حبة (gr)' }
    ],
    volume: [
      { value: 'L', label: 'لتر (L)' },
      { value: 'ml', label: 'مليلتر (ml)' },
      { value: 'dl', label: 'ديسيلتر (dl)' },
      { value: 'cl', label: 'سنتيلتر (cl)' },
      { value: 'fl oz', label: 'أونصة سائلة (fl oz)' },
      { value: 'tsp', label: 'ملعقة صغيرة (tsp)' },
      { value: 'tbsp', label: 'ملعقة كبيرة (tbsp)' }
    ],
    temperature: [
      { value: 'C', label: 'درجة مئوية (°C)' },
      { value: 'F', label: 'فهرنهايت (°F)' },
      { value: 'K', label: 'كلفن (K)' }
    ]
  }

  const validateInputs = () => {
    const newErrors: Record<string, string> = {}
    
    if (!inputs.value || isNaN(parseFloat(inputs.value))) {
      newErrors.value = 'يرجى إدخال قيمة رقمية صحيحة'
    }
    
    if (inputs.fromUnit === inputs.toUnit) {
      newErrors.units = 'يجب أن تكون الوحدات مختلفة'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const convertUnits = () => {
    if (!validateInputs()) return

    const value = parseFloat(inputs.value)
    const { fromUnit, toUnit, category } = inputs
    
    let convertedValue: number
    let formula: string

    if (category === 'temperature') {
      const tempFactors = conversionFactors.temperature as any
      if (tempFactors[fromUnit] && tempFactors[fromUnit][toUnit]) {
        convertedValue = tempFactors[fromUnit][toUnit](value)
        formula = getTemperatureFormula(fromUnit, toUnit)
      } else {
        convertedValue = value
        formula = 'تحويل مباشر'
      }
    } else {
      const factors = conversionFactors[category as keyof typeof conversionFactors] as any
      
      if (factors[fromUnit] && factors[fromUnit][toUnit]) {
        const factor = factors[fromUnit][toUnit]
        convertedValue = value * factor
        formula = `${value} × ${factor} = ${convertedValue}`
      } else {
        // Try reverse conversion
        if (factors[toUnit] && factors[toUnit][fromUnit]) {
          const factor = factors[toUnit][fromUnit]
          convertedValue = value / factor
          formula = `${value} ÷ ${factor} = ${convertedValue}`
        } else {
          convertedValue = value
          formula = 'تحويل غير متاح'
        }
      }
    }
    
    setResult({
      value: convertedValue,
      fromUnit,
      toUnit,
      formula
    })
  }

  const getTemperatureFormula = (from: string, to: string): string => {
    if (from === 'C' && to === 'F') return '(°C × 9/5) + 32 = °F'
    if (from === 'F' && to === 'C') return '(°F - 32) × 5/9 = °C'
    if (from === 'C' && to === 'K') return '°C + 273.15 = K'
    if (from === 'K' && to === 'C') return 'K - 273.15 = °C'
    if (from === 'F' && to === 'K') return '((°F - 32) × 5/9) + 273.15 = K'
    if (from === 'K' && to === 'F') return '((K - 273.15) × 9/5) + 32 = °F'
    return 'معادلة التحويل'
  }

  const swapUnits = () => {
    setInputs(prev => ({
      ...prev,
      fromUnit: prev.toUnit,
      toUnit: prev.fromUnit
    }))
    setResult(null)
  }

  const resetConverter = () => {
    setInputs({
      value: '',
      fromUnit: 'mg',
      toUnit: 'g',
      category: 'weight'
    })
    setResult(null)
    setErrors({})
  }

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }))
    if (errors[field] || errors.units) {
      setErrors(prev => ({ ...prev, [field]: '', units: '' }))
    }
  }

  const handleCategoryChange = (category: string) => {
    const defaultUnits = {
      weight: { from: 'mg', to: 'g' },
      volume: { from: 'ml', to: 'L' },
      temperature: { from: 'C', to: 'F' }
    }
    
    setInputs(prev => ({
      ...prev,
      category,
      fromUnit: defaultUnits[category as keyof typeof defaultUnits].from,
      toUnit: defaultUnits[category as keyof typeof defaultUnits].to
    }))
    setResult(null)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
          <ArrowUpDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          محول الوحدات
        </h2>
      </div>

      <div className="space-y-4">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            نوع التحويل
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(unitOptions).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  'px-3 py-2 text-sm rounded-lg border transition-colors',
                  inputs.category === category
                    ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                )}
              >
                {category === 'weight' ? 'الوزن' : category === 'volume' ? 'الحجم' : 'الحرارة'}
              </button>
            ))}
          </div>
        </div>

        {/* Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            القيمة المراد تحويلها
          </label>
          <input
            type="number"
            value={inputs.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            placeholder="100"
            className={cn(
              'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
              errors.value ? 'border-error-500' : 'border-gray-300'
            )}
          />
          {errors.value && (
            <p className="mt-1 text-sm text-error-600">{errors.value}</p>
          )}
        </div>

        {/* Unit Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              من
            </label>
            <select
              value={inputs.fromUnit}
              onChange={(e) => handleInputChange('fromUnit', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              {unitOptions[inputs.category as keyof typeof unitOptions].map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              إلى
            </label>
            <select
              value={inputs.toUnit}
              onChange={(e) => handleInputChange('toUnit', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              {unitOptions[inputs.category as keyof typeof unitOptions].map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {errors.units && (
          <p className="text-sm text-error-600">{errors.units}</p>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 rtl:space-x-reverse pt-4">
          <Button onClick={convertUnits} className="flex-1">
            تحويل
          </Button>
          <Button variant="outline" onClick={swapUnits}>
            <ArrowUpDown className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={resetConverter}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
              نتيجة التحويل:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-purple-800 dark:text-purple-200">النتيجة:</span>
                <span className="font-bold text-lg text-purple-900 dark:text-purple-100">
                  {result.value.toFixed(6)} {result.toUnit}
                </span>
              </div>
              <div className="border-t border-purple-200 dark:border-purple-700 pt-2">
                <span className="text-purple-800 dark:text-purple-200 text-xs">المعادلة:</span>
                <p className="font-mono text-purple-900 dark:text-purple-100 text-xs mt-1">
                  {result.formula}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
