"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem hidden={!hasPrevPage}>
            <PaginationPrevious
              href={`?page=${Number(page) - 1}&perPage=${perPage}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem className="flex min-w=[100px]">
            <div>
              {page} / {Math.ceil(10 / Number(perPage))}
            </div>
          </PaginationItem>
          <PaginationItem hidden={!hasNextPage}>
            <PaginationNext
              href={`?page=${Number(page) + 1}&perPage=${perPage}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
