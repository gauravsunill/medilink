import { useState } from 'react'
import { User, Stethoscope, Activity, Search } from 'lucide-react'

export default function HomePage({ onSelectPortal }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MediLink</h1>
                <p className="text-xs text-gray-500">Healthcare Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search anything in MediLink"
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to MediLink</h1>
          <p className="text-lg text-gray-600">Secure, unified access to your medical records</p>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Portal Card */}
          <div
            onClick={() => onSelectPortal('patient')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 cursor-pointer hover:shadow-md transition-all hover:border-blue-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                <User className="text-blue-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Patient Portal</h2>
                <p className="text-sm text-gray-500">Access your health records</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Manage your medical records, view prescriptions, track medications, and share access with healthcare providers.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>View medical history</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Scan prescriptions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Track medications</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>View lab results</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Access Patient Portal
            </button>
          </div>

          {/* Doctor Portal Card */}
          <div
            onClick={() => onSelectPortal('doctor')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 cursor-pointer hover:shadow-md transition-all hover:border-green-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center">
                <Stethoscope className="text-green-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Doctor Portal</h2>
                <p className="text-sm text-gray-500">Access patient records</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              View patient history, create prescriptions, check drug interactions, and manage patient care.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>View patient history</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>Create prescriptions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>Check drug interactions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>View lab results</span>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Access Doctor Portal
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
