'use client';

import { useState } from 'react';

const slides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop' },
  { id: 2, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop' },
  { id: 3, image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop' },
  { id: 4, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop' },
  { id: 5, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop' },
  { id: 6, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop' },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(2);
  const total = slides.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="relative w-full bg-[#EEF2FF] py-24 overflow-hidden">
      {/* arrows (как в макете) */}
      <button
        onClick={prev}
        className="
          absolute left-8 top-16 z-30
          w-10 h-10 rounded-full
          border border-[#CBD5FF]
          bg-white text-[#6B7CFF]
          flex items-center justify-center
          hover:bg-[#F4F6FF] transition
        "
      >
        ‹
      </button>

      <button
        onClick={next}
        className="
          absolute right-8 top-16 z-30
          w-10 h-10 rounded-full
          border border-[#CBD5FF]
          bg-white text-[#6B7CFF]
          flex items-center justify-center
          hover:bg-[#F4F6FF] transition
        "
      >
        ›
      </button>

      {/* slider */}
      <div className="relative h-[320px] flex items-end justify-center">
        {slides.map((slide, index) => {
          let offset = index - current;

          // 👇 зацикливание (ключевая часть)
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          let translateX = offset * 260;
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;
          let width = 260;
          let height = 190;

          if (offset === 0) {
            width = 420;
            height = 300;
            zIndex = 30;
          } else if (Math.abs(offset) === 1) {
            scale = 0.88;
            opacity = 0.9;
            zIndex = 20;
          } else if (Math.abs(offset) === 2) {
            scale = 0.75;
            opacity = 0.6;
            zIndex = 10;
          } else {
            opacity = 0;
          }

          return (
            <div
              key={slide.id}
              className="absolute transition-all duration-700 ease-in-out"
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: opacity === 0 ? 'none' : 'auto',
              }}
            >
              <div
                className="rounded-3xl overflow-hidden bg-white shadow-xl"
                style={{
                  width,
                  height,
                }}
              >
                <img
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
