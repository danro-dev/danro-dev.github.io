import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

const floatingHearts = [
  { left: '8%', delay: '0s', duration: '7s', size: 'text-3xl' },
  { left: '22%', delay: '1.2s', duration: '9s', size: 'text-2xl' },
  { left: '36%', delay: '0.6s', duration: '8.5s', size: 'text-4xl' },
  { left: '51%', delay: '2s', duration: '10s', size: 'text-2xl' },
  { left: '67%', delay: '0.8s', duration: '8s', size: 'text-3xl' },
  { left: '81%', delay: '1.5s', duration: '9.5s', size: 'text-2xl' },
  { left: '92%', delay: '0.4s', duration: '7.5s', size: 'text-3xl' },
]

interface ClickHeart {
  id: number
  x: number
  y: number
}

const verses = [
  {
    title: "Amor Eterno",
    author: "Gustavo Adolfo Bécquer",
    text: "Podrá nublarse el sol eternamente;\nPodrá secarse en un instante el mar;\nPodrá romperse el eje de la tierra\nComo un cristal débil.\n\n¡Todo sucederá! Podrá la muerte\nCubrirme con su fúnebre crespón;\nPero jamás en mí podrá apagarse\nLa llama de tu amor."
  },
  {
    title: "Me gusta cuando callas",
    author: "Pablo Neruda",
    text: "Me gusta cuando callas porque estás como ausente,\ny me oyes desde lejos, y mi voz no te toca.\nParece que los ojos se te hubieran volado\ny parece que un beso te cerrara la boca."
  },
  {
    title: "Arde en tus ojos",
    author: "Antonio Machado",
    text: "Arde en tus ojos un misterio, virgen\nesquiva y compañera.\nNo sé si es odio o es amor la lumbre\ninagotable de tu aljaba negra."
  },
  {
    title: "Te quiero",
    author: "Mario Benedetti",
    text: "Tus manos son mi caricia,\nmis acordes cotidianos;\nte quiero porque tus manos\ntrabajan por la justicia."
  },
  {
    title: "Amor constante",
    author: "Francisco de Quevedo",
    text: "Cerrar podrá mis ojos la postrera\nsombra que me llevare el blanco día,\ny podrá desatar esta alma mía\nhora a su afán ansioso lisonjera;\n\nmas no, de esotra parte, en la ribera,\ndejará la memoria, en donde ardía:\nnadar sabe mi llama la agua fría,\ny perder el respeto a ley severa."
  }
]

