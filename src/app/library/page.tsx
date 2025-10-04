"use client"

import { useState } from "react"
import { TrackCard } from "@/components/track-card"
import { ArtistCard } from "@/components/artist-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockTracks, mockArtists } from "@/lib/mock-data"
import { Music, Users, Heart, ListMusic, Clock, Download } from "lucide-react"

export default function LibraryPage() {
  const [selectedTab, setSelectedTab] = useState("tracks")

  const likedTracks = mockTracks.slice(0, 6)
  const recentlyPlayed = mockTracks.slice(1, 7)
  const followedArtists = mockArtists.slice(0, 4)

  const playlists = [
    { id: "1", name: "Chill Vibes", trackCount: 24, coverUrl: "/placeholder.svg?height=200&width=200" },
    { id: "2", name: "Workout Mix", trackCount: 18, coverUrl: "/placeholder.svg?height=200&width=200" },
    { id: "3", name: "Focus Flow", trackCount: 32, coverUrl: "/placeholder.svg?height=200&width=200" },
    { id: "4", name: "Night Drive", trackCount: 15, coverUrl: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Your Library</h1>
        <p className="text-gray-400">All your music, playlists, and artists in one place</p>
      </section>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="bg-white/5">
          <TabsTrigger value="tracks" className="data-[state=active]:bg-purple-500/20">
            <Music className="mr-2 h-4 w-4" />
            Tracks
          </TabsTrigger>
          <TabsTrigger value="playlists" className="data-[state=active]:bg-purple-500/20">
            <ListMusic className="mr-2 h-4 w-4" />
            Playlists
          </TabsTrigger>
          <TabsTrigger value="artists" className="data-[state=active]:bg-purple-500/20">
            <Users className="mr-2 h-4 w-4" />
            Artists
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-purple-500/20">
            <Clock className="mr-2 h-4 w-4" />
            Recent
          </TabsTrigger>
        </TabsList>

        {/* Liked Tracks */}
        <TabsContent value="tracks" className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-purple-500" />
              <h2 className="text-2xl font-bold text-white">Liked Tracks</h2>
              <span className="text-sm text-gray-400">({likedTracks.length} tracks)</span>
            </div>
            <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-gray-400 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {likedTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </TabsContent>

        {/* Playlists */}
        <TabsContent value="playlists" className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListMusic className="h-5 w-5 text-blue-500" />
              <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
              <span className="text-sm text-gray-400">({playlists.length} playlists)</span>
            </div>
            <Button className="gradient-purple-blue border-0 text-white hover:opacity-90">Create Playlist</Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="glass-hover cursor-pointer border-white/10 p-4">
                <div className="relative mb-4 aspect-square overflow-hidden rounded-md">
                  <img
                    src={playlist.coverUrl || "/placeholder.svg"}
                    alt={playlist.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="truncate font-semibold text-white">{playlist.name}</h3>
                <p className="text-sm text-gray-400">{playlist.trackCount} tracks</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Followed Artists */}
        <TabsContent value="artists" className="space-y-6 pt-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            <h2 className="text-2xl font-bold text-white">Following</h2>
            <span className="text-sm text-gray-400">({followedArtists.length} artists)</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {followedArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </TabsContent>

        {/* Recently Played */}
        <TabsContent value="recent" className="space-y-6 pt-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <h2 className="text-2xl font-bold text-white">Recently Played</h2>
          </div>
          <div className="space-y-2">
            {recentlyPlayed.map((track) => (
              <TrackCard key={track.id} track={track} variant="compact" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
