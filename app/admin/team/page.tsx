'use client'
import { useEffect, useState } from 'react'

type Member = {
  id: string
  name: string
  role: string
  photo: string
  bio: string
  order: number
}

const emptyForm = { name: '', role: '', photo: '', bio: '', order: 0 }

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Member | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await fetch('/api/team')
    setMembers(await res.json())
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openNew() {
    setEditing(null)
    setForm({ ...emptyForm, order: members.length + 1 })
    setShowForm(true)
  }

  function openEdit(m: Member) {
    setEditing(m)
    setForm({ name: m.name, role: m.role, photo: m.photo, bio: m.bio, order: m.order })
    setShowForm(true)
  }

  async function save() {
    setSaving(true)
    if (editing) {
      await fetch(`/api/team/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } else {
      await fetch('/api/team', {
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
    if (!confirm('Delete this team member?')) return
    await fetch(`/api/team/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3557]">Team Members</h1>
          <p className="text-gray-500 text-sm mt-1">Manage profiles shown on the About page</p>
        </div>
        <button onClick={openNew} className="bg-[#1a3557] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#2d5488] transition text-sm">
          + Add Member
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-[#1a3557] mb-5">{editing ? 'Edit Member' : 'Add Member'}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Role *</label>
                  <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" placeholder="Founder & CEO" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Photo URL</label>
                <input value={form.photo} onChange={e => setForm(f => ({ ...f, photo: e.target.value }))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Bio *</label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Display Order</label>
                <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557]" />
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
          {members.map(m => (
            <div key={m.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              {m.photo ? (
                <img src={m.photo} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
              ) : (
                <div className="w-20 h-20 bg-[#1a3557] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {m.name[0]}
                </div>
              )}
              <h3 className="font-bold text-gray-800">{m.name}</h3>
              <p className="text-[#f59e0b] font-medium text-sm mt-0.5">{m.role}</p>
              <p className="text-gray-500 text-sm mt-2">{m.bio}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => openEdit(m)} className="flex-1 text-sm bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition">Edit</button>
                <button onClick={() => del(m.id)} className="flex-1 text-sm bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition">Delete</button>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-400">No team members yet. Add your first member!</div>
          )}
        </div>
      )}
    </div>
  )
}
