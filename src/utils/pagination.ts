export function getPaginationPages(current: number, total: number, delta = 1) {
  if (total <= 11) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "dots")[] = [];
  const range: number[] = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current > delta + 2) {
    pages.push(1, "dots");
  } else {
    pages.push(1, 2, 3);
  }

  pages.push(...range);

  if (current < total - (delta + 1)) {
    pages.push("dots", total);
  } else {
    pages.push(total - 2, total - 1, total);
  }

  return Array.from(new Set(pages));
}
