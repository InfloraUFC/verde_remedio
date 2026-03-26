'use client'

import { useUIStore } from '@/config/ui.config'

export function ExampleComponent() {
  const { isSidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
      Toggle
    </button>
  )
}
