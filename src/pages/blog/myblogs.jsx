import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/')} className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none mb-6">
        Home <span className="ml-1">↗</span>
      </button>
      <h1 className="text-3xl font-bold text-center mb-8">My Blogs</h1>
      <p className="text-center">Here you'll find all my personal blog posts and stories.</p>
      <div className="flex flex-col items-center gap-8 mt-8">
        <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7314697638929436672?collapsed=1" height="541" width="504" frameBorder="0" allowFullScreen title="Embedded post">
          Your browser does not support iframes or the LinkedIn embed could not be loaded.
        </iframe>
        <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7330654147882471424?collapsed=1" height="541" width="504" frameBorder="0" allowFullScreen title="Embedded post">
          Your browser does not support iframes or the LinkedIn embed could not be loaded.
        </iframe>
        <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7330654147882471424?compact=1" height="399" width="504" frameBorder="0" allowFullScreen title="Embedded post">
          Your browser does not support iframes or the LinkedIn embed could not be loaded.
        </iframe>
      </div>
      <p className="text-center text-sm text-gray-400 mt-4">If you see empty boxes, LinkedIn embeds may be blocked by your browser, ad blocker, or network. Try disabling extensions or using a different browser.</p>
      {/* Add blog post cards or content here */}
    </div>
  );
};

export default MyBlogs;
