'use client'
import Link from 'next/link'
import ClientOnly from '../components/ClientOnly'
import InstagramEmbed from '../components/InstagramEmbed'

export default function About() {
  const who = "https://www.instagram.com/reel/DORA78Fj9oq/"
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
        <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl font-semibold">About Osama Youssef Productions</h1>
            <p className="mt-4 text-gray-700">We are a UAE-based full-service production company specializing in luxury weddings and large events. Our team handles design, florals, lighting, staging and full production management.</p>
            <ul className="mt-4 list-disc ml-5 text-sm text-gray-600">
              <li>Custom event design & styling</li>
              <li>Stage and set fabrication</li>
              <li>Full technical production</li>
            </ul>
          </div>
          <div className="card p-3">
            <ClientOnly>
              <InstagramEmbed postUrl={who} />
            </ClientOnly>
          </div>
        </section>
      </main>
    </>
  )
}
