import { useEffect, useRef, useState } from 'react';
import { mat4, quat, vec2, vec3 } from 'gl-matrix';
import './InfiniteMenu.css';
import React from 'react';

const items = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];



// --- Begin InfiniteMenu component ---
// Full InfiniteMenu component implementation

const defaultItems = [
  {
    image: 'https://picsum.photos/900/900?grayscale',
    link: 'https://google.com/',
    title: '',
    description: ''
  }
];

function InfiniteMenu({ items = [] }) {
  const canvasRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    let sketch;

    const handleActiveItem = index => {
      const itemIndex = index % items.length;
      setActiveItem(items[itemIndex]);
    };

    if (canvas) {
      sketch = new InfiniteGridMenu(canvas, items.length ? items : defaultItems, handleActiveItem, setIsMoving, sk =>
        sk.run()
      );
    }

    const handleResize = () => {
      if (sketch) {
        sketch.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  const handleButtonClick = () => {
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith('http')) {
      window.open(activeItem.link, '_blank');
    } else {
      console.log('Internal route:', activeItem.link);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas id="infinite-grid-menu-canvas" ref={canvasRef} />

      {activeItem && (
        <>
          <h2 className={`face-title ${isMoving ? 'inactive' : 'active'}`}>{activeItem.title}</h2>

          <p className={`face-description ${isMoving ? 'inactive' : 'active'}`}> {activeItem.description}</p>

          <div onClick={handleButtonClick} className={`action-button ${isMoving ? 'inactive' : 'active'}`}>
            <p className="action-button-icon">&#x2197;</p>
          </div>
        </>
      )}
    </div>
  );
}
// --- End InfiniteMenu component ---

export default function InfiniteMenuWrapper({ items }) {
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <InfiniteMenu items={items} />
    </div>
  );
}
