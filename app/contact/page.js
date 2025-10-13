'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Contact(){
  const [sent, setSent] = useState(false)

  function submit(e){
    e.preventDefault()
    setSent(true)
    setTimeout(()=>setSent(false), 4000)
  }

  return (
    <>
      <header className="navbar fixed w-full z-30">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="logo-img" />
            <div className="font-medium">Osama Youssef Productions</div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/projects">Our Latest Projects</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="pt-24">
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-semibold">Contact</h1>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <form className="card p-6" onSubmit={submit}>
              <input className="input mb-3" placeholder="Name" required />
              <input className="input mb-3" placeholder="Phone or Email" required />
              <textarea className="input mb-3" placeholder="Tell us about the event" rows="4" />
              <div className="flex gap-3">
                <button className="btn">Send message</button>
                <a href="https://wa.me/?text=Hello%20Osama%20Youssef%20Productions" target="_blank" rel="noreferrer" className="px-4 py-2 border rounded-md">WhatsApp</a>
              </div>
              {sent && <p className="mt-3 text-green-600">Message sent (demo)</p>}
            </form>

            <div className="card p-6">
              <h3 className="font-medium">Get in touch</h3>
              <p className="text-sm text-gray-600 mt-2">Dubai, UAE · +971 50 123 4567</p>
              <p className="text-sm text-gray-600 mt-2">Instagram: <a href="https://www.instagram.com/osama_yousef_production/" target="_blank" rel="noreferrer">@osama_yousef_production</a></p>
              <div className="mt-4">
                <img src="/logo.png" alt="logo" className="w-40 object-contain" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
