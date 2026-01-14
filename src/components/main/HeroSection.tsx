"use client";

import Link from "next/link";
import React from "react";

type Breadcrumb = {
  label: string;
  href?: string;
};

type HeroSectionProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];

  backgroundImage?: string;
  backgroundColor?: string;
  overlay?: boolean;
};

export function HeroSection({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage,
  backgroundColor = "#ffffff",
  overlay = false,
}: HeroSectionProps) {
  return (
    <section className="w-full lg:py-20 pb-10">
      <div className="max-w-7xl mx-auto lg:px-8">
        <div
          className="
            relative overflow-hidden
            rounded-2xl lg:rounded-[32px]
            px-4 py-6
            sm:px-6 sm:py-8
            lg:px-20 lg:py-16
          "
          style={{
            backgroundColor: backgroundImage ? undefined : backgroundColor,
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          {overlay && (
            <div className="absolute inset-0 bg-white/75 lg:bg-white/60 z-0" />
          )}

          <div className="relative z-10 pt-10 lg:pt-0 md:pt-0">
            {/* Breadcrumbs */}
            {breadcrumbs && (
              <div className="mb-4 flex justify-start lg:justify-center">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-white/70 px-3 py-1 rounded-full">
                  {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                      {index !== 0 && <span>›</span>}

                      {item.href ? (
                        <Link
                          href={item.href}
                          className="cursor-pointer hover:text-gray-900 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-gray-900 font-medium">
                          {item.label}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Title */}
            <h1
              className="
                text-left lg:text-center
                text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
                font-bold
                text-[#0A123A]
                leading-snug
                max-w-4xl
                lg:mx-auto
              "
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                className="
                  mt-4 sm:mt-6
                  text-left lg:text-center
                  text-sm sm:text-base
                  text-gray-600
                  leading-relaxed
                  max-w-3xl
                  lg:mx-auto
                "
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