export default function LovePage() {
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([])
  const [showVerses, setShowVerses] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY
      
      // Reproducir sonido "love you"
      const utterance = new SpeechSynthesisUtterance('love you')
      utterance.rate = 1.2
      utterance.pitch = 1.3
      utterance.volume = 0.5
      window.speechSynthesis.speak(utterance)
      
      // Crear múltiples corazones con posiciones aleatorias alrededor del click
      const heartsToCreate = 5
      for (let i = 0; i < heartsToCreate; i++) {
        const offsetX = (Math.random() - 0.5) * 60
        const offsetY = (Math.random() - 0.5) * 60
        
        const newHeart: ClickHeart = {
          id: Date.now() + Math.random(),
          x: x + offsetX,
          y: y + offsetY,
        }
        
        setTimeout(() => {
          setClickHearts(prev => [...prev, newHeart])
          
          setTimeout(() => {
            setClickHearts(prev => prev.filter(heart => heart.id !== newHeart.id))
          }, 1000)
        }, i * 50)
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-rose-100 via-pink-100 to-violet-100 px-4 py-14 text-slate-800 select-none">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_55%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.75),transparent_40%)]" />

      <div className="pointer-events-none absolute inset-0">
        {floatingHearts.map((heart) => (
          <Heart
            key={`${heart.left}-${heart.delay}`}
            className={`absolute bottom-[-10%] ${heart.size} fill-rose-300/60 text-rose-400/70 love-heart-float`}
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
          />
        ))}
      </div>

      {clickHearts.map((heart) => (
        <Heart
          key={heart.id}
          className="pointer-events-none fixed fill-rose-500 text-rose-500 click-heart"
          size={24}
          style={{
            left: heart.x,
            top: heart.y,
          }}
        />
      ))}

      <section className="glass relative z-10 w-full max-w-4xl rounded-3xl border border-white/50 bg-white/55 p-8 text-center shadow-[0_20px_70px_rgba(244,114,182,0.2)] backdrop-blur-md md:p-12">
        <p className="mb-3 text-xs tracking-[0.35em] text-rose-500 uppercase md:text-sm">Para mi princesa</p>
        <h1 className="mb-3 text-4xl leading-tight font-bold text-rose-600 md:text-6xl">Te amo Sami</h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-700 md:text-xl">
          Eres mi persona favorita, mi calma y mi alegría. Gracias por existir y por hacer mi vida
          más bonita todos los días.
        </p>

        <button
          onClick={() => setShowVerses(!showVerses)}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-white font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          <Heart className="fill-white" size={20} />
          {showVerses ? 'Ver Carta' : 'Versos para ti'}
        </button>

        {!showVerses && !showVideo ? (
          <div className="love-letter">
            <div className="letter-header">
              <Heart className="inline-block fill-rose-500 text-rose-500 mb-2" size={32} />
              <h2 className="text-2xl font-bold text-rose-600 mb-4">Mi amor para ti</h2>
            </div>
            
            <div className="letter-content">
              <p className="mb-4">Querida Sami,</p>
              
              <p className="mb-4">
                Cada día a tu lado es un regalo. Tu sonrisa ilumina mis días más oscuros,
                y tu amor me hace sentir completo.
              </p>
              
              <p className="mb-4">
                Sé que todo puede ser difícil y que estamos lejos, pero quiero que sepas
                que pronto llegará el día en que seamos muy felices juntos y tú puedas
                hacer todo lo que desees.
              </p>
              
              <p className="mb-4">
                Eres la razón por la que creo en el amor verdadero. Contigo he encontrado
                mi hogar, mi paz y mi felicidad.
              </p>
              
              <p className="mb-4">
                Gracias por ser tú, por amarme como lo haces, y por hacer de cada momento
                juntos algo especial e inolvidable.
              </p>
              
              <p className="mb-6">
                Te amo hoy, mañana y siempre.
              </p>
              
              <div className="signature">
                <p className="text-xl font-bold text-rose-600">Con todo mi amor,</p>
                <p className="text-2xl font-bold text-rose-700 mt-2">Danro 💕</p>
              </div>
            </div>
            
            <div className="letter-decoration">
              <Heart className="heart-deco heart-deco-1 fill-rose-400 text-rose-400" size={20} />
              <Heart className="heart-deco heart-deco-2 fill-pink-400 text-pink-400" size={16} />
              <Heart className="heart-deco heart-deco-3 fill-rose-300 text-rose-300" size={18} />
            </div>
          </div>
        ) : showVerses ? (
          <div className="verses-container">
            <h2 className="text-3xl font-bold text-rose-600 mb-6">Versos para ti</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {verses.map((verse, index) => (
                <div key={index} className="verse-card">
                  <h3 className="text-xl font-bold text-rose-600 mb-2">{verse.title}</h3>
                  <p className="text-sm text-rose-500 mb-4 italic">— {verse.author}</p>
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">{verse.text}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setShowVerses(false); setShowVideo(true); }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-white font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Heart className="fill-white" size={20} />
              Ver Video
            </button>
          </div>
        ) : (
          <div className="video-container">
            <h2 className="text-3xl font-bold text-rose-600 mb-6">Un video para ti</h2>
            <div className="video-wrapper">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/_n1o4D6G_XE?si=IHAtCGRylPgZ_rH_&autoplay=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
            <button
              onClick={() => { setShowVideo(false); }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-white font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Heart className="fill-white" size={20} />
              Volver a la Carta
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
