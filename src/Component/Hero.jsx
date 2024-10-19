import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [scrollX, setScrollX] = useState(0);

  const handleScroll = () => {
    setScrollX(window.scrollY * 0.5); // Adjust the multiplier for the effect
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <span
        className="md:text-[170px] transition-transform text-[100px]"
        style={{ transform: `translateX(-${scrollX}px)` }}
      >
        Bon
      </span>
      <span
        className="md:text-[170px] transition-transform text-[100px]"
        style={{ transform: `translateX(${scrollX}px)` }}
      >
        Coeur❤️
      </span>
    </div>
  );
};

export default Hero;
