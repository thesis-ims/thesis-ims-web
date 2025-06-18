"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  className?: string;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPrevNext = true,
  maxVisiblePages = 3,
  className = "",
  disabled = false,
}) => {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  // Calculate which page numbers to show
  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // Add ellipsis and first page if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("ellipsis-start");
      }
    }

    // Add visible page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number): void => {
    if (disabled || page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange?.(page);
  };

  const visiblePages = getVisiblePages();

  const buttonBaseClasses = `
    cursor-pointer flex items-center justify-center font-medium 
    transition-colors duration-200 focus:outline-none 
    focus:ring-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
  `;

  const activeButtonClasses = `
    bg-primary-color-1 text-white
  `;

  const inactiveButtonClasses = `
    text-primary-color-60
  `;

  return (
    <nav
      className={`flex gap-1 items-center${className}`}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          className={`p-2 ${buttonBaseClasses} ${inactiveButtonClasses} `}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="text-gray-60 h-6 w-6" />
          <p className="text-gray-60 px-1 font-medium">Previous</p>
        </button>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (typeof page === "string" && page.startsWith("ellipsis")) {
          return (
            <span
              key={page}
              className="text-primary-color-60 inline-flex items-end justify-center px-3 py-2 text-sm"
              aria-hidden="true"
            >
              <MoreHorizontal className="h-4 w-4" />
            </span>
          );
        }

        const pageNumber = page as number;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={disabled}
            className={`px-4 py-2 ${buttonBaseClasses} ${
              pageNumber === currentPage
                ? activeButtonClasses
                : inactiveButtonClasses
            }`}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={pageNumber === currentPage ? "page" : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          className={`p-2 ${buttonBaseClasses} ${inactiveButtonClasses}`}
          aria-label="Go to next page"
        >
          <p className="text-gray-60 px-1 font-medium">Next</p>
          <ChevronRight className="text-gray-60 h-6 w-6" />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
