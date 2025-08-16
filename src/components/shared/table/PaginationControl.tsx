"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Meta {
  page: number;
  limit: number;
  total: number;
}

interface PaginationProps {
  meta: Meta;
  pagination: Meta;
  setPagination: React.Dispatch<React.SetStateAction<Meta>>;
  className?: string;
}

export function PaginationControls({
  meta,
  pagination,
  setPagination,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(meta.total / meta.limit);
  const currentPage = pagination.page;

  // Generate visible page numbers dynamically
  const getPageNumbers = () => {
    const pages: number[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return pages;
  };

  return (
    <Pagination className={`text-black text-sm ${className}`}>
      <PaginationContent className="gap-1">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              currentPage > 1 &&
              setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50 "
                : "cursor-pointer hover:bg-gray-500 hover:text-white"
            }
          />
        </PaginationItem>

        {/* First Page + Ellipsis */}
        {currentPage > 3 && totalPages > 5 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => setPagination((prev) => ({ ...prev, page: 1 }))}
                className="cursor-pointer hover:bg-gray-500 hover:text-white"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* Dynamic Page Numbers */}
        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => setPagination((prev) => ({ ...prev, page }))}
              className={`cursor-pointer ${
                page === currentPage
                  ? "bg-white text-black hover:bg-gray-500 hover:text-white border-gray-400"
                  : ""
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis + Last Page */}
        {currentPage < totalPages - 2 && totalPages > 5 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: totalPages }))
                }
                className="cursor-pointer hover:bg-gray-500 hover:text-white "
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages &&
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer hover:bg-gray-500 hover:text-white"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
