import { NextResponse } from 'next/server'
export function GET(){
  const url = new URL('https://www.facebook.com/v20.0/dialog/oauth')
  url.searchParams.set('client_id', process.env.FB_APP_ID!)
  url.searchParams.set('redirect_uri', process.env.NEXT_PUBLIC_SITE_URL! + '/api/oauth/instagram/callback')
  url.searchParams.set('scope', 'instagram_basic,instagram_content_publish,business_management,pages_show_list')
  url.searchParams.set('response_type', 'code')
  return NextResponse.redirect(url.toString())
}