import Link from 'next/link';

type Props = {
  label: string;
  href?: string;
};

export function DirectionChip({ label, href }: Props) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center justify-center
        px-4 py-2 rounded-full border text-sm transition
        bg-white border-gray-300
        hover:border-primary hover:text-primary
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
      "
    >
      {label}
    </Link>
  );
}
