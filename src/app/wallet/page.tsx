"use client"

import { useEffect } from "react"
import { useWallet } from "@/hooks/use-wallet"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wallet, ExternalLink, Copy, CheckCircle2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils/format"
import { useState } from "react"

export default function WalletPage() {
  const { address, isConnected, balance, isConnecting, connect, disconnect, getBalance } = useWallet()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isConnected) {
      getBalance()
    }
  }, [isConnected, getBalance])

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const mockTransactions = [
    {
      id: "1",
      type: "Stake",
      amount: "500 LUNA",
      timestamp: new Date("2024-03-15T10:30:00"),
      status: "completed",
      txHash: "0x1234...5678",
    },
    {
      id: "2",
      type: "NFT Purchase",
      amount: "0.5 ETH",
      timestamp: new Date("2024-03-14T15:20:00"),
      status: "completed",
      txHash: "0xabcd...efgh",
    },
    {
      id: "3",
      type: "Reward",
      amount: "25 BEAT",
      timestamp: new Date("2024-03-13T09:15:00"),
      status: "completed",
      txHash: "0x9876...5432",
    },
  ]

  if (!isConnected) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-8">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <Wallet className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white">Connect Your Wallet</h1>
          <p className="mb-6 text-gray-400">
            Connect your wallet to access music liquidity pools, purchase NFTs, and manage your tokens.
          </p>
          <Button
            onClick={connect}
            disabled={isConnecting}
            className="gradient-purple-blue w-full border-0 text-white hover:opacity-90"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Wallet</h1>
        <p className="text-gray-400">Manage your crypto assets and transactions</p>
      </section>

      {/* Wallet Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Balance Card */}
        <Card className="glass border-white/10 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Total Balance</h3>
            <Wallet className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-white">{Number.parseFloat(balance).toFixed(4)} ETH</p>
          <p className="mt-2 text-sm text-gray-400">{formatCurrency(Number.parseFloat(balance) * 3500)}</p>
        </Card>

        {/* Address Card */}
        <Card className="glass border-white/10 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Wallet Address</h3>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-gray-400 hover:text-white"
              onClick={copyAddress}
            >
              {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="font-mono text-sm text-white">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-xs text-purple-400 hover:text-purple-300"
            onClick={() => window.open(`https://etherscan.io/address/${address}`, "_blank")}
          >
            View on Etherscan
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </Card>

        {/* Network Card */}
        <Card className="glass border-white/10 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Network</h3>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
          <p className="text-xl font-bold text-white">Ethereum Mainnet</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-xs text-red-400 hover:text-red-300"
            onClick={disconnect}
          >
            Disconnect Wallet
          </Button>
        </Card>
      </div>

      {/* Token Holdings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Token Holdings</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { symbol: "LUNA", amount: "5,000", value: "$12,250", change: "+12.5%" },
            { symbol: "BEAT", amount: "10,000", value: "$32,100", change: "+8.3%" },
            { symbol: "NEON", amount: "2,500", value: "$4,675", change: "-2.1%" },
            { symbol: "ORCH", amount: "1,200", value: "$1,872", change: "+5.7%" },
          ].map((token) => (
            <Card key={token.symbol} className="glass border-white/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-white">${token.symbol}</span>
                <span className={`text-sm ${token.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {token.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{token.amount}</p>
              <p className="mt-1 text-sm text-gray-400">{token.value}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Transaction History */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
        <Card className="glass border-white/10">
          <div className="divide-y divide-white/5">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
                    <Wallet className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{tx.type}</p>
                    <p className="text-sm text-gray-400">{tx.timestamp.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">{tx.amount}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-purple-400 hover:text-purple-300"
                    onClick={() => window.open(`https://etherscan.io/tx/${tx.txHash}`, "_blank")}
                  >
                    View Tx
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
