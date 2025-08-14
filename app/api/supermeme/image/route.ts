import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest){
  const { text, count } = await req.json()
  const r = await fetch('https://app.supermeme.ai/api/v2/meme/image', {
    method:'POST',
    headers:{ 'Authorization':`Bearer ${process.env.SUPERMEME_API_KEY}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ text, count: Math.min(count ?? 6, 12) })
  })
  const data = await r.json()
  return NextResponse.json(data)
}