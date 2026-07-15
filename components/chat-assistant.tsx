/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChatToggle } from "./chat-toggle";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

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
    status
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

  return (
    <>
      {/* Floating toggle button */}
      <ChatToggle open={open} onClick={() => setOpen((prev) => !prev)} />

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
        <ChatHeader
          isMuted={isMuted}
          onToggleMute={() => {
            setIsMuted(!isMuted);
            if (!isMuted && synthRef.current) synthRef.current.cancel();
          }}
          onClose={() => setOpen(false)}
        />

        {/* Messages */}
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />

        {/* Input form */}
        <ChatInput
          input={input}
          onInputChange={handleInputChange}
          isListening={isListening}
          isLoading={isLoading}
          onToggleListening={toggleListening}
          onSubmit={handleSubmit}
          inputRef={inputRef}
        />
      </div>
    </>
  );
}
