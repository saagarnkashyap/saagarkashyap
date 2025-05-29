import React, { useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);

  const projects = [
    {
      title: 'Bheeshma – Your Bhagavad Gita Companion',
      description:
        'Built a web-based spiritual AI assistant that provides contextual Gita interpretations using vector databases and agent orchestration.',
      githubLink: 'https://github.com/saagarnkashyap/Bheeshma',
      websiteLink: 'https://bheeshma.streamlit.app/',
    },
    {
      title: 'Ridezilla – Strava Performance Tracker',
      description:
        'A Strava-based analytics dashboard for cyclists with detailed performance insights, visualization, and ride history.',
      githubLink: 'https://github.com/saagarnkashyap/RideZilla',
      websiteLink: 'https://ridezilla.streamlit.app/',
    },
    {
      title: 'RoadVision AI – Vehicle Classifier',
      description:
        'Developed an object detection model using YOLOv8 to classify vehicles from street footage in real-time.',
      githubLink: 'https://github.com/saagarnkashyap/Road-Scene-Recognition',
    },
    {
      title: 'CityEye.AI – Smart Traffic Object Detection',
      description:
        'Designed a YOLOv11-based computer vision system to detect traffic objects in urban environments for smart monitoring.',
      githubLink: 'https://github.com/saagarnkashyap/CityEye.AI',
      websiteLink: 'https://www.linkedin.com/posts/saagar-n-kashyap-7231ab206_objectdetection-trafficdetection-computervision-activity-7330654178765086721-Fp0O?utm_source=share&utm_medium=member_desktop&rcm=ACoAADRapEsBmOLXy_v3ujo7tcfEhTnztaV9Mj4',
    },
    {
      title: 'Portfolio for the Director – Product Operations Engineering, Sandisk',
      description:
        'Developed a professional portfolio for a senior director at Sandisk, showcasing experience, leadership, and business insights.',
      githubLink: 'https://github.com/saagarnkashyap/NGR',
      websiteLink: 'https://nagarajg.vercel.app//',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={projectsRef} id="projects" className="relative mt-20 border-b border-neutral-800 min-h-[350px]">
      <div className="text-center">
        <h2
          className="text-2xl sm:text-2xl lg:text-3xl mt-0 lg:mt-0 tracking-wide 
            bg-gradient-to-r from-[#ff0080] to-[#7928CA] bg-clip-text text-transparent uppercase 
            relative inline-block px-6 py-3 border border-[#ff0080] rounded-lg shadow-lg"
          style={{
            textShadow: '2px 2px 6px rgba(255, 0, 128, 0.6)',
            WebkitTextStroke: '1px #ff0080',
            boxShadow: '4px 4px 12px rgba(255, 0, 128, 0.4)',
          }}
        >
          Projects
        </h2>
      </div>

      <div className="py-16 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card flex flex-col items-center p-6 bg-neutral-800 border border-gray-700 
            shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <strong className="text-xl text-white font-semibold hover:text-[#ff0080] transition-colors duration-200 mb-4">
                {project.title}
              </strong>
              <p className="text-gray-300 text-sm mb-6 text-center">{project.description}</p>

              <div className="flex flex-col space-y-3 w-full mt-6">
                <a
                  href={project.githubLink}
                  className="flex items-center space-x-2 justify-start 
                  bg-gradient-to-r from-[#ff0080] to-[#7928CA] text-white px-6 py-3 
                  rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={20} />
                  <span className="text-sm">Source Code</span>
                </a>

                {project.websiteLink && (
                  <a
                    href={project.websiteLink}
                    className="flex items-center space-x-2 justify-start 
                    bg-gradient-to-r from-[#7928CA] to-[#ff0080] text-white px-6 py-3 
                    rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🌐 <span className="text-sm">Live Website</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
