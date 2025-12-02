import React from 'react';
import Skills from '../components/Skills';
// import QuickNavBar from '../components/QuickNavBar';
import { useNavigate } from 'react-router-dom';

const SkillsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <QuickNavBar /> removed */}
      <div className="flex flex-row flex-wrap justify-center gap-4 py-6 w-full">
        <button onClick={() => navigate('/')} className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none">
          Home <span className="ml-1">↗</span>
        </button>
        <button onClick={() => navigate('/projects')} className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none">
          Projects <span className="ml-1">↗</span>
        </button>
        <button onClick={() => navigate('/certifications')} className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none">
          Certifications <span className="ml-1">↗</span>
        </button>
        <button onClick={() => navigate('/blog')} className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none">
          Blog <span className="ml-1">↗</span>
        </button>
      </div>
      <Skills />
    </div>
  );
};

export default SkillsPage;
