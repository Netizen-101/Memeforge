"use client"
import { useRef, useState } from 'react'
import { Stage, Layer, Image as KImage, Text as KText } from 'react-konva'
import useImage from 'use-image'
import axios from 'axios'

type TL = { id:string; text:string; x:number; y:number; fontSize:number; fill:string; fontFamily:string }
const FONTS = ['Impact','Inter','Poppins','Montserrat','Arial Black','Comic Sans MS']

export default function MemeCanvas({ baseImage }:{ baseImage:string }){
  const [img] = useImage(baseImage, 'anonymous')
  const [texts, setTexts] = useState<TL[]>([
    { id:'t1', text:'TOP TEXT', x:40, y:20, fontSize:48, fill:'white', fontFamily:'Impact' },
    { id:'t2', text:'bottom text', x:40, y:360, fontSize:48, fill:'white', fontFamily:'Impact' }
  ])
  const [wh, setWH] = useState({ w:1080, h:1080 })
  const [audio, setAudio] = useState<File|null>(null)
  const stageRef = useRef<any>(null)

  const setLayer = (id:string, patch:Partial<TL>) => setTexts(t => t.map(x => x.id===id ? { ...x, ...patch } : x))

  async function exportPNG(ratio:'1:1'|'4:3'|'9:16'){
    const sizes:{[key:string]:[number,number]} = { '1:1':[1080,1080], '4:3':[1080,810], '9:16':[1080,1920] }
    const [w,h] = sizes[ratio]
    setWH({ w, h })
    await new Promise(r=>setTimeout(r,50))
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 })
    const a = document.createElement('a'); a.href = uri; a.download = `memeforge-${ratio}.png`; a.click()
  }
  async function saveToLibrary(){
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 })
    await axios.post('/api/memes/save', { dataUrl: uri })
    alert('Saved ✓')
  }
  async function exportMP4(){
    if (!audio) return alert('Attach audio first')
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 })
    const fd = new FormData(); fd.append('imageDataUrl', uri); fd.append('audio', audio)
    const { data } = await axios.post('/api/video/make', fd)
    const a = document.createElement('a'); a.href = data.url; a.download = 'memeforge.mp4'; a.click()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6">
      <div className="card p-3 overflow-auto">
        <Stage ref={stageRef} width={wh.w} height={wh.h} className="bg-black rounded-xl">
          <Layer>
            {img && <KImage image={img} width={wh.w} height={wh.h} />}
            {texts.map(t => <KText key={t.id} draggable {...t} stroke="black" strokeWidth={4} />)}
          </Layer>
        </Stage>
      </div>
      <aside className="space-y-4">
        <div className="card p-4 space-y-2">
          <div className="flex items-center justify-between"><b>Text Layers</b>
            <button className="btn" onClick={()=>setTexts([...texts,{ id:crypto.randomUUID(), text:'new text', x:40, y:200, fontSize:36, fill:'white', fontFamily:'Impact' }])}>Add</button>
          </div>
          {texts.map(t =>
            <div key={t.id} className="p-2 rounded-xl bg-white/5 space-y-2">
              <input className="input" value={t.text} onChange={e=>setLayer(t.id,{ text:e.target.value })}/>
              <div className="flex gap-2">
                <input type="color" value={t.fill} onChange={e=>setLayer(t.id,{ fill:e.target.value })}/>
                <input type="range" min={20} max={96} value={t.fontSize} onChange={e=>setLayer(t.id,{ fontSize:+e.target.value })}/>
                <select className="input" value={t.fontFamily} onChange={e=>setLayer(t.id,{ fontFamily:e.target.value })}>
                  {FONTS.map(f=> <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="card p-4 space-y-2">
          <b>Export</b>
          <div className="flex gap-2 flex-wrap">
            <button className="btn" onClick={()=>exportPNG('1:1')}>1:1</button>
            <button className="btn" onClick={()=>exportPNG('4:3')}>4:3</button>
            <button className="btn" onClick={()=>exportPNG('9:16')}>9:16</button>
            <button className="btn" onClick={saveToLibrary}>Save</button>
          </div>
          <div className="space-y-2">
            <div className="label">Optional: background music → MP4</div>
            <input type="file" accept="audio/*" onChange={e=>setAudio(e.target.files?.[0]||null)}/>
            <button className="btn" onClick={exportMP4}>Make MP4 + Audio</button>
            <p className="text-xs text-white/60">Trending music is not exposed by IG or TikTok APIs. Use Original Audio or royalty free tracks.</p>
          </div>
        </div>
      </aside>
    </div>
  )
}