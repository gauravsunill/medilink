import { useState } from 'react'
import { Stethoscope, LogIn, Lock, ArrowLeft, Activity } from 'lucide-react'

export default function DoctorLogin({ onLogin, onBack }) {
  const [code, setCode] = useState('')
  const [doctorName, setDoctorName] = useState('')
  
  const handleLogin = () => {
    if (!code.trim() || !doctorName.trim()) {
      alert('Please enter both your name and patient access code')
      return
    }
    onLogin(code.trim(), doctorName.trim())
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MediLink</h1>
              <p className="text-xs text-gray-500">Healthcare Platform</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors text-sm"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </button>
          )}
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center">
              <Stethoscope className="text-green-600" size={32} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Doctor Portal</h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Access patient medical records securely
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Your Name
              </label>
              <input 
                type="text"
                placeholder="Dr. Sharma"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
                <Lock size={16} />
                Patient Access Code
              </label>
              <input 
                type="text"
                placeholder="MED-XXXXXX"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 font-mono focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
              />
              <p className="text-xs text-gray-500 mt-2">
                Patient will provide this code (format: MED-XXXXXX)
              </p>
            </div>
            
            <button 
              onClick={handleLogin}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Access Patient Records
            </button>
          </div>
          
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-900 text-center">
              <strong>🔒 Security Notice:</strong> Only access records with patient consent. 
              All access is logged for security purposes.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
