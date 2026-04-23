'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Step, ScenarioId } from '@/types'
import { SCENARIOS } from '@/data/scenarios'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

import LandingScreen      from '@/components/LandingScreen'
import AuthScreen         from '@/components/AuthScreen'
import MorningBriefScreen from '@/components/MorningBriefScreen'
import ImmersionScreen    from '@/components/ImmersionScreen'
import TaskScreen         from '@/components/TaskScreen'
import ChatScreen         from '@/components/ChatScreen'
import DecisionScreen     from '@/components/DecisionScreen'
import OutcomeScreen      from '@/components/OutcomeScreen'
import ScorecardScreen    from '@/components/ScorecardScreen'

type AppStep = 'landing' | 'auth' | 'brief' | 'immersion' | 'task' | 'chat' | 'decision' | 'outcome' | 'scorecard'

const SIM_STEPS: AppStep[] = ['immersion', 'task', 'chat', 'decision', 'outcome', 'scorecard']

export default function Page() {
  const supabase = createClient()

  const [appStep, setAppStep]         = useState<AppStep>('landing')
  const [scenarioId, setScenarioId]   = useState<ScenarioId>('normal')
  const [decisionId, setDecisionId]   = useState<string>('')
  const [runKey, setRunKey]           = useState(0)
  const [user, setUser]               = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  const scenario = SCENARIOS[scenarioId]

  // ── Session check + OAuth return detection ────────────────
  useEffect(() => {
    // Check for OAuth return — Supabase puts tokens in the URL hash
    // We listen to onAuthStateChange which fires immediately after
    // exchangeCodeForSession completes (handled in callback route)
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setAuthChecked(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      // SIGNED_IN fires after Google OAuth completes and we return to /
      // Send the user straight to the morning brief
      if (event === 'SIGNED_IN' && currentUser) {
        setAppStep('brief')
        setAuthChecked(true)
      }

      if (event === 'SIGNED_OUT') {
        setAppStep('landing')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // ── Browser back button ───────────────────────────────────
  useEffect(() => {
    if (SIM_STEPS.includes(appStep)) {
      window.history.pushState({ dayone: appStep }, '', window.location.href)
    }
  }, [appStep])

  const handlePopState = useCallback(() => {
    setAppStep('brief')
    window.history.pushState({ dayone: 'brief' }, '', window.location.href)
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [handlePopState])

  // ── Handlers ──────────────────────────────────────────────
  const handleLandingStart = () => {
    if (user) setAppStep('brief')
    else setAppStep('auth')
  }

  const selectScenario = (id: ScenarioId) => {
    setScenarioId(id)
    setDecisionId('')
    setRunKey((k) => k + 1)
    setAppStep('immersion')
  }

  const decide = (id: string) => {
    setDecisionId(id)
    setAppStep('outcome')
  }

  const restart = () => {
    setRunKey((k) => k + 1)
    setDecisionId('')
    setAppStep('brief')
  }

  // ── Loading ───────────────────────────────────────────────
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-ink-700 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div key={runKey}>
      {appStep === 'landing'   && <LandingScreen      onStart={handleLandingStart} />}
      {appStep === 'auth'      && <AuthScreen         onAuth={() => setAppStep('brief')} />}
      {appStep === 'brief'     && <MorningBriefScreen onSelect={selectScenario} />}
      {appStep === 'immersion' && <ImmersionScreen    scenario={scenario} onEnter={() => setAppStep('task')} />}
      {appStep === 'task'      && <TaskScreen         scenario={scenario} onComplete={() => setAppStep('chat')} />}
      {appStep === 'chat'      && <ChatScreen         scenario={scenario} onNext={() => setAppStep('decision')} />}
      {appStep === 'decision'  && <DecisionScreen     scenario={scenario} onDecide={decide} />}
      {appStep === 'outcome'   && <OutcomeScreen      scenario={scenario} decisionId={decisionId} onNext={() => setAppStep('scorecard')} />}
      {appStep === 'scorecard' && <ScorecardScreen    scenario={scenario} decisionId={decisionId} onRestart={restart} onNewScenario={() => { setRunKey(k => k+1); setAppStep('brief') }} />}
    </div>
  )
}
