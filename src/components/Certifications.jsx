import React from 'react';

const certifications = [
  {
    year: "Dec 2024",
    title: "AWS Educate Machine Learning Foundations",
    provider: "Amazon Web Services (AWS)",
    link: "https://www.credly.com/badges/cdbcc2f2-8dfb-4ec6-b7a6-61ea0513b418/linked_in_profile"
  },
  {
    year: "Dec 2024",
    title: "AWS Educate Introduction to Generative AI",
    provider: "Amazon Web Services (AWS)",
    link: "https://www.credly.com/badges/f828fd1c-8928-45a2-95a3-246a39a4cdd8/linked_in_profile"
  },
  {
    year: "Nov 2024",
    title: "AWS Academy Graduate - Cloud Architecting",
    provider: "Amazon Web Services (AWS)",
    link: "https://www.credly.com/badges/2dcb5844-8f74-4d48-a7c6-c6ddfb5bdba5/linked_in_profile"
  },
  {
    year: "Nov 2024",
    title: "Neo4j Certified Professional",
    provider: "Neo4j",
    link: "https://graphacademy.neo4j.com/c/045333e9-e965-4925-bd60-04feadd58352/"
  },
  {
    year: "Sep 2024",
    title: "AWS Academy Graduate - Cloud Foundations",
    provider: "Amazon Web Services (AWS)",
    link: "https://www.credly.com/badges/edbc3bb6-91c0-4330-88f5-274f67771250/linked_in_profile"
  },
  {
    year: "Sep 2024",
    title: "Data Analytics Essentials",
    provider: "Cisco",
    link: "https://www.credly.com/badges/0f3305ce-1443-478f-9aea-46292dd928ad/linked_in_profile"
  },
  {
    year: "Sep 2024",
    title: "Web Analytics",
    provider: "Accenture",
    link: "https://www.futurelearn.com/certificates/8ps40s1"
  },
];

const Certifications = () => {
  return (
    <div id="certifications" className="relative mt-5 border-b border-neutral-800 min-h-[350px] pt-20">
      <div className='text-center'>     
        <h2  className="text-2xl sm:text-2xl lg:text-3xl mb-8 mt-0 lg:mt-0 tracking-wide 
          bg-gradient-to-r from-[#ff0080] to-[#7928CA] bg-clip-text text-transparent uppercase 
          relative inline-block px-6 py-3 border border-[#ff0080] rounded-lg shadow-lg"
          style={{textShadow: "2px 2px 6px rgba(255, 0, 128, 0.6)",
            WebkitTextStroke: "1px #ff0080", 
            boxShadow: "4px 4px 12px rgba(255, 0, 128, 0.4)" 
          }}>Certifications</h2>
      </div>

      <div className="relative border-l-4 border-[#ff0080]">
        {certifications.map((cert, index) => (
          <div key={index} className="mb-8 ml-6 group">
            <div className="absolute -left-3 w-6 h-6 bg-[#ff0080] rounded-full border-4 
              border-white transform transition-transform duration-300 group-hover:scale-125"></div>
            <p className="text-lg font-semibold text-[#f5a623] transition-transform 
              transform duration-300 group-hover:scale-100 group-hover:-translate-y-1">{cert.year}</p>
            <h3 className="text-xl font-bold text-[#8248bc] transition-transform 
              transform duration-300 group-hover:scale-100 group-hover:-translate-y-1">
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {cert.title}
              </a>
            </h3>
            <h4 className="text-md font-medium text-gray-400">{cert.provider}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
