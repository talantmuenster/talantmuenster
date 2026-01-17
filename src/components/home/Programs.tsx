'use client';

import Image from 'next/image';
import { Button } from '../ui/Button';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const programs = [
  { title: 'Музыка', color: '#A4B5FF ', image: '/home/programs/music.png' , href: '/programs/music' },
  { title: 'Спорт', color: '#FF6B6B', image: '/home/programs/sport.png' , href: '/programs/sport' },
  { title: 'Танцы', color: '#FF6B6B', image: '/home/programs/dance.png' , href: '/programs/dance' },
  { title: 'Языки', color: '#FFA500', image: '/home/programs/language.png' , href: '/programs/language' },
  { title: 'Информатика', color: '#FFD700', image: '/home/programs/it.png' , href: '/programs/it' },
  { title: 'Математика', color: '#90EE90', image: '/home/programs/matem.png' , href: '/programs/matem' },
  { title: 'Искусство', color: '#4169E1', image: '/home/programs/art.png', href: '/programs/art' },
];
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};


export default function Programs() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="text-center text-heading-xl font-bold text-[#1E293B] mb-10">
          Программы <span className="text-primary-light">развития</span>
        </h2>

     <div
        className="
          grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
          gap-4
          items-stretch
        "
      >
{programs.map((item) => (
  <motion.div
    key={item.title}
    whileHover={{ y: -6 }}
    transition={{ type: 'spring', stiffness: 260 }}
  >
    <Link href={item.href} className="block h-full">
      <div className="rounded-2xl border-2  overflow-hidden bg-white flex flex-col h-full" style={{ borderColor: item.color }}>

        {/* IMAGE */}
        <motion.div
          className="relative aspect-square overflow-hidden"
    
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* TITLE */}
        <div  className="
            group
            h-[52px]
            flex items-center justify-center gap-2
            font-medium
            text-primary
            cursor-pointer
            text-lg md:text-[22px] lg:text-[22px]
          "
        >
          {item.title}

          <ArrowRight
            className="
              w-4 h-4
              stroke-current
              text-primary-light

              opacity-0
              translate-x-[-6px]

              group-hover:opacity-100
              group-hover:translate-x-0

              transition-all duration-200
            "
          />
        </div>


      </div>
    </Link>
  </motion.div>
))}



  {/* BUTTON — SAME BASELINE */}
<div
  className="
    group
    flex items-center justify-center
    h-[52px] self-end
    cursor-pointer 
  "
>
  <Button
    href="/programs"
    variant='text'
    size='ld'
    withArrow
    className="text-lg md:text-[20px] lg:text-[22px]"
  >
    Смотреть больше
  </Button>
</div>

</div>


      </div>
    </section>
  );
}
