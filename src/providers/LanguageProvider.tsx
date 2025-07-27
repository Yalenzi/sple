'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'ar' | 'en'
type Direction = 'rtl' | 'ltr'

interface LanguageContextType {
  language: Language
  direction: Direction
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations = {
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    
    // Dashboard
    'dashboard.title': 'مرحباً بك في PharmaQuest',
    'dashboard.subtitle': 'منصة تفاعلية لدراسة امتحانات ترخيص الصيدلة',
    'dashboard.progress': 'التقدم العام',
    'dashboard.completed': 'مكتمل',
    'dashboard.inProgress': 'قيد التقدم',
    'dashboard.notStarted': 'لم يبدأ',
    
    // Sections
    'section.basicMedical': 'العلوم الطبية الأساسية',
    'section.basicMedical.desc': 'وحدات تفاعلية تغطي علم وظائف الأعضاء والكيمياء الحيوية وعلم الأحياء الدقيقة',
    'section.pharmaceutical': 'العلوم الصيدلانية',
    'section.pharmaceutical.desc': 'نظام اختبارات للصيدلة وكيمياء الأدوية والصيدلة الفيزيائية',
    'section.social': 'العلوم الاجتماعية والسلوكية',
    'section.social.desc': 'أدوات تقييم للأخلاقيات والسياسات الصحية والسلوك المهني',
    'section.clinical': 'العلوم السريرية',
    'section.clinical.desc': 'سيناريوهات قائمة على الحالات لتفاعلات الأدوية وبروتوكولات العلاج',
    'section.calculations': 'الحسابات الصيدلانية',
    'section.calculations.desc': 'حاسبات تفاعلية للجرعات والتراكيز والتحويلات',
    'section.chemistry': 'مخططات الكيمياء الطبية',
    'section.chemistry.desc': 'مكون بصري لرسم التراكيب الكيميائية والتفاعل معها',
    
    // Common
    'common.start': 'ابدأ',
    'common.continue': 'متابعة',
    'common.complete': 'مكتمل',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'تم بنجاح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.add': 'إضافة',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.export': 'تصدير',
    'common.import': 'استيراد',
    
    // Quiz
    'quiz.question': 'السؤال',
    'quiz.of': 'من',
    'quiz.next': 'التالي',
    'quiz.previous': 'السابق',
    'quiz.submit': 'إرسال',
    'quiz.correct': 'إجابة صحيحة!',
    'quiz.incorrect': 'إجابة خاطئة',
    'quiz.explanation': 'التفسير',
    'quiz.score': 'النتيجة',
    'quiz.timeRemaining': 'الوقت المتبقي',
    'quiz.finished': 'انتهى الاختبار',
    'quiz.review': 'مراجعة الإجابات',
    
    // Admin
    'admin.title': 'لوحة تحكم الإدارة',
    'admin.users': 'المستخدمون',
    'admin.questions': 'الأسئلة',
    'admin.addQuestion': 'إضافة سؤال جديد',
    'admin.editQuestion': 'تعديل السؤال',
    'admin.deleteQuestion': 'حذف السؤال',
    'admin.questionText': 'نص السؤال',
    'admin.optionA': 'الخيار أ',
    'admin.optionB': 'الخيار ب',
    'admin.optionC': 'الخيار ج',
    'admin.optionD': 'الخيار د',
    'admin.correctAnswer': 'الإجابة الصحيحة',
    'admin.explanation': 'التفسير',
    'admin.subject': 'الموضوع',
    'admin.examId': 'معرف الامتحان',
    'admin.examName': 'اسم الامتحان',
    'admin.fileName': 'اسم الملف',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.title': 'Welcome to PharmaQuest',
    'dashboard.subtitle': 'Interactive platform for Saudi pharmacy licensing examinations',
    'dashboard.progress': 'Overall Progress',
    'dashboard.completed': 'Completed',
    'dashboard.inProgress': 'In Progress',
    'dashboard.notStarted': 'Not Started',
    
    // Sections
    'section.basicMedical': 'Basic Medical Sciences',
    'section.basicMedical.desc': 'Interactive modules covering physiology, biochemistry, and microbiology',
    'section.pharmaceutical': 'Pharmaceutical Sciences',
    'section.pharmaceutical.desc': 'Quiz system for pharmacology, medicinal chemistry, and physical pharmacy',
    'section.social': 'Social & Behavioral Sciences',
    'section.social.desc': 'Assessment tools for ethics, health policies, and professional behavior',
    'section.clinical': 'Clinical Sciences',
    'section.clinical.desc': 'Case-based scenarios for drug interactions and treatment protocols',
    'section.calculations': 'Pharmaceutical Calculations',
    'section.calculations.desc': 'Interactive calculators for dosages, concentrations, and conversions',
    'section.chemistry': 'Medicinal Chemistry Diagrams',
    'section.chemistry.desc': 'Visual component for chemical structure drawing and interaction',
    
    // Common
    'common.start': 'Start',
    'common.continue': 'Continue',
    'common.complete': 'Complete',
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.export': 'Export',
    'common.import': 'Import',
    
    // Quiz
    'quiz.question': 'Question',
    'quiz.of': 'of',
    'quiz.next': 'Next',
    'quiz.previous': 'Previous',
    'quiz.submit': 'Submit',
    'quiz.correct': 'Correct answer!',
    'quiz.incorrect': 'Incorrect answer',
    'quiz.explanation': 'Explanation',
    'quiz.score': 'Score',
    'quiz.timeRemaining': 'Time Remaining',
    'quiz.finished': 'Quiz Finished',
    'quiz.review': 'Review Answers',
    
    // Admin
    'admin.title': 'Admin Dashboard',
    'admin.users': 'Users',
    'admin.questions': 'Questions',
    'admin.addQuestion': 'Add New Question',
    'admin.editQuestion': 'Edit Question',
    'admin.deleteQuestion': 'Delete Question',
    'admin.questionText': 'Question Text',
    'admin.optionA': 'Option A',
    'admin.optionB': 'Option B',
    'admin.optionC': 'Option C',
    'admin.optionD': 'Option D',
    'admin.correctAnswer': 'Correct Answer',
    'admin.explanation': 'Explanation',
    'admin.subject': 'Subject',
    'admin.examId': 'Exam ID',
    'admin.examName': 'Exam Name',
    'admin.fileName': 'File Name',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar')
  const [mounted, setMounted] = useState(false)
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr'

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)

    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)

      // Update document attributes only after mount
      if (mounted) {
        document.documentElement.lang = lang
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'

        // Update font family more safely
        const currentClasses = document.body.className
        let newClasses = currentClasses

        if (lang === 'ar') {
          if (currentClasses.includes('font-inter')) {
            newClasses = currentClasses.replace('font-inter', 'font-tajawal')
          } else if (!currentClasses.includes('font-tajawal')) {
            newClasses = `${currentClasses} font-tajawal`.trim()
          }
        } else {
          if (currentClasses.includes('font-tajawal')) {
            newClasses = currentClasses.replace('font-tajawal', 'font-inter')
          } else if (!currentClasses.includes('font-inter')) {
            newClasses = `${currentClasses} font-inter`.trim()
          }
        }

        if (newClasses !== currentClasses) {
          document.body.className = newClasses
        }
      }
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  useEffect(() => {
    setMounted(true)
    // Load saved language from localStorage
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage) // Use setLanguageState to avoid DOM manipulation during initial load
      }
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
