'use client'
import { useEffect, useRef } from 'react'

export default function InstagramEmbed({ postUrl, style = {} }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''
    const block = document.createElement('blockquote')
    block.className = 'instagram-media'
    block.setAttribute('data-instgrm-permalink', postUrl)
    block.setAttribute('data-instgrm-version', '14')
    block.style.background = '#fff'
    ref.current.appendChild(block)

    if (!window.instgrm) {
      const s = document.createElement('script')
      s.src = 'https://www.instagram.com/embed.js'
      s.async = true
      document.body.appendChild(s)
    } else {
      try { window.instgrm.Embeds.process() } catch (e) {}
    }
  }, [postUrl])

  return <div ref={ref} style={style} />
}
