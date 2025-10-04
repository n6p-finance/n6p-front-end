"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Compass,
  Library,
  ListMusic,
  Wallet,
  TrendingUp,
  Settings,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/use-sidebar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Discover", href: "/discover", icon: Compass },
  { name: "My Library", href: "/library", icon: Library },
  { name: "Playlists", href: "/playlists", icon: ListMusic },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Music Liquidity", href: "/liquidity", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, toggleCollapse } = useSidebar()

  return (
    <aside className="h-screen rounded-r-2xl border-r border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Logo & Collapse Button */}
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-4">
          <motion.div
            className="flex items-center gap-2 overflow-hidden"
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            {!isCollapsed && <span className="text-lg font-semibold text-white whitespace-nowrap">SonicFi</span>}
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="h-8 w-8 rounded-xl text-gray-400 transition-all duration-200 hover:text-white hover:bg-white/10"
          >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <TooltipProvider delayDuration={0}>
            {navigation.map((item) => {
              const isActive = pathname === item.href

              if (isCollapsed) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center justify-center rounded-xl p-2.5 transition-all duration-200",
                          isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-black/90 border-white/10 rounded-xl">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              )
            })}
          </TooltipProvider>
        </nav>

        {/* User XP Card */}
        {!isCollapsed && (
          <motion.div
            className="border-t border-white/5 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="glass rounded-xl p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white">Level 12</span>
                <span className="text-xs text-gray-400">2,450 XP</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="gradient-purple-blue h-full w-3/4 rounded-full" />
              </div>
              <p className="mt-2 text-xs text-gray-400">550 XP to next level</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-400">7 day streak</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </aside>
  )
}
