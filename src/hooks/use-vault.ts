"use client"

import { useState } from "react"
import { createPublicClient, createWalletClient, custom, http, parseEther, formatEther } from "viem"
import { mainnet } from "viem/chains"
import type { Address } from "viem"

// ERC-4626 Vault ABI (simplified)
const VAULT_ABI = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
    ],
    outputs: [{ name: "shares", type: "uint256" }],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "owner", type: "address" },
    ],
    outputs: [{ name: "shares", type: "uint256" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
  {
    name: "totalAssets",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "totalAssets", type: "uint256" }],
  },
] as const

interface UseVaultReturn {
  deposit: (vaultAddress: Address, amount: string, receiver: Address) => Promise<void>
  withdraw: (vaultAddress: Address, amount: string, receiver: Address) => Promise<void>
  getBalance: (vaultAddress: Address, account: Address) => Promise<string>
  getTotalAssets: (vaultAddress: Address) => Promise<string>
  isLoading: boolean
  error: string | null
}

export function useVault(): UseVaultReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const deposit = async (vaultAddress: Address, amount: string, receiver: Address) => {
    setIsLoading(true)
    setError(null)

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed")
      }

      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum),
      })

      const [account] = await walletClient.getAddresses()

      const hash = await walletClient.writeContract({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: "deposit",
        args: [parseEther(amount), receiver],
        account,
      })

      console.log("[v0] Deposit transaction hash:", hash)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Deposit failed"
      setError(errorMessage)
      console.error("[v0] Deposit error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const withdraw = async (vaultAddress: Address, amount: string, receiver: Address) => {
    setIsLoading(true)
    setError(null)

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed")
      }

      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum),
      })

      const [account] = await walletClient.getAddresses()

      const hash = await walletClient.writeContract({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: "withdraw",
        args: [parseEther(amount), receiver, account],
        account,
      })

      console.log("[v0] Withdraw transaction hash:", hash)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Withdrawal failed"
      setError(errorMessage)
      console.error("[v0] Withdraw error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const getBalance = async (vaultAddress: Address, account: Address): Promise<string> => {
    try {
      const balance = await publicClient.readContract({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: "balanceOf",
        args: [account],
      })

      return formatEther(balance)
    } catch (err) {
      console.error("[v0] Get balance error:", err)
      return "0"
    }
  }

  const getTotalAssets = async (vaultAddress: Address): Promise<string> => {
    try {
      const totalAssets = await publicClient.readContract({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: "totalAssets",
      })

      return formatEther(totalAssets)
    } catch (err) {
      console.error("[v0] Get total assets error:", err)
      return "0"
    }
  }

  return {
    deposit,
    withdraw,
    getBalance,
    getTotalAssets,
    isLoading,
    error,
  }
}
