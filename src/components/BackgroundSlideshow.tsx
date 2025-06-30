
import React, { useState, useEffect } from 'react';

const BackgroundSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      url: '/lovable-uploads/a9e58ae1-5e67-4a4a-aef2-b50540786097.png',
      alt: 'Physical therapy session with exercise ball'
    },
    {
      url: '/lovable-uploads/0a0773e5-dc50-4941-b05d-d7d417f12b0f.png',
      alt: 'Physiotherapy rehabilitation exercise'
    },
    {
      url: '/lovable-uploads/7ea08c0b-67b0-4bbe-a7bc-4f6e7760bc6e.png',
      alt: 'Manual therapy treatment session'
    },
    {
      url: '/lovable-uploads/02c50c3d-4918-4a29-b17d-d87a2fff2349.png',
      alt: 'Physiotherapy with resistance band training'
    },
    {
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt: 'Modern physiotherapy clinic'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
          }`}
        >
          <img
            src={slide.url}
            alt={slide.alt}
            className="w-full h-full object-cover transform transition-transform duration-1000"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-physio-blue/30 to-physio-green/30" />
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundSlideshow;
