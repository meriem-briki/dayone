'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ScenarioId } from '@/types'
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

function Spinner() {
  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-ink-700 border-t-accent rounded-full animate-spin" />
    </div>
  )
}

export default function Page() {
  const [appStep, setAppStep]       = useState<AppStep | null>(null)
  const [scenarioId, setScenarioId] = useState<ScenarioId>('normal')
  const [decisionId, setDecisionId] = useState('')
  const [runKey, setRunKey]         = useState(0)
  const [user, setUser]             = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // With implicit flow, Supabase puts #access_token= in the URL hash
    // detectSessionInUrl:true (set in createClient) handles this automatically
    // BUT we need to listen for the SIGNED_IN event which fires after it processes the hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('onAuthStateChange:', event, session?.user?.email ?? 'no user')

      if (event === 'SIGNED_IN' && session?.user) {
        // Clear the hash from the URL so it looks clean
        if (window.location.hash) {
          window.history.replaceState({}, '', window.location.pathname)
        }
        setUser(session.user)
        setAppStep('brief')
      }

      if (event === 'SIGNED_OUT') {
        setUser(null)
        setAppStep('landing')
      }

      if (event === 'INITIAL_SESSION') {
        if (session?.user) {
          setUser(session.user)
          setAppStep('brief')
        } else {
          // Check if there's a hash in the URL (OAuth redirect)
          // If yes, keep showing spinner — SIGNED_IN will fire shortly
          if (!window.location.hash.includes('access_token')) {
            setAppStep('landing')
          }
          // If hash has access_token, wait for SIGNED_IN event
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Browser back → morning brief
  useEffect(() => {
    if (appStep && SIM_STEPS.includes(appStep)) {
      window.history.pushState({ dayone: appStep }, '', '/')
    }
  }, [appStep])

  const handlePopState = useCallback(() => {
    setAppStep('brief')
    window.history.pushState({ dayone: 'brief' }, '', '/')
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [handlePopState])

  const selectScenario = (id: ScenarioId) => {
    setScenarioId(id); setDecisionId(''); setRunKey(k => k + 1); setAppStep('immersion')
  }
  const decide = (id: string) => { setDecisionId(id); setAppStep('outcome') }
  const scenario = SCENARIOS[scenarioId]

  if (appStep === null) return <Spinner />

  return (
    <div key={runKey}>
      {appStep === 'landing'   && <LandingScreen      onStart={() => user ? setAppStep('brief') : setAppStep('auth')} />}
      {appStep === 'auth'      && <AuthScreen         onAuth={() => setAppStep('brief')} />}
      {appStep === 'brief'     && <MorningBriefScreen onSelect={selectScenario} />}
      {appStep === 'immersion' && <ImmersionScreen    scenario={scenario} onEnter={() => setAppStep('task')} />}
      {appStep === 'task'      && <TaskScreen         scenario={scenario} onComplete={() => setAppStep('chat')} />}
      {appStep === 'chat'      && <ChatScreen         scenario={scenario} onNext={() => setAppStep('decision')} />}
      {appStep === 'decision'  && <DecisionScreen     scenario={scenario} onDecide={decide} />}
      {appStep === 'outcome'   && <OutcomeScreen      scenario={scenario} decisionId={decisionId} onNext={() => setAppStep('scorecard')} />}
      {appStep === 'scorecard' && <ScorecardScreen    scenario={scenario} decisionId={decisionId}
          onRestart={() => { setRunKey(k=>k+1); setDecisionId(''); setAppStep('brief') }}
          onNewScenario={() => { setRunKey(k=>k+1); setAppStep('brief') }} />}
    </div>
  )
}
