import TripForm from '../TripForm'

export default function NewTripPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a3557]">New Trip</h1>
        <p className="text-gray-500 text-sm mt-1">Create a new tour package or trip listing</p>
      </div>
      <TripForm />
    </div>
  )
}
