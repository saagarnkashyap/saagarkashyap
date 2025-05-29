import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaJava,
  FaPython,
  FaHtml5,
  FaFileAlt,
  FaChartBar,
  FaBrain,
  FaUserTie,
  FaUsers,
  FaClock,
  FaGithub,
} from "react-icons/fa";
import {
  SiR,
  SiTableau,
  SiStreamlit,
  SiNumpy,
  SiPandas,
} from "react-icons/si";
import { MdOutlineCleaningServices } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Programming Languages",
    skills: [
      { icon: <FaJava />, name: "Java", color: "#f89820" },
      { icon: <FaPython />, name: "Python", color: "#3776ab" },
      { icon: <SiR />, name: "R", color: "#276DC3" },
      { icon: <FaHtml5 />, name: "HTML", color: "#e34c26" },
    ],
  },
  {
    category: "AI / Machine Learning and Data Science",
    skills: [
      { icon: <SiNumpy />, name: "NumPy", color: "#013243" },
      { icon: <SiPandas />, name: "Pandas", color: "#150458" },
      { icon: <FaChartBar />, name: "Matplotlib" },
      { icon: <FaChartBar />, name: "Seaborn" },
      { icon: <FaChartBar />, name: "Scikit-learn", color: "#f7931e" },
      { icon: <FaFileAlt />, name: "Excel" },
      { icon: <FaBrain />, name: "NLP" },
      { icon: <FaChartBar />, name: "Computer Vision" },
    ],
  },
  {
    category: "Web & Development Tools",
    skills: [
      { icon: <SiStreamlit />, name: "Streamlit", color: "#ff4b4b" },
      { icon: <FaGithub />, name: "GitHub", color: "#000000" },
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      { icon: <FaFileAlt />, name: "Report Writing" },
      { icon: <FaBrain />, name: "Critical Thinking" },
      { icon: <FaUserTie />, name: "Professionalism" },
      { icon: <FaUsers />, name: "Leadership" },
      { icon: <FaClock />, name: "Time Management" },
    ],
  },
];

const Skills = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".skill-card").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={skillsRef}
      id="skills"
      className="text-white py-16 px-6 border-b border-neutral-800 pt-16"
    >
      <div className="text-center">
        <h2
          className="text-2xl sm:text-2xl lg:text-3xl mt-5 lg:mt-5 tracking-wide 
            bg-gradient-to-r from-[#ff0080] to-[#7928CA] bg-clip-text text-transparent uppercase 
            relative inline-block px-6 py-3 border border-[#ff0080] rounded-lg shadow-lg"
          style={{
            textShadow: "2px 2px 6px rgba(255, 0, 128, 0.6)",
            WebkitTextStroke: "1px #ff0080",
            boxShadow: "4px 4px 12px rgba(255, 0, 128, 0.4)",
          }}
        >
          Skills
        </h2>
      </div>

      {skills.map((category, index) => (
        <div key={index} className="mb-14">
          <h3 className="text-2xl font-semibold text-center mt-5 lg:mt-5 mb-8 text-[#b388ff]">
            {category.category}
          </h3>

          <div className="flex justify-center">
            <div
              className={`grid gap-8 ${
                category.category === "Programming Languages"
                  ? "grid-cols-2 md:grid-cols-4"
                  : category.category ===
                    "AI / Machine Learning and Data Science"
                  ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                  : category.skills.length === 2
                  ? "grid-cols-2"
                  : category.skills.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
              }`}
            >
              {category.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="skill-card flex flex-col items-center p-6 bg-neutral-800 shadow-lg border border-gray-500 rounded-xl transition-transform transform hover:scale-110"
                >
                  <div
                    className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-gray-400 shadow-md text-4xl"
                    style={{ color: skill.color }}
                  >
                    <span className="flex items-center justify-center w-full h-full">
                      {skill.icon}
                    </span>
                  </div>
                  <p className="mt-4 text-lg font-medium text-gray-300">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;




