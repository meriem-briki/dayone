export type ScenarioId = 'normal' | 'chaos' | 'crisis'
export type Step = 'landing' | 'brief' | 'task' | 'chat' | 'decision' | 'outcome' | 'scorecard'

export interface Conflict {
  icon: string
  title: string
  detail: string
}

export interface Task {
  id: string
  label: string
  description: string
  deliverable: string       // what user needs to think through / "submit"
  placeholder: string       // textarea placeholder
}

export interface Agent {
  id: number
  key: string
  name: string
  role: string
  initials: string
  avatarColor: string       // tailwind bg class
  avatarTextColor: string   // tailwind text class
  mood: 'neutral' | 'tense' | 'urgent'
  systemPrompt: string
}

export interface Decision {
  id: string
  icon: string
  label: string
  desc: string
  risk: 'low' | 'medium' | 'high'
  impact: { revenue: number; morale: number; trust: number }
  consequences: string[]
  scores: { prioritization: number; stakeholderMgmt: number; riskHandling: number; communication: number }
  reflection: string
}

export interface Scenario {
  id: ScenarioId
  difficulty: 1 | 2 | 3
  badge: string
  badgeStyle: string
  company: string
  industry: string
  role: string
  headline: string
  summary: string
  timeContext: string
  immersionHook: string     // first-person opening line shown as "inbox message"
  conflicts: Conflict[]
  tasks: Task[]
  agents: Agent[]
  decisions: Decision[]
  minChatsRequired: number
  skills: string[]
  duration: string
}
