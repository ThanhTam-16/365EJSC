// src/routes/bookingDetail.tsx
import { createRoute } from '@tanstack/react-router'
import React from 'react'
import { rootRoute } from './__root'
import { getBookingById } from '../data/bookings'

export const bookingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bookings/$bookingId',
  loader: ({ params }) => {
    const booking = getBookingById(params.bookingId)

    if (!booking) {
      throw new Error('Booking not found')
    }

    return { booking }
  },
  component: BookingDetailRouteComponent,
})

function BookingDetailRouteComponent() {
  const { booking } = bookingDetailRoute.useLoaderData()

  return (
    <div className="card">
      <h2 className="page-title">Chi tiết booking</h2>

      <dl className="detail-list">
        <div>
          <dt>Mã đơn</dt>
          <dd>{booking.id}</dd>
        </div>
        <div>
          <dt>Khách hàng</dt>
          <dd>{booking.customerName}</dd>
        </div>
        <div>
          <dt>Sân</dt>
          <dd>{booking.fieldName}</dd>
        </div>
        <div>
          <dt>Thời gian</dt>
          <dd>
            {new Date(booking.startTime).toLocaleString('vi-VN')} -{' '}
            {new Date(booking.endTime).toLocaleString('vi-VN')}
          </dd>
        </div>
        <div>
          <dt>Trạng thái</dt>
          <dd>{booking.status}</dd>
        </div>
        <div>
          <dt>Số tiền</dt>
          <dd>{booking.amount.toLocaleString('vi-VN')} ₫</dd>
        </div>
      </dl>
    </div>
  )
}

