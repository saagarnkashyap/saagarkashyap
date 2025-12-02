import React, { useEffect, useState } from 'react';

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2100); // Reduced to 2s
    return () => clearTimeout(timeout);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="cube-wrapper">
        <div className="cube">
          <div className="face front" />
          <div className="face back" />
          <div className="face left" />
          <div className="face right" />
          <div className="face top" />
          <div className="face bottom" />
        </div>
      </div>

      <style>{`
        .cube-wrapper {
          width: 80px;
          height: 80px;
          perspective: 800px;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 2s infinite linear;
        }

        .face {
          position: absolute;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #7928CA, #f5a623);
          border: 2px solid #f5a623;
          border-radius: 8px;
          box-shadow: 0 0 12px #7928CA99;
        }

        .front  { transform: translateZ(40px); }
        .back   { transform: rotateY(180deg) translateZ(40px); }
        .left   { transform: rotateY(-90deg) translateZ(40px); }
        .right  { transform: rotateY(90deg) translateZ(40px); }
        .top    { transform: rotateX(90deg) translateZ(40px); }
        .bottom { transform: rotateX(-90deg) translateZ(40px); }

        @keyframes rotateCube {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to   { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
