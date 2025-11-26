import { Share2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import QRCode from 'qrcode.react'

export default function ShareAccess({ accessCode }) {
  const [copied, setCopied] = useState(false)
  
  const copyCode = () => {
    navigator.clipboard.writeText(accessCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Share2 className="text-medical-primary" />
        Share Access with Doctor
      </h2>
      
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-gray-700 leading-relaxed">
          <strong>Share this code with your doctor</strong> to give them secure access to your complete medical history. 
          They can view all medications, notes, and check for drug interactions.
        </p>
      </div>
      
      <div className="flex flex-col items-center gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-200">
          <QRCode value={accessCode} size={220} level="H" />
        </div>
        
        <div className="w-full">
          <p className="text-sm font-semibold text-gray-600 mb-2 text-center">
            Or share this code manually:
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-3xl font-mono bg-gray-100 px-6 py-4 rounded-lg text-center font-bold text-medical-primary border-2 border-gray-300">
              {accessCode}
            </code>
            <button 
              onClick={copyCode}
              className={`p-4 rounded-lg font-semibold transition-all ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-medical-primary text-white hover:bg-blue-700'
              }`}
              title="Copy to clipboard"
            >
              {copied ? <Check size={24} /> : <Copy size={24} />}
            </button>
          </div>
          {copied && (
            <p className="text-green-600 text-sm mt-2 text-center font-medium">
              ✓ Code copied to clipboard!
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-900">
          <strong>🔒 Privacy Note:</strong> Only share this code with trusted healthcare providers. 
          They will have full access to your medical information while treating you.
        </p>
      </div>
    </div>
  )
}

