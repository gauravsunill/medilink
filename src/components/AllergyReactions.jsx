import { useState } from 'react'
import { AlertTriangle, Plus, X } from 'lucide-react'
import { storage } from '../utils/localStorage'

export default function AllergyReactions({ patient, onUpdate }) {
  const [showModal, setShowModal] = useState(false)
  const [reaction, setReaction] = useState({
    drugName: '',
    reactionType: '',
    severity: 'mild',
    date: new Date().toISOString().split('T')[0],
    description: ''
  })

  const reactionTypes = [
    'Rash', 'Swelling', 'Nausea', 'Breathing difficulty', 
    'Dizziness', 'Headache', 'Itching', 'Hives', 'Other'
  ]

  const handleSubmit = () => {
    if (!reaction.drugName || !reaction.reactionType) {
      alert('Please fill in drug name and reaction type')
      return
    }

    const patientData = storage.getPatient()
    if (!patientData.reactions) {
      patientData.reactions = []
    }

    patientData.reactions.push({
      id: Date.now(),
      ...reaction
    })

    storage.savePatient(patientData)
    setShowModal(false)
    setReaction({
      drugName: '',
      reactionType: '',
      severity: 'mild',
      date: new Date().toISOString().split('T')[0],
      description: ''
    })
    onUpdate()
  }

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'severe': return 'bg-red-100 text-red-800 border-red-300'
      case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-300'
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    }
  }

  const reactions = patient.reactions || []

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className="text-red-600" />
          Documented Reactions ({reactions.length})
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Report Reaction
        </button>
      </div>

      {reactions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No documented reactions</p>
      ) : (
        <div className="space-y-3">
          {reactions.map((r) => (
            <div
              key={r.id}
              className={`border-2 rounded-lg p-4 ${getSeverityColor(r.severity)}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{r.drugName}</h3>
                  <p className="mt-1">
                    <span className="font-semibold">Reaction:</span> {r.reactionType}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">Severity:</span> {r.severity.toUpperCase()}
                  </p>
                  {r.description && (
                    <p className="mt-2 text-sm">{r.description}</p>
                  )}
                </div>
                <div className="text-xs opacity-70">
                  {new Date(r.date).toLocaleDateString('en-IN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Report Adverse Reaction</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Drug Name *</label>
                <input
                  type="text"
                  value={reaction.drugName}
                  onChange={(e) => setReaction({...reaction, drugName: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-red-600 focus:outline-none"
                  placeholder="e.g., Penicillin, Aspirin"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Reaction Type *</label>
                <select
                  value={reaction.reactionType}
                  onChange={(e) => setReaction({...reaction, reactionType: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-red-600 focus:outline-none"
                >
                  <option value="">Select reaction type</option>
                  {reactionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Severity *</label>
                <select
                  value={reaction.severity}
                  onChange={(e) => setReaction({...reaction, severity: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-red-600 focus:outline-none"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Date Occurred</label>
                <input
                  type="date"
                  value={reaction.date}
                  onChange={(e) => setReaction({...reaction, date: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={reaction.description}
                  onChange={(e) => setReaction({...reaction, description: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 h-24 focus:border-red-600 focus:outline-none resize-none"
                  placeholder="Describe the reaction in detail..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                >
                  Save Reaction
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

