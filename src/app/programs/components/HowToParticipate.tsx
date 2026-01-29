'use client';
 
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from 'react';
import CourseModal from './CourseModal';
export default function HowToParticipate() {
const [open, setOpen] = useState(false);
  return (
    <section className="py-6 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 lg:px-12">
        <div
          className="
   relative
    grid
    grid-cols-1
    lg:grid-cols-[460px_1fr]
    rounded-[32px]
    lg:bg-[url('/program/fonapply.png')]
    bg-no-repeat
    bg-contain
    bg-center
    lg:bg-none
    bg-background-orange
    overflow-hidden 
          "
        >
          {/* IMAGE */}
          <div className="hidden lg:flex items-end pl-10 pt-10">
            <div className="relative w-full h-[520px]">
              <Image
                src="/program/person.png"
                alt="Как принять участие"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* CONTENT */}
          <div
            className="
              relative
              flex flex-col
              justify-center
              gap-6
              px-6 py-10
              sm:px-10
              lg:px-20 lg:py-20
            "
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
              Как принять участие?
            </h2>

            <ul className="space-y-4 text-gray-700 max-w-md">
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg leading-none">✦</span>
                Выбрать интересующее направление
              </li>

              <li className="flex items-start gap-3">
                <span className="text-accent text-lg leading-none">✦</span>
                Связаться с нами через форму обратной связи
              </li>

              <li className="flex items-start gap-3">
                <span className="text-accent text-lg leading-none">✦</span>
                Записаться на курс или мероприятие
              </li>
            </ul>

            <div className="pt-4">
              <Button
                variant="primary"
                size="sm"
                className="inline-flex items-center gap-3 rounded-full px-6"
              >
                Выбрать курс
                <ArrowRight size={18} />
              </Button>
               {/* <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-blue-900 px-6 py-3 text-white"
      >
        Записаться
      </button>

      <CourseModal open={open} onClose={() => setOpen(false)} /> */}
    
    

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
