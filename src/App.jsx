import Hero from './components/Hero'
import FlowVisualizer from './components/FlowVisualizer'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Background accent */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_50%_-100px,rgba(59,130,246,0.25),transparent_60%)]" />
      </div>

      <Hero />
      <FlowVisualizer />
      <Footer />
    </div>
  )
}

export default App
