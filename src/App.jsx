import Cursor from './components/Cursor'
import NeuralBackground from './components/NeuralBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: '#050816' }}>
      {/* Global canvas background */}
      <NeuralBackground />

      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
    </div>
  )
}
