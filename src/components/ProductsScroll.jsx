import { useRef, useState, useEffect, useCallback } from 'react';
import './HorizontalScroll.css'
import ProductCard from "./ProductCard"

const HorizontalScroll = ({ title, products }) => {
  const [activeId, setActiveId] = useState(null);
  const productRef = useRef(null); 
  const containerRef = useRef(null); 
  function getMap() {
    if (!productRef.current) productRef.current = new Map();
    return productRef.current;
  }

  function scrollHorizontal(id) {
    const map = getMap();
    const node = map.get(id);
    if (!node) return;
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start", 
    });
  }

  function handleClick(id) {
    setActiveId(id);
    scrollHorizontal(id);
  }

  const updateActiveByScroll = useCallback(() => {
    const map = getMap();
    const container = containerRef.current;
    if (!container || !map.size) return;

    const containerRect = container.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerRight = containerRect.right;
    const TOLERANCE = 10;

    let chosenId = null;
    let bestDist = Infinity;

    for (const [id, node] of map.entries()) {
      if (!node) continue;
      const rect = node.getBoundingClientRect();
      
      const isVisible = rect.right > containerLeft && rect.left < containerRight;
      if (!isVisible) continue;

      const distFromLeft = rect.left - containerLeft;

      if (distFromLeft >= -TOLERANCE && distFromLeft < bestDist) {
        bestDist = distFromLeft;
        chosenId = id;
      } else if (chosenId === null && distFromLeft < bestDist) {
        bestDist = distFromLeft;
        chosenId = id;
      }
    }

    if (chosenId !== null) {
      setActiveId((prevActiveId) => {
        return chosenId !== prevActiveId ? chosenId : prevActiveId;
      });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updateActiveByScroll();
      });
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    updateActiveByScroll();

    return () => {
      container.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [updateActiveByScroll]);

  const sentences = title.split(/[.!?]\s*/);

  return (
    <div className="my-5">
      <h2 className="font-bold text-[24px]">
        {sentences[0]}. <span className="text-spanClr hidden sm:inline">{sentences[1]}</span>
      </h2>

      {/* Product Container */}
      <div
        ref={containerRef}
        className='w-full h-fit mt-2 flex overflow-x-auto gap-5'
        style={{ scrollSnapType: 'x mandatory' }} 
      >
        {products.map((product) => (
          <div
            key={product.id}
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(product.id, node);
              } else {
                map.delete(product.id);
              }
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Scroller dot container */}
      <ul className='flex justify-center gap-2'>
        {products.map((p) => (
          <li key={p.id}>
            <button onClick={() => handleClick(p.id)} aria-label={`Go to ${p.id}`}>
              <svg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
                <rect
                  opacity="0.8"
                  width="6"
                  height="6"
                  rx="3"
                  fill={p.id === activeId ? "#111827" : "#11182799"}
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HorizontalScroll;
