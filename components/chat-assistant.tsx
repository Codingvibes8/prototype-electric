"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X, MessageCircle, Loader2, Mic, Volume2, VolumeX, Calendar, CalendarCheck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

// Types for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);
  const lastSpokenMessageId = useRef<string | null>(null);

  const {
    messages,
    sendMessage,
    status,
    addToolResult
  } = useChat({
    id: 'booking-chat',
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: "Hi! I'm the Electric Jamez booking assistant. How can I help you today? I can answer questions or help you book an appointment." }]
      } as any
    ]
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() && !isListening) return;
    sendMessage({ role: 'user', id: Date.now().toString(), parts: [{ type: 'text', text: input }] } as any);
    setInput('');
  }, [input, isListening, sendMessage]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Setup Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Setup Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-GB';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + (prev ? ' ' : '') + transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  // Text-to-Speech playback when the assistant completes a message
  useEffect(() => {
    if (isMuted || !synthRef.current) return;

    // Find the last assistant message
    const lastMessage = messages[messages.length - 1];
    
    // Only speak if it's from the assistant, it's not currently loading (streaming), 
    // it has parts, and we haven't spoken it yet.
    if (
      lastMessage &&
      lastMessage.role === 'assistant' &&
      !isLoading &&
      lastMessage.parts &&
      lastMessage.id !== lastSpokenMessageId.current
    ) {
      const textPart = lastMessage.parts.find(p => p.type === 'text') as any;
      if (textPart && textPart.text) {
        lastSpokenMessageId.current = lastMessage.id;
        
        // Stop any current speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(textPart.text);
        
        // Try to find a British English voice
        const voices = synthRef.current.getVoices();
        const gbVoice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB');
        if (gbVoice) {
          utterance.voice = gbVoice;
        }
        
        synthRef.current.speak(utterance);
      }
    }
  }, [messages, isLoading, isMuted]);

  // Stop speaking when closed
  useEffect(() => {
    if (!open && synthRef.current) {
      synthRef.current.cancel();
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  }, [open, isListening]);


  // ------------------------------------------------------------------
  // Render Helpers
  // ------------------------------------------------------------------
  
  const getToolCallUI = (part: any) => {
    if (!part.type.startsWith('tool-')) return null;
    const toolName = part.type.replace('tool-', '');
    const { state, output, input } = part;
    
    if (toolName === 'checkAvailability') {
      return (
        <div className="flex items-center gap-2 p-2 mt-2 bg-muted/50 rounded-lg text-sm text-muted-foreground border border-border">
          {state === 'output-available' ? <CalendarCheck className="h-4 w-4 text-green-500" /> : <Loader2 className="h-4 w-4 animate-spin text-primary" />}
          {state === 'output-available' ? (
            output?.success ? `Checked availability for ${input?.date}` : 'Failed to check calendar'
          ) : (
            `Checking calendar for ${input?.date || '...'}...`
          )}
        </div>
      );
    }
    
    if (toolName === 'bookAppointment') {
      return (
        <div className="flex items-center gap-2 p-2 mt-2 bg-muted/50 rounded-lg text-sm text-muted-foreground border border-border">
          {state === 'output-available' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Loader2 className="h-4 w-4 animate-spin text-primary" />}
          {state === 'output-available' ? (
            output?.success ? 'Appointment successfully booked!' : 'Failed to book appointment.'
          ) : (
            'Booking your appointment...'
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
          "bg-primary text-primary-foreground hover:scale-105 hover:shadow-xl",
          open && "rotate-90 scale-0 opacity-0",
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300",
          "h-[560px] max-h-[calc(100vh-6rem)]",
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-5 py-4">
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
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted && synthRef.current) synthRef.current.cancel();
              }}
              aria-label={isMuted ? "Unmute voice" : "Mute voice"}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-background">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex gap-2.5",
                m.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold shadow-sm",
                  m.role === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {m.role === 'user' ? "ME" : "EJ"}
              </div>

              <div className="flex flex-col gap-1 max-w-[80%]">
                {m.parts?.map((part: any, i: number) => {
                  if (part.type === 'text') {
                    return (
                      <div
                        key={i}
                        className={cn(
                          "rounded-2xl px-4 py-2 text-sm shadow-sm mb-1",
                          m.role === 'user'
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-card text-card-foreground border border-border rounded-tl-sm whitespace-pre-wrap",
                        )}
                      >
                        {part.text}
                      </div>
                    );
                  }
                  
                  if (part.type.startsWith('tool-')) {
                    return <div key={i}>{getToolCallUI(part)}</div>;
                  }
                  
                  return null;
                })}
              </div>
            </div>
          ))}
          
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
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

        {/* Input form */}
        <div className="border-t border-border bg-card p-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-full border border-input bg-background pl-4 pr-1.5 py-1.5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all shadow-sm"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="Type your message..."
              className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={toggleListening}
              disabled={isLoading}
              aria-label="Toggle voice input"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-colors shrink-0",
                isListening 
                  ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-500" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                isLoading && "opacity-50 cursor-not-allowed"
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
      </div>
    </>
  );
}
