"use client"

import { TrackCard } from "@/components/track-card"
import { ArtistCard } from "@/components/artist-card"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { mockTracks, mockArtists, mockLiquidityPools, mockLiquidityMixes, mockRecentlyPlayed } from "@/lib/mock-data"
import { getGreeting, formatCurrency, formatPercentage } from "@/lib/utils/format"
import { useWallet } from "@/hooks/use-wallet"
import { TrendingUp, Sparkles, Flame } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const greeting = getGreeting()
  const { isConnected } = useWallet()
  const [activeCategory, setActiveCategory] = useState<"All" | "Music" | "Podcasts">("All")

  useEffect(() => {
    console.log("[v0] HomePage mounted, rendering", mockTracks.length, "tracks")
    console.log("[v0] Liquidity mixes count:", mockLiquidityMixes.length)
    console.log("[v0] Recently played count:", mockRecentlyPlayed.length)
  }, [])

  const trendingTracks = mockTracks.slice(0, 4)
  const recommendedTracks = mockTracks.slice(2, 6)
  const hotArtists = mockArtists.slice(0, 4)
  const topPools = mockLiquidityPools.slice(0, 3)

  return (
    <>
      <AnimatedBackground />

      <div className="space-y-8 p-8">
        <section className="space-y-3">
          <h1 className="text-4xl font-bold text-white tracking-tight">{greeting}</h1>
          <p className="text-lg text-gray-400">Discover new music and earn from your favorite artists</p>
        </section>

        <section className="flex gap-2 mt-2">
          {(["All", "Music", "Podcasts"] as const).map((cat) => (
            <button
              key={cat}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "gradient-purple-blue border-0 text-white scale-105"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:scale-105"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Liquidity Mixes For You</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {mockLiquidityMixes.map((mix) => (
              <div
                key={mix.id}
                className="glass-hover cursor-pointer rounded-lg p-3 transition-all duration-200 hover:scale-105"
              >
                <img
                  src={mix.coverUrl || "/placeholder.svg"}
                  alt={mix.title}
                  className="mb-2 aspect-square w-full rounded-lg object-cover"
                />
                <h3 className="text-sm font-semibold text-white">{mix.title}</h3>
                <p className="text-xs text-neutral-400">{mix.artists}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">APR</span>
                  <span className="text-xs font-bold text-green-400">{formatPercentage(mix.apr)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">{isConnected ? "Recently Staked" : "Recently Played"}</h2>
          <div className="scrollbar-hide flex gap-4 overflow-x-auto">
            {mockRecentlyPlayed.map((item) => (
              <div
                key={item.id}
                className="glass-hover min-w-[150px] cursor-pointer rounded-lg p-3 transition-all duration-200 hover:scale-105"
              >
                <img
                  src={item.coverUrl || "/placeholder.svg"}
                  alt={item.title}
                  className="mb-2 aspect-square w-full rounded-lg object-cover"
                />
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-neutral-400">{item.artist}</p>
                {isConnected && item.isStaked && (
                  <div className="mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span className="text-xs font-medium text-green-400">{formatCurrency(item.stakedAmount!)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            </div>
            <Button
              variant="ghost"
              className="rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
              asChild
            >
              <Link href="/discover">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Hot Artists</h2>
            <Button
              variant="ghost"
              className="rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
              asChild
            >
              <Link href="/discover">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {hotArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <h2 className="text-2xl font-bold text-white">Music Liquidity Pools</h2>
            </div>
            <Button
              variant="ghost"
              className="rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
              asChild
            >
              <Link href="/liquidity">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {topPools.map((pool) => (
              <Link key={pool.id} href={`/liquidity/${pool.id}`}>
                <div className="glass-hover rounded-lg p-6 transition-all duration-200 hover:scale-[1.02]">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                      <img
                        src={pool.artistImage || "/placeholder.svg"}
                        alt={pool.artistName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{pool.artistName}</h3>
                      <p className="text-sm text-gray-400">${pool.tokenSymbol}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">APR</span>
                      <span className="text-lg font-bold text-green-400">{formatPercentage(pool.apr)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Total Staked</span>
                      <span className="text-sm font-medium text-white">{formatCurrency(pool.totalStaked)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Token Price</span>
                      <span className="text-sm font-medium text-white">{formatCurrency(pool.tokenPrice)}</span>
                    </div>
                  </div>
                  <Button className="gradient-purple-blue mt-4 w-full rounded-full border-0 font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-105">
                    Provide Liquidity
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
