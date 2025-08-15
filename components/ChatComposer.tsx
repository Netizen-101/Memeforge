"use client";
import { useState } from "react";
import axios from "axios";

type Mode = "TEXT" | "IMAGE" | "LINK";

export default function ChatComposer({ onResults }:{ onResults:(urls:string[])=>void }) {
  const [mode, setMode] = useState<Mode>("TEXT");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File|null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function generate() {
    setLoading(true); setErr(null);
    try {
      if (mode === "TEXT") {
        const r = await axios.post("/api/supermeme/image", { text, count: 4 });
        onResults(r.data.images ?? []);
      } else if (mode === "LINK") {
        const r = await axios.post("/api/supermeme/from-link", { url, count: 4 });
        onResults(r.data.images ?? []);
      } else {
        // IMAGE mode – just upload to get a working preview URL (simplest path)
        const fd = new FormData();
        if (file) fd.append("file", file);
        fd.append("text", text);
        const r = await axios.post("/api/memes/save", fd);
        onResults([r.data.imageUrl].filter(Boolean));
      }
    } catch (e:any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-4 space-y-3">
      <div className="flex gap-2">
        {(["TEXT","IMAGE","LINK"] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded ${mode===m?"bg-white/20":"bg-white/10 hover:bg-white/20"}`}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === "TEXT" && (
        <input value={text} onChange={e=>setText(e.target.value)}
          placeholder="Describe your meme idea…" className="w-full px-3 py-2 rounded bg-white/10" />
      )}
      {mode === "IMAGE" && (
        <div className="flex flex-col gap-2">
          <input type="file" accept="image/*,image/gif" onChange={e=>setFile(e.target.files?.[0]||null)} />
          <input value={text} onChange={e=>setText(e.target.value)}
            placeholder="Optional caption or context…" className="w-full px-3 py-2 rounded bg-white/10" />
        </div>
      )}
      {mode === "LINK" && (
        <input value={url} onChange={e=>setUrl(e.target.value)}
          placeholder="Paste a link for context…" className="w-full px-3 py-2 rounded bg-white/10" />
      )}

      <button onClick={generate} disabled={loading} className="btn">
        {loading ? "Generating…" : "Generate"}
      </button>
      {err && <div className="text-red-400 text-sm">{err}</div>}
    </div>
  );
}
