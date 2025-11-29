// src/router.tsx
import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { bookingsRoute } from './routes/bookings'
import { bookingDetailRoute } from './routes/bookingDetail'

const routeTree = rootRoute.addChildren([bookingsRoute, bookingDetailRoute])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

// Đăng ký type cho toàn bộ project
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
