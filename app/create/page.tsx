"use client"
import { useState } from 'react'
import ChatComposer from '@/components/ChatComposer'
import MemeCanvas from '@/components/MemeCanvas'

export default function CreatePage(){
  const [results, setResults] = useState<string[]>([])
  const [selected, setSelected] = useState<string|null>(null)
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Meme</h1>
      <ChatComposer onResults={(imgs)=>{ setResults(imgs); setSelected(imgs[0]||null) }}/>
      {results.length>0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {results.map(src =>
            <button key={src} onClick={()=>setSelected(src)} className={`card p-2 hover:scale-[1.01] transition ${selected===src?'ring-2 ring-lime':''}`}>
              <img src={src} className="w-full h-64 object-cover rounded-xl" alt="option"/>
            </button>
          )}
        </div>
      )}
      {selected && <MemeCanvas baseImage={selected}/>
      }
    </div>
  )
}