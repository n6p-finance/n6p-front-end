"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePlayer } from "@/hooks/use-player"
import { formatDuration } from "@/lib/utils/format"
import type { Track } from "@/lib/types"

interface QueueListProps {
  queue: Track[]
}

export function QueueList({ queue }: QueueListProps) {
  const { setCurrentTrack } = usePlayer()

  if (queue.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-gray-400">No tracks in queue</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-64">
      <div className="space-y-2">
        {queue.map((track, index) => (
          <div
            key={track.id}
            className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
              <Image src={track.coverUrl || "/placeholder.svg"} alt={track.title} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-transparent"
                  onClick={() => setCurrentTrack(track)}
                >
                  <Play className="h-4 w-4 fill-current" />
                </Button>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{track.title}</p>
              <p className="truncate text-xs text-gray-400">{track.artist}</p>
            </div>
            <span className="text-xs text-gray-500">{formatDuration(track.duration)}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
