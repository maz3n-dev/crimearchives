'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
  THE CRIME ARCHIVES — page.jsx
  - Premium dark styling
  - Modal story viewer with slower typewriter (65ms/char)
  - Softer mechanical keystroke sound
  - Extended, more realistic stories (4x longer)
*/

export default function Page() {
  // stories (6 total) - now 4x longer and more realistic
  const STORIES = [
    {
      id: 1,
      title: 'Case 01: The Echoing Apartment',
      date: 'Filed Jan 12, 2025',
      summary:
        'A psychologist reports auditory phenomena in her new apartment - footsteps that continue walking after she stops.',
      content: `Dr. Eleanor Vance had always been skeptical of paranormal claims. As a clinical psychologist specializing in auditory hallucinations, she believed every phenomenon had a rational explanation. That conviction was tested when she moved into the old Brownstone apartment on Carver Street.

The first incident occurred on her third night. After turning off the lights and settling into bed, she heard what sounded like her own footsteps continuing down the hallway. The rhythm was identical to hers - the same slight drag of her right foot, the same pace. She checked the apartment thoroughly, finding nothing.

Over the next two weeks, the phenomenon intensified. The footsteps would sometimes continue for up to thirty seconds after she stopped walking. She set up audio recording equipment, conducted frequency analyses, and even consulted with an acoustic engineer. The engineer found something peculiar - the echoes weren't reflecting normally. They seemed to be generating from multiple points in the apartment simultaneously.

The breakthrough came when Eleanor noticed the footsteps would only occur when she was alone. When her colleague visited, the apartment remained silent. She began experimenting, discovering that the footsteps would mimic not just her walking pattern, but her emotional state. When she was anxious, they hurried. When she was calm, they slowed.

Her final experiment involved setting up twelve synchronized recorders throughout the apartment. The results were chilling. The recordings showed the footsteps weren't echoes at all - they were separate, distinct footfalls occurring milliseconds after hers, with subtle variations in weight distribution and gait that no echo could produce.

The last entry in her research journal read: "The apartment isn't echoing my steps. It's learning them. And tonight, for the first time, the footsteps started before I did."`,
      image:
        'https://images.unsplash.com/photo-1508138221679-760a23a2285b?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 2,
      title: 'Case 02: The Lighthouse Keeper\'s Legacy',
      date: 'Filed Feb 8, 2025',
      summary:
        'The last entries in a missing lighthouse keeper\'s journal describe events that haven\'t happened yet.',
      content: `The Stormhaven Lighthouse had been automated for years when the journal was discovered during routine maintenance. The keeper, Samuel Petrovich, had vanished in 2018 without explanation. His journal, found sealed in a waterproof case, contained entries dated up to 2026.

The first concerning entry described the maintenance crew's discovery: "They will find this journal on February 8th, 2025. The tall one with glasses will drop his wrench when he reads this sentence." Maintenance supervisor Carl Jenkins did indeed drop his wrench when he reached that passage.

As investigators read further, they found increasingly specific predictions. The journal described weather patterns with perfect accuracy, stock market movements, and even personal details about the investigation team. Most disturbingly, it chronicled events that were yet to occur.

Forensic analysis confirmed the ink was decades old, and the paper showed appropriate aging. Handwriting experts verified it was Petrovich's writing. Yet the journal contained knowledge of technologies and events that didn't exist when he disappeared.

The investigation revealed Petrovich had been researching temporal anomalies around the lighthouse. Local fishermen had long reported "time slips" in the area - moments when radio transmissions would suddenly broadcast news from different decades. Petrovich's research notes suggested he believed the lighthouse stood at a "temporal weak point."

The final entry, dated just last week, reads: "They think I'm predicting the future. They're wrong. I'm reading yesterday's newspaper from tomorrow. The lighthouse isn't a beacon for ships - it's a lens for time. And someone is looking back through it." The entry continues with a detailed description of this exact moment, including the investigator's growing unease while reading these words.`,
      image:
        'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 3,
      title: 'Case 03: The Posthumous Portraits',
      date: 'Filed Mar 3, 2025',
      summary:
        'A forensic photographer discovers that portraits of deceased subjects gradually change expression over time.',
      content: `Marcus Thorne had been a forensic photographer for twenty years when he noticed the pattern. It started with the Anderson case - a drowning victim whose post-mortem photos seemed to show a slight smile that hadn't been present during the autopsy. At first, he dismissed it as a trick of the light or digital artifact.

Then came the Martinez homicide. The crime scene photos showed the victim's expression as neutral, but when Thorne reviewed them weeks later during trial preparation, the face showed clear signs of fear. The defense tried to have the evidence thrown out, claiming tampering.

Thorne began a systematic study, taking identical shots with both digital and film cameras, storing them in controlled conditions, and reviewing them weekly. The results were consistent and unsettling. In approximately 15% of deceased subjects, facial expressions in photographs would gradually change over a period of 2-6 weeks. The changes were subtle but measurable - micro-expressions that shifted toward fear, surprise, or in rare cases, peace.

His investigation led him to Dr. Isabelle Chen, a neurologist studying post-mortem neural activity. Her research suggested that certain photographic processes might interact with residual electrical activity in recently deceased neural tissue. "We're not capturing light," she theorized, "we're capturing the last patterns of consciousness."

Their joint research uncovered something even more remarkable. When they compared the changing expressions with the victims' known final moments, there was an 89% correlation with what the person likely experienced before death. The photographs weren't decaying - they were developing a more accurate representation of the subject's final emotional state.

The project was shut down after Thorne's own portrait, taken as a control subject, began showing signs of stress he hadn't experienced yet. Two days later, he received the cancer diagnosis. His final note reads: "The camera sees what we cannot. And sometimes, what we should not."`,
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 4,
      title: 'Case 04: The Chronometric Murders',
      date: 'Filed Apr 15, 2025',
      summary:
        'A watchmaker\'s clients die exactly when their antique timepieces chime midnight, regardless of the actual time.',
      content: `The first death was written off as coincidence. Arthur Pendleton, 68, collapsed of a massive coronary at exactly midnight. His wife noted that their antique grandfather clock chose that moment to chime for the first time in years.

The second death raised eyebrows. Margaret Chen, 45, drowned in her bathtub at midnight while the restored carriage clock on her mantel chimed. The medical examiner noted the time of death as "approximately midnight."

When the third victim died - security guard James Miller, found with his own pistol in his hand and a look of terror on his face exactly as his pocket watch chimed - Inspector Rebecca Moore began looking for connections. All three victims had recently had timepieces restored by the same artisan: Nikolai Volkov.

Volkov's shop was a museum of antique timekeeping. He specialized in restoring "significant" timepieces - clocks and watches with documented histories. His clients were wealthy collectors who paid enormous sums for his work.

Moore's investigation revealed a pattern: each victim had acquired a timepiece previously owned by someone who died violently. Pendleton's grandfather clock came from a family wiped out in a house fire. Chen's carriage clock was salvaged from a sunken ocean liner. Miller's pocket watch was taken from the body of a 19th-century duelist.

Forensic analysis of the timepieces showed subtle modifications. Volkov had installed secondary mechanisms that would trigger at specific celestial alignments, not mechanical time. He wasn't just repairing clocks; he was synchronizing them with what he called "cosmic rhythms."

In his workshop, Moore found Volkov's journal: "Time isn't linear. It's a river with eddies and currents. These timepieces act as anchors, catching moments of high probability and making them inevitable. The previous owners didn't just own these clocks - they invested them with their life force. Now that energy seeks release."

Volkov remains at large. The last entry warns: "The great clock ticks toward alignment. Seven timepieces remain, and seven deaths will complete the circuit."`,
      image:
        'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 5,
      title: 'Case 05: The Lacustrine Chorus',
      date: 'Filed May 9, 2025',
      summary:
        'Underwater recordings from a deep lake reveal voices that adapt their message to each listener.',
      content: `The research team from Oceanic Audio had been studying thermocline layers in Lake Veridian when they made the first recording. At 300 feet depth, their hydrophones picked up what sounded like choral music. The initial assumption was equipment malfunction or distant boat interference.

But the recordings persisted. Over two weeks, they captured hours of what became known as the "Lacustrine Chorus" - complex harmonic arrangements that seemed to follow musical rules, but in patterns never documented in human music.

Dr. Aris Thorne, the team's lead researcher, made the breakthrough discovery. When different team members listened to the same recording, they heard different lyrics. More remarkably, the lyrics each person heard were personally meaningful - references to childhood memories, lost loved ones, or private thoughts.

The phenomenon was reproducible and measurable. Brain scans showed that the audio stimulus triggered unique neural patterns in each listener, as if the sound was interacting directly with their consciousness. The lake wasn't producing sound; it was producing a carrier wave that the human brain interpreted personally.

Historical research revealed why. Lake Veridian was created in 1948 by flooding the town of Millhaven to build a reservoir. The town's population of 1,427 was relocated, but the cemetery with 2,000 graves remained underwater. The chorus appeared to be strongest directly above the submerged town center.

Thorne's theory was revolutionary: "The limestone bedrock beneath the lake acts as a natural recording medium. Emotional energy from the displaced community was imprinted on the stone. The water pressure and specific mineral content create conditions where these 'recordings' can be played back, but they require a conscious mind to decode them."

The research was classified after team members began hearing warnings about future events that later came true. The final report concluded: "Lake Veridian doesn't contain voices. It contains the template for consciousness itself, and we are the needles that play the record."`,
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 6,
      title: 'Case 06: The Department Store Anomalies',
      date: 'Filed Jun 22, 2025',
      summary:
        'Security footage from a closing department store shows mannequins changing positions between camera frames.',
      content: `The call came from night security at the old Harrison's Department Store, scheduled for demolition in thirty days. The guards reported minor disturbances - items moved, lights turning on, faint footsteps. Standard stuff for an old building, until they reviewed the security footage.

The cameras showed the mannequins on the third floor changing positions between frames. Not dramatically - a hand slightly lowered, a head tilted a few degrees, a shift in weight from one leg to another. The changes were subtle but physically impossible given the mannequins were solid fiberglass mounted on heavy bases.

Security supervisor Maria Rodriguez brought in forensic video analyst David Chen. His frame-by-frame analysis confirmed the phenomenon. The mannequins were indeed moving, but only during the 1/1000th second when the cameras were between exposures. They were moving in the dark.

Chen set up high-speed cameras and motion sensors. The results were baffling. The mannequins remained perfectly still for hours, then would all move simultaneously in a coordinated fashion that lasted less than a millisecond. The motion sensors never triggered because the movement was too fast.

Historical research revealed that Harrison's had been built on the site of the old City Opera House, which burned down in 1927 with significant loss of life. The mannequins, it turned out, were not standard retail displays. They were artistic creations commissioned in 1952 by the store's eccentric owner, who had been obsessed with the opera house fire.

Each mannequin was modeled after a specific opera performer who died in the fire. Their poses replicated moments from final performances. Chen discovered that the movements corresponded to the next logical movements in those opera scenes, as if the performances were continuing at high speed.

The final surveillance night captured something new. As the demolition crew arrived at dawn, every mannequin on the third floor simultaneously turned to face the cameras and, for three full seconds, held perfectly still while making eye contact with the lens. Then they returned to their original positions.

The store was demolished as scheduled. The final report noted: "The phenomena weren't hauntings. They were recordings playing back at the wrong speed. The real question isn't why they moved, but why they stopped when we were watching."`,
      image:
        'https://www.shutterstock.com/image-photo/12032024-phuket-thailand-mannequin-severed-600nw-2498518113.jpg',
    },
  ]

  // ----- local state
  const [selected, setSelected] = useState(null) // selected story object
  const [typedText, setTypedText] = useState('') // currently displayed typed text
  const [isClient, setIsClient] = useState(false) // Fix for hydration
  const typingRef = useRef({ running: false, timeoutIds: [] })
  const audioRef = useRef({ ctx: null, masterGain: null })

  // Set client-side flag to fix hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // create & inject fonts once
  useEffect(() => {
    const id = 'crime-archives-fonts'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href =
        'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500&family=Spectral+SC:wght@400;600&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  // initialize audio context for mechanical click synthesis
  useEffect(() => {
    // create AudioContext lazily on first use (some browsers require user gesture)
    audioRef.current.ctx = null
    audioRef.current.masterGain = null
    return () => {
      // cleanup audio context on unmount
      try {
        audioRef.current.ctx?.close?.()
      } catch (e) {}
    }
  }, [])

  // function to synthesize a softer, more relaxed mechanical sound
  function playTypewriterSound() {
    try {
      if (!audioRef.current.ctx) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const master = ctx.createGain()
        master.gain.value = 0.5 // even lower volume for softer sound
        master.connect(ctx.destination)
        audioRef.current.ctx = ctx
        audioRef.current.masterGain = master
      }
      const ctx = audioRef.current.ctx
      const master = audioRef.current.masterGain
      if (!ctx) return

      // Create a softer, more typewriter-like sound
      const now = ctx.currentTime
      
      // Main click - softer and lower frequency
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.value = 500 // lower frequency for softer sound
      const osc1Gain = ctx.createGain()
      osc1Gain.gain.value = 0.001
      
      // Gentle noise layer for mechanical texture
      const noiseBuffer = ctx.createBuffer(1, 0.02 * ctx.sampleRate, ctx.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      for (let i = 0; i < noiseBuffer.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseBuffer.length * 0.3))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = noiseBuffer
      const noiseGain = ctx.createGain()
      noiseGain.gain.value = 0.008
      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'lowpass'
      noiseFilter.frequency.value = 800
      
      // Envelopes for softer attack and decay
      osc1Gain.gain.setValueAtTime(0.001, now)
      osc1Gain.gain.linearRampToValueAtTime(0.015, now + 0.002)
      osc1Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
      
      noiseGain.gain.setValueAtTime(0.008, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)
      
      // Connect nodes
      osc1.connect(osc1Gain)
      osc1Gain.connect(master)
      
      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(master)
      
      // Start and stop
      osc1.start(now)
      osc1.stop(now + 0.06)
      noise.start(now)
      noise.stop(now + 0.05)
      
    } catch (e) {
      // audio might be blocked by browser autoplay policy until user gesture
      // we simply ignore audio errors gracefully
    }
  }

  // stop any running typing animation and clear timeouts
  function stopTyping() {
    typingRef.current.running = false
    typingRef.current.timeoutIds.forEach((id) => clearTimeout(id))
    typingRef.current.timeoutIds = []
    setTypedText('')
  }

  // Start typing the story content in the modal with mechanical clicks per letter
  function startTyping(content) {
    stopTyping()
    const speedMs = 65 // Maintain the slower typing speed
    typingRef.current.running = true
    const chars = content.split('')
    let buffer = ''
    const timeouts = []
    
    // Play sound less frequently for a more relaxed feel
    let soundCounter = 0
    
    chars.forEach((ch, idx) => {
      const delay = idx * speedMs
      const t = setTimeout(() => {
        // append char
        buffer += ch
        setTypedText(buffer)
        
        // Play sound for about 60% of characters, skipping spaces and some punctuation
        if (ch.trim() !== '' && soundCounter % 2 === 0) {
          playTypewriterSound()
        }
        soundCounter++
        
        // if finished
        if (idx === chars.length - 1) {
          typingRef.current.running = false
        }
      }, delay)
      timeouts.push(t)
    })
    typingRef.current.timeoutIds = timeouts
  }

  // open story modal: start typing its content
  function openStory(story) {
    setSelected(story)
    // slight delay to let modal animate in, then type
    setTypedText('')
    setTimeout(() => {
      startTyping(story.content)
    }, 180) // sync with modal animation
  }

  // close modal and stop typing & audio
  function closeModal() {
    stopTyping()
    setSelected(null)
  }

  // keyboard navigation: Esc closes, left/right navigate
  useEffect(() => {
    function onKey(e) {
      if (!selected) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        // next story
        const curIdx = STORIES.findIndex((s) => s.id === selected.id)
        const next = STORIES[(curIdx + 1) % STORIES.length]
        setSelected(next)
        // start typing new content
        setTypedText('')
        setTimeout(() => startTyping(next.content), 120)
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
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

  // CSS styles moved to external stylesheet approach to fix hydration
  const styles = `
    :root{
      --bg-0: #070707;
      --bg-1: #0d0d10;
      --paper: rgba(255,255,255,0.02);
      --accent: #c57b20;
      --muted: #9aa0a6;
    }
    html,body,#root { height: 100%; }
    .crime-body {
      min-height: 140vh;
      background: radial-gradient(1200px 600px at 10% 10%, rgba(30,30,30,0.2), transparent),
                  linear-gradient(180deg, var(--bg-0) 0%, var(--bg-1) 60%);
      color: #e6e6e6;
      font-family: 'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .grain {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
      pointer-events: none;
    }
    .vignette {
      position: absolute; 
      inset: 0; 
      box-shadow: inset 0 300px 350px rgba(0,0,0,0.7); 
      pointer-events: none;
    }
    .sticky-head {
      position: sticky; 
      top: 0; 
      backdrop-filter: blur(6px); 
      background: linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25));
      border-bottom: 1px solid rgba(255,255,255,0.02);
      z-index: 40;
    }
    .dossier-title {
      font-family: 'Spectral SC', serif;
      letter-spacing: 0.12em;
      color: var(--accent);
      text-shadow: 0 6px 28px rgba(197,123,32,0.06);
    }
    .card {
      background: linear-gradient(180deg, rgba(255,255,255,0.014), rgba(255,255,255,0.008));
      border: 1px solid rgba(255,255,255,0.03);
    }
    .image-dim { 
      filter: grayscale(1) contrast(0.95) sepia(0.06); 
      transition: filter .6s ease, transform .6s ease; 
    }
    .card:hover .image-dim { 
      filter: none; 
      transform: scale(1.02); 
    }
    .meta-tag { 
      font-size: 0.78rem; 
      color: var(--muted); 
      letter-spacing: 0.08em; 
      text-transform: uppercase; 
    }
    .read-more { 
      color: #ff6a6a; 
      text-decoration: underline; 
      text-underline-offset: 4px; 
    }
    .modal {
      background: linear-gradient(180deg, rgba(10,10,10,0.96), rgba(6,6,6,0.96));
      border: 1px solid rgba(255,255,255,0.03);
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-content {
      max-height: calc(90vh - 300px);
      overflow-y: auto;
    }
    .dropcap::first-letter {
      float: left;
      font-size: 3.2rem;
      line-height: 1;
      margin-right: 0.6rem;
      font-weight: 700;
      color: var(--accent);
      font-family: 'Spectral SC', serif;
    }
    .title-pulse { 
      position: relative; 
    }
    .title-pulse::after {
      content: '';
      position: absolute; 
      inset: -10px; 
      z-index: -1;
      background: radial-gradient(closest-side, rgba(197,123,32,0.06), transparent 40%);
      border-radius: 8px;
      animation: heartbeat 4s ease-in-out infinite;
    }
    @keyframes heartbeat {
      0%,100% { 
        transform: scale(1); 
        opacity: 0.06; 
      }
      50% { 
        transform: scale(1.02); 
        opacity: 0.12; 
      }
    }
    @media (max-width: 720px) {
      .dropcap::first-letter { 
        font-size: 2.2rem; 
        margin-right: 0.45rem; 
      }
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div className="crime-body relative min-h-screen">
        <div className="grain absolute inset-0 pointer-events-none" />
        <div className="vignette" />

        {/* header */}
        <header className="sticky-head">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-black/40 border border-gray-800 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 5h18M5 5v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5" stroke="#c57b20" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-lg dossier-title title-pulse">THE CRIME ARCHIVES</h1>
            </div>
            <div className="text-sm text-gray-400 italic">Filed by Writer Maya Aly · 2025</div>
          </div>
        </header>

        {/* main grid */}
        <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
          <section className="grid md:grid-cols-2 gap-10">
            {STORIES.map((s, idx) => (
              <motion.article
                key={s.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12, type: 'spring', stiffness: 80 }}
                onClick={() => openStory(s)}
                className="card rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                aria-label={`Open ${s.title}`}
              >
                <div className="h-64 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover image-dim" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-['Spectral_SC']">{s.title}</h2>
                    <div className="meta-tag">{s.date}</div>
                  </div>

                  <p className="mt-3 text-gray-300 leading-relaxed font-['IBM_Plex_Sans']" style={{ minHeight: '3.6rem' }}>
                    {s.summary}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-sm text-gray-400">Case file · {('00' + s.id).slice(-2)}</div>
                    <div className="text-sm read-more">Open case →</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </section>
        </main>

        {/* modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-black/70" />
              <motion.div
                initial={{ scale: 0.98, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 20 }}
                transition={{ duration: 0.28 }}
                className="modal relative max-w-4xl w-full rounded-3xl overflow-hidden border-gray-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-72 overflow-hidden">
                  <img src={selected.image} alt={selected.title} className="w-full h-full object-cover grayscale" />
                </div>

                <div className="p-10 modal-content">
                  <h2 className="text-3xl font-['Spectral_SC'] text-amber-400 mb-2">{selected.title}</h2>
                  <div className="text-sm text-gray-400 mb-6">{selected.date}</div>

                  {/* typed content area */}
                  <div className="prose max-w-none text-gray-300">
                    <p
                      className="dropcap font-['IBM_Plex_Sans'] text-[1.04rem] leading-relaxed whitespace-pre-line"
                      aria-live="polite"
                    >
                      {isClient ? (typedText || (typingRef.current.running ? '' : selected.content)) : selected.content}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="text-sm text-gray-400">Filed in Confidential</div>
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => {
                          // next
                          const curIdx = STORIES.findIndex((x) => x.id === selected.id)
                          const next = STORIES[(curIdx + 1) % STORIES.length]
                          setSelected(next)
                          setTypedText('')
                          setTimeout(() => startTyping(next.content), 140)
                        }}
                        className="text-amber-400 hover:text-amber-300 transition"
                      >
                        Next Case →
                      </button>

                      <button onClick={closeModal} className="text-gray-400 hover:text-gray-200">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* footer */}
        <footer className="max-w-6xl mx-auto px-6 mt-16 pb-8 text-center text-sm text-gray-500">
          © 2025 The Crime Archives · Writer Maya Mohamed Aly
        </footer>
      </div>
    </>
  )
}