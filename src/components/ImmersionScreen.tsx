'use client'

import { useEffect, useState } from 'react'
import type { Scenario } from '@/types'

interface Props {
  scenario: Scenario
  onEnter: () => void
}

export default function ImmersionScreen({ scenario, onEnter }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const diffBg = scenario.difficulty === 1
    ? 'bg-teal-light border-teal/20'
    : scenario.difficulty === 2
    ? 'bg-amber-light border-amber/20'
    : 'bg-danger-light border-danger/20'

  const diffText = scenario.difficulty === 1
    ? 'text-teal-dark'
    : scenario.difficulty === 2
    ? 'text-amber-dark'
    : 'text-danger-dark'

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center px-6 py-16">
      <div className={`max-w-lg w-full transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Context pill */}
        <div className="flex items-center gap-3 mb-8">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${diffBg} ${diffText}`}>
            {scenario.badge}
          </span>
          <span className="text-xs text-ink-500">{scenario.company} · {scenario.timeContext}</span>
        </div>

        {/* The hook — first-person, present tense */}
        <div className="mb-10">
          <h1 className="text-3xl font-medium text-white leading-tight mb-6 tracking-tight">
            {scenario.headline}
          </h1>
          <p className="text-ink-400 text-base leading-relaxed border-l-2 border-ink-700 pl-4">
            {scenario.immersionHook}
          </p>
        </div>

        {/* What's on your desk */}
        <div className="bg-ink-900 border border-ink-800 rounded-xl p-5 mb-8">
          <div className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-4">
            What's waiting for you
          </div>
          <div className="flex flex-col gap-4">
            {scenario.conflicts.map((c) => (
              <div key={c.title} className="flex items-start gap-3">
                <span className="text-lg shrink-0">{c.icon}</span>
                <div>
                  <div className="text-sm font-medium text-white mb-0.5">{c.title}</div>
                  <div className="text-xs text-ink-500 leading-relaxed">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onEnter}
            className="w-full bg-white text-ink-950 font-medium py-3.5 rounded-xl text-sm hover:bg-ink-100 transition-colors"
          >
            Enter the simulation
          </button>
          <p className="text-center text-xs text-ink-600">
            You'll work through tasks, chat with stakeholders, make a call, and get a PM scorecard.
          </p>
        </div>
      </div>
    </div>
  )
}
