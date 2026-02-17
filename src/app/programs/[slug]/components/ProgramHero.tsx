'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Breadcrumb = {
  label: string;
  href?: string;
};

type ProgramHeroProps = {
  title: string;
  subtitle: string;
  cover: string;
  slides?: string[];
  breadcrumbs?: Breadcrumb[];
};

export function ProgramHero({
  title,
  subtitle,
  cover,
  slides,
  breadcrumbs,
}: ProgramHeroProps) {
const swiperRef = useRef<SwiperType | null>(null);

  const images = useMemo(() => {
    const base = slides && slides.length > 0 ? slides : [cover];
    return base.length > 0 ? base : [cover];
  }, [slides, cover]);

  return (
    <section className="w-full py-16">
      <Container>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">

          {/* LEFT CONTENT */}
          <div className="flex-1 w-full">

            {breadcrumbs && (
              <div className="mb-4 inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                {breadcrumbs.map((item, index) => (
                  <span
                    key={`${item.label}-${index}`}
                    className="flex items-center gap-2"
                  >
                    {index !== 0 && <span>›</span>}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="hover:text-gray-900 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-gray-900 font-medium">
                        {item.label}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A123A]">
              {title}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* RIGHT SWIPER */}
         <div className="flex-1 min-w-0 w-full relative">
  <div className="w-full overflow-hidden rounded-[28px] shadow-xl">
<Swiper
  modules={[Pagination, Autoplay]}
  onSwiper={(swiper) => {
    swiperRef.current = swiper;
  }}
  slidesPerView={1}
  loop={images.length > 1}
  autoplay={{
    delay: 4000,
    disableOnInteraction: false,
  }}
>
  
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* LEFT BUTTON */}
  {images.length > 1 && (
    <button
      onClick={() => swiperRef.current?.slidePrev()}
      className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-10
      w-14 h-14 rounded-full
      border-2 border-white
      bg-white/10 backdrop-blur-md
      items-center justify-center
      hover:bg-white/20 transition"
    >
      <FaArrowLeft className="text-white text-lg" />
    </button>
  )}

  {/* RIGHT BUTTON */}
  {images.length > 1 && (
    <button
      onClick={() => swiperRef.current?.slideNext()}
      className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-10
      w-14 h-14 rounded-full
      border-2 border-white
      bg-white/10 backdrop-blur-md
      items-center justify-center
      hover:bg-white/20 transition"
    >
      <FaArrowRight className="text-white text-lg" />
    </button>
  )}
</div>

        </div>
      </Container>
    </section>
  );
}
