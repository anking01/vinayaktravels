'use client'
import { useRouter } from 'next/navigation'

export default function TripDeleteButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Delete this trip? This cannot be undone.')) return
    await fetch(`/api/trips/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="text-sm bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition">
      Delete
    </button>
  )
}
