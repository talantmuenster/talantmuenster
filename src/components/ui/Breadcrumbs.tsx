import Link from "next/link";
import clsx from "clsx";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];

  /** внешний класс */
  className?: string;

  /** pill | plain */
  variant?: "pill" | "plain";

  /** sm | md */
  size?: "sm" | "md";

  /** primary | gray */
  color?: "primary" | "gray";

  /** кастомный разделитель */
  separator?: React.ReactNode;
};

export function Breadcrumbs({
  items,
  className,
  variant = "pill",
  size = "sm",
  color = "primary",
  separator = "›",
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx(
        "inline-flex items-center",
        variant === "pill" && "border rounded-full bg-white",
        size === "sm" && "text-sm px-4 py-1 gap-2",
        size === "md" && "text-base px-5 py-2 gap-3",
        variant === "pill" && color === "primary" && "border-[#CBD5FF]",
        variant === "pill" && color === "gray" && "border-gray-200",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        const linkClass = clsx(
          "transition whitespace-nowrap",
          color === "primary" && "text-gray-400 hover:text-primary",
          color === "gray" && "text-gray-500 hover:text-gray-800",
        );

        const currentClass = clsx(
          "font-medium",
          color === "primary" && "text-primary",
          color === "gray" && "text-gray-800",
        );

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ) : (
              <span className={currentClass}>{item.label}</span>
            )}

            {!isLast && (
              <span className="text-gray-300 select-none">{separator}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
