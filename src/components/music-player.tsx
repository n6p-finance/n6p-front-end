"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  ChevronUp,
  Heart,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { usePlayer } from "@/hooks/use-player"
import { formatDuration } from "@/lib/utils/format"
import { cn } from "@/lib/utils"

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    repeat,
    shuffle,
    togglePlay,
    setVolume,
    setCurrentTime,
    toggleRepeat,
    toggleShuffle,
    playNext,
    playPrevious,
  } = usePlayer()

  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying || !currentTrack) return

    const interval = setInterval(() => {
      setCurrentTime(Math.min(currentTime + 1, currentTrack.duration))
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, currentTime, currentTrack, setCurrentTime])

  useEffect(() => {
    console.log("[v0] MusicPlayer render - currentTrack:", currentTrack?.title || "none", "isPlaying:", isPlaying)
  }, [currentTrack, isPlaying])

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.7)
      setIsMuted(false)
    } else {
      setVolume(0)
      setIsMuted(true)
    }
  }

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0])
  }

  if (!currentTrack) {
    console.log("[v0] MusicPlayer hidden - no current track")
    return null
  }

  return (
    <>
      {/* Main Player Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-white/5 bg-black/90 backdrop-blur-xl shadow-2xl">
        <div className="flex h-24 items-center gap-4 px-6">
          {/* Track Info */}
          <div className="flex w-80 items-center gap-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src={currentTrack.coverUrl || "/placeholder.svg"}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{currentTrack.title}</p>
              <p className="truncate text-sm text-gray-400">{currentTrack.artist}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-8 w-8 rounded-xl transition-all duration-200",
                isLiked ? "text-purple-500" : "text-gray-400 hover:text-white",
              )}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </Button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "h-8 w-8 rounded-xl transition-all duration-200",
                  shuffle ? "text-purple-500" : "text-gray-400 hover:text-white",
                )}
                onClick={toggleShuffle}
              >
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
                onClick={playPrevious}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="gradient-purple-blue h-10 w-10 rounded-full border-0 text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 fill-current" />
                ) : (
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
                onClick={playNext}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "h-8 w-8 rounded-xl transition-all duration-200",
                  repeat !== "off" ? "text-purple-500" : "text-gray-400 hover:text-white",
                )}
                onClick={toggleRepeat}
              >
                <Repeat className="h-4 w-4" />
                {repeat === "one" && <span className="absolute text-[10px] font-bold">1</span>}
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex w-full max-w-2xl items-center gap-2">
              <span className="text-xs text-gray-400">{formatDuration(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || currentTrack.duration}
                step={1}
                onValueChange={handleProgressChange}
                className="flex-1"
              />
              <span className="text-xs text-gray-400">{formatDuration(duration || currentTrack.duration)}</span>
            </div>
          </div>

          {/* Volume & Actions */}
          <div className="flex w-80 items-center justify-end gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider value={[volume]} max={1} step={0.01} onValueChange={handleVolumeChange} className="w-24" />
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-xl text-gray-400 transition-all duration-200 hover:text-white"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronUp className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")} />
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Player */}
      {isExpanded && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl">
          <div className="flex h-full items-center justify-center p-8">
            <div className="flex w-full max-w-6xl gap-12">
              {/* Album Art */}
              <div className="flex-1">
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={currentTrack.coverUrl || "/placeholder.svg"}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Track Details & Lyrics */}
              <div className="flex flex-1 flex-col justify-center space-y-8">
                <div className="space-y-2">
                  <h1 className="text-5xl font-bold text-white">{currentTrack.title}</h1>
                  <p className="text-2xl text-gray-400">{currentTrack.artist}</p>
                  <p className="text-lg text-gray-500">{currentTrack.album}</p>
                </div>

                {/* Mood Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Mood:</span>
                  <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300">
                    {currentTrack.mood}
                  </span>
                </div>

                {/* NFT Info */}
                {currentTrack.isNFT && (
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">NFT Price</p>
                        <p className="text-2xl font-bold text-white">{currentTrack.nftPrice} ETH</p>
                      </div>
                      <Button className="gradient-purple-blue border-0 text-white hover:opacity-90">Buy NFT</Button>
                    </div>
                  </div>
                )}

                {/* Lyrics Placeholder */}
                <div className="glass max-h-64 overflow-y-auto rounded-2xl p-4">
                  <h3 className="mb-3 font-semibold text-white">Lyrics</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>Lyrics will appear here when available...</p>
                    <p className="italic">This track is instrumental</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
