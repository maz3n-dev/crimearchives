'use client'
export default function VideoCard({ src, poster, caption }) {
  return (
    <div className="card p-3 fade-in">
      <video src={src} poster={poster} controls playsInline className="w-full rounded-md" />
      {caption && <div className="mt-2 text-sm text-gray-600">{caption}</div>}
    </div>
  )
}
