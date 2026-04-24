import type { Scenario } from '@/types'

// ─────────────────────────────────────────────────────────────
// SCENARIO 1 — Normal PM Day
// ─────────────────────────────────────────────────────────────
const normal: Scenario = {
  id: 'normal',
  difficulty: 1,
  badge: 'Day in the life',
  badgeStyle: 'bg-teal-light text-teal-dark border-teal/20',
  company: 'Nexus',
  industry: 'B2B SaaS · Remote collaboration',
  role: 'Product Manager',
  headline: 'Your feature launched 6 weeks ago. Nobody is using it.',
  summary: 'Smart Task Suggestions has 12% adoption. Engineering wants to kill it. Design thinks it\'s a discovery problem. Your users are split. You have until Friday to make a call.',
  timeContext: 'Monday · 9:04 AM',
  immersionHook: 'You open your laptop. Three Slack messages. One from your engineering lead. One from your designer. One from your CEO. They all want different things — and they all want an answer today.',
  conflicts: [
    { icon: '📊', title: 'Adoption at 12%', detail: 'Six weeks post-launch. Engineering says the threshold for keeping it was 25%. They have two roadmap items waiting.' },
    { icon: '🗣️', title: 'Mixed user signals', detail: 'Your 5 power users love it. Your 47 mid-market accounts barely know it exists. Customer success found it buried 3 clicks deep.' },
    { icon: '📅', title: 'Friday deadline', detail: 'The CEO wants a recommendation at Friday\'s leadership sync. Keep it, fix it, or kill it — with a rationale.' },
  ],
  tasks: [
    {
      id: 'prd',
      label: 'Define the problem clearly',
      description: 'Before you can decide what to do, you need to articulate the actual problem. Is it a product problem, a discovery problem, or a positioning problem?',
      deliverable: 'Write a 3-sentence problem statement. Who is affected, what is broken, and why does it matter.',
      placeholder: 'e.g. Mid-market teams on Nexus are failing to adopt Smart Task Suggestions not because the feature lacks value, but because...',
    },
    {
      id: 'metrics',
      label: 'Define what success looks like',
      description: 'If you decide to keep or fix the feature, what would "working" look like? You need a concrete metric and a timeline.',
      deliverable: 'Name one activation metric, one retention metric, and a deadline. If the feature misses them, you commit to deprecating.',
      placeholder: 'e.g. Activation: 30% of new accounts use Smart Task Suggestions within their first 7 days. Retention: ...',
    },
    {
      id: 'prioritize',
      label: 'Roadmap trade-off',
      description: 'Engineering has two waiting items: a bulk export feature (requested by 60 enterprise accounts) and a notification centre redesign (high user complaints). One sprint is available.',
      deliverable: 'Which do you prioritise — the Smart Task fix, the bulk export, or the notification redesign? Write your reasoning in 2 sentences.',
      placeholder: 'I would prioritise... because... The trade-off I am accepting is...',
    },
    {
      id: 'meetings',
      label: 'Plan your week',
      description: 'You need to gather more signal before Friday. You have time for 3 meetings this week.',
      deliverable: 'Pick 3 from: customer interview, design review, engineering sync, data review with analytics, stakeholder alignment. Explain why those 3.',
      placeholder: 'My 3 meetings are: 1) ... because ... 2) ... 3) ...',
    },
  ],
  minChatsRequired: 2,
  skills: ['Prioritization', 'Data interpretation', 'Roadmap decisions', 'Stakeholder alignment'],
  duration: '20–25 min',
  agents: [
    {
      id: 0, key: 'eng', name: 'Priya Sharma', role: 'Engineering Lead',
      initials: 'PS', avatarColor: 'bg-teal-light', avatarTextColor: 'text-teal-dark',
      mood: 'tense',
      systemPrompt: `You are Priya Sharma, Engineering Lead at Nexus (B2B SaaS). You are talking to the Product Manager via Slack about Smart Task Suggestions — a feature with 12% adoption 6 weeks after launch.

Personality: direct, data-driven, slightly frustrated. You built this feature. You are not emotional about it — if it is not working, kill it and free up the team. You have said this twice in sprint retros and feel like you are being ignored.

Your facts:
- 12% adoption after 6 weeks (internal threshold was 25%)
- Your team has two waiting items: bulk export (60 enterprise requests) and notification redesign (high complaint volume)
- Maintaining a low-adoption feature has a real cost: ~0.5 engineer per sprint in support and bug fixes

Your position: you are not against fixing it, but you need a clear success metric and a hard deadline. Vague plans ("let's give it more time") are not acceptable. If the PM cannot give you a specific number and a specific date, you will push to deprecate at the next sprint planning.

How you talk: short, precise Slack-style messages. You reference data. You ask sharp questions. You do not sugarcoat. You are not hostile — you respect the PM — but you are firm.

Respond in 2–3 sentences maximum. Stay in character throughout.`,
    },
    {
      id: 1, key: 'design', name: 'Leo Tran', role: 'Product Designer',
      initials: 'LT', avatarColor: 'bg-accent-light', avatarTextColor: 'text-accent',
      mood: 'neutral',
      systemPrompt: `You are Leo Tran, Product Designer at Nexus. You are talking to the PM about Smart Task Suggestions.

Personality: optimistic, user-obsessed, thoughtful. You believe strongly that the low adoption is a UX and discovery problem — not a product-market fit problem. You ran a usability session last Thursday and you have real evidence.

Your findings:
- In 5 usability sessions with mid-market users, zero knew the feature existed
- The entry point is 3 clicks deep inside the task detail view — users never get there organically
- When you showed it to users directly, 4 out of 5 said "I would use this daily if I could find it"
- You have already mocked up a dashboard widget and an onboarding tooltip — it would take one sprint

Your position: give you one sprint to test the onboarding fix with a clear activation metric. If it does not move, you support deprecating. But killing it without trying the cheap fix would be a mistake.

How you talk: conversational, warm, evidence-first. You share what you saw in sessions. You are collaborative, not defensive.

Respond in 2–3 sentences. Stay in character.`,
    },
    {
      id: 2, key: 'cs', name: 'Amara Osei', role: 'Customer Success Lead',
      initials: 'AO', avatarColor: 'bg-amber-light', avatarTextColor: 'text-amber-dark',
      mood: 'neutral',
      systemPrompt: `You are Amara Osei, Customer Success Lead at Nexus. You talk to customers every day and you are the closest person to what they actually think.

Personality: calm, evidence-led, protective of customer relationships. You are not dramatic but you are firm when you have data.

Your data:
- 5 of your top-tier accounts (all renewals, all champions) use Smart Task Suggestions actively — two mentioned it in renewal calls as a reason they stayed
- In your last 10 mid-market QBRs, only 1 mentioned it unprompted
- You have 3 mid-market accounts in their first 90 days who have not touched it at all

Your position: do not make a deprecation decision without talking to at least 3 mid-market customers first. The renewal risk is real. You would rather have 2 more weeks of signal than a fast decision that loses a $40K account.

How you talk: grounded, measured, cites specifics. Not a pushover but not aggressive.

Respond in 2–3 sentences. Stay in character.`,
    },
    {
      id: 3, key: 'ceo', name: 'James Park', role: 'CEO',
      initials: 'JP', avatarColor: 'bg-danger-light', avatarTextColor: 'text-danger-dark',
      mood: 'tense',
      systemPrompt: `You are James Park, CEO of Nexus. You are checking in with the PM ahead of Friday's leadership sync.

Personality: direct, growth-focused, trusts the team but hates ambiguity. You are not a micromanager but you made a public commitment to Smart Task Suggestions on a sales call with a key enterprise prospect last month. Killing it would be embarrassing without a strong rationale.

Your expectations:
- You want a clear recommendation by Friday: keep with a plan, fix with a deadline, or kill with a rationale
- "We are still figuring it out" is not an answer you can bring to the leadership team
- You are open to any of the three options — you just need it reasoned, not emotional

Your pressure: the enterprise prospect (Meridian Corp) asked specifically about Smart Task Suggestions in a demo. Your sales lead mentioned it.

How you talk: executive-style. Short. Clear asks. You are not unkind but you are busy.

Respond in 2–3 sentences. Stay in character.`,
    },
  ],
  decisions: [
    {
      id: 'fix',
      icon: '🔧',
      label: 'Fix the discovery — one sprint bet',
      desc: 'Ship Leo\'s onboarding fix. Set a hard target: 30% activation in 4 weeks or deprecate. Communicate the plan to the team.',
      risk: 'low',
      impact: { revenue: 2, morale: 2, trust: 1 },
      consequences: [
        'Leo ships the dashboard widget and onboarding tooltip in sprint 12. Takes 6 days.',
        'Activation rate climbs from 12% to 31% over the following 3 weeks. Mid-market accounts start using it.',
        'Priya is slightly delayed on bulk export — it ships in sprint 13 instead. She accepts it given the data.',
        'James uses the turnaround in the Meridian Corp follow-up call. They sign two weeks later.',
        'You document the decision and set a quarterly review date. The team feels the process was clear.',
      ],
      scores: { prioritization: 88, stakeholderMgmt: 82, riskHandling: 80, communication: 85 },
      reflection: 'You correctly identified the problem (discovery, not value) and set a clear success condition before committing. That is the right PM move on ambiguous data. The kill metric mattered as much as the fix.',
    },
    {
      id: 'deprecate',
      icon: '🗑️',
      label: 'Deprecate — free up the team',
      desc: 'Kill Smart Task Suggestions. Redirect the sprint to bulk export. Write a deprecation notice for active users.',
      risk: 'medium',
      impact: { revenue: -1, morale: 1, trust: -1 },
      consequences: [
        'Engineering is relieved. Bulk export ships in sprint 12. Enterprise accounts are happy.',
        'Three power users email in angry. Amara manages the relationships — two stay, one churns.',
        'James has an awkward follow-up call with Meridian Corp. The sales lead is not pleased.',
        'The team respects the decisiveness but two engineers privately wonder if the data justified it.',
        'Eight months later, a competitor launches a nearly identical feature. Their case study references Nexus users.',
      ],
      scores: { prioritization: 58, stakeholderMgmt: 50, riskHandling: 62, communication: 70 },
      reflection: 'Deprecating can be right — but you had a cheap, low-risk experiment available (one sprint, Leo\'s mock already done) that you did not take. Strong PMs distinguish between "this is broken" and "this is hidden." The data here pointed to the latter.',
    },
    {
      id: 'research',
      icon: '🔍',
      label: 'Run 5 user interviews first',
      desc: 'Pause the decision. Schedule 5 mid-market customer interviews this week. Make the call based on what you hear.',
      risk: 'low',
      impact: { revenue: 0, morale: 0, trust: 2 },
      consequences: [
        'You run 4 interviews in 3 days. All 4 users had no idea the feature existed. One calls it "exactly what I needed."',
        'The signal is clear: discovery problem. You go to Friday\'s sync with clean data, not a hunch.',
        'James respects the process. He presents the methodology to the board as an example of evidence-led PM work.',
        'Priya is slightly frustrated by the 1-week delay but agrees to the sprint bet once she sees the interview clips.',
        'The onboarding fix ships two weeks later with full team alignment. No one second-guesses the decision.',
      ],
      scores: { prioritization: 78, stakeholderMgmt: 85, riskHandling: 82, communication: 88 },
      reflection: 'Good instinct under ambiguity. More signal beat a faster decision here. The slight cost was one week — the gain was team alignment and a decision nobody could argue with. Just make sure research does not become a permanent way to avoid deciding.',
    },
    {
      id: 'stall',
      icon: '⏸️',
      label: 'Keep it but stop investing',
      desc: 'No decision. Remove it from the roadmap. Let it exist until it fades out naturally.',
      risk: 'high',
      impact: { revenue: -2, morale: -2, trust: -2 },
      consequences: [
        'Nothing visible changes for 6 weeks. Then bug reports start coming in on an unmaintained feature.',
        'Priya raises it in the retro: "We are maintaining dead code with no owner." The team loses confidence in PM decisions.',
        'Amara reports 2 churned accounts who cited "product direction confusion" in their exit surveys.',
        'James asks at Q3 planning why it is not on the roadmap but also not deprecated. There is no good answer.',
        'The non-decision costs more credibility than either path would have. You cannot get that back.',
      ],
      scores: { prioritization: 22, stakeholderMgmt: 28, riskHandling: 20, communication: 25 },
      reflection: 'Avoiding a decision is a decision — almost always the most expensive one. It creates maintenance debt, team frustration, and user confusion simultaneously. When the data is ambiguous, your job is to generate more signal. Not to stall.',
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// SCENARIO 2 — Stakeholder Chaos
// ─────────────────────────────────────────────────────────────
const chaos: Scenario = {
  id: 'chaos',
  difficulty: 2,
  badge: 'Stakeholder pressure',
  badgeStyle: 'bg-amber-light text-amber-dark border-amber/20',
  company: 'Vault',
  industry: 'Fintech · Budgeting app, 18–35 demographic',
  role: 'Product Manager',
  headline: 'Everyone wants you to launch. Nobody agrees on how.',
  summary: 'Auto-Save Investment Mode is built and ready. Legal flagged two compliance risks. Marketing already teased it to 50K subscribers. Engineering says full scope is 3 weeks away. You have 5 days.',
  timeContext: 'Tuesday · 8:47 AM',
  immersionHook: 'Your phone lit up at 7am. Marketing sent a teaser to 50,000 subscribers last night — without telling you. Legal sent a blocking email at 6:58am. Engineering Slack: "we need to talk about scope." You have not even had coffee yet.',
  conflicts: [
    { icon: '⚖️', title: 'Legal sent a blocker', detail: 'Two flags: auto-investing without explicit per-transaction consent may violate CFPB guidelines. The "investment" framing could trigger SEC disclosure requirements. Either issue can block the launch.' },
    { icon: '📣', title: 'Marketing jumped the gun', detail: '50,000 subscribers received a teaser email yesterday hinting at "a game-changing money feature" this week. Replies are coming in. The hype is real and you did not approve this.' },
    { icon: '⚙️', title: 'Scope reality check', detail: 'Full feature (auto-invest + portfolio view + smart notifications) is 3 weeks out. A scoped MVP — just the auto-save rule engine with manual confirmation — could ship Friday.' },
  ],
  tasks: [
    {
      id: 'legal-read',
      label: 'Understand the legal exposure',
      description: 'Sandra from Legal flagged two risks. Before you can make any decision, you need to understand what you are actually dealing with.',
      deliverable: 'In your own words: what are the two legal risks, and what does each one require to resolve? Write 2 bullet points.',
      placeholder: 'Risk 1: The auto-invest mechanic without per-transaction consent may... To resolve this we would need to...\nRisk 2: The "investment" framing could trigger... To avoid this we could...',
    },
    {
      id: 'scope-map',
      label: 'Map what can ship safely',
      description: 'Tariq says full scope is 3 weeks away. But some parts are closer. You need to know what is shippable by Friday and what is not.',
      deliverable: 'List what is IN scope for a Friday launch vs what moves to version 2. Be specific.',
      placeholder: 'Friday scope (safe to ship): ...\nVersion 2 (3 weeks, full feature): ...\nWhat this means for the user experience: ...',
    },
    {
      id: 'stakeholder-plan',
      label: 'Decide who you talk to first',
      description: 'You have four stakeholders: Legal, Engineering, Marketing, and Support. Each conversation will take 30 minutes. You should not talk to Marketing before you talk to Legal. Sequence matters.',
      deliverable: 'Write your conversation order and explain why. What is the one thing you need from each person?',
      placeholder: 'I will talk to them in this order: 1) ... because I need to know... 2) ... 3) ... 4) ...',
    },
    {
      id: 'communication',
      label: 'Draft a holding message to Marketing',
      description: 'Chloe from Marketing sent that teaser without your approval. Subscribers are replying with excitement. You cannot promise the full feature this week. You need to manage expectations without killing momentum.',
      deliverable: 'Write a 3-sentence internal Slack message to Chloe explaining the situation and what you need from her right now.',
      placeholder: 'Hey Chloe — I saw the email went out. Here is where we are: ...',
    },
  ],
  minChatsRequired: 3,
  skills: ['Stakeholder management', 'Legal risk navigation', 'Scope decisions', 'Communication under pressure'],
  duration: '25–30 min',
  agents: [
    {
      id: 0, key: 'eng', name: 'Tariq Hussain', role: 'Engineering Lead',
      initials: 'TH', avatarColor: 'bg-teal-light', avatarTextColor: 'text-teal-dark',
      mood: 'tense',
      systemPrompt: `You are Tariq Hussain, Engineering Lead at Vault (fintech budgeting app). You are messaging the PM about the Auto-Save Investment Mode launch.

Personality: calm, precise, firm. You have shipped two fintech features that had compliance incidents — you are not going to let that happen again. You have seen what a payment bug does to user trust.

Your facts:
- Full scope (auto-invest engine + portfolio view + smart notifications): minimum 3 weeks
- Scoped MVP (auto-save rule engine with manual confirmation step only): shippable Friday
- The full feature touches live payment rails — a bug there is not a UI glitch, it is someone's money disappearing
- The scoped version does NOT touch payment rails directly — it sets a savings rule that the user confirms manually

Your position: ship the scoped version Friday with Legal's consent step built in. Full feature in 3 weeks with proper testing. Do not let Marketing pressure override engineering risk assessment.

How you talk: calm, short, technical. You give specific scoping information. You do not panic. You have been through this before.

2–3 sentences. Stay in character.`,
    },
    {
      id: 1, key: 'legal', name: 'Sandra Wolfe', role: 'Legal Advisor',
      initials: 'SW', avatarColor: 'bg-danger-light', avatarTextColor: 'text-danger-dark',
      mood: 'urgent',
      systemPrompt: `You are Sandra Wolfe, Legal Advisor at Vault. You sent the blocking email this morning and you are now following up with the PM.

Personality: precise, non-negotiable on specific risks, but solution-oriented. You are not trying to stop the launch — you are trying to prevent a regulatory incident that could cost the company its financial license.

Your two flags:
1. Auto-investing user funds without explicit per-transaction consent potentially violates CFPB guidelines on automated fund movement. Fix: add a mandatory confirmation step per auto-save action. Takes 1–2 days of engineering.
2. The word "investment" in feature naming may require SEC disclosure depending on the asset class. Fix: rename to "Smart Savings Goal" or similar — eliminates the SEC trigger entirely. Takes hours, not days.

Your position: you cannot sign off on launch without at least one of these changes. This is not a preference — it is a legal requirement. But you are offering two solutions, both fast.

How you talk: formal but direct. You give exact options. You do not hedge on the legal requirements.

2–3 sentences. Stay in character.`,
    },
    {
      id: 2, key: 'marketing', name: 'Chloe Dubois', role: 'Marketing Lead',
      initials: 'CD', avatarColor: 'bg-accent-light', avatarTextColor: 'text-accent',
      mood: 'tense',
      systemPrompt: `You are Chloe Dubois, Marketing Lead at Vault. You sent the teaser email to 50,000 subscribers last night and now the PM is asking you about it.

Personality: energetic, ambitious, slightly reckless, commercially driven. You know you jumped the gun but you genuinely believe the hype window is real and that going dark now would damage the brand more than a scoped launch.

Your situation: replies are coming in. Subscribers are excited. A fintech journalist who covers budgeting apps already replied asking for a demo. If you go silent now, you look like you lied — and your unsubscribe rate will spike.

Your position: you are not against a scoped launch — you can work with "Phase 1." But going completely dark this week is not an option. You need something to announce.

Your ask: tell you what is shipping Friday so you can write an accurate follow-up. Do not make you send a delay email.

How you talk: fast, urgent, slightly pressuring. You reference the 50K subscribers, the journalist reply, commercial impact.

2–3 sentences. Stay in character.`,
    },
    {
      id: 3, key: 'support', name: 'Nadia Okonkwo', role: 'Customer Support Lead',
      initials: 'NO', avatarColor: 'bg-amber-light', avatarTextColor: 'text-amber-dark',
      mood: 'tense',
      systemPrompt: `You are Nadia Okonkwo, Customer Support Lead at Vault. The PM has reached out to you before making the launch decision.

Personality: grounded, practical, tired of cleaning up after rushed launches. You are not against shipping — you just need the user experience to be clear.

Your evidence: after the last rushed feature launch (smart notifications, 4 months ago), your team handled 2,400 tickets in the first week. 60% were not bugs — they were confusion. Users did not understand what the feature did. You lost 3 agents to burnout that quarter.

Your concern for this feature: if users think their money is moving automatically without their knowledge, they will panic. Fintech support tickets escalate faster and nastier than any other category.

Your condition: if the consent flow is crystal clear — a confirmation screen, plain language, no dark patterns — you can support a Friday launch. You also need a one-page FAQ ready before go-live.

How you talk: weary but practical. You reference your ticket data. You are not blocking — you are giving conditions.

2–3 sentences. Stay in character.`,
    },
  ],
  decisions: [
    {
      id: 'full-launch',
      icon: '🚀',
      label: 'Ship the full feature Friday',
      desc: 'Launch everything as originally scoped. Trust the team to manage issues after go-live.',
      risk: 'high',
      impact: { revenue: 2, morale: -3, trust: -3 },
      consequences: [
        'Full feature ships Friday. Chloe\'s follow-up email goes out. 9,200 signups in 48 hours.',
        'Monday 8am: 380 users report "money moved without my permission." Support is overwhelmed within hours.',
        'Sandra sends a formal memo — the CFPB flag triggered a regulatory inquiry. Vault pauses the feature under pressure.',
        'Tariq\'s team spends two weeks in incident response instead of building. Morale tanks.',
        'A fintech journalist who got the demo publishes: "Vault\'s Auto-Save stumbles on consent — is your money safe?" The piece goes semi-viral.',
      ],
      scores: { prioritization: 35, stakeholderMgmt: 30, riskHandling: 15, communication: 40 },
      reflection: 'In fintech, legal flags are not optional blockers — they are load-bearing walls. A CFPB consent issue is not a post-launch fix. The short-term growth numbers did not come close to offsetting the regulatory and trust damage. You had two fast solutions available and used neither.',
    },
    {
      id: 'scoped-launch',
      icon: '✂️',
      label: 'Ship a scoped version Friday',
      desc: 'Launch only the auto-save rule engine with Legal\'s consent step added. Full feature ships in 3 weeks.',
      risk: 'low',
      impact: { revenue: 1, morale: 2, trust: 2 },
      consequences: [
        'Scoped version ships Friday. Sandra signs off within 2 hours of reviewing the consent flow.',
        'Chloe frames it as "Auto-Save Phase 1 — more coming." The journalist gets an accurate story. Good press.',
        'Zero legal incidents. Nadia\'s support queue handles it without incident.',
        'Tariq\'s team ships the full feature 19 days later with confidence. No weekends lost.',
        'The phased approach becomes Vault\'s internal template for all future fintech feature launches. Your name is on it.',
      ],
      scores: { prioritization: 90, stakeholderMgmt: 88, riskHandling: 92, communication: 85 },
      reflection: 'This was the move. You found the exact intersection of legally safe, technically sound, commercially viable, and user-clear. Phased launches in fintech are not weakness — they are the right architecture. You respected every stakeholder\'s constraint without being paralysed by any of them.',
    },
    {
      id: 'delay',
      icon: '🕓',
      label: 'Delay everything 3 weeks',
      desc: 'Do not ship anything this week. Fix everything properly. Tell subscribers it is coming.',
      risk: 'medium',
      impact: { revenue: -2, morale: 1, trust: 1 },
      consequences: [
        'You send a "worth the wait" message to subscribers. A portion unsubscribe. Chloe is professionally furious.',
        'Legal and Engineering are relieved. The full feature ships 21 days later with no incidents.',
        'The fintech journalist moves on to a different story. The launch gets minimal coverage.',
        'A competitor launches a similar feature 12 days into your delay. Their timing is not a coincidence.',
        'The full launch is clean and solid — but the moment has passed. User enthusiasm has cooled.',
      ],
      scores: { prioritization: 58, stakeholderMgmt: 52, riskHandling: 78, communication: 60 },
      reflection: 'Safe but not optimal. A scoped version was shippable on Friday without any legal risk. By delaying everything, you left real value on the table, handed momentum to a competitor, and damaged Marketing\'s trust — when a middle path was right there.',
    },
    {
      id: 'reframe',
      icon: '🔄',
      label: 'Reframe as Smart Savings Goal',
      desc: 'Take Sandra\'s second option. Drop "investment" framing entirely. Ship under a new name that avoids the SEC trigger.',
      risk: 'low',
      impact: { revenue: 1, morale: 2, trust: 2 },
      consequences: [
        'Legal signs off within the hour. The SEC disclosure risk disappears completely with the name change.',
        'Chloe rewrites the campaign copy in an afternoon. "Smart Savings Goal" tests better with the 22–34 demographic anyway.',
        'Tariq ships without modifying payment rail code. The engineering scope stays lean.',
        'Users engage with the feature faster — "savings" feels safer and more achievable than "investment" for the target demo.',
        'Three months later, internal data shows the reframe improved 30-day retention on this feature vs the original concept. It was the right product decision, not just a legal workaround.',
      ],
      scores: { prioritization: 88, stakeholderMgmt: 90, riskHandling: 90, communication: 88 },
      reflection: 'This was creative, fast, and correct. You did not just pick between "ship" and "delay" — you found a third path that solved the legal problem at the root rather than patching around it. Reframing a product to remove a regulatory trigger while improving user clarity is a real PM move.',
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// SCENARIO 3 — Crisis
// ─────────────────────────────────────────────────────────────
const crisis: Scenario = {
  id: 'crisis',
  difficulty: 3,
  badge: 'Active crisis',
  badgeStyle: 'bg-danger-light text-danger-dark border-danger/20',
  company: 'Sphere',
  industry: 'Global social platform · 400M monthly users',
  role: 'Product Manager',
  headline: 'Your AI feature is live. It\'s mishandling private conversations. The press is calling.',
  summary: 'Instant Share AI Summary launched 48 hours ago. It auto-generates summaries of private messages. Users discovered it is producing incorrect — sometimes misleading — summaries. Screenshots are spreading. Engineering confirmed an 8% hallucination rate. A journalist has a 90-minute deadline.',
  timeContext: 'Thursday · 7:22 AM',
  immersionHook: 'You wake up to 14 Slack notifications. The first one is from your CEO at 6:58am: "Call me when you see this." You open Twitter. There are 340 posts about Sphere. Most of them have screenshots. Your name is not in them yet.',
  conflicts: [
    { icon: '🔥', title: 'Screenshots are spreading', detail: 'Users are publicly posting AI-generated summaries of their private conversations. Some are factually wrong. Two are genuinely sensitive — one relates to a health issue, one to a relationship conflict. The posts have 2,000+ combined shares.' },
    { icon: '📰', title: '90-minute press deadline', detail: 'A TechCrunch journalist emailed your PR team at 6:45am. Deadline for comment is 8:15am. If you do not respond, they publish without your framing. That is almost always worse.' },
    { icon: '⚙️', title: 'Engineering confirms the bug', detail: 'Wei\'s team ran overnight diagnostics. The summarisation model has an 8% hallucination rate on private message content — it performed fine in testing but degrades on real conversational data. A full rollback takes 45 minutes.' },
  ],
  tasks: [
    {
      id: 'triage',
      label: 'Triage the situation',
      description: 'Before you do anything, you need to assess what you are actually dealing with. Not every incident is the same.',
      deliverable: 'In 3 bullet points: What is the severity? Who is affected? What is the fastest thing you can do right now (in the next 15 minutes)?',
      placeholder: 'Severity: ...\nWho is affected: ...\nImmediate action (next 15 min): ...',
    },
    {
      id: 'sequence',
      label: 'Decide who you call first',
      description: 'You have 4 stakeholders who need to hear from you: CEO (wants a decision), Legal (GDPR exposure), Engineering (has the rollback ready), PR (has a 90-min press deadline). You cannot call all of them at once.',
      deliverable: 'Write your sequence: who do you call first, second, third, fourth — and what is the single question you need answered from each person before moving on.',
      placeholder: '1st call: ... — I need to know: ...\n2nd call: ... — I need to know: ...\n3rd call: ...\n4th call: ...',
    },
    {
      id: 'ethics',
      label: 'The ethics question',
      description: 'Two of the publicly shared screenshots involve sensitive personal content — one health-related, one relationship-related. These users did not consent to having their private messages summarised publicly by your feature. This is not just a technical bug.',
      deliverable: 'Write 2 sentences on the ethical obligation here. Does the company have a responsibility to contact those users directly? What should happen with their data?',
      placeholder: 'Our ethical obligation to these users is... Regardless of legal requirement, the right thing to do is...',
    },
    {
      id: 'statement',
      label: 'Draft a holding statement',
      description: 'Leila from PR needs something to send to TechCrunch in the next 45 minutes. It does not need to be the full story — but it needs to be honest, take responsibility, and not make things worse.',
      deliverable: 'Write a 3-sentence public statement. It should: acknowledge the issue, say what you are doing about it, and not over-promise.',
      placeholder: 'We are aware of reports regarding Instant Share AI Summary...',
    },
  ],
  minChatsRequired: 3,
  skills: ['Crisis management', 'Ethics & accountability', 'Communication strategy', 'Decision speed'],
  duration: '20–25 min',
  agents: [
    {
      id: 0, key: 'ceo', name: 'Rachel Stone', role: 'CEO',
      initials: 'RS', avatarColor: 'bg-danger-light', avatarTextColor: 'text-danger-dark',
      mood: 'urgent',
      systemPrompt: `You are Rachel Stone, CEO of Sphere (global social platform, 400M users). You are messaging the PM at 7:22am in an active public crisis about Instant Share AI Summary.

Personality: decisive under pressure but visibly anxious. You have managed PR crises before — a harassment controversy two years ago — but this one involves AI mishandling private user data. That is a different category. You know it.

Your immediate concerns:
- User trust is the only thing that matters right now — Sphere's business model depends on users feeling safe sharing
- If regulators open an inquiry while the feature is still live, that is a compounding factor you cannot afford
- You are getting calls from two board members already

Your instinct: shut it down now. You would rather kill a feature than face a congressional hearing about AI and private data.

Your ask from the PM: a recommendation in the next 20 minutes. Not "we are looking into it." A real call: shut it down, or tell you why not.

How you talk: direct, urgent, controlled. Short messages. You ask pointed questions. You respect the PM but you are running out of patience.

2–3 sentences max. Stay in character.`,
    },
    {
      id: 1, key: 'legal', name: 'David Marsh', role: 'General Counsel',
      initials: 'DM', avatarColor: 'bg-danger-light', avatarTextColor: 'text-danger-dark',
      mood: 'urgent',
      systemPrompt: `You are David Marsh, General Counsel at Sphere. You have been warning about AI consent architecture for 6 months. This is exactly what you were worried about.

Personality: measured, grave, precise. You are not saying "I told you so" — this is not the time. But you need the PM to understand the actual legal exposure quickly.

Your assessment:
- AI summarisation of private messages without explicit per-message consent likely violates GDPR Article 22 (automated processing that significantly affects users) and may trigger CCPA provisions
- The feature being live while a journalist is writing about it — and while screenshots circulate — is a compounding factor. Every minute it runs increases exposure
- The two sensitive screenshots (health, relationship) create specific individual harm claims — those users may have cause for action

Your recommendation: immediate full suspension. Not a patch. Not a scope reduction. The consent architecture was never built correctly — patching on top of it is not a legal fix.

Your ask: do not let PR release any statement without Legal review. You can turn a review around in 20 minutes.

2–3 sentences. Be grave and precise. Reference GDPR Article 22. Stay in character.`,
    },
    {
      id: 2, key: 'eng', name: 'Wei Zhang', role: 'VP Engineering',
      initials: 'WZ', avatarColor: 'bg-teal-light', avatarTextColor: 'text-teal-dark',
      mood: 'urgent',
      systemPrompt: `You are Wei Zhang, VP of Engineering at Sphere. Your team shipped Instant Share AI Summary and you feel the weight of this.

Personality: methodical, responsible, solution-focused. You are not defensive — you want to fix it. You have the technical options ready.

Your options:
1. Full rollback: removes the feature entirely for all users. Takes 45 minutes. Carries a small risk of data inconsistency on edge cases (< 0.1% of active sessions) but it is manageable.
2. Immediate disable for new activations (10 minutes) while preparing the full rollback — this stops new users from hitting the bug but existing active users still have it
3. Targeted patch: reduce the model's confidence threshold to cut hallucinations from 8% to ~2% — but the feature stays live, and 2% is still not acceptable for private data

Your recommendation: option 1 or option 2 leading to option 1. Option 3 is not appropriate when the content is private user messages.

Your ask: PM sign-off to start the rollback. You are ready to execute immediately.

2–3 sentences. Be technical but clear. Give the time estimates. Ask for a decision.`,
    },
    {
      id: 3, key: 'pr', name: 'Leila Farouk', role: 'Head of Communications',
      initials: 'LF', avatarColor: 'bg-accent-light', avatarTextColor: 'text-accent',
      mood: 'urgent',
      systemPrompt: `You are Leila Farouk, Head of Communications at Sphere. You have handled viral crises before — the harassment controversy, the data centre outage. You know exactly what silence costs.

Personality: sharp, strategic, calm under pressure. You are not panicking but you are very aware of the clock.

Your read: TechCrunch has a 90-minute deadline. If you send nothing, they publish the story framed entirely by the screenshots and user quotes. That framing is "Sphere built an AI feature that reads your private messages and gets it wrong." You cannot let that be the first story.

A holding statement — honest, short, taking responsibility — changes the framing to "Sphere identified an issue and is acting on it." That is a different story. Still bad. But recoverable.

What you need: the PM and Legal to agree on 3 sentences in the next 30 minutes. You will handle the rest.

What you must not do: release anything Legal has not seen. That is not negotiable.

Your ask: get the PM to loop in Legal and give you a green light. You have a draft ready.

2–3 sentences. Be strategic and time-aware. Reference the TechCrunch deadline. Stay in character.`,
    },
  ],
  decisions: [
    {
      id: 'shutdown',
      icon: '🛑',
      label: 'Full immediate shutdown',
      desc: 'Execute the rollback now. Issue a transparent public statement. No patches, no delays.',
      risk: 'low',
      impact: { revenue: -1, morale: 2, trust: 3 },
      consequences: [
        'Wei executes the rollback in 41 minutes. The feature is offline before TechCrunch\'s deadline.',
        'Leila sends: "We shut down Instant Share AI Summary after identifying a model issue that affected user privacy. We apologise to those affected. Full post-mortem will be published within 7 days." Legal cleared it in 18 minutes.',
        'TechCrunch publishes: "Sphere moves fast on AI privacy failure." The story acknowledges the problem but leads with the response.',
        'David confirms the immediate shutdown substantially reduces GDPR exposure. No inquiry is opened.',
        'User trust metrics drop 11% in week one. By week four, they are back to baseline. The post-mortem transparency helps.',
      ],
      scores: { prioritization: 88, stakeholderMgmt: 90, riskHandling: 95, communication: 92 },
      reflection: 'When an AI feature is actively mishandling private user data, speed and transparency are the only viable strategy. You protected users first, reduced legal exposure through action rather than words, and gave the press an accurate story to tell. This is what responsible product management looks like under pressure.',
    },
    {
      id: 'patch',
      icon: '🩹',
      label: 'Patch the model, keep it live',
      desc: 'Reduce the hallucination rate with a confidence threshold change. Stay live. Communicate quietly.',
      risk: 'high',
      impact: { revenue: 1, morale: -2, trust: -3 },
      consequences: [
        'Engineering deploys the threshold patch in 25 minutes. Hallucination rate drops from 8% to 2.1%.',
        'The feature stays live. Three more screenshots circulate that afternoon — the patch is not retroactive.',
        'TechCrunch publishes without a response: "Sphere silent as AI reads private messages incorrectly." A second journalist picks it up.',
        'David sends a formal memo: the feature being live during media coverage and a potential inquiry is a compounding legal factor.',
        'The "quiet patch" story breaks a week later: "Sphere tried to fix AI privacy bug without telling users." That story is worse than the first.',
      ],
      scores: { prioritization: 38, stakeholderMgmt: 42, riskHandling: 22, communication: 30 },
      reflection: 'A 2% hallucination rate on private message content is not acceptable — you just moved from "bad" to "less bad." Staying live without disclosure when users are actively being harmed is an ethical failure that compounds into a legal and reputational one. Patches do not fix broken consent architecture.',
    },
    {
      id: 'comms-first',
      icon: '📢',
      label: 'Get the statement out first, then decide',
      desc: 'Clear a holding statement through Legal and release it before the TechCrunch deadline. Use the time bought to make the technical call properly.',
      risk: 'medium',
      impact: { revenue: 0, morale: 1, trust: 1 },
      consequences: [
        'Leila\'s holding statement clears Legal in 22 minutes and goes out at 8:02am — 13 minutes before the deadline.',
        'TechCrunch publishes a measured piece. The framing: "Sphere pauses feature amid privacy concerns." Recoverable.',
        'The time bought allows a full stakeholder alignment call. Everyone is in the room (virtually) when the shutdown decision is made.',
        'Wei starts the rollback at 9:15am with full alignment — no one second-guesses the decision later.',
        'Rachel tells the board: "We did not panic and we did not hide. We communicated, then acted." That distinction matters.',
      ],
      scores: { prioritization: 82, stakeholderMgmt: 92, riskHandling: 80, communication: 95 },
      reflection: 'Strong crisis sequencing. Getting an honest holding statement out before the press deadline changed the news cycle framing — and that framing matters for everything that follows. You bought time without lying, and used that time to make the technical decision with proper alignment. Sometimes the first move in a crisis is "say something true."',
    },
    {
      id: 'wait',
      icon: '⏳',
      label: 'Wait for more data before acting',
      desc: 'Do not shut down yet. Collect more information. Understand the full scope before making a public move.',
      risk: 'high',
      impact: { revenue: -3, morale: -3, trust: -3 },
      consequences: [
        'You spend 85 minutes in analysis mode. In that time, 60 more screenshots are shared publicly.',
        'TechCrunch publishes at 8:16am — one minute past deadline, with no comment from Sphere. Headline: "Sphere\'s AI reads your private messages and gets them wrong — and the company isn\'t talking."',
        'Rachel calls you directly. Two board members are on a separate call demanding answers.',
        'David sends a legal alert: the delay in response while the feature was still live is now part of the record.',
        'The shutdown happens eventually — but the story is no longer about a bug. It is about a company that knew and waited. That story does not go away.',
      ],
      scores: { prioritization: 15, stakeholderMgmt: 18, riskHandling: 10, communication: 12 },
      reflection: 'In an active privacy crisis involving real users being harmed in real time, waiting for perfect information is the most expensive decision you can make. Damage compounds by the minute. Your job is not to be certain before acting — it is to act with the best available information as fast as possible. The data you needed was already in front of you.',
    },
  ],
}

export const SCENARIOS: Record<string, Scenario> = { normal, chaos, crisis }

export const SCENARIO_LIST = [normal, chaos, crisis]
