"use client"

import { create } from "zustand"
import { createPublicClient, http, formatEther, type Address } from "viem"
import { mainnet } from "viem/chains"

interface WalletState {
  address: Address | null
  isConnected: boolean
  balance: string
  isConnecting: boolean
  chainId: number | null

  connect: () => Promise<void>
  disconnect: () => void
  getBalance: () => Promise<void>
}

export const useWallet = create<WalletState>((set, get) => ({
  address: null,
  isConnected: false,
  balance: "0",
  isConnecting: false,
  chainId: null,

  connect: async () => {
    set({ isConnecting: true })

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask to connect your wallet")
        set({ isConnecting: false })
        return
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }) as string[]

      if (accounts && accounts.length > 0) {
        const address = accounts[0] as Address

        // Get chain ID
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        }) as string

        set({
          address,
          isConnected: true,
          chainId: Number.parseInt(chainId, 16),
          isConnecting: false,
        })

        // Get balance
        get().getBalance()
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      set({ isConnecting: false })
    }
  },

  disconnect: () => {
    set({
      address: null,
      isConnected: false,
      balance: "0",
      chainId: null,
    })
  },

  getBalance: async () => {
    const { address } = get()
    if (!address) return

    try {
      const publicClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      })

      const balance = await publicClient.getBalance({ address })
      set({ balance: formatEther(balance) })
    } catch (error) {
      console.error("Failed to get balance:", error)
    }
  },
}))

// Add TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void
    }
  }
}
