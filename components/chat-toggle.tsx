'use client'

import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatToggleProps {
  open: boolean
  onClick: () => void
}

export function ChatToggle({ open, onClick }: ChatToggleProps) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close chat' : 'Open chat'}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300',
        'bg-primary text-primary-foreground hover:scale-105 hover:shadow-xl',
        open && 'rotate-90 scale-0 opacity-0'
      )}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}
