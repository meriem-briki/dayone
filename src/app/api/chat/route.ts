import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, messages } = await req.json()
    if (!systemPrompt || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 280,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    })
    return NextResponse.json({ reply: response.choices[0]?.message?.content || '' })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
