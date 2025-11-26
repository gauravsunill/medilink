import { useState } from 'react'
import { User, Lock, ArrowLeft } from 'lucide-react'

export default function PatientLogin({ onLogin, onBack }) {
  const [patientId, setPatientId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!patientId.trim() || !password.trim()) {
      setError('Please enter both Patient ID and Password')
      return
    }

    // Simple authentication - in production, this would check against a database
    // For demo: patient ID is "demo", password is "patient123"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <User size={48} className="text-blue-600" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Patient Login</h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to access your medical records
        </p>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <User size={16} />
              Patient ID
            </label>
            <input
              type="text"
              placeholder="demo"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-600 focus:outline-none"
              value={patientId}
              onChange={(e) => {
                setPatientId(e.target.value)
                setError('')
              }}
              onKeyPress={handleKeyPress}
            />
            <p className="text-xs text-gray-500 mt-2">
              Demo Patient ID: <code className="bg-gray-100 px-2 py-1 rounded">demo</code>
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <Lock size={16} />
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-600 focus:outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              onKeyPress={handleKeyPress}
            />
            <p className="text-xs text-gray-500 mt-2">
              Demo password: <code className="bg-gray-100 px-2 py-1 rounded">patient123</code>
            </p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 shadow-lg"
          >
            <Lock size={24} />
            Sign In
          </button>
        </div>

        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-900 text-center">
            <strong>💡 Demo Mode:</strong> Patient ID is <code className="bg-blue-100 px-1 rounded">demo</code> and 
            Password is <code className="bg-blue-100 px-1 rounded">patient123</code>
          </p>
        </div>
      </div>
    </div>
  )
}

