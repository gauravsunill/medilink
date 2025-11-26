import { useState } from 'react'
import { Plus, FileText } from 'lucide-react'
import { storage } from '../utils/localStorage'
import { checkInteractions } from '../data/drugInteractions'
import DrugInteractionAlert from './DrugInteractionAlert'

export default function AddPrescription({ doctorName, currentMedications, onPrescriptionAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: ''
  })
  const [interactions, setInteractions] = useState([])
  const [noteText, setNoteText] = useState('')
  
  const handleAddMedication = () => {
    if (!formData.name || !formData.dosage || !formData.frequency) {
      alert('Please fill all fields')
      return
    }
    
    const foundInteractions = checkInteractions(formData.name, currentMedications)
    
    if (foundInteractions.length > 0) {
      setInteractions(foundInteractions)
    } else {
      storage.addMedication({
        ...formData,
        doctor: doctorName
      })
      
      setFormData({ name: '', dosage: '', frequency: '' })
      onPrescriptionAdded()
      alert('✅ Medication added successfully!')
    }
  }
  
  const handleForceAdd = () => {
    storage.addMedication({
      ...formData,
      doctor: doctorName
    })
    
    setFormData({ name: '', dosage: '', frequency: '' })
    setInteractions([])
    onPrescriptionAdded()
    alert('⚠️ Medication added despite interaction warning!')
  }
  
  const handleAddNote = () => {
    if (!noteText.trim()) {
      alert('Please enter a note')
      return
    }
    
    storage.addNote({
      content: noteText,
      doctor: doctorName
    })
    
    setNoteText('')
    onPrescriptionAdded()
    alert('✅ Clinical note added successfully!')
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Plus className="text-medical-primary" />
        Add New Prescription
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Medicine Name *
          </label>
          <input 
            type="text"
            placeholder="e.g., Aspirin, Metformin, Ibuprofen"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-medical-primary focus:outline-none"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Dosage *
          </label>
          <input 
            type="text"
            placeholder="e.g., 75mg, 500mg, 5mg"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-medical-primary focus:outline-none"
            value={formData.dosage}
            onChange={(e) => setFormData({...formData, dosage: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Frequency *
          </label>
          <input 
            type="text"
            placeholder="e.g., Once daily, Twice daily, Three times a day"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-medical-primary focus:outline-none"
            value={formData.frequency}
            onChange={(e) => setFormData({...formData, frequency: e.target.value})}
          />
        </div>
        
        <button 
          onClick={handleAddMedication}
          className="w-full bg-medical-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <Plus size={20} />
          Check & Add Medication
        </button>
      </div>
      
      <hr className="my-6 border-gray-200" />
      
      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2 text-gray-800">
          <FileText size={20} className="text-green-600" />
          Add Clinical Note
        </h3>
        <textarea 
          placeholder="Enter observations, diagnosis, treatment plan, or follow-up instructions..."
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 h-28 focus:border-green-600 focus:outline-none resize-none"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button 
          onClick={handleAddNote}
          className="mt-3 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
        >
          Add Clinical Note
        </button>
      </div>
      
      {interactions.length > 0 && (
        <DrugInteractionAlert 
          interactions={interactions}
          onClose={() => {
            setInteractions([])
          }}
        />
      )}
    </div>
  )
}

