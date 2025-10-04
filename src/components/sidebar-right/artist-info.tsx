"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Instagram, Twitter, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Artist } from "@/lib/types"

interface ArtistInfoProps {
  artist: Artist
}

export function ArtistInfo({ artist }: ArtistInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
          <Image src={artist.imageUrl || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white">{artist.name}</h3>
          <p className="text-sm text-gray-400">{artist.followers.toLocaleString()} followers</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className={`text-sm text-gray-300 ${!isExpanded && "line-clamp-2"}`}>{artist.bio}</p>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-xs text-purple-400 hover:bg-transparent hover:text-purple-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Read more"}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button size="sm" className="gradient-purple-blue flex-1 border-0 text-white hover:opacity-90">
          View Full Profile
        </Button>
      </div>

      {/* Social Links */}
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
          <Twitter className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
          <Instagram className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
          <Globe className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
