export default function Accounts(){
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">Connected Accounts</h1>
      <p className="text-white/70">Connect Instagram and TikTok business accounts to enable posting and analytics.</p>
      <div className="card p-4">
        <div className="font-semibold mb-2">Instagram</div>
        <a className="btn" href="/api/oauth/instagram/start">Connect Instagram</a>
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-2">TikTok</div>
        <a className="btn" href="/api/oauth/tiktok/start">Connect TikTok</a>
      </div>
    </div>
  )
}