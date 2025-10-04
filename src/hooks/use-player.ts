"use client"

import { create } from "zustand"
import type { Track } from "@/lib/types"

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  queue: Track[]
  currentTime: number
  duration: number
  repeat: "off" | "one" | "all"
  shuffle: boolean

  setCurrentTrack: (track: Track) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  addToQueue: (track: Track) => void
  removeFromQueue: (trackId: string) => void
  clearQueue: () => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  toggleRepeat: () => void
  toggleShuffle: () => void
  playNext: () => void
  playPrevious: () => void
}

export const usePlayer = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  queue: [],
  currentTime: 0,
  duration: 0,
  repeat: "off",
  shuffle: false,

  setCurrentTrack: (track) => {
    console.log("[v0] Setting current track:", track.title, "by", track.artist)
    set({ currentTrack: track, isPlaying: true, currentTime: 0 })
  },

  togglePlay: () => {
    const newState = !get().isPlaying
    console.log("[v0] Toggle play:", newState ? "playing" : "paused")
    set((state) => ({ isPlaying: !state.isPlaying }))
  },

  setVolume: (volume) => set({ volume }),

  addToQueue: (track) =>
    set((state) => ({
      queue: [...state.queue, track],
    })),

  removeFromQueue: (trackId) =>
    set((state) => ({
      queue: state.queue.filter((t) => t.id !== trackId),
    })),

  clearQueue: () => set({ queue: [] }),

  setCurrentTime: (time) => set({ currentTime: time }),

  setDuration: (duration) => set({ duration }),

  toggleRepeat: () =>
    set((state) => {
      const modes: Array<"off" | "one" | "all"> = ["off", "one", "all"]
      const currentIndex = modes.indexOf(state.repeat)
      const nextIndex = (currentIndex + 1) % modes.length
      return { repeat: modes[nextIndex] }
    }),

  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),

  playNext: () => {
    const { queue, currentTrack, shuffle } = get()
    if (queue.length === 0) return

    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length)
      set({ currentTrack: queue[randomIndex], isPlaying: true, currentTime: 0 })
    } else {
      const currentIndex = queue.findIndex((t) => t.id === currentTrack?.id)
      const nextIndex = (currentIndex + 1) % queue.length
      set({ currentTrack: queue[nextIndex], isPlaying: true, currentTime: 0 })
    }
  },

  playPrevious: () => {
    const { queue, currentTrack } = get()
    if (queue.length === 0) return

    const currentIndex = queue.findIndex((t) => t.id === currentTrack?.id)
    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1
    set({ currentTrack: queue[prevIndex], isPlaying: true, currentTime: 0 })
  },
}))
