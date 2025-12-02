import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBlog, FaProjectDiagram } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import AnimatedContent from "./AnimatedContent";

const navItems = [
  { label: "Visit My Blog", route: "/blog", icon: <FaBlog size={32} /> },
  { label: "Projects", route: "/projects", icon: <FaProjectDiagram size={32} /> },
  { label: "Certifications", route: "/certifications", icon: <MdWorkspacePremium size={32} /> },
  { label: "Skills", route: "/skills", icon: <GiSkills size={32} /> },
];

const QuickNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="flex flex-wrap justify-center gap-4 py-6 w-full">
      {navItems.map((item, idx) => (
        <AnimatedContent
          key={item.label}
          direction="horizontal"
          distance={80}
          duration={1.1}
          delay={0.1 * idx}
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
        >
          <button
            onClick={() => navigate(item.route)}
            className={`plain-icon-btn flex items-center justify-center aspect-square w-14 h-14 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200${location.pathname === item.route ? ' ring-4 ring-[#ff0080]/40' : ''}`}
            title={item.label}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        </AnimatedContent>
      ))}
    </div>
  );
};

export default QuickNavBar;
