'use client'
import Link from 'next/link'
import ClientOnly from '../components/ClientOnly'
import InstagramEmbed from '../components/InstagramEmbed'

const posts = [
  "https://www.instagram.com/reel/DPEvxvJE1UP/",
  "https://www.instagram.com/reel/DPYjhnFkeVm/",
  "https://www.instagram.com/reel/DPoC4klEbX5/"
]

export default function Projects(){
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
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-semibold">Our Latest Projects</h1>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <ClientOnly>
              {posts.map((p,i)=>(
                <div key={i} className="card p-3">
                  <InstagramEmbed postUrl={p} />
                </div>
              ))}
            </ClientOnly>
          </div>
        </section>
      </main>
    </>
  )
}
