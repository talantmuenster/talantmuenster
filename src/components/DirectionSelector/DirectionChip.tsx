import Link from 'next/link';

type Props = {
  label: string;
  href?: string;
};

export function DirectionChip({ label, href }: Props) {
  const className = "px-6 py-2 rounded-lg text-text-base border text-primary-dark transition  bg-white border-[#CBD5FF] hover:bg-secondary/50";
  
  if (!href) {
    return (
      <div className={className}>
        {label}
      </div>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
