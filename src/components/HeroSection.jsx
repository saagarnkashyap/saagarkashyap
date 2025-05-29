import React from "react";
import { useState, useEffect } from "react";

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
      <div className="flex justify-center my-10">
        <a
          href="https://drive.google.com/file/d/1PmHVia_R07oJZO86tsr_g103YDXB2JGR/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className=" flex items-center space-x-2 justify-start bg-black text-white 
              rounded-lg px-6 py-3 hover:bg-[#24292f] hover:scale-105 
              transition-all duration-300 bg-gradient-to-r from-[#ff0080] to-[#7928CA] text-white px-6 py-3 
          rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          Resume
        </a>
      </div>
    </div>
  );
}

export default HeroSection;
