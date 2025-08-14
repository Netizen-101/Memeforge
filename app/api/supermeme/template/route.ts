import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest){
  const form = await req.formData()
  const text = String(form.get('text') || '')
  if (!text) return NextResponse.json({ captions: [] })
  const r = await fetch('https://app.supermeme.ai/api/v1/meme/text', {
    method:'POST',
    headers:{ 'Authorization':`Bearer ${process.env.SUPERMEME_API_KEY}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ text })
  })
  const data = await r.json()
  const captions = (data?.memes || []).map((m:any)=> m.caption || m.text || '').filter(Boolean)
  return NextResponse.json({ captions })
}