'use client'

import { useState } from 'react'
import type { Scenario } from '@/types'

interface Props {
  scenario: Scenario
  onComplete: () => void
}

export default function TaskScreen({ scenario, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [activeTask, setActiveTask] = useState(0)
  const [submitted, setSubmitted] = useState<Set<string>>(new Set())

  const task = scenario.tasks[activeTask]
  const completedCount = submitted.size
  const allDone = completedCount === scenario.tasks.length

  const submitTask = () => {
    if (!answers[task.id]?.trim()) return
    setSubmitted((prev) => new Set([...prev, task.id]))
    if (activeTask < scenario.tasks.length - 1) {
      setTimeout(() => setActiveTask((i) => i + 1), 200)
    }
  }

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      {/* Top bar */}
      <div className="border-b border-ink-100 bg-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-medium text-sm text-ink-900">DayOne</span>
          <span className="text-ink-300 text-sm">·</span>
          <span className="text-xs text-ink-500">{scenario.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-ink-400">{completedCount} / {scenario.tasks.length} tasks</div>
          <div className="w-16 h-1 bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${(completedCount / scenario.tasks.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        {/* Context */}
        <div className="bg-white border border-ink-100 rounded-xl p-5">
          <div className="text-xs text-ink-400 mb-1">{scenario.timeContext} · {scenario.company}</div>
          <p className="text-sm text-ink-700 leading-relaxed font-medium">{scenario.headline}</p>
        </div>

        {/* Task tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {scenario.tasks.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTask(i)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                activeTask === i
                  ? 'bg-accent text-white border-accent'
                  : submitted.has(t.id)
                  ? 'bg-teal-light text-teal-dark border-teal/20'
                  : 'bg-white text-ink-600 border-ink-100 hover:border-ink-200'
              }`}
            >
              {submitted.has(t.id) ? (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">{i + 1}</span>
              )}
              {t.label}
            </button>
          ))}
        </div>

        {/* Active task */}
        <div className="bg-white border border-ink-100 rounded-xl p-6 flex flex-col gap-4 animate-fade-up" key={task.id}>
          <div>
            <div className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-2">
              Task {activeTask + 1} of {scenario.tasks.length}
            </div>
            <h2 className="text-base font-medium text-ink-900 mb-2">{task.label}</h2>
            <p className="text-sm text-ink-600 leading-relaxed">{task.description}</p>
          </div>

          {/* Deliverable prompt */}
          <div className="bg-accent-light border border-accent-border rounded-lg p-4">
            <div className="text-xs font-medium text-accent mb-1">Your deliverable</div>
            <p className="text-xs text-accent leading-relaxed">{task.deliverable}</p>
          </div>

          {/* Answer area */}
          {submitted.has(task.id) ? (
            <div className="bg-teal-light border border-teal/20 rounded-lg p-4">
              <div className="text-xs font-medium text-teal-dark mb-1">Submitted</div>
              <p className="text-sm text-teal-dark leading-relaxed whitespace-pre-wrap">{answers[task.id]}</p>
            </div>
          ) : (
            <>
              <textarea
                value={answers[task.id] || ''}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [task.id]: e.target.value }))}
                placeholder={task.placeholder}
                rows={5}
                className="w-full border border-ink-100 rounded-lg px-4 py-3 text-sm text-ink-800 placeholder-ink-300 focus:outline-none focus:border-accent/50 resize-none bg-white leading-relaxed"
              />
              <button
                onClick={submitTask}
                disabled={!answers[task.id]?.trim()}
                className="self-start bg-accent hover:bg-accent-hover disabled:bg-ink-100 disabled:text-ink-300 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                {activeTask < scenario.tasks.length - 1 ? 'Submit & continue →' : 'Submit task'}
              </button>
            </>
          )}
        </div>

        {/* Continue to chat */}
        {allDone && (
          <div className="bg-ink-900 rounded-xl p-6 text-center animate-fade-up">
            <div className="text-white font-medium mb-1">Tasks complete</div>
            <p className="text-ink-400 text-sm mb-4">
              Now talk to your stakeholders. They each know something you don't.
            </p>
            <button
              onClick={onComplete}
              className="bg-white text-ink-950 font-medium px-8 py-3 rounded-xl text-sm hover:bg-ink-100 transition-colors"
            >
              Open stakeholder chats →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
