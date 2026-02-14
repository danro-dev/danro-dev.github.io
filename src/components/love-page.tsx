import { Heart } from 'lucide-react'

const floatingHearts = [
  { left: '8%', delay: '0s', duration: '7s', size: 'text-3xl' },
  { left: '22%', delay: '1.2s', duration: '9s', size: 'text-2xl' },
  { left: '36%', delay: '0.6s', duration: '8.5s', size: 'text-4xl' },
  { left: '51%', delay: '2s', duration: '10s', size: 'text-2xl' },
  { left: '67%', delay: '0.8s', duration: '8s', size: 'text-3xl' },
  { left: '81%', delay: '1.5s', duration: '9.5s', size: 'text-2xl' },
  { left: '92%', delay: '0.4s', duration: '7.5s', size: 'text-3xl' },
]

function LoveFlap({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`love-flap love-flap-${side}`}>
      <span className="love-lobe love-lobe-left" />
      <span className="love-lobe love-lobe-right" />
      <span className="love-point" />
    </div>
  )
}

export default function LovePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-rose-100 via-pink-100 to-violet-100 px-4 py-14 text-slate-800">
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

      <section className="glass relative z-10 w-full max-w-4xl rounded-3xl border border-white/50 bg-white/55 p-8 text-center shadow-[0_20px_70px_rgba(244,114,182,0.2)] backdrop-blur-md md:p-12">
        <p className="mb-3 text-xs tracking-[0.35em] text-rose-500 uppercase md:text-sm">Para mi princesa</p>
        <h1 className="mb-3 text-4xl leading-tight font-bold text-rose-600 md:text-6xl">Te amo Sami</h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-700 md:text-xl">
          Eres mi persona favorita, mi calma y mi alegría. Gracias por existir y por hacer mi vida
          más bonita todos los días.
        </p>

        <div className="love-card-shell">
          <h2 className="love-card-title">Valentine&apos;s Day Card</h2>

          <div className="love-card" role="img" aria-label="Tarjeta animada con el mensaje Te amo Sami">
            <div className="love-message">Te amo Sami</div>
            <LoveFlap side="left" />
            <LoveFlap side="right" />
          </div>
        </div>
      </section>
    </main>
  )
}
