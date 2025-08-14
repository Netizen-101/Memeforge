import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function GET(){
  const memes = await prisma.meme.findMany({ orderBy:{ createdAt:'desc' } })
  return NextResponse.json({ memes })
}