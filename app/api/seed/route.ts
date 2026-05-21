import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const existingTrips = await prisma.trip.count()
    if (existingTrips > 0) {
      return NextResponse.json({ message: 'Already seeded' }, { status: 200 })
    }

    await prisma.trip.createMany({
      data: [
        {
          title: 'Jyotirlings Tour',
          emoji: '🕉️',
          status: 'LIVE',
          duration: '3 Days / 2 Nights',
          type: 'Pilgrimage',
          badge: '⭐ Most Popular',
          departure: 'Every Friday – Pune',
          price: '₹4,999',
          priceNum: 4999,
          rating: 4.8,
          reviews: 48,
          image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=600&q=80',
          groupSize: '20-45 people',
          highlights: JSON.stringify(['Trimbakeshwar (Nashik)', 'Bhimashankar', 'Grishneshwar (Aurangabad)', 'Ellora Caves Bonus Visit']),
          included: JSON.stringify(['AC Bus Transportation', '2 Nights Hotel Stay', 'Daily Breakfast', 'All Darshan Arrangements', 'Experienced Guide', 'Entry Tickets']),
          itinerary: JSON.stringify([
            { day: 'Day 1', title: 'Pune → Nashik (Trimbakeshwar)', desc: 'Early morning departure. Trimbakeshwar Jyotirling darshan. Hotel check-in Nashik.' },
            { day: 'Day 2', title: 'Bhimashankar → Aurangabad', desc: 'Bhimashankar Jyotirling through scenic forest. Lunch break. Travel to Aurangabad hotel.' },
            { day: 'Day 3', title: 'Grishneshwar + Ellora → Home', desc: 'Grishneshwar darshan. Ellora Caves UNESCO visit. Bhadra Maruti Temple. Return to Pune.' },
          ]),
        },
        {
          title: 'Shirdi – Shani Shingnapur',
          emoji: '🙏',
          status: 'LIVE',
          duration: '1 Day Trip',
          type: 'Pilgrimage',
          badge: '🟢 Every Sunday',
          departure: 'Every Sunday 5AM – Pune',
          price: '₹999',
          priceNum: 999,
          rating: 4.7,
          reviews: 62,
          image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
          groupSize: '15-45 people',
          highlights: JSON.stringify(['Shirdi Sai Baba Temple', 'Shani Shingnapur', 'Proper Darshan Timing', 'Guide Service']),
          included: JSON.stringify(['AC Bus', 'Morning Snacks', 'Guide', 'All Darshan Arrangements']),
          itinerary: JSON.stringify([
            { day: '5:00 AM', title: 'Departure from Pune', desc: 'Board AC bus. Morning snacks served on the way.' },
            { day: '9:00 AM', title: 'Arrive Shirdi', desc: 'Sai Baba Temple darshan with guide arrangements.' },
            { day: '1:00 PM', title: 'Shani Shingnapur', desc: 'Visit Shani Shingnapur temple. Lunch break.' },
            { day: '5:00 PM', title: 'Return Journey', desc: 'Depart for Pune. Arrive by 9:00 PM.' },
          ]),
        },
        {
          title: 'Goa Beach Holiday',
          emoji: '🌊',
          status: 'LIVE',
          duration: '3 Days / 2 Nights',
          type: 'Beach',
          badge: '🔥 Filling Fast',
          departure: 'May 15, 2025',
          price: '₹6,999',
          priceNum: 6999,
          rating: 4.9,
          reviews: 35,
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
          groupSize: '20-45 people',
          highlights: JSON.stringify(['North Goa Beaches', 'Water Sports', 'Fort Aguada Visit', 'Beach Resort Stay']),
          included: JSON.stringify(['AC Luxury Coach', '2 Nights Beach Resort', 'Daily Breakfast', 'Sightseeing', 'Tour Guide', 'All Permits']),
          itinerary: JSON.stringify([
            { day: 'Day 1', title: 'Pune → Goa', desc: 'Overnight journey by AC Luxury Coach.' },
            { day: 'Day 2', title: 'North Goa Beaches & Sightseeing', desc: 'Calangute, Baga, Anjuna beaches. Water sports. Fort Aguada.' },
            { day: 'Day 3', title: 'South Goa + Return', desc: 'Panjim, Miramar Beach. Afternoon departure for Pune.' },
          ]),
        },
        {
          title: 'Mahabaleshwar – Panchgani',
          emoji: '🍓',
          status: 'UPCOMING',
          duration: '2 Days / 1 Night',
          type: 'Hill Station',
          badge: 'June 2025',
          departure: 'June 7, 2025',
          price: '₹3,499',
          priceNum: 3499,
          rating: 4.6,
          reviews: 0,
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
          groupSize: '20-45 people',
          highlights: JSON.stringify(['Strawberry Farms', 'Venna Lake Boating', 'Table Land Panchgani', 'Sydney Point Viewpoint']),
          included: JSON.stringify(['AC Transport', 'Hotel Stay', 'Breakfast & Dinner', 'Entry Tickets', 'Local Sightseeing']),
          itinerary: JSON.stringify([
            { day: 'Day 1', title: 'Pune → Mahabaleshwar', desc: 'Morning departure. Strawberry farms. Venna Lake. Hotel check-in.' },
            { day: 'Day 2', title: 'Panchgani → Pune', desc: 'Table Land, Sydney Point. Return to Pune by evening.' },
          ]),
        },
      ],
    })

    await prisma.testimonial.createMany({
      data: [
        { name: 'Rajesh Sharma', location: 'Pune', photo: 'https://ui-avatars.com/api/?name=Rajesh+Sharma&background=1a3557&color=f59e0b&size=100&bold=true', rating: 5, text: 'Amazing Jyotirlings trip! Bus was comfortable, driver professional and punctual. All darshan arrangements perfect. Will travel again with Vinayak Travels!', trip: 'Jyotirlings Tour – 3D/2N', approved: true },
        { name: 'Priya Deshmukh', location: 'Mumbai', photo: 'https://ui-avatars.com/api/?name=Priya+Deshmukh&background=d97706&color=ffffff&size=100&bold=true', rating: 5, text: 'Goa trip was absolutely fantastic! Everything well organized — hotel great, food good. Bus comfortable for long journey. Group of 30 had wonderful time. Highly recommended!', trip: 'Goa Beach Holiday – 3D/2N', approved: true },
        { name: 'Suresh Patil', location: 'Nashik', photo: 'https://ui-avatars.com/api/?name=Suresh+Patil&background=16a34a&color=ffffff&size=100&bold=true', rating: 5, text: 'Used for company offsite — 45 employees, very smooth coordination. Driver professional. Will definitely use again for next corporate event.', trip: 'Corporate Transport – Company Offsite', approved: true },
        { name: 'Anita Kulkarni', location: 'Aurangabad', photo: 'https://ui-avatars.com/api/?name=Anita+Kulkarni&background=7c3aed&color=ffffff&size=100&bold=true', rating: 5, text: 'Shirdi trip with family was peaceful and well-managed. Guide very knowledgeable about darshan timings. Bus clean and comfortable. Strongly recommend!', trip: 'Shirdi Day Trip', approved: true },
        { name: 'Meena Wagh', location: 'Kolhapur', photo: 'https://ui-avatars.com/api/?name=Meena+Wagh&background=be185d&color=ffffff&size=100&bold=true', rating: 5, text: 'Best travel company in Maharashtra! Done 3 trips with Vinayak Travels. Each time experience gets better. Very honest pricing — no hidden charges. Always available on WhatsApp.', trip: 'Multiple Trips – Repeat Customer', approved: true },
      ],
    })

    await prisma.teamMember.createMany({
      data: [
        { name: 'Replace with Name 1', role: 'Founder & CEO', photo: '', bio: 'Visionary behind Vinayak Travels. 10+ years of experience in transportation across Maharashtra.', order: 1 },
        { name: 'Replace with Name 2', role: 'Operations Head', photo: '', bio: 'Manages day-to-day fleet operations and driver coordination for all corporate and tour trips.', order: 2 },
        { name: 'Replace with Name 3', role: 'Tour Coordinator', photo: '', bio: 'Plans and executes all tour packages with passion and precision. Handles bookings and customer support.', order: 3 },
      ],
    })

    return NextResponse.json({ message: 'Database seeded successfully!' })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
