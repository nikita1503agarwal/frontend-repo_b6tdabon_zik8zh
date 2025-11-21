import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[480px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/C5lv0-cXORBFwnsP/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient veil that won't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950/80" />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
              Billing Flow Visualizer
            </h1>
            <p className="mt-4 text-slate-200/90 text-lg md:text-xl">
              Watch a complete, step-by-step billing process come to life with smooth animations and live status updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
