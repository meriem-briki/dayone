'use client'

import { useState } from 'react'
import type { Scenario } from '@/types'

interface Props { scenario: Scenario; onDecide: (id: string) => void }

const riskStyle: Record<string, string> = {
  low:    'bg-teal-light text-teal-dark border-teal/20',
  medium: 'bg-amber-light text-amber-dark border-amber/20',
  high:   'bg-danger-light text-danger-dark border-danger/20',
}

export default function DecisionScreen({ scenario, onDecide }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      {/* Top bar */}
      <div className="border-b border-ink-100 bg-white px-6 py-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-medium text-sm text-ink-900">DayOne</span>
        <span className="text-ink-300 text-sm">·</span>
        <span className="text-xs text-ink-500">{scenario.company}</span>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        {/* Header */}
        <div>
          <div className="text-xs text-ink-400 mb-1">{scenario.timeContext} · Decision point</div>
          <h1 className="text-xl font-medium text-ink-900 mb-2">Time to make your call</h1>
          <p className="text-sm text-ink-600 leading-relaxed">
            You've gathered context. Every option has a cost. There is no perfect answer — just the best available one with the information you have.
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {scenario.decisions.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`flex items-start gap-4 p-5 rounded-xl border text-left transition-all ${
                selected === d.id
                  ? 'border-accent bg-accent-light'
                  : 'border-ink-100 bg-white hover:border-accent/30 hover:bg-accent-light/30'
              }`}
            >
              <span className="text-2xl shrink-0 mt-0.5">{d.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-ink-900">{d.label}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${riskStyle[d.risk]}`}>
                    {d.risk} risk
                  </span>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">{d.desc}</p>
              </div>
              {selected === d.id && (
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          disabled={!selected}
          onClick={() => selected && onDecide(selected)}
          className="w-full bg-ink-900 hover:bg-ink-800 disabled:bg-ink-100 disabled:text-ink-300 text-white font-medium py-3.5 rounded-xl text-sm transition-colors"
        >
          {selected ? 'Confirm this decision' : 'Select an option above'}
        </button>

        <p className="text-center text-xs text-ink-400">
          Your choice will be evaluated on prioritization, stakeholder management, risk handling, and communication.
        </p>
      </div>
    </div>
  )
}
