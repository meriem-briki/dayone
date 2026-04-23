'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface Props {
  onAuth: () => void
}

const WHY_PM_OPTIONS = [
  {
    id: 'career-switch',
    emoji: '🔁',
    title: 'Exploring a career switch',
    detail: 'I am in a different field and want to understand if PM is the right move for me.',
  },
  {
    id: 'already-pm',
    emoji: '📈',
    title: 'Already in product, levelling up',
    detail: 'I work in product or a related role and want to sharpen real decision-making skills.',
  },
  {
    id: 'other',
    emoji: '✳️',
    title: 'Other reasons',
    detail: 'Something else brought me here — I will figure it out as I go.',
  },
]

type AuthMode = 'signup' | 'login'

export default function AuthScreen({ onAuth }: Props) {
  const supabase = createClient()

  const [mode, setMode]           = useState<AuthMode>('signup')
  const [step, setStep]           = useState<'credentials' | 'why-pm'>('credentials')
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [whyPm, setWhyPm]         = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Handle Google redirect back — user is now logged in, go to simulation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('auth') === 'google') {
      // Clean the URL then proceed
      window.history.replaceState({}, '', '/')
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) onAuth()
      })
    }
  }, [])

  const handleGoogle = async () => {
    setGoogleLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) { setError(error.message); setGoogleLoading(false) }
  }

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (mode === 'login') {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setLoading(false)
      if (error) { setError(error.message); return }
      onAuth()
      return
    }

    if (!name.trim()) { setError('Please enter your name.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setStep('why-pm')
  }

  const handleWhyPm = async () => {
    if (!whyPm) { setError('Please pick one option.'); return }
    setLoading(true)
    setError(null)

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })

    if (signupError) { setError(signupError.message); setLoading(false); return }

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        name,
        why_pm: whyPm,
      })
    }

    setLoading(false)
    onAuth()
  }

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-medium text-sm text-white tracking-tight">DayOne</span>
      </div>

      <div className="w-full max-w-sm">

        {/* ── STEP 1: Credentials ── */}
        {step === 'credentials' && (
          <div className="animate-fade-up">
            <h1 className="text-2xl font-medium text-white mb-2">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              {mode === 'signup'
                ? 'Your progress and scores will be saved.'
                : 'Sign in to pick up where you left off.'}
            </p>

            {/* Google */}
            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-ink-100 text-ink-900 font-medium py-3 rounded-xl text-sm transition-colors mb-5 disabled:opacity-60"
            >
              {googleLoading ? (
                <span className="w-4 h-4 border-2 border-ink-300 border-t-ink-700 rounded-full animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-ink-800" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-ink-800" />
            </div>

            <form onSubmit={handleCredentials} className="flex flex-col gap-3">
              {mode === 'signup' && (
                <div>
                  <label className="text-xs text-gray-300 mb-1.5 block">Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Meriem"
                    required
                    className="w-full bg-ink-900 border border-ink-800 text-white placeholder-ink-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/60"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-gray-300 mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-ink-900 border border-ink-800 text-white placeholder-ink-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/60"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                  required
                  className="w-full bg-ink-900 border border-ink-800 text-white placeholder-ink-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/60"
                />
              </div>

              {error && (
                <p className="text-danger text-xs bg-danger-light/10 border border-danger/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-medium py-3 rounded-xl text-sm transition-colors mt-1"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {mode === 'signup' ? 'Creating account…' : 'Signing in…'}
                  </span>
                ) : (
                  mode === 'signup' ? 'Continue →' : 'Sign in'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(null) }}
                className="text-accent hover:text-white transition-colors font-medium"
              >
                {mode === 'signup' ? 'Sign in' : 'Create one'}
              </button>
            </p>
          </div>
        )}

        {/* ── STEP 2: Why PM ── */}
        {step === 'why-pm' && (
          <div className="animate-fade-up">
            <button
              onClick={() => { setStep('credentials'); setError(null) }}
              className="text-gray-300 hover:text-white text-xs mb-6 flex items-center gap-1.5 transition-colors"
            >
              ← Back
            </button>

            <h1 className="text-2xl font-medium text-white mb-2">One quick question</h1>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              Why did you choose the PM track? Helps us personalise your experience.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {WHY_PM_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setWhyPm(opt.id)}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                    whyPm === opt.id
                      ? 'border-accent bg-accent/10'
                      : 'border-ink-800 bg-ink-900 hover:border-ink-600'
                  }`}
                >
                  <span className="text-xl shrink-0 mt-0.5">{opt.emoji}</span>
                  <div>
                    <div className="text-sm font-medium text-white mb-0.5">{opt.title}</div>
                    <div className="text-xs text-gray-400 leading-relaxed">{opt.detail}</div>
                  </div>
                  {whyPm === opt.id && (
                    <div className="ml-auto shrink-0 w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-danger text-xs bg-danger-light/10 border border-danger/20 rounded-lg px-3 py-2 mb-4">
                {error}
              </p>
            )}

            <button
              onClick={handleWhyPm}
              disabled={loading || !whyPm}
              className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-medium py-3 rounded-xl text-sm transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Setting up your account…
                </span>
              ) : (
                'Start simulating →'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
