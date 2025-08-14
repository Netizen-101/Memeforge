import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest){
  const { mediaId } = await req.json()
  const r = await fetch(`https://graph.facebook.com/v20.0/${mediaId}/insights?metric=plays,likes,comments,reach&access_token=${process.env.IG_APP_ACCESS_TOKEN}`)
  const data = await r.json()
  return NextResponse.json(data)
}