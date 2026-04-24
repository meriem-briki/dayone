'use client'

// This page handles the OAuth redirect from Supabase.
// With implicit flow, the token arrives in the URL hash.
// Supabase's detectSessionInUrl:true handles it automatically.
// We just need to wait for the session and redirect home.

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function AuthCallbackPage() {
  useEffect(() => {
    const supabase = createClient()
    
    // Listen for the SIGNED_IN event — fires when Supabase
    // processes the token from the URL hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe()
        window.location.replace('/')
      }
    })

    // Also check immediately in case session is already set
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.replace('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center gap-4">
      <div className="w-6 h-6 border-2 border-ink-700 border-t-accent rounded-full animate-spin" />
      <p className="text-gray-300 text-sm">Signing you in…</p>
    </div>
  )
}
