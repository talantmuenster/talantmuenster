import Image from 'next/image';
import Link from 'next/link';

type LogoVariant = 'primary' | 'secondary';

type LogoProps = {
  variant?: LogoVariant;
  size?: number;
  href?: string;
  className?: string;
};

const LOGOS = {
  primary: '/logo1.svg',
  secondary: '/logo2.svg',
};

export function Logo({
  variant = 'primary',
  size = 40,
  href = '/',
  className = '',
}: LogoProps) {
  return (
    <Link href={href} className={`inline-flex items-center ${className}`}>
      <Image
        src={LOGOS[variant]}
        alt="TALANT e.V."
        width={size}
        height={size}
        priority
      />
    </Link>
  );
}
