'use client'
import { useEffect, useState } from 'react'

type Testimonial = {
  id: string
  name: string
  location: string
  photo: string
  rating: number
  text: string
  trip: string
  approved: boolean
  createdAt: string
}

const emptyForm = { name: '', location: '', photo: '', rating: 5, text: '', trip: '', approved: true }

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await fetch('/api/testimonials')
    setItems(await res.json())
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openNew() {
    setEditing(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(t: Testimonial) {
    setEditing(t)
    setForm({ name: t.name, location: t.location, photo: t.photo, rating: t.rating, text: t.text, trip: t.trip, approved: t.approved })
    setShowForm(true)
  }

  async function save() {
    setSaving(true)
    if (editing) {
      await fetch(`/api/testimonials/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } else {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }
    setSaving(false)
    setShowForm(false)
    load()
  }

  async function del(id: string) {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    load()
  }

  async function toggleApprove(t: Testimonial) {
    await fetch(`/api/testimonials/${t.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...t, approved: !t.approved }),
    })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3557]">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">{items.filter(t => t.approved).length} approved · {items.filter(t => !t.approved).length} pending</p>
        </div>
        <button onClick={openNew} className="bg-[#1a3557] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#2d5488] transition text-sm">
          + Add Testimonial
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-[#1a3557] mb-5">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Location *</label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" placeholder="Pune" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Photo URL</label>
                <input value={form.photo} onChange={e => setForm(f => ({ ...f, photo: e.target.value }))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Rating (1-5)</label>
                  <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]">
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Trip</label>
                  <input value={form.trip} onChange={e => setForm(f => ({ ...f, trip: e.target.value }))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" placeholder="Jyotirlings Tour" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Review Text *</label>
                <textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} rows={4} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.approved} onChange={e => setForm(f => ({ ...f, approved: e.target.checked }))} className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">Approved (show on website)</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving} className="flex-1 bg-[#1a3557] text-white py-2.5 rounded-xl font-medium hover:bg-[#2d5488] transition disabled:opacity-60 text-sm">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-300 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {items.map(t => (
            <div key={t.id} className={`bg-white rounded-2xl border shadow-sm p-5 flex gap-4 ${!t.approved ? 'opacity-60 border-gray-100' : 'border-gray-100'}`}>
              {t.photo ? (
                <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 bg-[#1a3557] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">{t.name[0]}</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-gray-800">{t.name}</span>
                  <span className="text-gray-500 text-sm">· {t.location}</span>
                  <span className="text-yellow-500 text-sm">{'★'.repeat(t.rating)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${t.approved ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {t.approved ? 'Approved' : 'Hidden'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{t.text}</p>
                <p className="text-gray-400 text-xs mt-1">{t.trip}</p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => toggleApprove(t)} className={`text-xs px-3 py-1.5 rounded-lg transition ${t.approved ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                  {t.approved ? 'Hide' : 'Approve'}
                </button>
                <button onClick={() => openEdit(t)} className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition">Edit</button>
                <button onClick={() => del(t.id)} className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
