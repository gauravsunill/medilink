import { useState, useEffect } from 'react'
import { Activity, LogOut } from 'lucide-react'
import { storage } from './utils/localStorage'
import { reminderService } from './utils/reminderService'
import HomePage from './components/HomePage'
import PatientLogin from './components/PatientLogin'
import PatientProfile from './components/PatientProfile'
import MedicationList from './components/MedicationList'
import PrescriptionScanner from './components/PrescriptionScanner'
import Timeline from './components/Timeline'
import ShareAccess from './components/ShareAccess'
import Scans from './components/Scans'
import AllergyReactions from './components/AllergyReactions'
import LabResults from './components/LabResults'
import EmergencyCard from './components/EmergencyCard'
import AdherenceTracker from './components/AdherenceTracker'
import DoctorLogin from './components/DoctorLogin'
import DoctorDashboard from './components/DoctorDashboard'

function App() {
  const [view, setView] = useState('home')
  const [patient, setPatient] = useState(null)
  const [doctorName, setDoctorName] = useState('')
  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  
  useEffect(() => {
    const patientData = storage.getPatient()
    setPatient(patientData)
    
    // Initialize reminder service
    reminderService.requestPermission().then(() => {
      reminderService.start()
    })
    
    return () => {
      reminderService.stop()
    }
  }, [refreshKey])
  
  const handleSelectPortal = (portal) => {
    if (portal === 'patient') {
      setView('patient-login')
    } else if (portal === 'doctor') {
      setView('doctor-login')
    }
  }
  
  const handlePatientLogin = () => {
    setIsPatientAuthenticated(true)
    setView('patient-dashboard')
  }
  
  const handlePatientLogout = () => {
    setIsPatientAuthenticated(false)
    setView('home')
  }
  
  const handleDoctorLogin = (code, name) => {
    const patientData = storage.getPatient()
    const enteredCode = code.trim().toUpperCase()
    const storedCode = patientData.accessCode.trim().toUpperCase()
    
    if (enteredCode === storedCode) {
      setDoctorName(name)
      setView('doctor-dashboard')
    } else {
      alert(`❌ Invalid access code! Please check and try again.\n\nYou entered: ${enteredCode}\n\nPlease copy the exact code from the Patient view's "Share Access" section.`)
    }
  }
  
  const handleDoctorLogout = () => {
    setDoctorName('')
    setView('home')
  }
  
  const handleMedicationAdded = () => {
    setRefreshKey(prev => prev + 1)
  }
  
  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin text-medical-primary">
          <Activity size={48} />
        </div>
      </div>
    )
  }
  
  // Home Page
  if (view === 'home') {
    return <HomePage onSelectPortal={handleSelectPortal} />
  }
  
  // Patient Login
  if (view === 'patient-login') {
    return (
      <PatientLogin 
        onLogin={handlePatientLogin}
        onBack={() => setView('home')}
      />
    )
  }
  
  // Doctor Login
  if (view === 'doctor-login') {
    return (
      <DoctorLogin 
        onLogin={handleDoctorLogin}
        onBack={() => setView('home')}
      />
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b-2 border-blue-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-medical-primary p-2 rounded-lg">
              <Activity className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MediLink</h1>
              <p className="text-xs text-gray-600">Healthcare Interoperability Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {view === 'patient-dashboard' && (
              <span className="text-sm text-gray-600">
                Patient: <span className="font-semibold">{patient.name}</span>
              </span>
            )}
            {view === 'doctor-dashboard' && (
              <span className="text-sm text-gray-600">
                Doctor: <span className="font-semibold">Dr. {doctorName}</span>
              </span>
            )}
            <button 
              onClick={view === 'patient-dashboard' ? handlePatientLogout : handleDoctorLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <main>
        {view === 'patient-dashboard' && (
          <div className="container mx-auto p-4 max-w-4xl">
            <EmergencyCard patient={patient} />
            <PatientProfile patient={patient} />
            <AllergyReactions patient={patient} onUpdate={handleMedicationAdded} />
            <MedicationList medications={patient.medications} />
            <AdherenceTracker medicationId={patient.medications?.[0]?.id} />
            <PrescriptionScanner 
              onMedicationAdded={handleMedicationAdded}
              currentMeds={patient.medications}
            />
            <LabResults patient={patient} onUpdate={handleMedicationAdded} />
            <Scans scans={patient.scans || []} isDoctor={false} />
            <Timeline 
              medications={patient.medications}
              notes={patient.notes}
            />
            <ShareAccess accessCode={patient.accessCode} />
          </div>
        )}
        
        {view === 'doctor-dashboard' && doctorName && (
          <DoctorDashboard 
            patient={patient}
            doctorName={doctorName}
            onLogout={handleDoctorLogout}
          />
        )}
      </main>
      
      <footer className="bg-white border-t-2 border-gray-100 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p className="font-semibold">MediLink Healthcare Platform</p>
          <p className="mt-1">Unifying patient records across hospitals and departments</p>
        </div>
      </footer>
    </div>
  )
}

export default App
