import { useState } from 'react'
import { Phone, AlertCircle, Heart, Pill, User, Download, Share2 } from 'lucide-react'
import QRCode from 'qrcode.react'
import { jsPDF } from 'jspdf'

export default function EmergencyCard({ patient }) {
  const [showFullCard, setShowFullCard] = useState(false)

  const emergencyContacts = patient.emergencyContacts || [
    { name: 'Dr. Sharma', relationship: 'Primary Doctor', phone: '+91-98765-43210', primary: true },
    { name: 'Rajesh Kumar Jr.', relationship: 'Son', phone: '+91-98765-43211', primary: false }
  ]

  const generateEmergencySMS = () => {
    const allergies = patient.allergies?.join(', ') || 'None'
    const medications = patient.medications?.map(m => m.name).join(', ') || 'None'
    const conditions = patient.conditions?.join(', ') || 'None'
    
    const message = `MEDICAL EMERGENCY - ${patient.name}, Age ${patient.age}, Blood Group ${patient.bloodGroup}. Allergic to: ${allergies}. Current medications: ${medications}. Chronic conditions: ${conditions}. Location: [Your location]. Contact Dr at [Hospital].`
    
    return encodeURIComponent(message)
  }

  const downloadMedicalID = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    
    // Header
    doc.setFillColor(220, 53, 69)
    doc.rect(0, 0, pageWidth, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.text('MEDICAL ID CARD', pageWidth / 2, 20, { align: 'center' })
    
    // Patient Info
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(16)
    doc.text(`Name: ${patient.name}`, 20, 50)
    doc.text(`Age: ${patient.age} years`, 20, 60)
    doc.text(`Blood Group: ${patient.bloodGroup}`, 20, 70)
    
    // Allergies
    if (patient.allergies && patient.allergies.length > 0) {
      doc.setFillColor(255, 0, 0)
      doc.rect(20, 80, pageWidth - 40, 20, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(14)
      doc.text(`⚠️ ALLERGIES: ${patient.allergies.join(', ')}`, pageWidth / 2, 95, { align: 'center' })
      doc.setTextColor(0, 0, 0)
    }
    
    // Conditions
    doc.setFontSize(12)
    doc.text(`Chronic Conditions: ${patient.conditions?.join(', ') || 'None'}`, 20, 120)
    
    // Medications
    const meds = patient.medications?.map(m => `${m.name} (${m.dosage})`).join(', ') || 'None'
    doc.text(`Current Medications: ${meds}`, 20, 130)
    
    // Emergency Contact
    const primaryContact = emergencyContacts.find(c => c.primary) || emergencyContacts[0]
    if (primaryContact) {
      doc.text(`Emergency Contact: ${primaryContact.name} - ${primaryContact.phone}`, 20, 140)
    }
    
    // Access Code
    doc.setFontSize(10)
    doc.text(`Access Code: ${patient.accessCode}`, 20, 160)
    
    doc.save(`MedicalID_${patient.name.replace(' ', '_')}.pdf`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 border-2 border-red-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-red-700">
          <AlertCircle className="text-red-600" size={24} />
          Emergency Medical Information
        </h2>
        <button
          onClick={() => setShowFullCard(!showFullCard)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
        >
          {showFullCard ? 'Show Less' : 'Show Full Card'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Critical Info */}
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Heart className="text-red-600" size={20} />
              <span className="font-semibold">Blood Group:</span>
              <span className="text-red-700 font-bold text-lg">{patient.bloodGroup}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="text-red-600" size={20} />
              <span className="font-semibold">Age:</span>
              <span className="text-red-700 font-bold">{patient.age} years</span>
            </div>
          </div>

          {patient.allergies && patient.allergies.length > 0 && (
            <div className="bg-red-100 border-2 border-red-400 rounded-lg p-3 mb-3">
              <p className="font-bold text-red-900 flex items-center gap-2">
                <AlertCircle size={20} />
                ALLERGIES: {patient.allergies.join(', ')}
              </p>
            </div>
          )}

          {patient.conditions && patient.conditions.length > 0 && (
            <div>
              <p className="font-semibold text-gray-800 mb-1">Chronic Conditions:</p>
              <div className="flex flex-wrap gap-2">
                {patient.conditions.map((cond, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Current Medications */}
        {patient.medications && patient.medications.length > 0 && (
          <div>
            <p className="font-semibold mb-2 flex items-center gap-2">
              <Pill className="text-blue-600" size={18} />
              Current Medications:
            </p>
            <div className="bg-blue-50 rounded-lg p-3">
              {patient.medications.map((med, i) => (
                <p key={i} className="text-sm">
                  • {med.name} ({med.dosage}) - {med.frequency}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        <div>
          <p className="font-semibold mb-2 flex items-center gap-2">
            <Phone className="text-green-600" size={18} />
            Emergency Contacts:
          </p>
          <div className="space-y-2">
            {emergencyContacts.map((contact, i) => (
              <div key={i} className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Phone size={18} />
                  {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Access Code */}
        {showFullCard && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-semibold mb-2">Access Code for Full Records:</p>
            <div className="flex items-center gap-4">
              <code className="flex-1 text-2xl font-mono bg-white px-4 py-3 rounded-lg border-2 border-gray-300 text-center">
                {patient.accessCode}
              </code>
              <div className="bg-white p-2 rounded-lg">
                <QRCode value={patient.accessCode} size={80} level="H" />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a
            href={`sms:?body=${generateEmergencySMS()}`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
          >
            <Share2 size={20} />
            Send Emergency SMS
          </a>
          <button
            onClick={downloadMedicalID}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <Download size={20} />
            Download Medical ID
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(patient.accessCode)
              alert('Access code copied to clipboard!')
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
          >
            Copy Access Code
          </button>
        </div>
      </div>
    </div>
  )
}

