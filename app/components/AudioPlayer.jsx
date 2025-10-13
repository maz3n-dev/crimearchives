'use client'
export default function AudioPlayer({ src }) {
  return (
    <div className="card p-3 flex items-center gap-4">
      <audio src={src} controls className="w-full" />
      <div className="text-sm text-gray-600">Ambient track (demo)</div>
    </div>
  )
}
