import { useState, useEffect } from 'react'
import { Pill, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import ReminderModal from './ReminderModal'
import { reminderService } from '../utils/reminderService'

export default function MedicationList({ medications }) {
  const [selectedMed, setSelectedMed] = useState(null)
  const [reminders, setReminders] = useState({})

  useEffect(() => {
    // Load reminders
    medications.forEach(med => {
      const reminder = reminderService.getReminder(med.id)
      if (reminder) {
        setReminders(prev => ({ ...prev, [med.id]: reminder }))
      }
    })
  }, [medications])

  const handleSetReminder = (medication) => {
    setSelectedMed(medication)
  }

  const handleSaveReminder = (reminder) => {
    reminderService.saveReminder(reminder)
    setReminders(prev => ({ ...prev, [reminder.medicationId]: reminder }))
  }

  const getTodayStatus = (medicationId) => {
    const logs = JSON.parse(localStorage.getItem(`adherence_${medicationId}`) || '[]')
    const today = new Date().toDateString()
    const todayLog = logs.find(log => new Date(log.date).toDateString() === today)
    return todayLog?.status || null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Pill className="text-medical-primary" />
        Current Medications ({medications.length})
      </h2>
      
      {medications.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No medications recorded</p>
      ) : (
        <div className="space-y-3">
          {medications.map((med) => {
            const reminder = reminders[med.id]
            const todayStatus = getTodayStatus(med.id)
            
            return (
              <div key={med.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-gray-900">{med.name}</h3>
                      {reminder?.enabled && (
                        <Clock className="text-blue-600" size={18} title="Reminder set" />
                      )}
                      {todayStatus === 'taken' && (
                        <CheckCircle className="text-green-600" size={18} title="Taken today" />
                      )}
                      {todayStatus === 'missed' && (
                        <AlertCircle className="text-red-600" size={18} title="Missed today" />
                      )}
                    </div>
                    <p className="text-gray-700 mt-1">
                      <span className="font-medium">{med.dosage}</span> • {med.frequency}
                    </p>
                    {reminder?.enabled && (
                      <p className="text-xs text-blue-600 mt-1">
                        Reminders: {reminder.times.join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Prescribed by: <span className="font-medium">{med.doctor}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <div className="text-xs text-gray-400">
                      {new Date(med.addedDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <button
                      onClick={() => handleSetReminder(med)}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Clock size={14} />
                      {reminder?.enabled ? 'Edit Reminder' : 'Set Reminder'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {selectedMed && (
        <ReminderModal
          medication={selectedMed}
          onClose={() => setSelectedMed(null)}
          onSave={handleSaveReminder}
        />
      )}
    </div>
  )
}
