import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
export const runtime = 'nodejs'
cloudinary.config({ cloud_name:process.env.CLOUDINARY_CLOUD_NAME, api_key:process.env.CLOUDINARY_API_KEY, api_secret:process.env.CLOUDINARY_API_SECRET })
export async function POST(req: NextRequest){
  const form = await req.formData()
  const imageDataUrl = String(form.get('imageDataUrl'))
  const audio = form.get('audio') as File
  const img = await cloudinary.uploader.upload(imageDataUrl, { folder:'memeforge', resource_type:'image' })
  const audioBuf = Buffer.from(await audio.arrayBuffer())
  const aud:any = await new Promise((resolve,reject)=>{
    const s = cloudinary.uploader.upload_stream({ resource_type:'video', folder:'memeforge' }, (e,r)=> e?reject(e):resolve(r))
    s.end(audioBuf)
  })
  const videoUrl = cloudinary.url(img.public_id + '.jpg', {
    resource_type:'video',
    transformation:[ { duration:6, effect:'loop:200' }, { overlay:{ resource_type:'video', public_id: aud.public_id }, flags:'layer_apply' } ],
    format:'mp4'
  })
  return NextResponse.json({ url: videoUrl })
}