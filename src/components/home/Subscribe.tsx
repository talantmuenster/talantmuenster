"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Subscribe() {
  return (
    <section className="py-2 lg:py-[120px]">
      <div className="mx-auto max-w-7xl lg:px-12">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[520px_1fr]
            rounded-2xl
            bg-background-orange
            overflow-hidden
          "
        >
          {/* IMAGE */}
          <div className="hidden lg:block relative h-[240px] sm:h-[320px] lg:h-auto">
            <Image
              src="/home/subscribe-image.png"
              alt="Subscribe"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* CONTENT */}
          <div
            className="
              px-6 py-8
              sm:px-10 sm:py-12
              lg:px-16 lg:py-20
              flex flex-col
              justify-center
              gap-6
              text-center
              lg:text-left
            "
          >
            <h2 className="text-xl sm:text-2xl lg:text-heading-lg font-bold text-primary">
              Подпишись и будь в курсе{" "}
              <span className="text-accent">всех событий</span>
            </h2>

            <p className="text-gray-600 max-w-md mx-auto lg:mx-0">
              Будь первым, кто узнает о наших новых проектах, мастер-классах и
              встречах
            </p>

            <form
              className="
                  flex flex-col
    sm:flex-row
    gap-4
    w-full
    max-w-md
    mx-auto
    lg:mx-0
              "
            >
              <input
                type="email"
                placeholder="Электронная почта"
                className="
                  h-[48px]
                 flex-1
                  rounded-xl
                  px-4 py-4 
                  border border-gray-200
                "
              />
              <div className="items-center w-full sm:w-auto">
                <Button variant="primary" size="sm" className="">
                  Подписаться
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
