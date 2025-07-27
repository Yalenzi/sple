'use client'

import React from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { Navbar } from '@/components/layout/Navbar'
import { DosageCalculator } from '@/components/calculator/DosageCalculator'
import { ConcentrationCalculator } from '@/components/calculator/ConcentrationCalculator'
import { UnitConverter } from '@/components/calculator/UnitConverter'
import { Calculator, Info } from 'lucide-react'

export default function CalculatorPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('section.calculations')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('section.calculations.desc')}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Info className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                تنبيه مهم
              </h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                هذه الحاسبات مخصصة للأغراض التعليمية والتدريبية فقط. يجب دائماً التحقق من الحسابات والرجوع إلى المراجع الطبية المعتمدة قبل تطبيق أي جرعة أو تركيز في الممارسة السريرية. لا تتحمل المنصة أي مسؤولية عن الاستخدام الخاطئ لهذه الأدوات.
              </p>
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Dosage Calculator */}
          <div className="lg:col-span-1">
            <DosageCalculator />
          </div>

          {/* Concentration Calculator */}
          <div className="lg:col-span-1">
            <ConcentrationCalculator />
          </div>

          {/* Unit Converter */}
          <div className="lg:col-span-2 xl:col-span-1">
            <UnitConverter />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dosage Calculation Tips */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              نصائح حساب الجرعات
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>تأكد دائماً من وحدات القياس قبل الحساب</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>راجع الحد الأقصى والأدنى للجرعة اليومية</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>انتبه للفئات الخاصة (الأطفال، كبار السن، الحوامل)</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>تحقق من وظائف الكلى والكبد عند الحاجة</span>
              </li>
            </ul>
          </div>

          {/* Concentration Tips */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              نصائح حساب التراكيز
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>تأكد من تجانس الوحدات (مجم/مل، جم/لتر)</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>انتبه للفرق بين w/v و w/w و v/v</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>راعي درجة الحرارة عند حساب تراكيز السوائل</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>تحقق من الذوبانية والاستقرار</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Common Formulas */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            المعادلات الشائعة في الصيدلة
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">حساب الجرعة</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded">
                الجرعة = الوزن × الجرعة/كجم
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">التركيز</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded">
                التركيز = الكمية ÷ الحجم
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">التخفيف</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded">
                C₁V₁ = C₂V₂
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">النسبة المئوية</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded">
                % = (الجزء ÷ الكل) × 100
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">معدل التسريب</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded">
                معدل = الحجم ÷ الوقت
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">الجرعة الإجمالية</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded">
                الإجمالي = الجرعة × التكرار
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
