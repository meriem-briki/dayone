'use client'

import { useEffect, useState } from 'react'
import type { Scenario } from '@/types'

interface Props {
  scenario: Scenario
  decisionId: string
  onRestart: () => void
  onNewScenario: () => void
}

export default function ScorecardScreen({ scenario, decisionId, onRestart, onNewScenario }: Props) {
  const d = scenario.decisions.find((x) => x.id === decisionId)!
  const s = d.scores
  const overall = Math.round((s.prioritization + s.stakeholderMgmt + s.riskHandling + s.communication) / 4)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  const skills = [
    { label: 'Prioritization', val: s.prioritization, desc: 'Did you identify what mattered most and act on it?' },
    { label: 'Stakeholder management', val: s.stakeholderMgmt, desc: 'Did you hear the right people and balance their needs?' },
    { label: 'Risk handling', val: s.riskHandling, desc: 'Did you accurately assess and manage the risks?' },
    { label: 'Communication', val: s.communication, desc: 'Would your team have understood your reasoning?' },
  ]

  const grade = overall >= 85 ? 'Strong PM' : overall >= 70 ? 'Solid PM' : overall >= 50 ? 'Developing PM' : 'Needs work'
  const gradeColor = overall >= 85 ? 'text-teal' : overall >= 70 ? 'text-accent' : overall >= 50 ? 'text-amber' : 'text-danger'

  const barColor = (v: number) => v >= 80 ? 'bg-teal' : v >= 60 ? 'bg-accent' : 'bg-danger'

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      <div className="border-b border-ink-100 bg-white px-6 py-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-medium text-sm text-ink-900">DayOne</span>
        <span className="text-ink-300 text-sm">·</span>
        <span className="text-xs text-ink-500">{scenario.company} · PM Scorecard</span>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        {/* Score header */}
        <div className="bg-ink-900 rounded-2xl p-6 text-center">
          <div className="text-xs text-ink-500 mb-3 uppercase tracking-wider">Overall PM score</div>
          <div className="text-6xl font-medium text-white mb-2">{overall}</div>
          <div className={`text-lg font-medium ${gradeColor}`}>{grade}</div>
          <div className="text-xs text-ink-500 mt-2">{scenario.company} · {scenario.badge}</div>
        </div>

        {/* Skill breakdown */}
        <div className="grid grid-cols-2 gap-3">
          {skills.map((sk) => (
            <div key={sk.label} className="bg-white border border-ink-100 rounded-xl p-4">
              <div className="text-xs font-medium text-ink-700 mb-1">{sk.label}</div>
              <div className="text-xs text-ink-400 leading-relaxed mb-3">{sk.desc}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full score-bar ${barColor(sk.val)}`}
                    style={{ width: animated ? `${sk.val}%` : '0%' }}
                  />
                </div>
                <span className="text-xs font-medium text-ink-600 w-6 text-right">{sk.val}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reflection */}
        <div className="bg-accent-light border border-accent-border rounded-xl p-6">
          <div className="text-xs font-medium text-accent uppercase tracking-wider mb-3">What this decision revealed</div>
          <p className="text-sm text-ink-800 leading-relaxed">{d.reflection}</p>
        </div>

        {/* Decision chosen */}
        <div className="bg-white border border-ink-100 rounded-xl p-5">
          <div className="text-xs text-ink-400 mb-2">You chose</div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{d.icon}</span>
            <div>
              <div className="text-sm font-medium text-ink-900">{d.label}</div>
              <div className="text-xs text-ink-400 mt-0.5">{d.desc}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onNewScenario}
            className="w-full bg-ink-900 hover:bg-ink-800 text-white font-medium py-3.5 rounded-xl text-sm transition-colors"
          >
            Try a different scenario
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onRestart}
              className="bg-white border border-ink-100 hover:bg-ink-50 text-ink-700 font-medium py-3 rounded-xl text-sm transition-colors"
            >
              Replay this scenario
            </button>
            <button
              onClick={onRestart}
              className="bg-white border border-ink-100 hover:bg-ink-50 text-ink-700 font-medium py-3 rounded-xl text-sm transition-colors"
            >
              Try different decision
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-ink-400">
          3 scenarios · 4 decisions each · 12 possible outcomes · All based on real PM situations
        </p>
      </div>
    </div>
  )
}
