/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Loader2, CalendarCheck, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatMessagesProps {
  messages: any[]
  isLoading: boolean
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
}: ChatMessagesProps) {
  const getToolCallUI = (part: any) => {
    if (!part.type.startsWith('tool-')) return null
    const toolName = part.type.replace('tool-', '')
    const { state, output, input } = part

    if (toolName === 'checkAvailability') {
      return (
        <div className="flex items-center gap-2 p-2 mt-2 bg-muted/50 rounded-lg text-sm text-muted-foreground border border-border">
          {state === 'output-available' ? (
            <CalendarCheck className="h-4 w-4 text-green-500" />
          ) : (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          )}
          {state === 'output-available'
            ? output?.success
              ? `Checked availability for ${input?.date}`
              : 'Failed to check calendar'
            : `Checking calendar for ${input?.date || '...'}...`}
        </div>
      )
    }

    if (toolName === 'bookAppointment') {
      return (
        <div className="flex items-center gap-2 p-2 mt-2 bg-muted/50 rounded-lg text-sm text-muted-foreground border border-border">
          {state === 'output-available' ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          )}
          {state === 'output-available'
            ? output?.success
              ? 'Appointment successfully booked!'
              : 'Failed to book appointment.'
            : 'Booking your appointment...'}
        </div>
      )
    }

    return null
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-background">
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn(
            'flex gap-2.5',
            m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          <div
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold shadow-sm',
              m.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            )}
          >
            {m.role === 'user' ? 'ME' : 'EJ'}
          </div>

          <div className="flex flex-col gap-1 max-w-[80%]">
            {m.parts?.map((part: any, i: number) => {
              if (part.type === 'text') {
                return (
                  <div
                    key={i}
                    className={cn(
                      'rounded-2xl px-4 py-2 text-sm shadow-sm mb-1',
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-card text-card-foreground border border-border rounded-tl-sm whitespace-pre-wrap'
                    )}
                  >
                    {part.text}
                  </div>
                )
              }

              if (part.type.startsWith('tool-')) {
                return <div key={i}>{getToolCallUI(part)}</div>
              }

              return null
            })}
          </div>
        </div>
      ))}

      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === 'user' && (
          <div className="flex gap-2.5 flex-row">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground text-xs font-semibold shadow-sm">
              EJ
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-card border border-border px-4 py-3 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

      <div ref={messagesEndRef} />
    </div>
  )
}
