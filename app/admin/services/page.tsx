'use client'
import { useEffect, useState } from 'react'

type Service = { id: string; icon: string; title: string; desc: string; order: number; active: boolean }
const empty = { icon: '🚌', title: '', desc: '', order: 0, active: true }

export default function ServicesAdminPage() {
  const [items, setItems] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState(empty)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await fetch('/api/services')
    setItems(await res.json())
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openNew() {
    setEditing(null)
    setForm({ ...empty, order: items.length + 1 })
    setShowForm(true)
  }

  function openEdit(s: Service) {
    setEditing(s)
    setForm({ icon: s.icon, title: s.title, desc: s.desc, order: s.order, active: s.active })
    setShowForm(true)
  }

  async function save() {
    if (!form.title || !form.desc) return
    setSaving(true)
    if (editing) {
      await fetch(`/api/services/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setSaving(false)
    setShowForm(false)
    load()
  }

  async function del(id: string) {
    if (!confirm('Delete this service?')) return
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    load()
  }

  const inputCls = "mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3557]">Services</h1>
          <p className="text-gray-500 text-sm mt-1">Manage service cards shown on the Services page</p>
        </div>
        <button onClick={openNew} className="bg-[#1a3557] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#2d5488] transition text-sm">
          + Add Service
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-[#1a3557] mb-5">{editing ? 'Edit Service' : 'Add Service'}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Icon (emoji)</label>
                  <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className={inputCls} placeholder="🚌" />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="Corporate Transport" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description *</label>
                <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} rows={3} className={inputCls} placeholder="Describe this service..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} className={inputCls} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Visible on website</label>
                  <select value={String(form.active)} onChange={e => setForm(f => ({ ...f, active: e.target.value === 'true' }))} className={inputCls}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(s => (
            <div key={s.id} className={`bg-white rounded-2xl border shadow-sm p-5 ${!s.active ? 'opacity-50' : 'border-gray-100'}`}>
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-[#1a3557] text-base mb-1">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <span>Order: {s.order}</span>
                <span className={s.active ? 'text-green-600' : 'text-gray-400'}>{s.active ? '● Visible' : '○ Hidden'}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(s)} className="flex-1 text-sm bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition">Edit</button>
                <button onClick={() => del(s.id)} className="flex-1 text-sm bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-400">No services yet. Add your first service!</div>
          )}
        </div>
      )}
    </div>
  )
}
