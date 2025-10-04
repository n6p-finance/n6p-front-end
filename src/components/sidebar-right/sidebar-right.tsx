"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePlayer } from "@/hooks/use-player"
import { MediaPreview } from "./media-preview"
import { ArtistInfo } from "./artist-info"
import { CreditsAccordion } from "./credits-accordion"
import { QueueList } from "./queue-list"
import { VaultCard } from "./vault-card"
import { mockArtists, mockCredits, mockArtistVaults } from "@/lib/mock-data"

export function SidebarRight() {
  const { currentTrack, queue } = usePlayer()

  // Only show sidebar when music is playing
  if (!currentTrack) return null

  const artist = mockArtists.find((a) => a.id === currentTrack.artistId)
  const credits = mockCredits[currentTrack.id] || []
  const vault = mockArtistVaults[currentTrack.artistId]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="h-screen rounded-l-2xl border-l border-white/5 bg-black/90 backdrop-blur-xl"
      >
        <ScrollArea className="h-full">
          <div className="space-y-6 p-6 pb-32">
            {/* Media Preview */}
            <MediaPreview track={currentTrack} />

            {/* Gradient Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            {/* Artist Info */}
            {artist && (
              <>
                <ArtistInfo artist={artist} />
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              </>
            )}

            {/* Credits */}
            {credits.length > 0 && (
              <>
                <CreditsAccordion credits={credits} />
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              </>
            )}

            {/* Vault Card */}
            {vault && (
              <>
                <VaultCard vault={vault} />
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              </>
            )}

            {/* Next Queue */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Next in Queue</h3>
              <QueueList queue={queue} />
            </div>
          </div>
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  )
}
