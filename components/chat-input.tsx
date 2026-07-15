'use client'

import { Send, Mic } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  input: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isListening: boolean
  isLoading: boolean
  onToggleListening: () => void
  onSubmit: (e?: React.FormEvent) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

export function ChatInput({
  input,
  onInputChange,
  isListening,
  isLoading,
  onToggleListening,
  onSubmit,
  inputRef,
}: ChatInputProps) {
  return (
    <div className="border-t border-border bg-card p-4 shrink-0">
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 rounded-full border border-input bg-background pl-4 pr-1.5 py-1.5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all shadow-sm"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={onInputChange}
          disabled={isLoading}
          placeholder="Type your message..."
          className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={onToggleListening}
          disabled={isLoading}
          aria-label="Toggle voice input"
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full transition-colors shrink-0',
            isListening
              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-500'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            isLoading && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isListening ? (
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <Mic className="relative h-4 w-4" />
            </div>
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </button>
        <button
          type="submit"
          disabled={isLoading || (!input.trim() && !isListening)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105 hover:shadow disabled:pointer-events-none disabled:opacity-50 shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
      <div className="mt-2 text-center text-[10px] text-muted-foreground/60">
        AI booking assistant. Information is not legally binding.
      </div>
    </div>
  )
}
