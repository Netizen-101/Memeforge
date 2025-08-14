"use client"
import { useState } from 'react'
import axios from 'axios'

type Mode = 'TEXT'|'IMAGE'|'LINK'
export default function ChatComposer({ onResults }:{ onResults:(imgs:string[])=>void }){
  const [mode,setMode] = useState<Mode>('TEXT')
  const [text,setText] = useState('')
  const [file,setFile] = useState<File|null>(null)
  const [url,setUrl] = useState('')
  const [loading,setLoading] = useState(false)

  async function handleGenerate(){
    setLoading(true)
    try {
      if (mode==='TEXT') {
        const { data } = await axios.post('/api/supermeme/image', { text, count: 6 })
        onResults(data.memes || data.images || [])
      } else if (mode==='IMAGE') {
        const form = new FormData()
        if (file) form.append('file', file)
        form.append('text', text)
        const { data } = await axios.post('/api/supermeme/template', form)
        onResults(data.captions || [])
      } else {
        const { data } = await axios.post('/api/supermeme/from-link', { url, count: 6 })
        onResults(data.memes || [])
      }
    } finally { setLoading(false) }
  }

  return (
    <div className="card p-4 space-y-3">
      <div className="flex gap-2 flex-wrap">
        {(['TEXT','IMAGE','LINK'] as Mode[]).map(m =>
          <button key={m} onClick={()=>setMode(m)} className={`btn ${mode===m?'':'bg-white/10 text-white'}`}>
            {m==='TEXT'?'📝 Text Prompt': m==='IMAGE'?'🖼️ Your Image/GIF':'🔗 Link'}
          </button>
        )}
      </div>
      {mode==='TEXT' && <textarea className="input h-28" placeholder="e.g., startup demo failed but still shipped" value={text} onChange={e=>setText(e.target.value)}/>}
      {mode==='IMAGE' && <div className="space-y-2">
        <input type="file" accept="image/*,image/gif" onChange={e=>setFile(e.target.files?.[0]||null)}/>
        <input className="input" placeholder="Optional context" value={text} onChange={e=>setText(e.target.value)}/>
      </div>}
      {mode==='LINK' && <input className="input" placeholder="Paste a link; we'll pull context and meme it" value={url} onChange={e=>setUrl(e.target.value)}/>}

      <div className="flex items-center gap-3">
        <button onClick={handleGenerate} disabled={loading} className="btn">{loading?'Generating…':'Generate Memes'}</button>
        <span className="text-white/60 text-sm">Short, punchy context works best.</span>
      </div>
    </div>
  )
}