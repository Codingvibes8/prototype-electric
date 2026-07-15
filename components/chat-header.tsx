'use client'

import { Volume2, VolumeX, X } from 'lucide-react'

interface ChatHeaderProps {
  isMuted: boolean
  onToggleMute: () => void
  onClose: () => void
}

export function ChatHeader({ isMuted, onToggleMute, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-5 py-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
          EJ
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Electric Jamez</p>
          <p className="text-xs text-muted-foreground">Booking Assistant ⚡</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
