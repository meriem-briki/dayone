'use client'

import { SCENARIO_LIST } from '@/data/scenarios'
import type { ScenarioId } from '@/types'

interface Props { onSelect: (id: ScenarioId) => void }

const difficultyLabel = ['', 'Foundational', 'Intermediate', 'Advanced']
const difficultyColor = [
  '',
  'text-teal-dark bg-teal-light border-teal/30',
  'text-amber-dark bg-amber-light border-amber/30',
  'text-danger-dark bg-danger-light border-danger/30',
]

function DifficultyBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1,2,3].map((i) => (
        <div key={i} className={`w-5 h-1 rounded-full ${
          i <= level
            ? level === 1 ? 'bg-teal' : level === 2 ? 'bg-amber' : 'bg-danger'
            : 'bg-ink-100'
        }`} />
      ))}
    </div>
  )
}

export default function MorningBriefScreen({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-ink-100 bg-white px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-medium text-sm text-ink-900">DayOne</span>
        </div>
        <div className="text-xs text-ink-400">Product Manager · Morning Brief</div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        {/* Inbox header */}
        <div className="mb-8">
          <div className="text-xs text-ink-400 mb-2">Monday · 9:00 AM · Inbox</div>
          <h1 className="text-2xl font-medium text-ink-900 mb-2">Your morning brief</h1>
          <p className="text-sm text-ink-600 leading-relaxed">
            Three situations landed on your desk overnight. Each one is real — the kind of thing PMs actually deal with. Pick one and live it.
          </p>
        </div>

        {/* Scenario cards — styled as inbox threads */}
        <div className="flex flex-col gap-3">
          {SCENARIO_LIST.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onSelect(s.id as ScenarioId)}
              className="group text-left bg-white border border-ink-100 hover:border-accent/40 hover:shadow-sm rounded-2xl p-6 transition-all animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyColor[s.difficulty]}`}>
                    {difficultyLabel[s.difficulty]}
                  </span>
                  <DifficultyBar level={s.difficulty} />
                </div>
                <span className="text-xs text-ink-400">{s.duration}</span>
              </div>

              <div className="text-xs text-ink-400 mb-1">{s.company} · {s.industry}</div>
              <h2 className="text-base font-medium text-ink-900 mb-2 group-hover:text-accent transition-colors leading-snug">
                {s.headline}
              </h2>
              <p className="text-sm text-ink-600 leading-relaxed mb-4">{s.summary}</p>

              {/* Conflict pills */}
              <div className="flex flex-col gap-1.5">
                {s.conflicts.map((c) => (
                  <div key={c.title} className="flex items-center gap-2 text-xs text-ink-600">
                    <span>{c.icon}</span>
                    <span className="font-medium text-ink-800">{c.title}</span>
                    <span className="text-ink-400 hidden sm:inline">·</span>
                    <span className="text-ink-400 hidden sm:inline truncate">{c.detail.slice(0, 60)}…</span>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {s.skills.map((sk) => (
                  <span key={sk} className="text-[11px] text-ink-400 border border-ink-100 rounded-full px-2.5 py-0.5 bg-ink-50">
                    {sk}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
