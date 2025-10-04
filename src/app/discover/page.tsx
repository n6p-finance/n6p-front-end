"use client"

import { useState } from "react"
import { TrackCard } from "@/components/track-card"
import { ArtistCard } from "@/components/artist-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockTracks, mockArtists } from "@/lib/mock-data"
import { Music, Users, Disc3, Sparkles } from "lucide-react"

const categories = [
  { id: "all", name: "All", icon: Sparkles },
  { id: "electronic", name: "Electronic", icon: Music },
  { id: "synthwave", name: "Synthwave", icon: Disc3 },
  { id: "ambient", name: "Ambient", icon: Music },
  { id: "blockchain", name: "Blockchain Native", icon: Disc3 },
]

const moods = [
  { id: "all", name: "All Moods" },
  { id: "chill", name: "Chill" },
  { id: "energetic", name: "Energetic" },
  { id: "focus", name: "Focus" },
  { id: "happy", name: "Happy" },
]

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeMood, setActiveMood] = useState("all")
  const [view, setView] = useState<"tracks" | "artists">("tracks")

  const filteredTracks = mockTracks.filter((track) => {
    if (activeMood !== "all" && track.mood !== activeMood) return false
    return true
  })

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Discover</h1>
        <p className="text-gray-400">Explore new music and blockchain-native artists</p>
      </section>

      {/* View Toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant={view === "tracks" ? "default" : "ghost"}
          className={view === "tracks" ? "gradient-purple-blue border-0 text-white" : "text-gray-400 hover:text-white"}
          onClick={() => setView("tracks")}
        >
          <Music className="mr-2 h-4 w-4" />
          Tracks
        </Button>
        <Button
          variant={view === "artists" ? "default" : "ghost"}
          className={view === "artists" ? "gradient-purple-blue border-0 text-white" : "text-gray-400 hover:text-white"}
          onClick={() => setView("artists")}
        >
          <Users className="mr-2 h-4 w-4" />
          Artists
        </Button>
      </div>

      {/* Categories */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={
                  activeCategory === category.id
                    ? "gradient-purple-blue border-0 text-white"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:bg-white/10 hover:text-white"
                }
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            )
          })}
        </div>
      </section>

      {/* Moods */}
      {view === "tracks" && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Moods</h2>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <Badge
                key={mood.id}
                variant={activeMood === mood.id ? "default" : "outline"}
                className={
                  activeMood === mood.id
                    ? "cursor-pointer border-purple-500 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                    : "cursor-pointer border-white/20 bg-transparent text-gray-400 hover:border-purple-500/50 hover:text-white"
                }
                onClick={() => setActiveMood(mood.id)}
              >
                {mood.name}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Content Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{view === "tracks" ? "Tracks" : "Artists"}</h2>
          <span className="text-sm text-gray-400">
            {view === "tracks" ? filteredTracks.length : mockArtists.length} results
          </span>
        </div>

        {view === "tracks" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {mockArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </section>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          className="border-white/10 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:bg-white/10 hover:text-white"
        >
          Load More
        </Button>
      </div>
    </div>
  )
}
