// src/data/bookings.ts
export type BookingStatus = 'pending' | 'confirmed' | 'canceled'

export interface Booking {
  id: string
  customerName: string
  fieldName: string
  startTime: string 
  endTime: string   
  status: BookingStatus
  amount: number    // VNĐ
}

const BOOKINGS: Booking[] = [
  {
    id: 'BK-001',
    customerName: 'Nguyễn Văn A',
    fieldName: 'Sân 7 - A1',
    startTime: '2025-11-30T18:00:00',
    endTime: '2025-11-30T19:30:00',
    status: 'confirmed',
    amount: 350000,
  },
  {
    id: 'BK-002',
    customerName: 'Trần Thị B',
    fieldName: 'Sân 5 - B2',
    startTime: '2025-12-01T20:00:00',
    endTime: '2025-12-01T21:00:00',
    status: 'pending',
    amount: 250000,
  },
  {
    id: 'BK-003',
    customerName: 'Lê Văn C',
    fieldName: 'Sân 7 - A2',
    startTime: '2025-12-02T17:00:00',
    endTime: '2025-12-02T18:30:00',
    status: 'canceled',
    amount: 0,
  },
  {
    id: 'BK-004',
    customerName: 'Phạm Thị D',
    fieldName: 'Sân 11 - C1',
    startTime: '2025-12-03T19:00:00',
    endTime: '2025-12-03T21:00:00',
    status: 'confirmed',
    amount: 600000,
  },
]

export function getBookings(): Booking[] {
  return BOOKINGS
}

export function getBookingById(id: string): Booking | undefined {
  return BOOKINGS.find((b) => b.id === id)
}
