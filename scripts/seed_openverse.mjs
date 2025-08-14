import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({ cloud_name:process.env.CLOUDINARY_CLOUD_NAME, api_key:process.env.CLOUDINARY_API_KEY, api_secret:process.env.CLOUDINARY_API_SECRET })
const TERMS = ['reaction face','abstract gradient','crowd','office','texture','pattern','nature','vintage']
const API = 'https://api.openverse.org/v1/images'
async function j(u){ const r = await fetch(u); return r.json() }
let total = 0
for (const q of TERMS) {
  const { results=[] } = await j(`${API}?q=${encodeURIComponent(q)}&license_type=cc0,by&page_size=200`)
  for (const it of results) {
    if (!it.url) continue
    try {
      await cloudinary.uploader.upload(it.url, { folder:'memeforge/openverse', context: { license: it.license, source: it.foreign_landing_url||'' } })
      total++
      if (total>=1000) break
    } catch {}
  }
  if (total>=1000) break
}
console.log('Seeded', total)