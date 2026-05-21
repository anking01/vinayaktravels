'use client'
import { useEffect, useState } from 'react'

const DEFAULTS: Record<string, string> = {
  contact_phone: '+91 89289 47322',
  contact_whatsapp: '918928947322',
  contact_email: 'vinayaktravels971@gmail.com',
  contact_address: 'Maharashtra, India',
  social_facebook: '#',
  social_instagram: '#',
  social_youtube: '#',
  hero_title: "Maharashtra's Most Trusted Travel Partner",
  hero_subtitle: 'Pilgrimage tours, corporate transport & custom trips — safe, comfortable, affordable.',
  stat_years: '10+',
  stat_customers: '5000+',
  stat_vehicles: '100+',
  stat_rating: '4.8★',
  about_tagline: 'Your Trusted Travel Partner in Maharashtra — built on safety, trust and a genuine love for the road.',
}

type Settings = Record<string, string>

const sections = [
  {
    title: '📞 Contact Information',
    desc: 'Used in Navbar, Footer, WhatsApp links',
    fields: [
      { key: 'contact_phone', label: 'Phone Number', placeholder: '+91 89289 47322' },
      { key: 'contact_whatsapp', label: 'WhatsApp Number (digits only)', placeholder: '918928947322' },
      { key: 'contact_email', label: 'Email Address', placeholder: 'vinayaktravels971@gmail.com' },
      { key: 'contact_address', label: 'Address', placeholder: 'Maharashtra, India' },
    ],
  },
  {
    title: '🌐 Social Media Links',
    desc: 'Shown in footer social icons',
    fields: [
      { key: 'social_facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
      { key: 'social_instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
      { key: 'social_youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/...' },
    ],
  },
  {
    title: '🏠 Homepage Hero Section',
    desc: 'Main banner on the homepage',
    fields: [
      { key: 'hero_title', label: 'Hero Title', placeholder: "Maharashtra's Most Trusted Travel Partner" },
      { key: 'hero_subtitle', label: 'Hero Subtitle', placeholder: 'Pilgrimage tours, corporate transport...' },
    ],
  },
  {
    title: '📊 Stats / Numbers',
    desc: 'The 4 numbers shown in the hero section',
    fields: [
      { key: 'stat_years', label: 'Years Experience', placeholder: '10+' },
      { key: 'stat_customers', label: 'Happy Travelers', placeholder: '5000+' },
      { key: 'stat_vehicles', label: 'Vehicles', placeholder: '100+' },
      { key: 'stat_rating', label: 'Google Rating', placeholder: '4.8★' },
    ],
  },
  {
    title: '📖 About Page',
    desc: 'Tagline shown in About page banner',
    fields: [
      { key: 'about_tagline', label: 'About Page Tagline', placeholder: 'Your Trusted Travel Partner...' },
    ],
  },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then((data: Settings) => {
        setSettings({ ...DEFAULTS, ...data })
        setLoading(false)
      })
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputCls = "mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3557] text-gray-800"

  if (loading) return <div className="text-center py-12 text-gray-400">Loading settings...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3557]">Site Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Edit contact info, social links, homepage content and more</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#1a3557] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#2d5488] transition text-sm disabled:opacity-60"
        >
          {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save All Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {sections.map(section => (
          <div key={section.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-[#1a3557] text-base mb-1">{section.title}</h2>
            <p className="text-gray-400 text-xs mb-4">{section.desc}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {section.fields.map(field => (
                <div key={field.key} className={field.key.includes('title') || field.key.includes('subtitle') || field.key.includes('tagline') ? 'sm:col-span-2' : ''}>
                  <label className="text-sm font-medium text-gray-700">{field.label}</label>
                  <input
                    value={settings[field.key] ?? ''}
                    onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                    className={inputCls}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#1a3557] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2d5488] transition text-sm disabled:opacity-60"
        >
          {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
