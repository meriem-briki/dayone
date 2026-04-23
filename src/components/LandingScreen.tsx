'use client'

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-ink-950 text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-medium text-sm tracking-tight">DayOne</span>
        </div>
        <span className="text-xs text-ink-400 border border-ink-800 rounded-full px-3 py-1">
          Beta · PM role available now
        </span>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 gap-8">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-ink-900 border border-ink-800 rounded-full px-4 py-2 text-xs text-ink-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            First role: Product Manager
          </div>

          <h1 className="text-5xl sm:text-6xl font-medium leading-[1.08] tracking-tight mb-6 max-w-xl mx-auto">
            Live the job<br />
            <span className="text-ink-400">before you have it.</span>
          </h1>

          <p className="text-ink-400 text-lg leading-relaxed max-w-sm mx-auto mb-10">
            DayOne puts you inside real job scenarios. Real pressure. Real decisions. Real stakeholders who push back.
          </p>

          <button
            onClick={onStart}
            className="bg-white text-ink-950 font-medium px-10 py-4 rounded-xl text-sm hover:bg-ink-100 transition-colors"
          >
            Start as Product Manager
          </button>
        </div>

        {/* Three-column proof */}
        <div className="grid grid-cols-3 gap-4 max-w-lg w-full mt-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {[
            { stat: '3', label: 'Real scenarios' },
            { stat: 'AI', label: 'Stakeholders who push back' },
            { stat: '12', label: 'Possible outcomes' },
          ].map((s) => (
            <div key={s.label} className="bg-ink-900 border border-ink-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-medium text-white mb-1">{s.stat}</div>
              <div className="text-xs text-ink-400 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-ink-900 px-8 py-4 flex items-center justify-between">
        <p className="text-xs text-ink-600">
          You don't read about roles here. You live them.
        </p>
        <div className="flex items-center gap-1.5">
          {['Engineer', 'Sales', 'Designer', 'Founder'].map((r) => (
            <span key={r} className="text-[10px] text-ink-700 border border-ink-800 rounded-full px-2 py-0.5">
              {r}
            </span>
          ))}
          <span className="text-[10px] text-ink-600 ml-1">coming soon</span>
        </div>
      </div>
    </div>
  )
}
