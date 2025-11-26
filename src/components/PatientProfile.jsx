import { User, Calendar, Droplet, AlertCircle } from 'lucide-react'

export default function PatientProfile({ patient }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <User className="text-medical-primary" />
        {patient.name}
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gray-600" />
          <span className="text-gray-700">Age: {patient.age}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Droplet size={20} className="text-red-600" />
          <span className="text-gray-700">Blood Group: {patient.bloodGroup}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-800">
          <AlertCircle className="text-blue-600" size={20} />
          Chronic Conditions
        </h3>
        <div className="flex flex-wrap gap-2">
          {patient.conditions.map((cond, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {cond}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-700">
          <AlertCircle className="text-red-600" size={20} />
          Allergies
        </h3>
        <div className="flex flex-wrap gap-2">
          {patient.allergies.map((allergy, i) => (
            <span key={i} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              ⚠️ {allergy}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

