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
    <section className="relative w-full py-20 overflow-hidden flex flex-col items-center">
      <div className="relative w-full max-w-6xl h-[450px] flex items-center justify-center">
        
        {/* Кнопка Влево — привязана к центру */}
        <button
          onClick={prev}
          className="absolute left-[15%] md:left-[22%] top-12 z-50 w-11 h-11 rounded-full border border-blue-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5D69F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Кнопка Вправо — привязана к центру */}
        <button
          onClick={next}
          className="absolute right-[15%] md:right-[22%] top-12 z-50 w-11 h-11 rounded-full border border-blue-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5D69F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Слайды */}
        <div className="relative w-full h-full flex items-end justify-center">
          {slides.map((slide, index) => {
            let offset = index - current;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const isNeighbor = Math.abs(offset) === 1;
            const isEdge = Math.abs(offset) === 2;

            // Настройка позиционирования как на скрине
            let translateX = offset * 320; // Базовый шаг
            if (offset > 0) translateX += 60; // Раздвигаем, чтобы центр был виден лучше
            if (offset < 0) translateX -= 60;

            return (
              <div
                key={slide.id}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translateX(${translateX}px) scale(${isActive ? 1 : 0.85})`,
                  opacity: isActive ? 1 : isNeighbor ? 0.9 : isEdge ? 0.4 : 0,
                  zIndex: isActive ? 40 : 30 - Math.abs(offset),
                }}
              >
                <div
                  className={`
                    ${isActive ? 'w-[480px] h-[340px]' : 'w-[360px] h-[260px]'}
                    rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700
                  `}
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
      </div>
    </section>
  );
}