// src/routes/__root.tsx
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import React from 'react'

export const rootRoute = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Booking Dashboard</h1>
        <nav className="app-nav">
          <Link
            to="/bookings"
            className="nav-link"
            activeProps={{ className: 'nav-link nav-link-active' }}
          >
            Bookings
          </Link>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
