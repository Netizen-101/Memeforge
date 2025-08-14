"use client"
import useSWR from 'swr'
import axios from 'axios'
const fetcher = (u:string)=>axios.get(u).then(r=>r.data)
export default function MemesPage(){
  const { data } = useSWR('/api/memes/list', fetcher)
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Your Memes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.memes?.map((m:any)=>(
          <div key={m.id} className="card p-3 space-y-2">
            {m.imageUrl && <img src={m.imageUrl} className="w-full h-64 object-cover rounded-xl" alt="meme" />}
            <div className="text-xs text-white/60">Created: {new Date(m.createdAt).toLocaleString()}</div>
            <div className="text-xs">IG: {(m.metrics?.instagram?.views ?? 0)} views · {(m.metrics?.instagram?.likes ?? 0)} likes</div>
            <div className="text-xs">TT: {(m.metrics?.tiktok?.views ?? 0)} views · {(m.metrics?.tiktok?.likes ?? 0)} likes</div>
          </div>
        ))}
      </div>
    </div>
  )
}