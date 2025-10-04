"use client"

import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/hooks/use-wallet"

export function TopNav() {
  const { isConnected, address, connect, disconnect } = useWallet()

  return (
    <header className="sticky top-0 z-30 h-16 mt-6 border-b border-white/5 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-xl rounded-b-xl shadow-lg">
      <div className="flex h-full items-center justify-between px-8">
        {/* Search */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search tracks, artists, or assets..."
              className="w-full rounded-full border-white/10 bg-white/5 pl-11 pr-4 text-white placeholder:text-gray-500 transition-all duration-200 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Wallet Connect */}
          {!isConnected ? (
            <Button
              onClick={connect}
              className="gradient-purple-blue rounded-full border-0 font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
            >
              Connect Wallet
            </Button>
          ) : (
            <div className="glass rounded-full px-4 py-2">
              <span className="text-sm font-medium text-white">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
          )}

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-xl text-gray-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-purple-500" />
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-gray-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl border-white/10 bg-black/90 backdrop-blur-xl">
              <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-gray-300 focus:bg-white/10 focus:text-white">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 focus:bg-white/10 focus:text-white">
                Preferences
              </DropdownMenuItem>
              {isConnected && (
                <>
                  <DropdownMenuItem className="text-gray-300 focus:bg-white/10 focus:text-white">
                    Wallet Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-red-400 focus:bg-white/10 focus:text-red-400" onClick={disconnect}>
                    Disconnect Wallet
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-red-400 focus:bg-white/10 focus:text-red-400">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
