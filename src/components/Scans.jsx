import { FileImage, Download, Calendar, User } from 'lucide-react'

export default function Scans({ scans, isDoctor = false }) {
  if (!scans || scans.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileImage className="text-medical-primary" />
          Medical Scans & Reports
        </h2>
        <div className="text-center py-12">
          <FileImage className="mx-auto mb-4 text-gray-400" size={64} />
          <p className="text-gray-500 text-lg">No scans or reports available</p>
          <p className="text-gray-400 text-sm mt-2">
            {isDoctor ? 'Scans will appear here when uploaded by the patient' : 'Upload your scans and reports to view them here'}
          </p>
        </div>
      </div>
    )
  }

  const getScanTypeIcon = (type) => {
    const typeLower = type.toLowerCase()
    if (typeLower.includes('mri')) return '🧲'
    if (typeLower.includes('ct')) return '⚡'
    if (typeLower.includes('xray') || typeLower.includes('x-ray')) return '📷'
    if (typeLower.includes('ultrasound')) return '🔊'
    if (typeLower.includes('ecg') || typeLower.includes('ekg')) return '📈'
    return '📄'
  }

  const getScanTypeColor = (type) => {
    const typeLower = type.toLowerCase()
    if (typeLower.includes('mri')) return 'bg-purple-100 text-purple-800 border-purple-300'
    if (typeLower.includes('ct')) return 'bg-blue-100 text-blue-800 border-blue-300'
    if (typeLower.includes('xray') || typeLower.includes('x-ray')) return 'bg-green-100 text-green-800 border-green-300'
    if (typeLower.includes('ultrasound')) return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    if (typeLower.includes('ecg') || typeLower.includes('ekg')) return 'bg-red-100 text-red-800 border-red-300'
    return 'bg-gray-100 text-gray-800 border-gray-300'
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FileImage className="text-medical-primary" />
        Medical Scans & Reports ({scans.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scans.map((scan) => (
          <div
            key={scan.id}
            className={`border-2 rounded-lg p-4 hover:shadow-lg transition-all ${getScanTypeColor(scan.type)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getScanTypeIcon(scan.type)}</span>
                <div>
                  <h3 className="font-bold text-lg">{scan.type}</h3>
                  {scan.bodyPart && (
                    <p className="text-sm opacity-80">{scan.bodyPart}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} />
                <span>{new Date(scan.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}</span>
              </div>
              {scan.facility && (
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} />
                  <span>{scan.facility}</span>
                </div>
              )}
              {scan.doctor && (
                <p className="text-sm">
                  <span className="font-medium">Doctor:</span> {scan.doctor}
                </p>
              )}
            </div>

            {scan.description && (
              <p className="text-sm mb-3 opacity-90 leading-relaxed">{scan.description}</p>
            )}

            {scan.fileUrl && (
              <a
                href={scan.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-100 transition-colors text-sm font-semibold"
              >
                <Download size={16} />
                View Report
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

