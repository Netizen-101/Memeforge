# MemeForge — AI Meme Generator

Next.js 14 + Tailwind + Supabase + Cloudinary + Supermeme.

## Local run
1) `npm i`
2) copy `.env.example` to `.env.local` and fill keys
3) `npx prisma migrate dev --name init`
4) `npm run dev`

## Deploy
Vercel for web. Supabase for Postgres and Auth. Cloudinary for assets. Add env vars on Vercel.

## Notes
Instagram Graph API and TikTok posting require proper app setup and account types. Trending audio is not exposed by public APIs. Use Original Audio or royalty free tracks.# Memeforge
