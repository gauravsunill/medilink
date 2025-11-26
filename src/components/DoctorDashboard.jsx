import { useState, useEffect } from 'react'
import { LogOut, User } from 'lucide-react'
import { storage } from '../utils/localStorage'
import PatientProfile from './PatientProfile'
import MedicationList from './MedicationList'
import Timeline from './Timeline'
import AddPrescription from './AddPrescription'
import Scans from './Scans'
import AllergyReactions from './AllergyReactions'
import LabResults from './LabResults'
import EmergencyCard from './EmergencyCard'

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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Dr. {doctorName}</h1>
        <p className="text-gray-600">Viewing patient: <span className="font-semibold">{patient.name}</span></p>
      </div>
      
      <EmergencyCard patient={patient} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="space-y-6">
          <PatientProfile patient={patient} />
          <AllergyReactions patient={patient} onUpdate={handlePrescriptionAdded} />
          <MedicationList medications={patient.medications} />
          <Scans scans={patient.scans || []} isDoctor={true} />
        </div>
        
        <div className="space-y-6">
          <AddPrescription 
            doctorName={doctorName}
            currentMedications={patient.medications}
            patient={patient}
            onPrescriptionAdded={handlePrescriptionAdded}
          />
          <LabResults patient={patient} onUpdate={handlePrescriptionAdded} />
          <Timeline 
            medications={patient.medications}
            notes={patient.notes}
          />
        </div>
      </div>
    </div>
  )
}

