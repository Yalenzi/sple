'use client'

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/providers/LanguageProvider'
import { useQuestionStore } from '@/store/useQuestionStore'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { 
  Settings, 
  Moon, 
  Sun, 
  Languages, 
  Bell, 
  Download, 
  Upload,
  Trash2,
  Save,
  AlertTriangle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { exportQuestions, importQuestions, clearAllData } = useQuestionStore()
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    studyReminders: true,
    newContent: true,
    achievements: true
  })
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
    toast.success('تم حفظ الإعدادات')
  }

  const handleExportData = () => {
    try {
      const data = exportQuestions()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `pharmaquest-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('تم تصدير البيانات بنجاح')
    } catch (error) {
      toast.error('حدث خطأ أثناء تصدير البيانات')
    }
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        importQuestions(data)
        toast.success('تم استيراد البيانات بنجاح')
      } catch (error) {
        toast.error('خطأ في تنسيق الملف')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const handleClearAllData = () => {
    if (showDeleteConfirm) {
      clearAllData()
      setShowDeleteConfirm(false)
      toast.success('تم حذف جميع البيانات')
    } else {
      setShowDeleteConfirm(true)
      setTimeout(() => setShowDeleteConfirm(false), 5000)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('nav.settings')}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة تفضيلاتك وإعدادات التطبيق
          </p>
        </div>

        <div className="space-y-8">
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              المظهر واللغة
            </h2>
            
            <div className="space-y-6">
              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  المظهر
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={cn(
                      'flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg border-2 transition-colors',
                      theme === 'light'
                        ? 'border-primary-300 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                    )}
                  >
                    <Sun className="w-5 h-5" />
                    <span>فاتح</span>
                  </button>
                  
                  <button
                    onClick={() => setTheme('dark')}
                    className={cn(
                      'flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg border-2 transition-colors',
                      theme === 'dark'
                        ? 'border-primary-300 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                    )}
                  >
                    <Moon className="w-5 h-5" />
                    <span>داكن</span>
                  </button>
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  اللغة
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage('ar')}
                    className={cn(
                      'flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg border-2 transition-colors',
                      language === 'ar'
                        ? 'border-primary-300 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                    )}
                  >
                    <Languages className="w-5 h-5" />
                    <span>العربية</span>
                  </button>
                  
                  <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                      'flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg border-2 transition-colors',
                      language === 'en'
                        ? 'border-primary-300 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                    )}
                  >
                    <Languages className="w-5 h-5" />
                    <span>English</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                الإشعارات
              </h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries({
                email: 'إشعارات البريد الإلكتروني',
                push: 'الإشعارات المنبثقة',
                studyReminders: 'تذكيرات الدراسة',
                newContent: 'المحتوى الجديد',
                achievements: 'الإنجازات والجوائز'
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{label}</span>
                  <button
                    onClick={() => handleNotificationChange(key, !notifications[key as keyof typeof notifications])}
                    className={cn(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      notifications[key as keyof typeof notifications]
                        ? 'bg-primary-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        notifications[key as keyof typeof notifications]
                          ? 'translate-x-6 rtl:-translate-x-6'
                          : 'translate-x-1 rtl:-translate-x-1'
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              إدارة البيانات
            </h2>
            
            <div className="space-y-4">
              {/* Export Data */}
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">
                    تصدير البيانات
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    احفظ نسخة احتياطية من تقدمك ونتائجك
                  </p>
                </div>
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير</span>
                </Button>
              </div>

              {/* Import Data */}
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div>
                  <h3 className="font-medium text-green-900 dark:text-green-100">
                    استيراد البيانات
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    استعد نسخة احتياطية من بياناتك
                  </p>
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                  <Button
                    as="span"
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <Upload className="w-4 h-4" />
                    <span>استيراد</span>
                  </Button>
                </label>
              </div>

              {/* Clear All Data */}
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div>
                  <h3 className="font-medium text-red-900 dark:text-red-100">
                    حذف جميع البيانات
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    احذف جميع التقدم والنتائج نهائياً
                  </p>
                </div>
                <Button
                  onClick={handleClearAllData}
                  variant="danger"
                  size="sm"
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  {showDeleteConfirm ? (
                    <>
                      <AlertTriangle className="w-4 h-4" />
                      <span>تأكيد الحذف</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>حذف الكل</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              حول التطبيق
            </h2>
            
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>الإصدار:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>تاريخ الإصدار:</span>
                <span className="font-medium">2024</span>
              </div>
              <div className="flex justify-between">
                <span>المطور:</span>
                <span className="font-medium">PharmaQuest Team</span>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs leading-relaxed">
                  PharmaQuest هو تطبيق تعليمي مخصص لمساعدة طلاب الصيدلة في التحضير لامتحانات الترخيص. 
                  جميع المحتويات التعليمية والأسئلة مخصصة للأغراض التدريبية فقط.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
