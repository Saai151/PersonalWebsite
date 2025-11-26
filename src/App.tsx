import { useState, useEffect, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Wrapped from './components/Wrapped'
import './App.css'

function App() {
  const [showWrapped, setShowWrapped] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  const handleNavClick = (href: string) => {
    // If clicking a nav link, close Wrapped first
    if (showWrapped) {
      setShowWrapped(false)
      // Wait for Wrapped to close, then scroll
      setTimeout(() => {
        scrollToSection(href)
      }, 300)
    } else {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToSection(href)
      }, 10)
    }
  }

  const scrollToSection = (href: string) => {
    // Update URL hash
    window.history.pushState(null, '', href)
    
    // Find the main scrollable container
    const mainElement = mainRef.current || document.querySelector('main')
    const element = document.querySelector(href)
    
    if (element && mainElement) {
      // Calculate scroll position
      const headerOffset = 80
      const elementRect = element.getBoundingClientRect()
      const mainRect = mainElement.getBoundingClientRect()
      
      // Calculate the position relative to the main container
      const scrollPosition = mainElement.scrollTop + (elementRect.top - mainRect.top) - headerOffset

      // Scroll the main container smoothly
      mainElement.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
    }
  }

  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash && !showWrapped) {
        setTimeout(() => scrollToSection(hash), 100)
      }
    }

    // Check for hash on initial load
    if (window.location.hash) {
      setTimeout(() => scrollToSection(window.location.hash), 500)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [showWrapped])

  // Expose scrollToSection for use in Sidebar
  useEffect(() => {
    // Store scroll function globally for debugging
    ;(window as any).scrollToSection = scrollToSection
  }, [])

  return (
    <div className="flex h-screen bg-spotify-dark text-spotify-text overflow-hidden">
      <Sidebar 
        onWrappedClick={() => setShowWrapped(true)} 
        onNavClick={handleNavClick}
        isWrappedOpen={showWrapped}
      />
      <div className="flex flex-col flex-1 overflow-hidden md:ml-[280px] bg-[#121212] relative">
        <Header />
        {showWrapped ? (
          <Wrapped onClose={() => setShowWrapped(false)} />
        ) : (
          <main ref={mainRef} className="flex-1 overflow-y-auto relative z-10">
            <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-emerald-900/50 to-[#121212] -z-10" />
            <div id="home">
              <Hero />
            </div>
            <div className="px-4 md:px-8 py-6 bg-[#121212]/50 backdrop-blur-3xl">
              <div id="about">
                <About />
              </div>
              <div id="education">
                <Education />
              </div>
              <div id="experience">
                <Experience />
              </div>
              <div id="projects">
                <Projects />
              </div>
              <div id="skills">
                <Skills />
              </div>
            </div>
          </main>
        )}
      </div>
      <Analytics />
    </div>
  )
}

export default App

