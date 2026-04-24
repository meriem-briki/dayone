'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Scenario } from '@/types'

interface Message { role: 'user' | 'assistant'; content: string }
interface Props { scenario: Scenario; onNext: () => void }

const OPENERS: Record<string, string[]> = {
  normal: [
    "Hey Priya — I wanted to talk through Smart Task Suggestions before I make a decision. What's your honest read on the situation?",
    "Leo, I've been looking at the adoption data on Smart Task Suggestions. You ran usability sessions recently, right? What did you find?",
    "Hi Amara — before I make any call on Smart Task Suggestions I want to hear from you directly. What are customers saying?",
    "James, I wanted to give you a heads-up on Smart Task Suggestions before Friday's sync. Do you have 5 minutes?",
  ],
  chaos: [
    "Tariq — I need to understand the scope situation properly before I make any decision. Walk me through what's actually shippable this week.",
    "Sandra, I got your email. I want to make sure I fully understand the two legal risks before I decide anything. Can you walk me through them?",
    "Hey Chloe — I saw the email went out. I need to understand where we are and what you need from me right now.",
    "Nadia, I wanted to get your perspective before we make any launch decisions. What are you worried about?",
  ],
  crisis: [
    "Rachel, I'm on it. What's your priority right now?",
    "David, I need your legal read in the next few minutes. What are we actually exposed to and what's the right move?",
    "Wei — walk me through the technical options. What can you do and how fast?",
    "Leila, I know we're up against the TechCrunch deadline. Tell me what you need from me to get that statement cleared.",
  ],
}

const FALLBACKS: Record<string, string[]> = {
  normal: [
    "Twelve percent adoption after six weeks. That was below our threshold and I have two items waiting. I need a clear metric and a deadline — or I'm proposing we deprecate at sprint planning.",
    "In five usability sessions, not one user found the feature on their own. It's buried three clicks deep. I've already mocked up a dashboard widget — one sprint could change everything.",
    "My top renewal accounts use it daily. But in ten mid-market QBRs last month, only one mentioned it. I'd want three more customer calls before we make any deprecation call.",
    "I need a recommendation by Friday. Keep it with a plan, fix it with a deadline, or kill it with a rationale. 'We're still figuring it out' is not something I can bring to the leadership team.",
  ],
  chaos: [
    "Full scope is three weeks minimum. But the auto-save rule engine with a manual confirmation step — that can ship Friday. That's the line I won't cross: anything touching payment rails needs proper testing.",
    "I can't sign off without either a mandatory per-transaction confirmation step, or a rename that drops 'investment' entirely. Both of those are fast fixes. But I need one of them.",
    "I sent that email because the campaign window was closing. But I can work with a Phase 1 framing — I just need to know what's actually shipping Friday so I'm not going dark on 50,000 subscribers.",
    "After the last rushed launch we had 2,400 tickets in week one. Sixty percent were confusion, not bugs. I need a clear confirmation flow and an FAQ ready before anything goes live.",
  ],
  crisis: [
    "I need a recommendation in twenty minutes. Not 'we're investigating.' Are we shutting it down or not?",
    "GDPR Article 22 is real exposure here. The feature being live while this is being reported compounds it. I'm recommending immediate suspension — not a patch.",
    "Rollback takes forty-five minutes. I can disable for new users in ten minutes while we prep the full rollback. Just tell me which one and I'll start now.",
    "TechCrunch has a deadline at 8:15. If we don't respond, they run it without our framing. I have a draft holding statement ready — I just need Legal and PM sign-off.",
  ],
}

async function getReply(systemPrompt: string, messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, messages }),
  })
  if (!res.ok) throw new Error('API error')
  const data = await res.json()
  return data.reply || ''
}

