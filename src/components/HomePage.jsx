import { useState } from 'react'
import { User, Stethoscope, Activity } from 'lucide-react'

export default function HomePage({ onSelectPortal }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-medical-primary p-4 rounded-xl shadow-lg">
              <Activity className="text-white" size={48} />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-gray-900">MediLink</h1>
              <p className="text-lg text-gray-600 mt-2">Healthcare Interoperability Platform</p>
            </div>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Secure, unified access to your medical records across all healthcare providers
          </p>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Patient Portal Card */}
          <div
            onClick={() => onSelectPortal('patient')}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-blue-500"
          >
            <div className="bg-blue-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mb-6 mx-auto">
              <User className="text-blue-600" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Patient Portal</h2>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Access your medical records, view prescriptions, scan documents, and manage your health timeline
            </p>
            <div className="space-y-2 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>View medical history</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Scan prescriptions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>View scans & reports</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Share access with doctors</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
              Access Patient Portal
            </button>
          </div>

          {/* Doctor Portal Card */}
          <div
            onClick={() => onSelectPortal('doctor')}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-green-500"
          >
            <div className="bg-green-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mb-6 mx-auto">
              <Stethoscope className="text-green-600" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Doctor Portal</h2>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Access patient records, create prescriptions, check drug interactions, and view medical scans
            </p>
            <div className="space-y-2 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>View patient history</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Create prescriptions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Check drug interactions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>View scans & reports</span>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg">
              Access Doctor Portal
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>🔒 Your medical data is encrypted and secure</p>
        </div>
      </div>
    </div>
  )
}

