"use client"

import Image from "next/image"
import { Play, Pause, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { usePlayer } from "@/hooks/use-player"
import { formatDuration } from "@/lib/utils/format"
import type { Track } from "@/lib/types"
import { useEffect } from "react"

interface TrackCardProps {
  track: Track
  variant?: "default" | "compact"
}

export function TrackCard({ track, variant = "default" }: TrackCardProps) {
  const { currentTrack, isPlaying, setCurrentTrack, togglePlay, addToQueue } = usePlayer()
  const isCurrentTrack = currentTrack?.id === track.id

  useEffect(() => {
    console.log("[v0] TrackCard mounted for track:", track.title)
  }, [track.title])

  const handlePlayClick = () => {
    console.log("[v0] Play button clicked for track:", track.title, "isCurrentTrack:", isCurrentTrack)
    if (isCurrentTrack) {
      togglePlay()
    } else {
      setCurrentTrack(track)
    }
  }

  if (variant === "compact") {
    return (
      <div className="glass-hover group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-neutral-800/70">
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
          <Image src={track.coverUrl || "/placeholder.svg"} alt={track.title} fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={handlePlayClick}
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-white">{track.title}</p>
          <p className="truncate text-xs text-gray-400">{track.artist}</p>
        </div>
        <span className="text-xs text-gray-500">{formatDuration(track.duration)}</span>
      </div>
    )
  }

  return (
    <div className="glass-hover group p-4 rounded-lg transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-neutral-800/70">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
        <Image
          src={track.coverUrl || "/placeholder.svg"}
          alt={track.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button
            size="icon"
            className="gradient-purple-blue h-12 w-12 rounded-full border-0 text-white shadow-lg transition-all duration-200 hover:opacity-90 hover:scale-110"
            onClick={handlePlayClick}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            )}
          </Button>
        </div>
        {track.isNFT && (
          <Badge className="absolute right-2 top-2 rounded-full border-purple-500/50 bg-purple-500/20 text-purple-300">
            NFT
          </Badge>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="truncate font-semibold text-white">{track.title}</h3>
        <p className="truncate text-sm text-gray-400">{track.artist}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-gray-500">{formatDuration(track.duration)}</span>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
              onClick={() => addToQueue(track)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl border-white/10 bg-black/90 backdrop-blur-xl">
                <DropdownMenuItem className="text-gray-300 focus:bg-white/10 focus:text-white">
                  Add to Playlist
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 focus:bg-white/10 focus:text-white">
                  Add to Queue
                </DropdownMenuItem>
                {track.isNFT && (
                  <DropdownMenuItem className="text-gray-300 focus:bg-white/10 focus:text-white">
                    Buy NFT
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="text-gray-300 focus:bg-white/10 focus:text-white">Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
