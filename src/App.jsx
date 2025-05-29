import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import About from './components/About'
// import Experience from './components/Experience'
import Skills from './components/Skills'
import Certifications from "./components/Certifications";
import Education from './components/Education'
import Projects from './components/Projects'
import Particle from './components/Particle'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'

const App = () => {
  return (
    <>
    
      <Particle />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <PageLoader />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection />
          <About />
          {/* <Experience /> */}
          
          <Skills />
          <Education />
          <Projects />
          <Footer />
        </div>
      </main>
    </>
  )
}

export default App
