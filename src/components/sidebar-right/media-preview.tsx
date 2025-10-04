"use client"

import { useState } from "react"
import Image from "next/image"
import { Maximize2, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Track } from "@/lib/types"

interface MediaPreviewProps {
  track: Track
}

export function MediaPreview({ track }: MediaPreviewProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // For demo purposes, we'll show the cover art
  // In production, you'd check if track has a video URL
  const hasVideo = false

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      {hasVideo ? (
        <video className="h-full w-full object-cover" muted={isMuted} autoPlay loop>
          <source src={track.audioUrl} type="video/mp4" />
        </video>
      ) : (
        <Image src={track.coverUrl || "/placeholder.svg"} alt={track.title} fill className="object-cover shadow-2xl" />
      )}

      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity hover:opacity-100">
        <div className="absolute bottom-3 right-3 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
