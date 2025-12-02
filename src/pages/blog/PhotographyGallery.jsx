import React, { useState } from 'react';



export default function PhotographyGallery({ photoFilenames }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photoFilenames.map(filename => (
          <div key={filename} className="rounded-lg overflow-hidden shadow-lg bg-black/10 cursor-pointer" onClick={() => setSelected(filename)}>
            <img
              src={'/photos/' + filename}
              alt={filename}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="p-2 text-center text-xs text-gray-700">{filename.replace(/\.[^/.]+$/, '')}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={'/photos/' + selected}
              alt={selected}
              className="w-full md:w-2/3 h-96 object-contain rounded-l-lg"
            />
            <div className="p-6 flex flex-col justify-center md:w-1/3">
              <h2 className="text-xl font-bold mb-2">{selected.replace(/\.[^/.]+$/, '')}</h2>
              <p className="text-gray-600">Cute description goes here...</p>
              <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
