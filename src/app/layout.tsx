import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DayOne — Live the job before you have it',
  description: 'Immersive job simulations. Experience real roles through AI-powered scenarios, stakeholder chats, and real decisions.',
  openGraph: {
    title: 'DayOne',
    description: 'Live the job before you have it.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
