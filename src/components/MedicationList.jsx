import { Pill } from 'lucide-react'

export default function MedicationList({ medications }) {
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
          {medications.map((med) => (
            <div key={med.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{med.name}</h3>
                  <p className="text-gray-700 mt-1">
                    <span className="font-medium">{med.dosage}</span> • {med.frequency}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Prescribed by: <span className="font-medium">{med.doctor}</span>
                  </p>
                </div>
                <div className="text-xs text-gray-400 ml-4">
                  {new Date(med.addedDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

