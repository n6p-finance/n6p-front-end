"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SidebarState {
  isCollapsed: boolean
  toggleCollapse: () => void
  setCollapsed: (collapsed: boolean) => void
}

export const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
    }),
    {
      name: "sidebar-storage",
    },
  ),
)
