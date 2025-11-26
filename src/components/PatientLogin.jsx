import { useState } from 'react'
import { User, Lock, ArrowLeft, Activity } from 'lucide-react'

export default function PatientLogin({ onLogin, onBack }) {
  const [patientId, setPatientId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!patientId.trim() || !password.trim()) {
      setError('Please enter both Patient ID and Password')
      return
    }

    if (patientId.trim().toLowerCase() === 'demo' && password === 'patient123') {
      onLogin()
    } else {
      setError('Invalid Patient ID or Password. For demo: Patient ID is "demo" and password is "patient123".')
    }
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
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
              <User className="text-blue-600" size={32} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Patient Login</h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Sign in to access your medical records
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Patient ID
              </label>
              <input
                type="text"
                placeholder="demo"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={patientId}
                onChange={(e) => {
                  setPatientId(e.target.value)
                  setError('')
                }}
                onKeyPress={handleKeyPress}
              />
              <p className="text-xs text-gray-500 mt-2">
                Demo Patient ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">demo</code>
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                onKeyPress={handleKeyPress}
              />
              <p className="text-xs text-gray-500 mt-2">
                Demo password: <code className="bg-gray-100 px-2 py-1 rounded text-xs">patient123</code>
              </p>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              Sign In
            </button>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-900 text-center">
              <strong>💡 Demo Mode:</strong> Patient ID is <code className="bg-blue-100 px-1 rounded">demo</code> and 
              Password is <code className="bg-blue-100 px-1 rounded">patient123</code>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
