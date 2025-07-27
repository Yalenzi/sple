'use client'

import React from 'react'
import Link from 'next/link'
import { BookOpen, Play, Award, Users, BarChart3, Settings } from 'lucide-react'

export default function HomePage() {
  const sections = [
    {
      id: 'pharmaceutical-sciences',
      title: 'Pharmaceutical Sciences',
      description: 'Drug formulation, pharmacokinetics, and pharmaceutical technology',
      icon: '💊',
      href: '/quiz/pharmaceutical',
      progress: 65,
      totalQuestions: 25,
      completedQuestions: 16,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'clinical-sciences',
      title: 'Clinical Sciences',
      description: 'Pharmacology, therapeutics, and clinical applications',
      icon: '🩺',
      href: '/quiz/pharmaceutical',
      progress: 45,
      totalQuestions: 30,
      completedQuestions: 14,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'basic-medical-sciences',
      title: 'Basic Medical Sciences',
      description: 'Anatomy, physiology, biochemistry, and microbiology',
      icon: '🧬',
      href: '/quiz/pharmaceutical',
      progress: 80,
      totalQuestions: 20,
      completedQuestions: 16,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'pharmaceutical-calculations',
      title: 'Pharmaceutical Calculations',
      description: 'Dosage calculations, concentrations, and mathematical problems',
      icon: '🧮',
      href: '/quiz/pharmaceutical',
      progress: 30,
      totalQuestions: 15,
      completedQuestions: 5,
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">PharmaQuest</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Master Pharmaceutical Sciences
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Comprehensive quiz platform for pharmacy students and professionals. 
            Test your knowledge across all major pharmaceutical disciplines.
          </p>
          <Link 
            href="/quiz/pharmaceutical"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>Start Learning</span>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">6</div>
              <div className="text-sm text-gray-600">Subjects</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">1000+</div>
              <div className="text-sm text-gray-600">Students</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Choose Your Subject
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive collection of pharmaceutical science topics. 
              Each subject includes detailed explanations and progress tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {/* Icon and Title */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">{section.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {section.title}
                      </h4>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{section.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${section.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${section.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{section.completedQuestions}/{section.totalQuestions} completed</span>
                    <span className="flex items-center space-x-1">
                      <Play className="w-3 h-3" />
                      <span>Start</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose PharmaQuest?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Content</h4>
              <p className="text-gray-600 text-sm">
                Covers all major pharmaceutical science topics with detailed explanations
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Progress Tracking</h4>
              <p className="text-gray-600 text-sm">
                Monitor your learning progress and identify areas for improvement
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Feedback</h4>
              <p className="text-gray-600 text-sm">
                Get immediate explanations and learn from your mistakes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h5 className="text-xl font-bold">PharmaQuest</h5>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 PharmaQuest. Empowering pharmaceutical education worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
