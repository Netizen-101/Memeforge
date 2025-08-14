import { NextRequest, NextResponse } from 'next/server'
async function fetchTextFromUrl(url: string){
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'MemeForgeBot/1.0' } })
    const html = await r.text()
    const title = (html.match(/<title>(.*?)<\/title>/i)?.[1]||'').slice(0,180)
    const og = (html.match(/property="og:description" content="(.*?)"/i)?.[1]||'').slice(0,220)
    const desc = (html.match(/name="description" content="(.*?)"/i)?.[1]||'').slice(0,220)
    const text = [title, og, desc].filter(Boolean).join(' — ')
    return text || url
  } catch { return url }
}
export async function POST(req: NextRequest){
  const { url, count } = await req.json()
  const text = await fetchTextFromUrl(url)
  const r = await fetch('https://app.supermeme.ai/api/v2/meme/image', {
    method:'POST',
    headers:{ 'Authorization':`Bearer ${process.env.SUPERMEME_API_KEY}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ text, count: Math.min(count ?? 6, 12) })
  })
  const data = await r.json()
  return NextResponse.json(data)
}