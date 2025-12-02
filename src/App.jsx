import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Projects from './pages/projects';
import Certifications from './pages/certifications';
import Skills from './pages/skills';
import Blog from './pages/blog';
import HeroSection from './components/HeroSection';
import Experience from './components/Experience';
import About from './components/About';
import Footer from './components/Footer';
import Particle from './components/Particle';
import PageLoader from './components/PageLoader';
import MyBlogs from './pages/blog/myblogs';
import Photography from './pages/blog/photography';

const App = () => {
  return (
    <>
      <Particle />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <PageLoader />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <About />
                <Experience />
                <Footer />
              </>
            } />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/myblogs" element={<MyBlogs />} />
            <Route path="/blog/photography" element={<Photography />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default App;
