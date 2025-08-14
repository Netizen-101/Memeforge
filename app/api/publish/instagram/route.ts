import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest){
  const { igUserId, mediaUrl, caption } = await req.json()
  const create = await fetch(`https://graph.facebook.com/v20.0/${igUserId}/media`, {
    method:'POST', headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ image_url: mediaUrl, caption, access_token: process.env.IG_APP_ACCESS_TOKEN })
  }).then(r=>r.json())
  const publish = await fetch(`https://graph.facebook.com/v20.0/${igUserId}/media_publish`, {
    method:'POST', headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ creation_id: create.id, access_token: process.env.IG_APP_ACCESS_TOKEN })
  }).then(r=>r.json())
  return NextResponse.json({ ok:true, mediaId: publish.id })
}