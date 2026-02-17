'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

/* ================= TYPES ================= */

type ButtonVariant = 'primary' | 'secondary' | 'text';
type ButtonSize = 'sm' | 'md' | 'ld'| 'lg';

export type ButtonProps = {
  children: React.ReactNode;

  /** Визуальный стиль */
  variant?: ButtonVariant;

  /** Размер кнопки */
  size?: ButtonSize;

  /** Показать стрелку справа */
  withArrow?: boolean;

  /** Дополнительные классы */
  className?: string;

  /** Если передан — кнопка становится ссылкой */
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/* ================= STYLES ================= */

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-white  text-center
    active:bg-secondary active:text-primary
  `,

  secondary: `
    bg-secondary text-primary
     hover:text-white
    active:bg-primary
  `,

  text: `
    bg-transparent text-primary
  `,
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-6 py-2 text-[16px]',
  md: 'px-6 py-3 text-[18px]',
  ld: 'px-6 py-3 text-[23px]',
  lg: 'px-8 py-4 text-[28px]',
};
const ARROW_STYLES = `
  w-6 h-6
  stroke-current
  text-primary-light
  transition-all duration-200
  group-hover:text-accent
  group-active:text-primary-dark
`;
/* ================= COMPONENT ================= */

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  ...props
}: ButtonProps) {
  const hasFillEffect = variant === 'primary' || variant === 'secondary';

  const classes = clsx(
    `
    relative overflow-hidden
    inline-flex items-center gap-2
    rounded-full font-medium
    transition-colors duration-200
    focus:outline-none
    group
    `,
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className
  );

  const content = (
    <>
      {/* HOVER FILL LAYER */}
      {hasFillEffect && (
        <span
          className={clsx(
            `
            absolute inset-0
            origin-left
            scale-x-0
            transition-transform duration-300
            group-hover:scale-x-100
            group-active:scale-x-100
            rounded-full
            z-0
            `,
            variant === 'primary' && 'bg-primary-light group-active:bg-secondary',
            variant === 'secondary' && 'bg-primary-light group-active:bg-primary'
          )}
        />
      )}

      {/* CONTENT */}
      <span className="relative z-10 flex items-center gap-2">
        {children}

        {withArrow && (
          <ArrowRight className={ARROW_STYLES} />
        )}
      </span>
    </>
  );

  /* 👉 ЕСЛИ href — LINK */
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  /* 👉 ИНАЧЕ — BUTTON */
  return (
    <button {...props} className={classes}>
      {content}
    </button>
  );
}
