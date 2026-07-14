"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X, MessageCircle, CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

const VALID_SERVICES = [
  "EICR / Electrical Safety Certificate",
  "EV Charger Installation",
  "Fuse Board / Consumer Unit Upgrade",
  "Full Rewire",
  "Lighting & Socket Installation",
  "Fault Finding & Repair",
  "Other / Not Sure",
] as const;

type Step =
  | "name"
  | "email"
  | "phone"
  | "service"
  | "date"
  | "time"
  | "address"
  | "notes"
  | "confirm"
  | "done";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes: string;
}

interface Message {
  from: "bot" | "user";
  text: string;
  options?: string[];
}

const STEP_ORDER: Step[] = [
  "name",
  "email",
  "phone",
  "service",
  "date",
  "time",
  "address",
  "notes",
  "confirm",
];

const STEP_PROMPTS: Record<Step, string> = {
  name: "👋 Hi! I'm Jamez's booking assistant. I'll help you schedule an appointment. What's your **full name**?",
  email: "Thanks! What's your **email address** so we can confirm the booking?",
  phone: "Got it. What's the best **phone number** to reach you?",
  service: "Which **service** do you need? Pick one from the list below:",
  date: "What **date** would you like? (Use YYYY-MM-DD format, e.g. 2026-01-15)",
  time: "What **time** works best? (Use HH:mm 24‑hour format, e.g. 09:00 or 14:30)",
  address: "Where should we come? Please enter the full **address** (including postcode).",
  notes: "Any **extra notes** for Jamez? (Type 'skip' or 'no' to leave blank)",
  confirm: "Here's a summary. Does everything look correct? Type **yes** to confirm or **no** to restart.",
  done: "",
};

// ---------------------------------------------------------------------------
// Validation helpers (mirrors the API route)
// ---------------------------------------------------------------------------

