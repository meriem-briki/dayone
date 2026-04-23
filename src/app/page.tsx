'use client'

import { useState } from 'react'
import type { Step, ScenarioId } from '@/types'
import { SCENARIOS } from '@/data/scenarios'

import LandingScreen    from '@/components/LandingScreen'
import MorningBriefScreen from '@/components/MorningBriefScreen'
import ImmersionScreen  from '@/components/ImmersionScreen'
import TaskScreen       from '@/components/TaskScreen'
import ChatScreen       from '@/components/ChatScreen'
import DecisionScreen   from '@/components/DecisionScreen'
import OutcomeScreen    from '@/components/OutcomeScreen'
import ScorecardScreen  from '@/components/ScorecardScreen'

export default function Page() {
  const [step, setStep]           = useState<Step>('landing')
  const [scenarioId, setScenarioId] = useState<ScenarioId>('normal')
  const [decisionId, setDecisionId] = useState<string>('')
  const [runKey, setRunKey]         = useState(0)

  const scenario = SCENARIOS[scenarioId]

  const selectScenario = (id: ScenarioId) => {
    setScenarioId(id)
    setDecisionId('')
    setRunKey((k) => k + 1)
    setStep('immersion')
  }

  const decide = (id: string) => {
    setDecisionId(id)
    setStep('outcome')
  }

  const restart = () => {
    setRunKey((k) => k + 1)
    setDecisionId('')
    setStep('brief')
  }

  const newScenario = () => {
    setDecisionId('')
    setRunKey((k) => k + 1)
    setStep('landing')
  }

  return (
    <div key={runKey}>
      {step === 'landing'   && <LandingScreen   onStart={() => setStep('brief')} />}
      {step === 'brief'     && <MorningBriefScreen onSelect={selectScenario} />}
      {step === 'immersion' && <ImmersionScreen  scenario={scenario} onEnter={() => setStep('task')} />}
      {step === 'task'      && <TaskScreen       scenario={scenario} onComplete={() => setStep('chat')} />}
      {step === 'chat'      && <ChatScreen       scenario={scenario} onNext={() => setStep('decision')} />}
      {step === 'decision'  && <DecisionScreen   scenario={scenario} onDecide={decide} />}
      {step === 'outcome'   && <OutcomeScreen    scenario={scenario} decisionId={decisionId} onNext={() => setStep('scorecard')} />}
      {step === 'scorecard' && <ScorecardScreen  scenario={scenario} decisionId={decisionId} onRestart={restart} onNewScenario={newScenario} />}
    </div>
  )
}
