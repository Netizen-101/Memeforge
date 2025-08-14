import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
cloudinary.config({ cloud_name:process.env.CLOUDINARY_CLOUD_NAME, api_key:process.env.CLOUDINARY_API_KEY, api_secret:process.env.CLOUDINARY_API_SECRET })
export async function POST(req: NextRequest){
  const { dataUrl, caption } = await req.json()
  const upload = await cloudinary.uploader.upload(dataUrl, { folder:'memeforge', resource_type:'image' })
  const email = 'demo@example.com'
  const user = await prisma.user.upsert({ where:{email}, create:{email}, update:{} })
  const meme = await prisma.meme.create({ data:{ userId:user.id, sourceType:'TEXT', sourceInput: caption||'', imageUrl: upload.secure_url, caption: caption||'' } })
  return NextResponse.json({ ok:true, meme })
}