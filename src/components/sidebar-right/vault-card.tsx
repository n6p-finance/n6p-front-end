"use client"

import { useState } from "react"
import { TrendingUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useVault } from "@/hooks/use-vault"
import { useWallet } from "@/hooks/use-wallet"
import type { ArtistVault } from "@/lib/types"

interface VaultCardProps {
  vault: ArtistVault
}

export function VaultCard({ vault }: VaultCardProps) {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)

  const { deposit, withdraw, isLoading } = useVault()
  const { address } = useWallet()

  const handleDeposit = async () => {
    if (!address || !depositAmount) return

    // Mock vault address for demo
    const vaultAddress = "0x1234567890123456789012345678901234567890" as `0x${string}`
    await deposit(vaultAddress, depositAmount, address)
    setIsDepositOpen(false)
    setDepositAmount("")
  }

  const handleWithdraw = async () => {
    if (!address || !withdrawAmount) return

    const vaultAddress = "0x1234567890123456789012345678901234567890" as `0x${string}`
    await withdraw(vaultAddress, withdrawAmount, address)
    setIsWithdrawOpen(false)
    setWithdrawAmount("")
  }

  return (
    <div className="glass space-y-4 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">{vault.artistName} Vault</h3>
          <p className="text-xs text-gray-400">ERC-4626 Music Vault</p>
        </div>
        <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400 hover:text-white">
          <Info className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-lg p-3">
          <p className="text-xs text-gray-400">APY</p>
          <p className="flex items-center gap-1 text-lg font-bold text-green-400">
            {vault.apy}%
            <TrendingUp className="h-3 w-3" />
          </p>
        </div>
        <div className="glass rounded-lg p-3">
          <p className="text-xs text-gray-400">TVL</p>
          <p className="text-lg font-bold text-white">${(vault.totalLiquidity / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* User Position */}
      <div className="glass rounded-lg p-3">
        <p className="text-xs text-gray-400">Your Deposited</p>
        <p className="text-lg font-bold text-white">
          {vault.userDeposited.toLocaleString()} {vault.tokenSymbol}
        </p>
      </div>

      {/* Yield Chart */}
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={vault.yieldHistory}>
            <XAxis dataKey="date" stroke="#6b7280" fontSize={10} />
            <YAxis stroke="#6b7280" fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="yield" stroke="#a855f7" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-purple-blue flex-1 border-0 text-white hover:opacity-90">Deposit</Button>
          </DialogTrigger>
          <DialogContent className="glass border-white/10">
            <DialogHeader>
              <DialogTitle>Deposit {vault.tokenSymbol}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Amount</label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="border-white/10 bg-white/5"
                />
              </div>
              <Button
                className="gradient-purple-blue w-full border-0 text-white hover:opacity-90"
                onClick={handleDeposit}
                disabled={isLoading || !depositAmount}
              >
                {isLoading ? "Processing..." : "Confirm Deposit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5 bg-transparent">
              Withdraw
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-white/10">
            <DialogHeader>
              <DialogTitle>Withdraw {vault.tokenSymbol}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Amount</label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="border-white/10 bg-white/5"
                />
              </div>
              <Button
                className="gradient-purple-blue w-full border-0 text-white hover:opacity-90"
                onClick={handleWithdraw}
                disabled={isLoading || !withdrawAmount}
              >
                {isLoading ? "Processing..." : "Confirm Withdrawal"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Text */}
      <p className="text-xs text-gray-400">
        Stake into {vault.artistName}'s vault to share future streaming rewards and NFT sales.
      </p>
    </div>
  )
}
