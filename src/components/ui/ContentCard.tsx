import Image from "next/image";
import clsx from "clsx";

export function ContentCard({
  image,
  title,
  description,
  date,
  href,
  featured = false,
  className,
}: any) {
  const Wrapper: any = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={clsx(
        "group relative block bg-white rounded-2xl overflow-hidden transition-shadow hover:shadow-lg",
        className,
      )}
    >
      {/* IMAGE */}
      <div
        className={clsx(
          "relative w-full overflow-hidden",
          featured
            ? "aspect-[4/3] lg:aspect-[16/9] lg:rounded-b-3xl"
            : "aspect-[4/3]",
        )}
      >
        <Image src={image} alt={title} fill className="object-cover" />

        {/* градиент ТОЛЬКО на desktop */}
        {featured && (
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        )}
      </div>

      {/* CONTENT */}
      <div
        className={clsx(
          // mobile / tablet — обычный поток
          "p-5",
          // desktop — overlay
          featured &&
            "lg:absolute lg:left-0 lg:right-0 lg:bottom-6 lg:p-6 lg:text-white",
        )}
      >
        {date && (
          <div
            className={clsx(
              "text-sm mb-2",
              featured ? "lg:text-white/80 text-gray-400" : "text-gray-400",
            )}
          >
            {date}
          </div>
        )}

        <h3
          className={clsx(
            "font-semibold mb-2",
            featured
              ? "lg:text-xl text-lg text-primary lg:text-gray-50"
              : "text-lg text-primary",
          )}
        >
          {title}
        </h3>

        <p
          className={clsx(
            "line-clamp-2",
            featured ? "lg:text-white/90 text-gray-600" : "text-gray-600",
          )}
        >
          {description}
        </p>
      </div>
    </Wrapper>
  );
}
