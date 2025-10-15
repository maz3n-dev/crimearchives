'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function Page() {
  const STORIES = [
    // ... your existing STORIES array remains the same
  ]

  const [selected, setSelected] = useState(null)
  const [typedText, setTypedText] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedTags, setSelectedTags] = useState(new Set())
  const [notification, setNotification] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showIntro, setShowIntro] = useState(true)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const typingRef = useRef({ running: false, timeoutIds: [] })
  const audioRef = useRef({ ctx: null, masterGain: null })

  // Minimum swipe distance to trigger nav hide/show
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isDownSwipe = distance > minSwipeDistance
    const isUpSwipe = distance < -minSwipeDistance

    if (isDownSwipe && isNavVisible) {
      setIsNavVisible(false)
    } else if (isUpSwipe && !isNavVisible) {
      setIsNavVisible(true)
    }
  }

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowIntro(false), 4000)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const playTypewriterSound = () => {
    try {
      if (!audioRef.current.ctx) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const master = ctx.createGain()
        master.gain.value = 1.5
        master.connect(ctx.destination)
        audioRef.current.ctx = ctx
        audioRef.current.masterGain = master
      }
      const ctx = audioRef.current.ctx
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.value = 1200
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.03, now + 0.001)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
      osc.connect(gain)
      gain.connect(audioRef.current.masterGain)
      osc.start(now)
      osc.stop(now + 0.1)
    } catch (e) {}
  }

  const stopTyping = () => {
    typingRef.current.running = false
    typingRef.current.timeoutIds.forEach((id) => clearTimeout(id))
    typingRef.current.timeoutIds = []
    setTypedText('')
  }

  const startTyping = (content) => {
    stopTyping()
    typingRef.current.running = true
    let fullText = ''
    const timeouts = []
    const chars = content.split('')
    chars.forEach((char, idx) => {
      const timeout = setTimeout(() => {
        fullText += char
        setTypedText(fullText)
        if (char.trim() !== '' && Math.random() > 0.3) playTypewriterSound()
        if (idx === chars.length - 1) typingRef.current.running = false
      }, idx * 40)
      timeouts.push(timeout)
    })
    typingRef.current.timeoutIds = timeouts
  }

  const openStory = (story) => {
    setSelected(story)
    setTypedText('')
    setTimeout(() => startTyping(story.content), 200)
  }

  const closeModal = () => {
    stopTyping()
    setSelected(null)
  }

  const showNotification = (message) => {
    setNotification({ message, id: Date.now() })
    setTimeout(() => setNotification(null), 3000)
  }

  const allTags = [...new Set(STORIES.flatMap(story => story.tags))]
  const filteredStories = STORIES.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || story.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === 'all' || story.status.toLowerCase() === activeFilter
    const matchesTags = selectedTags.size === 0 || story.tags.some(tag => selectedTags.has(tag))
    return matchesSearch && matchesFilter && matchesTags
  })

  useEffect(() => {
    function onKey(e) {
      if (!selected) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') {
        const curIdx = STORIES.findIndex((s) => s.id === selected.id)
        const next = STORIES[(curIdx + 1) % STORIES.length]
        setSelected(next)
        setTypedText('')
        setTimeout(() => startTyping(next.content), 120)
      }
      if (e.key === 'ArrowLeft') {
        const curIdx = STORIES.findIndex((s) => s.id === selected.id)
        const prev = STORIES[(curIdx - 1 + STORIES.length) % STORIES.length]
        setSelected(prev)
        setTypedText('')
        setTimeout(() => startTyping(prev.content), 120)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const IntroAnimation = () => (
    <motion.div 
      className="fixed inset-0 z-40 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-6xl font-bold mb-4 font-['Playfair_Display'] text-amber-400"
        >
          CRIME ARCHIVES
        </motion.h1>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 300 }}
          transition={{ delay: 1.3, duration: 1.5 }}
          className="h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-6 rounded-full"
        />
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="text-xl text-amber-200 font-light tracking-widest mb-2"
        >
          CLASSIFIED DOSSIERS
        </motion.p>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          className="text-lg text-amber-300/70 font-mono"
        >
          ULTIMATE EDITION
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.7, type: "spring" }}
          className="mt-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-amber-400 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-amber-400 rounded-full"
            />
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-amber-400 rounded-full"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0 }}
            className="text-amber-500 text-sm mt-2 font-mono"
          >
            ACCESSING SECURED FILES...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )

  const styles = `
    :root{--bg-0:#050505;--bg-1:#0a0a0a;--bg-2:#111111;--paper:rgba(255,255,255,0.015);--accent:#8b4513;--accent-glow:rgba(139,69,19,0.15);--accent-secondary:#2f4f4f;--muted:#8a8a8a;--text-primary:#e8e8e8;--text-secondary:#b0b0b0;--border:rgba(255,255,255,0.03);--border-glow:rgba(139,69,19,0.1);--shadow-premium:0 25px 50px -12px rgba(0,0,0,0.5);--shadow-accent:0 0 30px rgba(139,69,19,0.2);}
    *{box-sizing:border-box;}
    html,body,#root{height:100%;scroll-behavior:smooth;}
    .crime-body{min-height:200vh;background:radial-gradient(ellipse at 15% 10%,rgba(30,15,5,0.15) 0%,transparent 60%),radial-gradient(ellipse at 85% 90%,rgba(20,30,20,0.1) 0%,transparent 60%),linear-gradient(180deg,var(--bg-0) 0%,var(--bg-1) 40%,var(--bg-2) 100%);color:var(--text-primary);font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
    .crime-body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 30%,rgba(139,69,19,0.03) 0%,transparent 50%),radial-gradient(circle at 80% 70%,rgba(47,79,79,0.03) 0%,transparent 50%);pointer-events:none;z-index:0;}
    .grain{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");mix-blend-mode:overlay;pointer-events:none;}
    .vignette{position:fixed;inset:0;background:radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,0.9) 100%);pointer-events:none;z-index:1;}
    .sticky-head{position:sticky;top:0;backdrop-filter:blur(20px) saturate(180%);background:linear-gradient(180deg,rgba(5,5,5,0.95) 0%,rgba(5,5,5,0.85) 100%);border-bottom:1px solid var(--border);z-index:50;box-shadow:0 1px 30px rgba(0,0,0,0.4);}
    .dossier-title{font-family:'Playfair Display',serif;font-weight:600;letter-spacing:0.12em;color:var(--accent);text-shadow:0 2px 15px var(--accent-glow);position:relative;}
    .dossier-title::after{content:'';position:absolute;bottom:-6px;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent 0%,var(--accent) 50%,transparent 100%);opacity:0.6;}
    .card{background:linear-gradient(145deg,rgba(255,255,255,0.02) 0%,rgba(255,255,255,0.005) 100%);border:1px solid var(--border);backdrop-filter:blur(10px);transition:all 0.5s cubic-bezier(0.25,0.46,0.45,0.94);position:relative;overflow:hidden;}
    .card:hover{transform:translateY(-8px) scale(1.02);border-color:var(--border-glow);box-shadow:var(--shadow-premium),var(--shadow-accent),0 0 50px rgba(139,69,19,0.1);}
    .image-dim{filter:sepia(0.4) contrast(1.1) brightness(0.6) saturate(0.7);transition:all 0.8s cubic-bezier(0.25,0.46,0.45,0.94);}
    .card:hover .image-dim{filter:sepia(0.1) contrast(1.05) brightness(0.8) saturate(1);transform:scale(1.1);}
    .category-tag{font-size:0.7rem;color:var(--accent);background:rgba(139,69,19,0.15);padding:6px 12px;border-radius:14px;border:1px solid rgba(139,69,19,0.3);letter-spacing:0.08em;font-weight:500;backdrop-filter:blur(10px);}
    .status-badge{font-size:0.65rem;padding:4px 10px;border-radius:10px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;}
    .status-active{background:rgba(34,197,94,0.15);color:#22c55e;border:1px solid rgba(34,197,94,0.3);}
    .status-unsolved{background:rgba(234,179,8,0.15);color:#eab308;border:1px solid rgba(234,179,8,0.3);}
    .status-closed{background:rgba(107,114,128,0.15);color:#6b7280;border:1px solid rgba(107,114,128,0.3);}
    .priority-high{color:#ef4444;background:rgba(239,68,68,0.1);}
    .priority-critical{color:#dc2626;background:rgba(220,38,38,0.15);}
    .priority-medium{color:#eab308;background:rgba(234,179,8,0.1);}
    .priority-low{color:#6b7280;background:rgba(107,114,128,0.1);}
    .meta-tag{font-size:0.75rem;color:var(--muted);letter-spacing:0.08em;text-transform:uppercase;font-family:'Source Code Pro',monospace;}
    .read-more{color:var(--accent);text-decoration:none;position:relative;font-weight:500;transition:all 0.3s ease;}
    .read-more::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--accent);transition:width 0.3s ease;}
    .card:hover .read-more::after{width:100%;}
    .modal{background:linear-gradient(145deg,rgba(10,10,10,0.98) 0%,rgba(8,8,8,0.97) 100%);border:1px solid var(--border);backdrop-filter:blur(30px);box-shadow:0 50px 100px -20px rgba(0,0,0,0.8),0 0 80px rgba(0,0,0,0.9);max-height:94vh;}
    .modal-content{max-height:calc(94vh - 300px);overflow-y:auto;}
    .modal-content::-webkit-scrollbar{width:8px;}
    .modal-content::-webkit-scrollbar-track{background:rgba(255,255,255,0.02);border-radius:4px;}
    .modal-content::-webkit-scrollbar-thumb{background:linear-gradient(180deg,var(--accent),var(--accent-secondary));border-radius:4px;}
    .dropcap::first-letter{float:left;font-size:4.2rem;line-height:0.8;margin-right:0.8rem;margin-top:0.4rem;font-weight:600;color:var(--accent);font-family:'Crimson Text',serif;text-shadow:3px 3px 6px rgba(0,0,0,0.4);}
    .search-box{background:rgba(255,255,255,0.03);border:1px solid var(--border);backdrop-filter:blur(10px);transition:all 0.3s ease;}
    .search-box:focus-within{border-color:var(--accent);box-shadow:0 0 20px rgba(139,69,19,0.2);}
    .filter-btn{background:rgba(255,255,255,0.03);border:1px solid var(--border);transition:all 0.3s ease;}
    .filter-btn.active{background:rgba(139,69,19,0.15);border-color:var(--accent);color:var(--accent);}
    .tag-filter{background:rgba(255,255,255,0.03);border:1px solid var(--border);transition:all 0.3s ease;}
    .tag-filter.active{background:rgba(139,69,19,0.2);border-color:var(--accent);color:var(--accent);}
    .evidence-tag{font-size:0.7rem;background:rgba(255,255,255,0.05);padding:4px 8px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);}
    .loading-screen{position:fixed;inset:0;background:var(--bg-0);z-index:10000;display:flex;align-items:center;justify-content:center;}
    .notification{position:fixed;top:100px;right:30px;padding:16px 20px;background:rgba(10,10,10,0.95);border:1px solid var(--border);border-radius:12px;backdrop-filter:blur(20px);z-index:1000;box-shadow:var(--shadow-premium);border-left:4px solid var(--accent);}
    
    /* Mobile-specific fixes */
    @media (max-width: 768px) {
      .dropcap::first-letter{font-size:3rem;margin-right:0.6rem;}
      .card:hover{transform:translateY(-4px);}
      body { overflow-x: hidden; }
      .crime-body { min-height: 100vh; height: 100%; }
      html, body, #root { height: 100%; overflow-x: hidden; }
      .sticky-head { transition: transform 0.3s ease; }
      .sticky-head.hidden { transform: translateY(-100%); }
      .search-box { min-width: 100%; }
      .modal { margin: 0; border-radius: 0; max-height: 100vh; }
      .modal-content { max-height: calc(100vh - 300px); }
    }
  `

  const LoadingScreen = () => (
    <motion.div className="loading-screen" initial={{opacity:1}} animate={{opacity:isLoading?1:0}} style={{display:isLoading?'flex':'none'}}>
      <div className="text-center">
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.2}} className="text-amber-400 text-xl font-mono">
          INITIALIZING ARCHIVES
        </motion.div>
        <motion.div initial={{width:0}} animate={{width:200}} transition={{delay:0.5,duration:1}} className="h-1 bg-gradient-to-r from-transparent via-amber-800 to-transparent mt-4 mx-auto rounded-full"/>
      </div>
    </motion.div>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:styles}}/>
      <LoadingScreen/>
      
      <AnimatePresence>
        {showIntro && <IntroAnimation />}
      </AnimatePresence>

      {!showIntro && (
        <div 
          className="crime-body relative min-h-screen"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="grain fixed inset-0 pointer-events-none z-2"/>
          <div className="vignette fixed inset-0 pointer-events-none z-1"/>
          
          <header className={`sticky-head ${isNavVisible ? '' : 'hidden'}`}>
            <div className="max-w-8xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-5">
                  <motion.div 
                    className="w-16 h-16 rounded-xl bg-black/40 border border-gray-800 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 5h18M5 5v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3L9 7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/><path d="M15 3L15 7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h1 className="text-2xl dossier-title">THE CRIME ARCHIVES</h1>
                    <p className="text-xs text-gray-500 mt-1 font-mono">CLASSIFIED • ULTIMATE EDITION</p>
                  </motion.div>
                </div>
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex view-toggle rounded-lg p-1 bg-gray-900/50">
                    {['grid','list'].map((mode)=>(<button key={mode} onClick={()=>setViewMode(mode)} className={`px-3 py-1 rounded-md text-sm capitalize transition-all ${viewMode===mode?'bg-amber-900/30 text-amber-400':''}`}>{mode}</button>))}
                  </div>
                </motion.div>
              </div>
              <motion.div 
                className="flex flex-wrap gap-4 items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-wrap gap-3">
                  {['all','active','unsolved','closed'].map((filter)=>(<button key={filter} onClick={()=>setActiveFilter(filter)} className={`filter-btn px-4 py-2 rounded-lg text-sm capitalize ${activeFilter===filter?'active':''}`}>{filter}</button>))}
                </div>
                <div className="search-box rounded-lg px-4 py-2 min-w-80"><input type="text" placeholder="Search cases..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500"/></div>
              </motion.div>
              <motion.div 
                className="flex flex-wrap gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {allTags.map((tag)=>(<button key={tag} onClick={()=>{const newTags=new Set(selectedTags);if(newTags.has(tag))newTags.delete(tag);else newTags.add(tag);setSelectedTags(newTags);}} className={`tag-filter px-3 py-1 rounded-full text-xs ${selectedTags.has(tag)?'active':''}`}>{tag}</button>))}
              </motion.div>
            </div>
          </header>

          <main className="max-w-8xl mx-auto px-6 pb-32 relative z-10">
            <motion.section 
              className={`${viewMode==='grid'?'grid xl:grid-cols-3 md:grid-cols-2 gap-8':'flex flex-col gap-6'}`} 
              initial={{opacity:0}} 
              animate={{opacity:1}} 
              transition={{duration:0.8,delay:1}}
            >
              {filteredStories.map((s,idx)=>(
                <motion.article 
                  key={s.id} 
                  layout 
                  initial={{opacity:0,y:40}} 
                  animate={{opacity:1,y:0}} 
                  transition={{delay:1 + idx*0.1,type:'spring',stiffness:80,damping:12}} 
                  whileHover={{y:viewMode==='grid'?-8:-4}} 
                  onClick={()=>openStory(s)} 
                  className={`card rounded-2xl overflow-hidden cursor-pointer group ${viewMode==='list'?'flex':''}`}
                >
                  <div className={`${viewMode==='list'?'w-48 flex-shrink-0':'h-64'} overflow-hidden relative`}>
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover image-dim"/>
                    <div className="absolute top-4 left-4 category-tag">{s.category}</div>
                    <div className="absolute top-4 right-4 text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">#{('00'+s.id).slice(-2)}</div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <div className={`status-badge status-${s.status.toLowerCase()}`}>{s.status}</div>
                      <div className={`status-badge priority-${s.priority.toLowerCase()}`}>{s.priority}</div>
                    </div>
                  </div>
                  <div className={`p-7 relative ${viewMode==='list'?'flex-1':''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h2 className={`font-['Crimson_Text'] font-semibold leading-tight flex-1 pr-4 ${viewMode==='list'?'text-2xl':'text-xl'}`}>{s.title}</h2>
                      <div className="meta-tag text-nowrap">{s.date}</div>
                    </div>
                    <p className="mt-3 text-gray-300 leading-relaxed text-sm" style={{minHeight:'4rem'}}>{s.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {s.evidence.slice(0,3).map((evidence,idx)=>(<span key={idx} className="evidence-tag text-xs">{evidence}</span>))}
                      {s.evidence.length>3&&(<span className="evidence-tag text-xs">+{s.evidence.length-3} more</span>)}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-xs text-gray-500 font-mono">{s.witnesses} witnesses</div>
                      <div className="text-sm read-more font-medium">Analyze Case →</div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.section>
            {filteredStories.length===0&&(<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center py-20"><div className="text-6xl mb-4">🔍</div><h3 className="text-xl text-gray-400 mb-2">No cases found</h3><p className="text-gray-600">Try adjusting your search or filters</p></motion.div>)}
          </main>

          <AnimatePresence>
            {selected&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center px-6 py-8" onClick={closeModal}>
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/90 backdrop-blur-md"/>
              <motion.div initial={{scale:0.95,y:20,opacity:0}} animate={{scale:1,y:0,opacity:1}} exit={{scale:0.95,y:20,opacity:0}} transition={{type:"spring",damping:25,stiffness:300}} className="modal relative max-w-6xl w-full rounded-3xl overflow-hidden" onClick={(e)=>e.stopPropagation()}>
                <div className="h-96 overflow-hidden relative">
                  <img src={selected.image} alt={selected.title} className="w-full h-full object-cover filter sepia(0.3) brightness(0.6)"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"/>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="category-tag">{selected.category}</div>
                      <div className={`status-badge status-${selected.status.toLowerCase()}`}>{selected.status}</div>
                      <div className={`status-badge priority-${selected.priority.toLowerCase()}`}>{selected.priority}</div>
                    </div>
                    <h2 className="text-5xl font-['Playfair_Display'] font-semibold text-amber-100 mb-2">{selected.title}</h2>
                    <div className="flex items-center gap-6">
                      <div className="text-lg text-amber-200/80">{selected.date}</div>
                      <div className="text-amber-200/60">•</div>
                      <div className="text-lg text-amber-200/80">{selected.witnesses} witnesses</div>
                    </div>
                  </div>
                </div>
                <div className="p-10 modal-content">
                  <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
                    <h4 className="font-['Crimson_Text'] font-semibold text-lg mb-3 text-amber-200">Case Evidence</h4>
                    <div className="flex flex-wrap gap-3">
                      {selected.evidence.map((item,idx)=>(<motion.span key={idx} initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{delay:0.5+idx*0.1}} className="evidence-tag bg-amber-900/20 border-amber-700/30 text-amber-200">{item}</motion.span>))}
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-200 leading-relaxed text-lg">
                      <p className="dropcap">{isClient?(typedText||(typingRef.current.running?'▊':selected.content)):selected.content}</p>
                    </div>
                  </div>
                  <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-800">
                    <div className="text-sm text-gray-500 font-mono">CLASSIFIED • CASE #{('00'+selected.id).slice(-2)}</div>
                    <div className="flex items-center gap-6">
                      <motion.button whileHover={{scale:1.05,x:-2}} whileTap={{scale:0.95}} onClick={()=>{const curIdx=STORIES.findIndex((x)=>x.id===selected.id);const prev=STORIES[(curIdx-1+STORIES.length)%STORIES.length];setSelected(prev);setTypedText('');setTimeout(()=>startTyping(prev.content),140);}} className="text-amber-400 hover:text-amber-300 transition font-medium flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-900/20 hover:bg-amber-900/30">← Previous Case</motion.button>
                      <motion.button whileHover={{scale:1.05,x:2}} whileTap={{scale:0.95}} onClick={()=>{const curIdx=STORIES.findIndex((x)=>x.id===selected.id);const next=STORIES[(curIdx+1)%STORIES.length];setSelected(next);setTypedText('');setTimeout(()=>startTyping(next.content),140);}} className="text-amber-400 hover:text-amber-300 transition font-medium flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-900/20 hover:bg-amber-900/30">Next Case →</motion.button>
                      <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={closeModal} className="text-gray-400 hover:text-gray-200 transition font-medium px-6 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700">Close Dossier</motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>)}
          </AnimatePresence>

          <AnimatePresence>
            {notification&&(<motion.div initial={{opacity:0,x:100}} animate={{opacity:1,x:0}} exit={{opacity:0,x:100}} className="notification"><div className="flex items-center gap-3"><div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"/><span className="text-sm">{notification.message}</span></div></motion.div>)}
          </AnimatePresence>

          <footer className="max-w-8xl mx-auto px-6 mt-20 pb-12 text-center relative z-10">
            <div className="border-t border-gray-800 pt-12">
              <p className="text-sm text-gray-500 mb-4 font-mono">© 2025 THE CRIME ARCHIVES • ULTIMATE PREMIUM EDITION</p>
              <p className="text-xs text-gray-600 font-['Crimson_Text'] italic max-w-2xl mx-auto">"In the silence between heartbeats, truth whispers its secrets. We are listening."</p>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}
