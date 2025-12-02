import React from 'react';
import PhotographyGallery from './PhotographyGallery';
import { useNavigate } from 'react-router-dom';
// Remove InfiniteMenu import

const photoFilenames = [
  '2025-11-06-074519423.jpg',
  '20250828_203906.jpg',
  '20250828_203925.jpg',
  '20250928_132009(1).jpg',
  '20250928_132653(1).jpg',
  '20251012_150246.jpg',
  '20251106_194455.jpg',
  '20251108_162946(1).jpg',
  '20251109_000214.jpg',
  'IMG-20251104-WA0067.jpg',
  'IMG-20251104-WA0107.jpg',
];

const placeholder = 'https://via.placeholder.com/400x300?text=Art+of+Noticing';

const Photography = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/')} className="font-semibold px-6 py-2 rounded-lg bg-black/60 border-none mb-6">
        Home <span className="ml-1">↗</span>
      </button>
      <h1 className="text-3xl font-bold text-center mb-8">My Photography</h1>
      <p className="text-center">Explore my favorite photos and photography projects here.</p>
  <PhotographyGallery photoFilenames={photoFilenames} />
    </div>
  );
};

export default Photography;
