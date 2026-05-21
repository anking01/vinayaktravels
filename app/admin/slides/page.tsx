'use client'
import { useEffect, useState } from 'react'

type Slide = { id: string; type: string; mediaUrl: string; title: string; subtitle: string; order: number; active: boolean }
const empty = { type: 'image', mediaUrl: '', title: '', subtitle: '', order: 0, active: true }

function isYouTube(url: string) { return url.includes('youtube.com') || url.includes('youtu.be') }
function getYouTubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

export default function SlidesAdminPage() {
  const [items, setItems] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Slide | null>(null)
  const [form, setForm] = useState(empty)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await fetch('/api/slides')
    setItems(await res.json())
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openNew() {
    setEditing(null)
    setForm({ ...empty, order: items.length + 1 })
    setShowForm(true)
  }

  function openEdit(s: Slide) {
    setEditing(s)
    setForm({ type: s.type, mediaUrl: s.mediaUrl, title: s.title, subtitle: s.subtitle, order: s.order, active: s.active })
    setShowForm(true)
  }

  async function save() {
    if (!form.mediaUrl) return
    setSaving(true)
    if (editing) {
      await fetch(`/api/slides/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/slides', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setSaving(false)
    setShowForm(false)
    load()
  }

  async function del(id: string) {
    if (!confirm('Delete this slide?')) return
    await fetch(`/api/slides/${id}`, { method: 'DELETE' })
    load()
  }

  async function toggle(s: Slide) {
    await fetch(`/api/slides/${s.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...s, active: !s.active }) })
    load()
  }

  const inp = "mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557] text-gray-800"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3557]">Hero Slides</h1>
          <p className="text-gray-500 text-sm mt-1">Manage homepage hero banner — images & videos</p>
        </div>
        <button onClick={openNew} className="bg-[#1a3557] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#2d5488] transition text-sm">
          + Add Slide
        </button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
        <p className="font-semibold mb-1">📌 Tips:</p>
        <ul className="space-y-1 text-xs list-disc list-inside text-blue-700">
          <li><strong>Image:</strong> Paste any image URL (Unsplash, Google Drive direct link, etc.)</li>
          <li><strong>YouTube Video:</strong> Paste the YouTube video link — e.g. <code>https://youtu.be/XXXXX</code></li>
          <li><strong>MP4 Video:</strong> Paste a direct .mp4 file URL</li>
          <li>Videos auto-play muted on loop in the background</li>
          <li>Drag order number to control which slide shows first</li>
        </ul>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-[#1a3557] mb-5">{editing ? 'Edit Slide' : 'Add New Slide'}</h2>

            <div className="space-y-4">
              {/* Type selector */}
              <div>
                <label className="text-sm font-medium text-gray-700">Slide Type</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {[
                    { value: 'image', label: '🖼️ Image', desc: 'Background image' },
                    { value: 'video', label: '🎬 Video', desc: 'YouTube or MP4' },
                  ].map(t => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, type: t.value }))}
                      className={`p-3 rounded-xl border-2 text-left transition ${form.type === t.value ? 'border-[#1a3557] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <p className="font-semibold text-sm">{t.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Media URL */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {form.type === 'image' ? 'Image URL *' : 'Video URL * (YouTube or .mp4)'}
                </label>
                <input
                  value={form.mediaUrl}
                  onChange={e => setForm(f => ({ ...f, mediaUrl: e.target.value }))}
                  className={inp}
                  placeholder={form.type === 'image' ? 'https://images.unsplash.com/...' : 'https://youtu.be/... or https://.../video.mp4'}
                />
                {/* Preview */}
                {form.mediaUrl && form.type === 'image' && (
                  <div className="mt-2 rounded-xl overflow-hidden h-32">
                    <img src={form.mediaUrl} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
                {form.mediaUrl && form.type === 'video' && isYouTube(form.mediaUrl) && getYouTubeId(form.mediaUrl) && (
                  <div className="mt-2 rounded-xl overflow-hidden h-32 bg-black flex items-center justify-center">
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeId(form.mediaUrl)}/hqdefault.jpg`}
                      alt="YouTube thumbnail"
                      className="h-full w-full object-cover opacity-80"
                    />
                    <div className="absolute flex items-center gap-2 text-white text-sm font-bold">▶ YouTube Video</div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700">Slide Title <span className="text-gray-400 font-normal">(optional)</span></label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp} placeholder="e.g. Explore Maharashtra with Us" />
              </div>

              {/* Subtitle */}
              <div>
                <label className="text-sm font-medium text-gray-700">Subtitle <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} rows={2} className={inp} placeholder="e.g. Book your dream trip today" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} className={inp} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Active</label>
                  <select value={String(form.active)} onChange={e => setForm(f => ({ ...f, active: e.target.value === 'true' }))} className={inp}>
                    <option value="true">Yes — Show on website</option>
                    <option value="false">No — Hide</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving || !form.mediaUrl} className="flex-1 bg-[#1a3557] text-white py-2.5 rounded-xl font-medium hover:bg-[#2d5488] transition disabled:opacity-60 text-sm">
                {saving ? 'Saving...' : 'Save Slide'}
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
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-5xl mb-3">🖼️</p>
          <p className="text-gray-700 font-medium">No slides yet</p>
          <p className="text-gray-400 text-sm mt-1">Default slides will show until you add custom ones</p>
          <button onClick={openNew} className="mt-4 bg-[#1a3557] text-white px-6 py-2.5 rounded-xl text-sm font-medium">
            + Add First Slide
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((s, idx) => (
            <div key={s.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex items-center gap-4 p-4 ${!s.active ? 'opacity-50 border-gray-100' : 'border-gray-100'}`}>
              {/* Thumbnail */}
              <div className="w-28 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                {s.type === 'video' && isYouTube(s.mediaUrl) && getYouTubeId(s.mediaUrl) ? (
                  <>
                    <img src={`https://img.youtube.com/vi/${getYouTubeId(s.mediaUrl)}/mqdefault.jpg`} alt="thumb" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="text-white text-lg">▶</span>
                    </div>
                  </>
                ) : s.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-900">🎬</div>
                ) : (
                  <img src={s.mediaUrl} alt="thumb" className="w-full h-full object-cover" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {s.type === 'video' ? '🎬 Video' : '🖼️ Image'}
                  </span>
                  <span className="text-xs text-gray-400">#{idx + 1} · Order {s.order}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <p className="font-semibold text-gray-800 text-sm mt-1 truncate">{s.title || <span className="text-gray-400 italic">No title</span>}</p>
                <p className="text-gray-400 text-xs truncate">{s.mediaUrl}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => toggle(s)} className={`text-xs px-3 py-1.5 rounded-lg transition ${s.active ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                  {s.active ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => openEdit(s)} className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition">Edit</button>
                <button onClick={() => del(s.id)} className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
