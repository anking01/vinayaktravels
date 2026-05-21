'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type ItineraryDay = { day: string; title: string; desc: string }

type TripFormProps = {
  initialData?: {
    id?: string
    title: string
    emoji: string
    status: string
    duration: string
    type: string
    badge: string
    departure: string
    price: string
    priceNum: number
    rating: number
    reviews: number
    image: string
    groupSize: string
    highlights: string
    included: string
    itinerary: string
    active: boolean
  }
}

function parseJSON<T>(val: string, fallback: T): T {
  try { return JSON.parse(val) } catch { return fallback }
}

export default function TripForm({ initialData }: TripFormProps) {
  const router = useRouter()
  const isEdit = !!initialData?.id

  const [form, setForm] = useState({
    title: initialData?.title || '',
    emoji: initialData?.emoji || '🗺️',
    status: initialData?.status || 'UPCOMING',
    duration: initialData?.duration || '',
    type: initialData?.type || '',
    badge: initialData?.badge || '',
    departure: initialData?.departure || '',
    price: initialData?.price || '',
    priceNum: initialData?.priceNum || 0,
    rating: initialData?.rating || 4.5,
    reviews: initialData?.reviews || 0,
    image: initialData?.image || '',
    groupSize: initialData?.groupSize || '20-45 people',
    active: initialData?.active !== false,
  })

  const [highlights, setHighlights] = useState<string[]>(
    parseJSON(initialData?.highlights || '[]', [])
  )
  const [included, setIncluded] = useState<string[]>(
    parseJSON(initialData?.included || '[]', [])
  )
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    parseJSON(initialData?.itinerary || '[]', [])
  )

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function updateList(
    list: string[],
    setList: (v: string[]) => void,
    index: number,
    value: string
  ) {
    const updated = [...list]
    updated[index] = value
    setList(updated)
  }

  function addListItem(list: string[], setList: (v: string[]) => void) {
    setList([...list, ''])
  }

  function removeListItem(list: string[], setList: (v: string[]) => void, index: number) {
    setList(list.filter((_, i) => i !== index))
  }

  function addItineraryDay() {
    setItinerary([...itinerary, { day: `Day ${itinerary.length + 1}`, title: '', desc: '' }])
  }

  function updateItinerary(index: number, field: keyof ItineraryDay, value: string) {
    const updated = [...itinerary]
    updated[index] = { ...updated[index], [field]: value }
    setItinerary(updated)
  }

  function removeItineraryDay(index: number) {
    setItinerary(itinerary.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      highlights: JSON.stringify(highlights.filter(Boolean)),
      included: JSON.stringify(included.filter(Boolean)),
      itinerary: JSON.stringify(itinerary),
    }

    try {
      let res
      if (isEdit) {
        res = await fetch(`/api/trips/${initialData!.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch('/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) throw new Error('Failed to save')
      router.push('/admin/trips')
      router.refresh()
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setSaving(false)
    }
  }

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557] text-gray-800"

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-[#1a3557] mb-4">Basic Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700">Trip Title *</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className={`mt-1 ${inputClass}`} placeholder="e.g. Jyotirlings Tour" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Emoji</label>
            <input value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} className={`mt-1 ${inputClass}`} placeholder="🗺️" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={`mt-1 ${inputClass}`}>
              <option value="LIVE">LIVE</option>
              <option value="UPCOMING">UPCOMING</option>
              <option value="PAST">PAST</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Duration *</label>
            <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} required className={`mt-1 ${inputClass}`} placeholder="3 Days / 2 Nights" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Type</label>
            <input value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className={`mt-1 ${inputClass}`} placeholder="Pilgrimage / Beach / Hill Station" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Badge Text</label>
            <input value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} className={`mt-1 ${inputClass}`} placeholder="⭐ Most Popular" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Departure</label>
            <input value={form.departure} onChange={e => setForm(f => ({ ...f, departure: e.target.value }))} className={`mt-1 ${inputClass}`} placeholder="Every Friday – Pune" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Group Size</label>
            <input value={form.groupSize} onChange={e => setForm(f => ({ ...f, groupSize: e.target.value }))} className={`mt-1 ${inputClass}`} placeholder="20-45 people" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Active</label>
            <select value={String(form.active)} onChange={e => setForm(f => ({ ...f, active: e.target.value === 'true' }))} className={`mt-1 ${inputClass}`}>
              <option value="true">Yes — Show on website</option>
              <option value="false">No — Hide from website</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-[#1a3557] mb-4">Pricing & Ratings</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Price Display *</label>
            <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required className={`mt-1 ${inputClass}`} placeholder="₹4,999" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Price (Number)</label>
            <input type="number" value={form.priceNum} onChange={e => setForm(f => ({ ...f, priceNum: Number(e.target.value) }))} className={`mt-1 ${inputClass}`} placeholder="4999" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Rating (0-5)</label>
            <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} className={`mt-1 ${inputClass}`} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Reviews Count</label>
            <input type="number" value={form.reviews} onChange={e => setForm(f => ({ ...f, reviews: Number(e.target.value) }))} className={`mt-1 ${inputClass}`} />
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-[#1a3557] mb-4">Cover Image</h2>
        <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className={inputClass} placeholder="https://images.unsplash.com/..." />
        {form.image && (
          <div className="mt-3 rounded-xl overflow-hidden h-40 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Highlights */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1a3557]">Highlights</h2>
          <button type="button" onClick={() => addListItem(highlights, setHighlights)} className="text-sm text-[#f59e0b] font-medium hover:underline">+ Add</button>
        </div>
        <div className="space-y-2">
          {highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input value={h} onChange={e => updateList(highlights, setHighlights, i, e.target.value)} className={`flex-1 ${inputClass}`} placeholder={`Highlight ${i + 1}`} />
              <button type="button" onClick={() => removeListItem(highlights, setHighlights, i)} className="text-red-500 hover:text-red-700 px-2">✕</button>
            </div>
          ))}
          {highlights.length === 0 && <p className="text-gray-400 text-sm">No highlights added</p>}
        </div>
      </div>

      {/* Included */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1a3557]">What's Included</h2>
          <button type="button" onClick={() => addListItem(included, setIncluded)} className="text-sm text-[#f59e0b] font-medium hover:underline">+ Add</button>
        </div>
        <div className="space-y-2">
          {included.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input value={item} onChange={e => updateList(included, setIncluded, i, e.target.value)} className={`flex-1 ${inputClass}`} placeholder={`Included item ${i + 1}`} />
              <button type="button" onClick={() => removeListItem(included, setIncluded, i)} className="text-red-500 hover:text-red-700 px-2">✕</button>
            </div>
          ))}
          {included.length === 0 && <p className="text-gray-400 text-sm">No items added</p>}
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1a3557]">Itinerary</h2>
          <button type="button" onClick={addItineraryDay} className="text-sm text-[#f59e0b] font-medium hover:underline">+ Add Day</button>
        </div>
        <div className="space-y-4">
          {itinerary.map((day, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Day {i + 1}</span>
                <button type="button" onClick={() => removeItineraryDay(i)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
              </div>
              <div className="grid gap-2">
                <input value={day.day} onChange={e => updateItinerary(i, 'day', e.target.value)} className={inputClass} placeholder="Day 1 / 5:00 AM" />
                <input value={day.title} onChange={e => updateItinerary(i, 'title', e.target.value)} className={inputClass} placeholder="Day title (e.g. Pune → Nashik)" />
                <textarea value={day.desc} onChange={e => updateItinerary(i, 'desc', e.target.value)} rows={2} className={inputClass} placeholder="Day description..." />
              </div>
            </div>
          ))}
          {itinerary.length === 0 && <p className="text-gray-400 text-sm">No itinerary added</p>}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="flex-1 bg-[#1a3557] text-white py-3 rounded-xl font-semibold hover:bg-[#2d5488] transition disabled:opacity-60">
          {saving ? 'Saving...' : isEdit ? 'Update Trip' : 'Create Trip'}
        </button>
        <button type="button" onClick={() => router.push('/admin/trips')} className="px-8 border border-gray-300 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition">
          Cancel
        </button>
      </div>
    </form>
  )
}
