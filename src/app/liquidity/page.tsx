"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockLiquidityPools } from "@/lib/mock-data"
import { formatCurrency, formatPercentage } from "@/lib/utils/format"
import { TrendingUp, TrendingDown, Search, ArrowUpDown, Droplets } from "lucide-react"

type SortOption = "apr" | "tvl" | "volume" | "name"

export default function LiquidityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("apr")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredPools = mockLiquidityPools
    .filter(
      (pool) =>
        pool.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pool.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "apr":
          comparison = a.apr - b.apr
          break
        case "tvl":
          comparison = a.totalStaked - b.totalStaked
          break
        case "volume":
          comparison = a.volume24h - b.volume24h
          break
        case "name":
          comparison = a.artistName.localeCompare(b.artistName)
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(option)
      setSortOrder("desc")
    }
  }

  const totalTVL = mockLiquidityPools.reduce((sum, pool) => sum + pool.totalStaked, 0)
  const avgAPR = mockLiquidityPools.reduce((sum, pool) => sum + pool.apr, 0) / mockLiquidityPools.length
  const total24hVolume = mockLiquidityPools.reduce((sum, pool) => sum + pool.volume24h, 0)

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Droplets className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-white">Music Liquidity Pools</h1>
        </div>
        <p className="text-gray-400">Provide liquidity to artist tokens and earn rewards</p>
      </section>

      {/* Stats Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass border-white/10 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Total Value Locked</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalTVL)}</p>
          <p className="mt-1 text-sm text-green-400">+12.5% this week</p>
        </Card>

        <Card className="glass border-white/10 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Average APR</h3>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-white">{formatPercentage(avgAPR)}</p>
          <p className="mt-1 text-sm text-gray-400">Across all pools</p>
        </Card>

        <Card className="glass border-white/10 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">24h Volume</h3>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(total24hVolume)}</p>
          <p className="mt-1 text-sm text-green-400">+8.3% from yesterday</p>
        </Card>

        <Card className="glass border-white/10 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Active Pools</h3>
            <Droplets className="h-4 w-4 text-cyan-500" />
          </div>
          <p className="text-3xl font-bold text-white">{mockLiquidityPools.length}</p>
          <p className="mt-1 text-sm text-gray-400">Earning rewards</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search pools by artist or token..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:bg-white/10 hover:text-white"
            onClick={() => toggleSort("apr")}
          >
            APR
            {sortBy === "apr" && <ArrowUpDown className="ml-2 h-3 w-3" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:bg-white/10 hover:text-white"
            onClick={() => toggleSort("tvl")}
          >
            TVL
            {sortBy === "tvl" && <ArrowUpDown className="ml-2 h-3 w-3" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:bg-white/10 hover:text-white"
            onClick={() => toggleSort("volume")}
          >
            Volume
            {sortBy === "volume" && <ArrowUpDown className="ml-2 h-3 w-3" />}
          </Button>
        </div>
      </div>

      {/* Pools Table */}
      <Card className="glass border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Pool</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">APR</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Total Staked</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">24h Volume</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Token Price</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Your Stake</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPools.map((pool) => (
                <tr key={pool.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/liquidity/${pool.id}`} className="flex items-center gap-3 hover:opacity-80">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <img
                          src={pool.artistImage || "/placeholder.svg"}
                          alt={pool.artistName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{pool.artistName}</p>
                        <p className="text-sm text-gray-400">${pool.tokenSymbol}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold text-green-400">{formatPercentage(pool.apr)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-medium text-white">{formatCurrency(pool.totalStaked)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="font-medium text-white">{formatCurrency(pool.volume24h)}</span>
                      {pool.volumeChange24h > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-400" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-medium text-white">{formatCurrency(pool.tokenPrice)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {pool.userStake > 0 ? (
                      <div>
                        <p className="font-medium text-white">{formatCurrency(pool.userStake)}</p>
                        <p className="text-xs text-green-400">+{formatCurrency(pool.userRewards)} rewards</p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" className="gradient-purple-blue border-0 text-white hover:opacity-90" asChild>
                      <Link href={`/liquidity/${pool.id}`}>{pool.userStake > 0 ? "Manage" : "Stake"}</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info Banner */}
      <Card className="glass border-purple-500/20 bg-purple-500/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
            <Droplets className="h-5 w-5 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 font-semibold text-white">How Music Liquidity Pools Work</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Provide liquidity to artist token pools and earn rewards based on trading fees and artist royalties. Your
              stake helps create a liquid market for music NFTs and artist tokens, while you earn passive income from
              the ecosystem.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
