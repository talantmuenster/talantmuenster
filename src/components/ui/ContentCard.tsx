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
          "relative w-full overflow-hidden bg-gray-200",
          featured
            ? "aspect-[4/3] lg:aspect-[16/9] lg:rounded-b-3xl"
            : "aspect-[4/3]",
        )}
      >
        {image ? (
          // Use regular img tag for proxy URLs (with query string)
          image.includes('proxy-image') ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-cover"
              onError={() => console.warn('Image failed to load:', image)}
            />
          )
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
            Нет изображения
          </div>
        )}

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
