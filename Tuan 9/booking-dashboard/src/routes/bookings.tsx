// src/routes/bookings.tsx
import { createRoute } from '@tanstack/react-router'
import React from 'react'
import { rootRoute } from './__root'
import { getBookings } from '../data/bookings'
import { BookingTable } from '../components/BookingTable'

export const bookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bookings',
  loader: () => {
    // sau này có thể đổi thành gọi API async
    const bookings = getBookings()
    return { bookings }
  },
  component: BookingsRouteComponent,
})

function BookingsRouteComponent() {
  const { bookings } = bookingsRoute.useLoaderData()

  return (
    <div>
      <h2 className="page-title">Danh sách bookings</h2>
      <BookingTable data={bookings} />
    </div>
  )
}
