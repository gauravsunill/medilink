import { useState } from 'react'
import { X, Clock } from 'lucide-react'

export default function ReminderModal({ medication, onClose, onSave }) {
  const [reminderTimes, setReminderTimes] = useState(['08:00'])
  const [enabled, setEnabled] = useState(true)

  const addTime = () => {
    setReminderTimes([...reminderTimes, '08:00'])
  }

  const removeTime = (index) => {
    setReminderTimes(reminderTimes.filter((_, i) => i !== index))
  }

  const updateTime = (index, time) => {
    const newTimes = [...reminderTimes]
    newTimes[index] = time
    setReminderTimes(newTimes)
  }

  const handleSave = () => {
    onSave({
      medicationId: medication.id,
      times: reminderTimes,
      enabled
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="text-medical-primary" />
            Set Reminder for {medication.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-semibold">Enable Reminders</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Reminder Times</label>
            <div className="space-y-2">
              {reminderTimes.map((time, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => updateTime(index, e.target.value)}
                    className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-medical-primary focus:outline-none"
                  />
                  {reminderTimes.length > 1 && (
                    <button
                      onClick={() => removeTime(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addTime}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                + Add Another Time
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-medical-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Save Reminder
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

