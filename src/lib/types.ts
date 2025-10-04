export interface Track {
  id: string
  title: string
  artist: string
  artistId: string
  album: string
  duration: number
  coverUrl: string
  audioUrl: string
  mood: "chill" | "energetic" | "focus" | "happy" | "melancholic"
  genre: string
  isNFT?: boolean
  nftPrice?: number
}

export interface Artist {
  id: string
  name: string
  imageUrl: string
  followers: number
  verified: boolean
  bio: string
  tokenSymbol?: string
  tokenPrice?: number
}

export interface LiquidityPool {
  id: string
  artistId: string
  artistName: string
  artistImage: string
  tokenSymbol: string
  apr: number
  totalStaked: number
  userStaked: number
  userStake: number
  userRewards: number
  totalStakers: number
  tokenPrice: number
  volume24h: number
  volumeChange24h: number
  description: string
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverUrl: string
  tracks: Track[]
  isPublic: boolean
  createdAt: Date
}

export interface UserProfile {
  id: string
  username: string
  email: string
  avatarUrl: string
  xp: number
  level: number
  streak: number
  walletAddress?: string
}

export interface Transaction {
  id: string
  type: "purchase" | "mint" | "stake" | "unstake" | "reward"
  amount: number
  tokenSymbol: string
  timestamp: Date
  status: "pending" | "completed" | "failed"
  txHash?: string
}

export interface SongCredit {
  role: string
  name: string
  id: string
}

export interface ArtistVault {
  id: string
  artistId: string
  artistName: string
  tokenSymbol: string
  apy: number
  totalLiquidity: number
  userDeposited: number
  yieldHistory: { date: string; yield: number }[]
}

export interface LiquidityMix {
  id: string
  title: string
  coverUrl: string
  artists: string
  description: string
  totalValue: number
  apr: number
}

export interface RecentlyPlayed {
  id: string
  trackId: string
  title: string
  artist: string
  coverUrl: string
  playedAt: Date
  isStaked?: boolean
  stakedAmount?: number
}
