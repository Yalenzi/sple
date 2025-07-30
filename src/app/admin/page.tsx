'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Settings, 
  BarChart3, 
  Upload, 
  Download,
  Home,
  Plus,
  FileText,
  Users
} from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const stats = {
    totalQuestions: 125,
    totalUsers: 1250,
    completionRate: 78,
    averageScore: 82
  }

  // Handler functions
  const handleAddQuestion = () => {
    setShowAddQuestion(true)
    const questionText = prompt('أدخل نص السؤال:')
    if (questionText) {
      alert(`تم إضافة السؤال: "${questionText}" بنجاح!`)
    }
    setShowAddQuestion(false)
  }

  const handleImportQuestions = () => {
    setShowImport(true)
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.json,.txt,.csv'
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        alert(`تم اختيار الملف: ${file.name}\nهذه الميزة قيد التطوير`)
      }
    }
    fileInput.click()
    setShowImport(false)
  }

  const handleExportData = () => {
    setShowExport(true)
    const data = JSON.stringify(stats, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pharmaquest-data.json'
    a.click()
    URL.revokeObjectURL(url)
    alert('تم تصدير البيانات بنجاح!')
    setShowExport(false)
  }

  const handleViewAnalytics = () => {
    alert(`📊 تحليلات المنصة:

✅ إجمالي الأسئلة: ${stats.totalQuestions}
👥 إجمالي المستخدمين: ${stats.totalUsers}
📈 معدل الإكمال: ${stats.completionRate}%
🎯 متوسط النتائج: ${stats.averageScore}%

هذه الميزة قيد التطوير لعرض تحليلات أكثر تفصيلاً`)
  }

  const handleSaveSettings = () => {
    setIsLoading(true)
    setShowSettings(true)
    // محاكاة حفظ الإعدادات
    setTimeout(() => {
      alert('✅ تم حفظ الإعدادات بنجاح!')
      setShowSettings(false)
      setIsLoading(false)
    }, 1000)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'questions', label: 'Questions', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <Link 
              href="/"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Questions</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalQuestions}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={handleAddQuestion}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Add Question</span>
                </button>

                <button
                  onClick={handleImportQuestions}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Import Questions</span>
                </button>

                <button
                  onClick={handleExportData}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Download className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Export Data</span>
                </button>

                <button
                  onClick={handleViewAnalytics}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Management</h3>
              <p className="text-gray-600 mb-4">
                Manage your question database. Add, edit, or remove questions from different subjects.
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddQuestion}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Question</span>
                  </button>

                  <button
                    onClick={handleImportQuestions}
                    className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import from File</span>
                  </button>

                  <button
                    onClick={handleExportData}
                    className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Questions</span>
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Recent Questions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">What is the mechanism of action of aspirin?</p>
                        <p className="text-sm text-gray-600">Pharmaceutical Sciences • Added 2 hours ago</p>
                      </div>
                      <button
                        onClick={() => alert('تحرير السؤال - هذه الميزة قيد التطوير')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Which route provides 100% bioavailability?</p>
                        <p className="text-sm text-gray-600">Clinical Sciences • Added 5 hours ago</p>
                      </div>
                      <button
                        onClick={() => alert('تحرير السؤال - هذه الميزة قيد التطوير')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
              <p className="text-gray-600 mb-4">
                Monitor user activity and performance across the platform.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">John Doe completed Pharmaceutical Sciences quiz</p>
                      <p className="text-sm text-gray-600">Score: 85% • 30 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Sarah Smith started Clinical Sciences quiz</p>
                      <p className="text-sm text-gray-600">In progress • 1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
              <p className="text-gray-600 mb-4">
                Configure platform settings and preferences.
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Quiz Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Default quiz time limit</span>
                      <select className="border border-gray-300 rounded-md px-3 py-1">
                        <option>60 minutes</option>
                        <option>90 minutes</option>
                        <option>120 minutes</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Questions per quiz</span>
                      <select className="border border-gray-300 rounded-md px-3 py-1">
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    isLoading
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