function validateField(step: Step, value: string): string | null {
  const v = value.trim();
  switch (step) {
    case "name":
      return v.length >= 2 ? null : "Name must be at least 2 characters.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid email address.";
    case "phone":
      return v.length >= 7 ? null : "Phone number must be at least 7 digits.";
    case "service":
      return (VALID_SERVICES as readonly string[]).includes(v)
        ? null
        : `Please pick one of the listed services.`;
    case "date":
      return /^\d{4}-\d{2}-\d{2}$/.test(v) ? null : "Use YYYY-MM-DD format (e.g. 2026-01-15).";
    case "time":
      return /^\d{2}:\d{2}$/.test(v) ? null : "Use HH:mm 24‑hour format (e.g. 09:00).";
    case "address":
      return v.length >= 5 ? null : "Address must be at least 5 characters.";
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    address: "",
    notes: "",
  });
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: STEP_PROMPTS.name },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[] | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens or step changes
  useEffect(() => {
    if (open && step !== "done") {
      inputRef.current?.focus();
    }
  }, [open, step]);

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const advanceStep = useCallback(
    (current: Step, value: string) => {
      const idx = STEP_ORDER.indexOf(current);
      if (idx >= 0 && idx < STEP_ORDER.length - 1) {
        setStep(STEP_ORDER[idx + 1]);
      } else {
        setStep("confirm");
      }
    },
    [],
  );

  // ------------------------------------------------------------------
  // Process user input for the current step
  // ------------------------------------------------------------------

  const processInput = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      // Add user message
      addMessage({ from: "user", text: trimmed });

      // Handle confirmation step
      if (step === "confirm") {
        const lower = trimmed.toLowerCase();
        if (lower === "yes" || lower === "y" || lower === "confirm") {
          await submitBooking();
          return;
        }
        if (lower === "no" || lower === "n" || lower === "restart") {
          // Reset
          setForm({ name: "", email: "", phone: "", service: "", date: "", time: "", address: "", notes: "" });
          setStep("name");
          setMessages([{ from: "bot", text: "No worries! Let's start over. What's your **full name**?" }]);
          setError(null);
          setAvailableSlots(null);
          return;
        }
        addMessage({ from: "bot", text: "Please type **yes** to confirm or **no** to restart." });
        return;
      }

      // Handle notes step (optional skip)
      if (step === "notes") {
        const skip = ["skip", "no", "none", "n/a", "nothing"].includes(trimmed.toLowerCase());
        const newForm = { ...form, notes: skip ? "" : trimmed };
        setForm(newForm);
        setStep("confirm");
        addMessage({
          from: "bot",
          text: buildSummary(newForm),
        });
        return;
      }

      // Validate
      const err = validateField(step, trimmed);
      if (err) {
        addMessage({ from: "bot", text: `⚠️ ${err} Please try again.` });
        return;
      }

      // Store value & advance
      const newForm = { ...form, [step]: trimmed };
      setForm(newForm);
      setError(null);

      const nextIdx = STEP_ORDER.indexOf(step) + 1;
      const nextStep = STEP_ORDER[nextIdx];

      if (nextStep === "service") {
        addMessage({
          from: "bot",
          text: STEP_PROMPTS.service,
          options: [...VALID_SERVICES],
        });
      } else if (nextStep === "confirm") {
        addMessage({
          from: "bot",
          text: buildSummary(newForm),
        });
      } else {
        addMessage({ from: "bot", text: STEP_PROMPTS[nextStep] });
      }

      advanceStep(step, trimmed);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, form, addMessage, advanceStep],
  );

  // ------------------------------------------------------------------
  // Build confirmation summary
  // ------------------------------------------------------------------

  function buildSummary(data: FormData): string {
    return (
      `📋 **Booking Summary**\n\n` +
      `• **Name:** ${data.name}\n` +
      `• **Email:** ${data.email}\n` +
      `• **Phone:** ${data.phone}\n` +
      `• **Service:** ${data.service}\n` +
      `• **Date:** ${data.date}\n` +
      `• **Time:** ${data.time}\n` +
      `• **Address:** ${data.address}\n` +
      `${data.notes ? `• **Notes:** ${data.notes}\n` : ""}` +
      `\nType **yes** to book or **no** to restart.`
    );
  }

  // ------------------------------------------------------------------
  // Submit to /api/booking
  // ------------------------------------------------------------------

  async function submitBooking() {
    setLoading(true);
    setError(null);
    setAvailableSlots(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (res.ok) {
        setStep("done");
        addMessage({
          from: "bot",
          text:
            `✅ **All booked!** 🎉\n\n` +
            `Your appointment for **${form.service}** on **${form.date}** at **${form.time}** has been scheduled.\n\n` +
            `Jamez will send a confirmation to **${form.email}** shortly. If you need to change anything, just give us a call.\n\n` +
            `Thanks for choosing Electric Jamez! ⚡`,
        });
      } else if (res.status === 409 && json.availableSlots) {
        // Slot conflict — show alternatives
        setAvailableSlots(json.availableSlots);
        addMessage({
          from: "bot",
          text:
            `⚠️ That slot is already booked. Here are some **available slots** on ${form.date}:\n\n` +
            json.availableSlots.map((s: string) => `• ${s}`).join("\n") +
            `\n\nPlease type a new time (HH:mm) or type a new date (YYYY-MM-DD) to check another day.`,
        });
        // Stay on time step so user can retry
        setStep("time");
      } else {
        setError(json.error || "Something went wrong. Please try again.");
        addMessage({
          from: "bot",
          text: `❌ ${json.error || "Something went wrong. Please try again later."}`,
        });
        // Go back to name step on server error so user can retry
        setStep("name");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      addMessage({
        from: "bot",
        text: "❌ Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  // ------------------------------------------------------------------
  // Handle option click (service picker)
  // ------------------------------------------------------------------

  function handleOptionClick(option: string) {
    setInput(option);
    // Auto-submit the option
    setTimeout(() => processInput(option), 0);
  }

  // ------------------------------------------------------------------
  // Handle form submit (Enter key)
  // ------------------------------------------------------------------

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || step === "done") return;
    const val = input;
    setInput("");
    processInput(val);
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

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
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-background">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-2.5",
                msg.from === "user" ? "justify-end" : "justify-start",
              )}
            >
              {msg.from === "bot" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                  EJ
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                  msg.from === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md",
                )}
              >
                {/* Render bold markdown-ish text */}
                {msg.text.split(/(\*\*.*?\*\*)/).map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j}>{part.slice(2, -2)}</strong>
                  ) : (
                    part
                  ),
                )}

                {/* Option chips for service selection */}
                {msg.options && msg.options.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        disabled={loading || step !== "service"}
                        className={cn(
                          "rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors",
                          "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {msg.from === "user" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold mt-0.5">
                  U
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm pl-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Booking your appointment...
            </div>
          )}

          {/* Available slots after conflict */}
          {availableSlots && step === "time" && !loading && (
            <div className="flex flex-wrap gap-2 pl-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => {
                    setInput(slot);
                    setAvailableSlots(null);
                    setTimeout(() => processInput(slot), 0);
                  }}
                  className="rounded-full border border-green-500/50 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 hover:bg-green-500/20 transition-colors"
                >
                  {slot}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        {step !== "done" && (
          <form
            onSubmit={handleSubmit}
            className="border-t border-border bg-card px-4 py-3 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                step === "service"
                  ? "Pick a service above or type it..."
                  : step === "notes"
                    ? "Any notes? (type 'skip' to leave blank)"
                    : "Type your answer..."
              }
              disabled={loading}
              className={cn(
                "flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                "disabled:opacity-50",
              )}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors",
                "hover:bg-primary/90 disabled:opacity-40",
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}

        {/* Done state — restart button */}
        {step === "done" && (
          <div className="border-t border-border bg-card px-5 py-4">
            <button
              onClick={() => {
                setStep("name");
                setForm({ name: "", email: "", phone: "", service: "", date: "", time: "", address: "", notes: "" });
                setMessages([{ from: "bot", text: STEP_PROMPTS.name }]);
                setError(null);
                setAvailableSlots(null);
              }}
              className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        )}
      </div>
    </>
  );
}
