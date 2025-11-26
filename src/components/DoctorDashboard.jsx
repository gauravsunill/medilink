import { useState, useEffect } from 'react'
import { LogOut, User } from 'lucide-react'
import { storage } from '../utils/localStorage'
import PatientProfile from './PatientProfile'
import MedicationList from './MedicationList'
import Timeline from './Timeline'
import AddPrescription from './AddPrescription'
import Scans from './Scans'

export default function DoctorDashboard({ patient: initialPatient, doctorName, onLogout }) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [patient, setPatient] = useState(initialPatient)
  
  useEffect(() => {
    const patientData = storage.getPatient()
    setPatient(patientData)
  }, [refreshKey])
  
  const handlePrescriptionAdded = () => {
    setRefreshKey(prev => prev + 1)
  }
  
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <User className="text-medical-primary" size={32} />
            Welcome, Dr. {doctorName}
          </h1>
          <p className="text-gray-600 mt-1 text-lg">
            Viewing patient: <span className="font-semibold">{patient.name}</span>
          </p>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PatientProfile patient={patient} />
          <MedicationList medications={patient.medications} />
          <Scans scans={patient.scans || []} isDoctor={true} />
        </div>
        
        <div className="space-y-6">
          <AddPrescription 
            doctorName={doctorName}
            currentMedications={patient.medications}
            onPrescriptionAdded={handlePrescriptionAdded}
          />
          <Timeline 
            medications={patient.medications}
            notes={patient.notes}
          />
        </div>
      </div>
    </div>
  )
}

