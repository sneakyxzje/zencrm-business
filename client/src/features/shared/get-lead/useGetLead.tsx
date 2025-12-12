import { useDebounce } from "@shared/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type fetcherFn = (params: {
  page: number;
  size: number;
  search: string;
}) => Promise<any>;
export const useLeadsData = (queryKeyScope: string, fetcher: fetcherFn) => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data, isLoading } = useQuery({
    queryKey: [queryKeyScope, "list", page, debouncedSearch],
    queryFn: () => fetcher({ page: page, size: 10, search: debouncedSearch }),
    placeholderData: (prevData) => prevData,
  });

  return {
    leads: data?.content || [],
    totalPages: data?.totalPages || 0,
    setPage,
    setSearchTerm,
    isLoading,
    page,
    searchTerm,
  };
};
