import { ArrowUpRight } from 'lucide-react';

interface ExternalLinkProps {
  href: string;
  label?: string;
  className?: string;
}

export default function ExternalLink({ href, label, className = '' }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-blue-600 underline-offset-4 hover:underline ${className}`}
    >
      {label}
      <ArrowUpRight className="h-4 w-4 flex-shrink-0" />
    </a>
  );
}
