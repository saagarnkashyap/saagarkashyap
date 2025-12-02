import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionId = "about";
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id={sectionId} ref={aboutRef} className="relative mt-10 border-b border-neutral-800 min-h-[500px] pt-16">
      <div className='text-center'>
        <h2 className="text-2xl sm:text-2xl lg:text-3xl mt-10 lg:mt-5 tracking-wide 
            bg-gradient-to-r from-[#ff0080] to-[#7928CA] bg-clip-text text-transparent uppercase 
            relative inline-block px-6 py-3 border border-[#ff0080] rounded-lg shadow-lg"
          style={{
            textShadow: "2px 2px 6px rgba(255, 0, 128, 0.6)",
            WebkitTextStroke: "1px #ff0080",
            boxShadow: "4px 4px 12px rgba(255, 0, 128, 0.4)"
          }}>About Me</h2>
        <div className="text-lg sm:text-xl text-center text-neutral-400 mt-20 px-4 py-2 about-text">
          <p className="text-justify mb-5">
            I’m a data-driven creator who blends logic with soul, building impactful tools like <strong>Bheeshma</strong>, a web-based Bhagavad Gita companion, and <strong>Ridezilla</strong>, a cycling performance platform.
          </p>

          <p className="text-justify mb-5">
            Beyond code, I write poetry, edit music, and view the world through mindful observation. Whether capturing moments via mobile photography and videography or designing meaningful products, I strive to notice what others overlook.
          </p>

          <p className="text-justify mb-5">
            I transform insight into real-world impact, with the hope of contributing meaningfully to the wellbeing of the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
