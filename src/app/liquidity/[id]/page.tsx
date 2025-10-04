"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockLiquidityPools } from "@/lib/mock-data"
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/utils/format"
import { ArrowLeft, TrendingUp, Droplets, Plus, ExternalLink } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"

export default function LiquidityPoolPage() {
  const params = useParams()
  const router = useRouter()
  const { isConnected } = useWallet()
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")

  const pool = mockLiquidityPools.find((p) => p.id === params.id)

  if (!pool) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Pool not found</h1>
          <Button className="mt-4" onClick={() => router.push("/liquidity")}>
            Back to Pools
          </Button>
        </div>
      </div>
    )
  }

  const handleStake = () => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    alert(`Staking ${stakeAmount} ${pool.tokenSymbol}`)
    setStakeAmount("")
  }

  const handleUnstake = () => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    alert(`Unstaking ${unstakeAmount} ${pool.tokenSymbol}`)
    setUnstakeAmount("")
  }

  const handleClaimRewards = () => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    alert(`Claiming ${formatCurrency(pool.userRewards)} in rewards`)
  }

  return (
    <div className="space-y-8 p-8">
      {/* Back Button */}
      <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => router.push("/liquidity")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Pools
      </Button>

      {/* Pool Header */}
      <section className="flex items-start gap-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-full">
          <img
            src={pool.artistImage || "/placeholder.svg"}
            alt={pool.artistName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white">{pool.artistName}</h1>
          <p className="mt-2 text-xl text-gray-400">${pool.tokenSymbol} Liquidity Pool</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">APR:</span>
              <span className="text-2xl font-bold text-green-400">{formatPercentage(pool.apr)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Token Price:</span>
              <span className="text-xl font-bold text-white">{formatCurrency(pool.tokenPrice)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass border-white/10 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Total Staked</h3>
            <Droplets className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(pool.totalStaked)}</p>
          <p className="mt-1 text-sm text-gray-400">{formatNumber(pool.totalStakers)} stakers</p>
        </Card>

        <Card className="glass border-white/10 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">24h Volume</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(pool.volume24h)}</p>
          <p className="mt-1 text-sm text-green-400">+{formatPercentage(pool.volumeChange24h)}</p>
        </Card>

        <Card className="glass border-white/10 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Your Stake</h3>
            <Plus className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(pool.userStake)}</p>
          <p className="mt-1 text-sm text-gray-400">
            {pool.userStake > 0 ? `${((pool.userStake / pool.totalStaked) * 100).toFixed(2)}% of pool` : "Not staking"}
          </p>
        </Card>

        <Card className="glass border-white/10 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Pending Rewards</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(pool.userRewards)}</p>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 text-xs text-green-400 hover:text-green-300"
            onClick={handleClaimRewards}
            disabled={pool.userRewards === 0}
          >
            Claim Rewards
          </Button>
        </Card>
      </div>

      {/* Stake/Unstake Interface */}
      <Card className="glass border-white/10 p-6">
        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="stake" className="data-[state=active]:bg-purple-500/20">
              Stake
            </TabsTrigger>
            <TabsTrigger value="unstake" className="data-[state=active]:bg-purple-500/20">
              Unstake
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="space-y-4 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Amount to Stake</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="border-white/10 bg-white/5 pr-20 text-white placeholder:text-gray-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                  ${pool.tokenSymbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Available Balance:</span>
                <span className="font-medium text-white">10,000 ${pool.tokenSymbol}</span>
              </div>
            </div>

            <div className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">You will receive:</span>
                <span className="font-medium text-white">
                  {stakeAmount || "0"} LP-{pool.tokenSymbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Estimated APR:</span>
                <span className="font-medium text-green-400">{formatPercentage(pool.apr)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Daily Rewards:</span>
                <span className="font-medium text-white">
                  {stakeAmount ? formatCurrency((Number.parseFloat(stakeAmount) * pool.apr) / 365 / 100) : "$0.00"}
                </span>
              </div>
            </div>

            <Button
              className="gradient-purple-blue w-full border-0 text-white hover:opacity-90"
              onClick={handleStake}
              disabled={!stakeAmount || Number.parseFloat(stakeAmount) <= 0}
            >
              {isConnected ? "Stake Tokens" : "Connect Wallet to Stake"}
            </Button>
          </TabsContent>

          <TabsContent value="unstake" className="space-y-4 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Amount to Unstake</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                  className="border-white/10 bg-white/5 pr-20 text-white placeholder:text-gray-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                  LP-{pool.tokenSymbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Your Staked Balance:</span>
                <span className="font-medium text-white">{formatCurrency(pool.userStake)}</span>
              </div>
            </div>

            <div className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">You will receive:</span>
                <span className="font-medium text-white">
                  {unstakeAmount || "0"} ${pool.tokenSymbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Pending Rewards:</span>
                <span className="font-medium text-green-400">{formatCurrency(pool.userRewards)}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
              onClick={handleUnstake}
              disabled={!unstakeAmount || Number.parseFloat(unstakeAmount) <= 0}
            >
              {isConnected ? "Unstake Tokens" : "Connect Wallet to Unstake"}
            </Button>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Pool Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass border-white/10 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">Pool Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Pool Address</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-white">0x1234...5678</span>
                <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400 hover:text-white">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Token Contract</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-white">0xabcd...efgh</span>
                <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400 hover:text-white">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total Supply</span>
              <span className="font-medium text-white">1,000,000 ${pool.tokenSymbol}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Market Cap</span>
              <span className="font-medium text-white">{formatCurrency(pool.tokenPrice * 1000000)}</span>
            </div>
          </div>
        </Card>

        <Card className="glass border-white/10 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">About {pool.artistName}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {pool.artistName} is a pioneering artist in the blockchain music space, creating innovative sounds that
            blend electronic and ambient genres. By staking in this pool, you're supporting the artist's ecosystem and
            earning rewards from their music royalties and NFT sales.
          </p>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-gray-400 hover:text-white">
              View Artist Profile
            </Button>
            <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-gray-400 hover:text-white">
              Listen to Music
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
