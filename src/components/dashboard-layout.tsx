"use client"

import type React from "react"
import { motion } from "framer-motion"
import { usePlayer } from "@/hooks/use-player"
import { useSidebar } from "@/hooks/use-sidebar"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { MusicPlayer } from "@/components/music-player"
import { SidebarRight } from "@/components/sidebar-right/sidebar-right"
import { useEffect } from "react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentTrack } = usePlayer()
  const { isCollapsed } = useSidebar()
  const isPlaying = currentTrack !== null

  useEffect(() => {
    console.log(
      "[v0] DashboardLayout state - isPlaying:",
      isPlaying,
      "isCollapsed:",
      isCollapsed,
      "currentTrack:",
      currentTrack?.title || "none",
    )
  }, [isPlaying, isCollapsed, currentTrack])

  const getGridColumns = () => {
    const leftWidth = isCollapsed ? "80px" : "240px"
    const rightWidth = isPlaying ? " 400px" : ""
    return `${leftWidth} 1fr${rightWidth}`
  }

  return (
    <motion.div
      className="h-screen grid gap-8"
      animate={{
        gridTemplateColumns: getGridColumns(),
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      {/* Left Sidebar - Navigation - 240px expanded, 80px collapsed */}
      <Sidebar />

      {/* Main Content Area - Flexible 1fr width */}
      <div className="flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto pb-32 pt-16">{children}</main>
        <MusicPlayer />
      </div>

      {/* Right Sidebar - Only when playing - Fixed 400px width */}
      {isPlaying && <SidebarRight />}
    </motion.div>
  )
}
