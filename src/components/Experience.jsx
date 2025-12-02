import React from 'react'

const experiences = [
    {
      year: "Aug 2025 - Oct 2025",
      title: "Analytical Consultant",
      company: "Tiger Analytics · Internship",
      location: "Greater Bengaluru Area · Remote",
      logo: "Tiger Analytics logo" // Placeholder for logo
    },
    {
      year: "Jun 2025 - Aug 2025",
      title: "Artificial Intelligence Intern",
      company: "Codec Technologies India · Internship",
      location: "Remote",
      logo: "Codec Technologies India logo" // Placeholder for logo
    },
  ];


const Experience = () => {
  return (
    <div id="experience" className="relative mt-5 border-b border-neutral-800 min-h-[500px] pt-20">
            <div className='text-center'>     
            <h2  className="text-2xl sm:text-2xl lg:text-3xl mb-8 mt-0 lg:mt-0 tracking-wide 
            bg-gradient-to-r from-[#ff0080] to-[#7928CA] bg-clip-text text-transparent uppercase 
            relative inline-block px-6 py-3 border border-[#ff0080] rounded-lg shadow-lg"
            style={{textShadow: "2px 2px 6px rgba(255, 0, 128, 0.6)",
                WebkitTextStroke: "1px #ff0080", 
                boxShadow: "4px 4px 12px rgba(255, 0, 128, 0.4)" 
              }}>Experience</h2>
              </div>
              <div className="relative border-l-4 border-[#ff0080]">
        {experiences.map((exp, index) => (
          <div key={index} className="mb-8 ml-6 group">
            {/* Timeline Dot with Zoom Hover */}
            <div className="absolute -left-3 w-6 h-6 bg-[#ff0080] rounded-full border-4 border-white transform transition-transform duration-300 group-hover:scale-125"></div>
            
            {/* Year */}
            <p className="text-lg font-semibold text-[#f5a623] transition-transform transform duration-300 group-hover:scale-100 group-hover:-translate-y-1">{exp.year}</p>
            
            {/* Title with Subtle Centered Hover Effect */}
            <h3 className="text-xl font-bold text-[#8248bc] transition-transform transform duration-300 group-hover:scale-100 group-hover:-translate-y-1">
              {exp.title}
            </h3>
            
            {/* Company & Description */}
            <h4 className="text-md font-medium text-gray-600">{exp.company}</h4>
            <p className="text-gray-500 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
              

           
      </div>
  )
}

export default Experience
