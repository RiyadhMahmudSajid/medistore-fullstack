"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

export default function PaginationControls({ meta }: PaginationControlsProps) {
  const { limit: pageSize, page: currentPage, total, totalPages } = meta;
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  if (total === 0) return null; 

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 mt-8 border-t border-gray-100 dark:border-gray-800">
      
      <div className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900/50 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-800">
        Showing <span className="font-semibold text-foreground">{start}-{end}</span> of <span className="font-semibold text-foreground">{total}</span> products
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-lg p-1 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={() => navigateToPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="px-4 flex items-center gap-1 border-x dark:border-gray-800 mx-1">
            <span className="text-xs text-muted-foreground uppercase tracking-tighter">Page</span>
            <span className="text-sm font-bold text-primary">{currentPage}</span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-sm font-medium">{totalPages}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={() => navigateToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}