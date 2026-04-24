'use client'

import type { Scenario } from '@/types'

interface Props { scenario: Scenario; decisionId: string; onNext: () => void }

export default function OutcomeScreen({ scenario, decisionId, onNext }: Props) {
  const d = scenario.decisions.find((x) => x.id === decisionId)!
  const sign = (n: number) => n > 0 ? '+' : ''
  const metricColor = (n: number) => n > 0 ? 'text-teal' : n < 0 ? 'text-danger' : 'text-ink-400'
  const timeLabel = scenario.id === 'crisis' ? '72 hours later' : scenario.id === 'chaos' ? 'Three weeks later' : 'Four weeks later'

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      <div className="border-b border-ink-100 bg-white px-6 py-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-medium text-sm text-ink-900">DayOne</span>
        <span className="text-ink-300 text-sm">·</span>
        <span className="text-xs text-ink-500">{scenario.company} · Outcome</span>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        <div>
          <div className="text-xs text-ink-400 mb-1">{timeLabel}</div>
          <h1 className="text-xl font-medium text-ink-900 mb-1">
            You chose: <span className="text-accent">{d.label.toLowerCase()}</span>
          </h1>
          <p className="text-sm text-ink-500">Here's what played out.</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Revenue', val: d.impact.revenue },
            { label: 'Team morale', val: d.impact.morale },
            { label: 'User trust', val: d.impact.trust },
          ].map((m) => (
            <div key={m.label} className="bg-white border border-ink-100 rounded-xl p-4 text-center">
              <div className="text-xs text-ink-400 mb-1.5">{m.label}</div>
              <div className={`text-2xl font-medium ${metricColor(m.val)}`}>
                {sign(m.val)}{m.val}
              </div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="bg-white border border-ink-100 rounded-xl p-6">
          <div className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-4">What happened</div>
          <div className="flex flex-col gap-0">
            {d.consequences.map((c, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-ink-50 last:border-none">
                <div className="w-6 h-6 rounded-full bg-ink-50 border border-ink-100 flex items-center justify-center text-[11px] font-medium text-ink-500 shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-ink-700 leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-ink-900 hover:bg-ink-800 text-white font-medium py-3.5 rounded-xl text-sm transition-colors"
        >
          View your PM scorecard →
        </button>
      </div>
    </div>
  )
}
