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
  maxVisiblePages = 5,
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
    inline-flex items-center justify-center px-3 py-2 text-sm font-medium 
    transition-colors duration-200 border border-gray-300 
    hover:bg-gray-50 hover:border-gray-400 focus:outline-none 
    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
  `;

  const activeButtonClasses = `
    bg-primary-color-1 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700
  `;

  const inactiveButtonClasses = `
    bg-white text-gray-700
  `;

  return (
    <nav
      className={`flex w-full items-center justify-end space-x-1 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          className={`${buttonBaseClasses} ${inactiveButtonClasses} `}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (typeof page === "string" && page.startsWith("ellipsis")) {
          return (
            <span
              key={page}
              className="inline-flex items-center justify-center px-3 py-2 text-sm text-gray-500"
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
            className={`${buttonBaseClasses} ${
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
          className={`${buttonBaseClasses} ${inactiveButtonClasses}`}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
