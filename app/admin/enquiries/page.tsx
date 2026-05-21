'use client'
import { useEffect, useState } from 'react'

type Enquiry = {
  id: string
  name: string
  phone: string
  email: string
  service: string
  message: string
  status: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  NEW: 'bg-red-100 text-red-700',
  READ: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-600',
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  async function load() {
    const res = await fetch('/api/enquiries')
    const data = await res.json()
    setEnquiries(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
  }

  async function deleteEnquiry(id: string) {
    if (!confirm('Delete this enquiry?')) return
    await fetch(`/api/enquiries/${id}`, { method: 'DELETE' })
    load()
  }

  const filtered = filter === 'ALL' ? enquiries : enquiries.filter(e => e.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3557]">Enquiries</h1>
          <p className="text-gray-500 text-sm mt-1">{enquiries.length} total · {enquiries.filter(e => e.status === 'NEW').length} new</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['ALL', 'NEW', 'READ', 'CONTACTED', 'CLOSED'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === s ? 'bg-[#1a3557] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
          >
            {s} {s !== 'ALL' && `(${enquiries.filter(e => e.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400">No enquiries found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(e => (
            <div key={e.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-[#1a3557] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {e.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-800">{e.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[e.status] || 'bg-gray-100 text-gray-600'}`}>
                        {e.status}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500 mt-1 flex-wrap">
                      <span>📞 {e.phone}</span>
                      {e.email && <span>✉️ {e.email}</span>}
                      <span>🏷️ {e.service}</span>
                      <span>📅 {new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <p className="text-gray-700 mt-3 text-sm bg-gray-50 rounded-lg p-3">{e.message}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <select
                    value={e.status}
                    onChange={ev => updateStatus(e.id, ev.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1a3557]"
                  >
                    <option value="NEW">New</option>
                    <option value="READ">Read</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                  <a
                    href={`https://wa.me/91${e.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={() => deleteEnquiry(e.id)}
                    className="text-sm text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
