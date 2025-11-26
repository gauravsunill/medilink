import { useState } from 'react'
import { Stethoscope, LogIn, Lock, ArrowLeft } from 'lucide-react'

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
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl border-2 border-gray-100">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        )}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-medical-primary p-4 rounded-full">
            <Stethoscope size={52} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Doctor Portal</h2>
        <p className="text-center text-gray-600 mb-8">
          Access patient medical records securely
        </p>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Your Name
            </label>
            <input 
              type="text"
              placeholder="Dr. Sharma"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-medical-primary focus:outline-none text-lg"
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
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 font-mono text-lg uppercase focus:border-medical-primary focus:outline-none"
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
            className="w-full bg-medical-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 shadow-lg"
          >
            <LogIn size={24} />
            Access Patient Records
          </button>
        </div>
        
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-900 text-center">
            <strong>🔒 Security Notice:</strong> Only access records with patient consent. 
            All access is logged for security purposes.
          </p>
        </div>
      </div>
    </div>
  )
}

