import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBlog, FaProjectDiagram } from 'react-icons/fa';
import { MdWorkspacePremium } from 'react-icons/md';
import { GiSkills } from 'react-icons/gi';

const greetings = [
  "Hi", // English
  "Hola", // Spanish
  "Hello", // English
  "Bonjour", // French
  "ನಮಸ್ಕಾರ", // Kannada
    "Hallo", // German
    "Hello", // English
    "ನಮಸ್ಕಾರ", // Kannada
    "Olá", // Portuguese
    "Hello", // English
    "Привет", // Russian
    "ನಮಸ್ಕಾರ", // Kannada
    "Hello", // English
    "こんにちは", // Japanese
    "안녕하세요", // Korean
    "Hello", // English
    "ನಮಸ್ಕಾರ", // Kannada    
    "你好", // Chinese (Simplified)
    "ನಮಸ್ಕಾರ", // Kannada
    "नमस्ते", // Hindi
    "مرحبًا", // Arabic
    "Hello", // English
    "שלום", // Hebrew
    "สวัสดี", // Thai
    "नमस्कार", // Marathi
    "Hello", // English
    "नमस्ते", // Nepali   
    "హలో", // Telugu
    "வணக்கம்", // Tamil
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
    "ನಮಸ್ಕಾರ", // Kannada
    "നമസ്കാരം", // Malayalam
        
];

function HeroSection() {
  const navigate = useNavigate();
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);

  useEffect(() => {
    let greetingIndex = 0;
    const interval = setInterval(() => {
      greetingIndex = (greetingIndex + 1) % greetings.length;
      setCurrentGreeting(greetings[greetingIndex]);
    }, 300); // Change greeting every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h2 className="text-3xl sm:text-4xl text-center font-semibold">
        <span className="greeting bg-gradient-to-r from-[#b388ff] to-[#f5a623] bg-clip-text text-transparent">{currentGreeting}, I'm </span>
      </h2>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        <span className="bg-gradient-to-r from-[#ff0080] to-[#7928CA] bg-clip-text text-transparent">
          Saagar N Kashyap
        </span>
      </h1>
      <p className="mt-10 text-lg sm:text-xl text-justify text-neutral-500 font-mono max-w-4xl">
      AI/ML & Data-Driven CSE Student | Creator of Bheeshma & Ridezilla | Building Purposeful, Human-Centered Tools | Poetry. Photography. Possibility
      </p>
      <div className="flex flex-row flex-wrap justify-center gap-4 py-6 w-full">
        <button
          onClick={() => window.open("https://drive.google.com/file/d/1PmHVia_R07oJZO86tsr_g103YDXB2JGR/view?usp=drive_link", "_blank")}
          className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none"
        >
          Resume <span className="ml-1">↗</span>
        </button>
        <button
          onClick={() => navigate('/blog')}
          className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none"
        >
          Blog <span className="ml-1">↗</span>
        </button>
        <button
          onClick={() => navigate('/projects')}
          className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none"
        >
          Projects <span className="ml-1">↗</span>
        </button>
        <button
          onClick={() => navigate('/certifications')}
          className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none"
        >
          Certifications <span className="ml-1">↗</span>
        </button>
        <button
          onClick={() => navigate('/skills')}
          className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none"
        >
          Skills <span className="ml-1">↗</span>
        </button>
      </div>
      {/* ...About Me section and rest of content... */}
    </div>
  );
}

export default HeroSection;
