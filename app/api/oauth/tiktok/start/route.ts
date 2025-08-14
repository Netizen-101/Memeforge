import { NextResponse } from 'next/server'
export function GET(){
  const url = new URL('https://www.tiktok.com/v2/auth/authorize/')
  url.searchParams.set('client_key', process.env.TIKTOK_CLIENT_KEY!)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'video.upload,video.publish,user.info.basic')
  url.searchParams.set('redirect_uri', process.env.TIKTOK_REDIRECT_URI!)
  url.searchParams.set('state', 'memeforge')
  return NextResponse.redirect(url.toString())
}