export default function ChatScreen({ scenario, onNext }: Props) {
  const [activeAgent, setActiveAgent] = useState(0)
  const [convos, setConvos] = useState<Record<number, Message[]>>(() =>
    Object.fromEntries(scenario.agents.map((_, i) => [i, []]))
  )
  const [started, setStarted] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const messagesEnd = useRef<HTMLDivElement>(null)
  const inited = useRef<Set<number>>(new Set())

  const scrollDown = () => messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => { scrollDown() }, [convos, activeAgent, loading])

  const initAgent = useCallback(async (idx: number) => {
    if (inited.current.has(idx)) return
    inited.current.add(idx)
    setLoading(true)
    const agent = scenario.agents[idx]
    const opener = OPENERS[scenario.id]?.[idx] || `Hi ${agent.name.split(' ')[0]}, can we talk through the situation?`
    try {
      const reply = await getReply(agent.systemPrompt, [{ role: 'user', content: opener }])
      setConvos((p) => ({ ...p, [idx]: [{ role: 'assistant', content: reply }] }))
    } catch {
      const fb = FALLBACKS[scenario.id]?.[idx] || 'Let\'s talk through this.'
      setConvos((p) => ({ ...p, [idx]: [{ role: 'assistant', content: fb }] }))
    } finally {
      setStarted((p) => new Set([...p, idx]))
      setLoading(false)
    }
  }, [scenario])

  useEffect(() => { initAgent(0) }, [initAgent])

  const switchAgent = (idx: number) => {
    setActiveAgent(idx)
    if (!inited.current.has(idx)) initAgent(idx)
  }

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const agent = scenario.agents[activeAgent]
    const userMsg: Message = { role: 'user', content: text }
    const updated = [...convos[activeAgent], userMsg]
    setConvos((p) => ({ ...p, [activeAgent]: updated }))
    setStarted((p) => new Set([...p, activeAgent]))
    setLoading(true)
    try {
      const reply = await getReply(agent.systemPrompt, updated.map((m) => ({ role: m.role, content: m.content })))
      setConvos((p) => ({ ...p, [activeAgent]: [...updated, { role: 'assistant', content: reply }] }))
    } catch {
      setConvos((p) => ({ ...p, [activeAgent]: [...updated, { role: 'assistant', content: 'I hear you. My position stands.' }] }))
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const agent = scenario.agents[activeAgent]
  const msgs = convos[activeAgent]
  const chatCount = started.size
  const canDecide = chatCount >= scenario.minChatsRequired

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      {/* Top bar */}
      <div className="border-b border-ink-100 bg-white px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-medium text-sm text-ink-900">DayOne</span>
          <span className="text-ink-300 text-sm">·</span>
          <span className="text-xs text-ink-500">{scenario.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-400">{chatCount}/{scenario.agents.length} chats</span>
          {canDecide && (
            <button
              onClick={onNext}
              className="bg-accent hover:bg-accent-hover text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              Make decision →
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Sidebar */}
        <div className="w-48 shrink-0 border-r border-ink-100 bg-white flex flex-col py-3">
          <div className="text-[10px] font-medium text-ink-400 uppercase tracking-wider px-4 mb-2">
            Stakeholders
          </div>
          {scenario.agents.map((a, i) => {
            const active = activeAgent === i
            const done = started.has(i)
            const mood = a.mood
            return (
              <button
                key={a.id}
                onClick={() => switchAgent(i)}
                className={`flex items-center gap-2.5 px-4 py-3 text-left transition-colors relative ${active ? 'bg-ink-50' : 'hover:bg-ink-50'}`}
              >
                {active && <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-accent rounded-r" />}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${a.avatarColor} ${a.avatarTextColor}`}>
                  {a.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-ink-800 truncate">{a.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-ink-400 truncate">{a.role.split(' ')[0]}</div>
                </div>
                <div className="ml-auto shrink-0">
                  {done
                    ? <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                    : mood === 'urgent'
                    ? <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
                    : mood === 'tense'
                    ? <div className="w-1.5 h-1.5 rounded-full bg-amber" />
                    : <div className="w-1.5 h-1.5 rounded-full bg-ink-200" />
                  }
                </div>
              </button>
            )
          })}

          {/* Progress */}
          <div className="mt-auto px-4 py-3 border-t border-ink-50">
            <div className="text-[10px] text-ink-400 mb-1">
              {canDecide ? 'Ready to decide' : `${scenario.minChatsRequired - chatCount} more needed`}
            </div>
            <div className="w-full h-1 bg-ink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${Math.min(100, (chatCount / scenario.minChatsRequired) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Chat main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Agent header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-ink-100 bg-white shrink-0">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${agent.avatarColor} ${agent.avatarTextColor}`}>
              {agent.initials}
            </div>
            <div>
              <div className="text-sm font-medium text-ink-900">{agent.name}</div>
              <div className="text-xs text-ink-400">{agent.role} · {scenario.company}</div>
            </div>
            {agent.mood === 'urgent' && (
              <div className="ml-auto flex items-center gap-1 bg-danger-light text-danger-dark text-[10px] font-medium px-2 py-0.5 rounded-full border border-danger/20">
                <span className="w-1 h-1 rounded-full bg-danger animate-pulse" />
                Urgent
              </div>
            )}
            {agent.mood === 'tense' && (
              <div className="ml-auto flex items-center gap-1 bg-amber-light text-amber-dark text-[10px] font-medium px-2 py-0.5 rounded-full border border-amber/20">
                Tense
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto thin-scroll flex flex-col gap-4 p-5" style={{ maxHeight: 'calc(100vh - 220px)' }}>
            {msgs.length === 0 && loading && (
              <div className="self-start max-w-sm">
                <div className="text-[11px] text-ink-400 mb-1">{agent.name}</div>
                <div className="flex gap-1 bg-white border border-ink-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-ink-300 typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-ink-300 typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-ink-300 typing-dot" />
                </div>
              </div>
            )}

            {msgs.map((m, i) => (
              <div key={i} className={`flex flex-col max-w-[78%] ${m.role === 'user' ? 'self-end' : 'self-start'}`}>
                <div className={`text-[11px] mb-1 ${m.role === 'user' ? 'text-right text-ink-400' : 'text-ink-400'}`}>
                  {m.role === 'user' ? 'You' : agent.name}
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-accent text-white rounded-br-sm'
                    : 'bg-white border border-ink-100 text-ink-800 rounded-bl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {msgs.length > 0 && loading && (
              <div className="self-start max-w-sm">
                <div className="text-[11px] text-ink-400 mb-1">{agent.name}</div>
                <div className="flex gap-1 bg-white border border-ink-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-ink-300 typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-ink-300 typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-ink-300 typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div className="border-t border-ink-100 bg-white px-5 py-3 flex gap-2 items-end shrink-0">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={`Message ${agent.name.split(' ')[0]}…`}
              rows={1}
              disabled={loading}
              className="flex-1 bg-ink-50 border border-ink-100 rounded-xl px-4 py-2.5 text-sm text-ink-800 placeholder-ink-300 resize-none focus:outline-none focus:border-accent/40 disabled:opacity-50 leading-relaxed"
              style={{ minHeight: 40 }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-accent hover:bg-accent-hover disabled:bg-ink-100 disabled:text-ink-300 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          {/* Decide bar */}
          {canDecide && (
            <div className="border-t border-accent/20 bg-accent-light px-5 py-3 flex items-center justify-between shrink-0">
              <p className="text-xs text-accent font-medium">
                You've heard from {chatCount} stakeholders — ready to make your call?
              </p>
              <button
                onClick={onNext}
                className="bg-accent text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors"
              >
                Make decision →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
