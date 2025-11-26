import { Clock, Pill, FileText } from 'lucide-react'

export default function Timeline({ medications, notes }) {
  const events = [
    ...medications.map(med => ({ 
      type: 'medication', 
      data: med, 
      date: med.addedDate 
    })),
    ...notes.map(note => ({ 
      type: 'note', 
      data: note, 
      date: note.date 
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Clock className="text-medical-primary" />
        Medical Timeline
      </h2>
      
      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No medical events recorded</p>
      ) : (
        <div className="space-y-6">
          {events.map((event, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                  event.type === 'medication' 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : 'bg-green-100 border-2 border-green-500'
                }`}>
                  {event.type === 'medication' ? 
                    <Pill className="text-blue-600" size={22} /> : 
                    <FileText className="text-green-600" size={22} />
                  }
                </div>
                {i < events.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gray-200 mt-2 min-h-[40px]" />
                )}
              </div>
              
              <div className="flex-1 pb-6">
                <div className="text-sm text-gray-500 mb-2 font-medium">
                  {new Date(event.date).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                
                {event.type === 'medication' ? (
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-bold text-lg text-gray-900">{event.data.name}</h3>
                    <p className="text-gray-700 mt-1">
                      <span className="font-medium">{event.data.dosage}</span> • {event.data.frequency}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Prescribed by: <span className="font-medium">Dr. {event.data.doctor}</span>
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h3 className="font-bold text-gray-900 mb-2">Clinical Note</h3>
                    <p className="text-gray-800 leading-relaxed">{event.data.content}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      By: <span className="font-medium">Dr. {event.data.doctor}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

