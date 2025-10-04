"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatNumber } from "@/lib/utils/format"
import type { Artist } from "@/lib/types"
import { CheckCircle2 } from "lucide-react"

interface ArtistCardProps {
  artist: Artist
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artist/${artist.id}`}>
      {/* Updated to minimal hover scale and added soft background tint */}
      <div className="glass-hover group p-4 rounded-lg transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-neutral-800/70">
        <div className="relative mb-4 aspect-square overflow-hidden rounded-full">
          <Image
            src={artist.imageUrl || "/placeholder.svg"}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-110"
          />
          {artist.verified && (
            <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="truncate font-semibold text-white">{artist.name}</h3>
          <p className="text-sm text-gray-400">{formatNumber(artist.followers)} followers</p>
          {artist.tokenSymbol && (
            <Badge className="rounded-full border-blue-500/50 bg-blue-500/20 text-blue-300">
              ${artist.tokenSymbol}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  )
}
