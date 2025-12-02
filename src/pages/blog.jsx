import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BlogPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
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
        <button onClick={() => navigate('/skills')} className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none">
          Skills <span className="ml-1">↗</span>
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center mt-8">Blog</h1>
      <section className="mt-10 bg-black/40 rounded-xl p-6 shadow-lg">
        <Link to="/blog/myblogs">
          <button className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none mb-4">
            Home <span className="ml-1">↗</span>
          </button>
        </Link>
        <h2 className="text-2xl font-semibold mb-2">My Blogging</h2>
        <p className="text-base">Here you'll find my thoughts, stories, and personal experiences. Stay tuned for regular updates!</p>
        <Link to="/blog/myblogs" className="block mt-4 text-pink-400 font-semibold underline">Go to My Blogs</Link>
      </section>
      <section className="mt-10 bg-black/40 rounded-xl p-6 shadow-lg">
        <Link to="/blog/photography">
          <button className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none mb-4">
            Home <span className="ml-1">↗</span>
          </button>
        </Link>
        <h2 className="text-2xl font-semibold mb-2">My Photography</h2>
        <p className="text-base">I love capturing moments. This section will showcase my favorite photos and photography projects.</p>
        <Link to="/blog/photography" className="block mt-4 text-pink-400 font-semibold underline">Go to Photography</Link>
      </section>
    </div>
  );
};

export default BlogPage;
