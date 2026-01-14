"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPaginationPages } from "@/utils/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* PREV */}
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          w-10 h-10 rounded-full flex items-center justify-center
          border
          disabled:opacity-40
          hover:bg-gray-100
        "
      >
        <ChevronLeft size={18} />
      </button>

      {/* PAGES */}
      <div className="flex items-center gap-2">
        {pages.map((p, i) =>
          p === "dots" ? (
            <span key={`dots-${i}`} className="px-2 text-gray-400 select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`
                w-10 h-10 rounded-full
                flex items-center justify-center
                text-sm font-medium
                transition
                ${
                  p === currentPage
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {p}
            </button>
          ),
        )}
      </div>

      {/* NEXT */}
      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          w-10 h-10 rounded-full flex items-center justify-center
          border
          disabled:opacity-40
          hover:bg-gray-100
        "
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
