import { findLead } from "@entities/lead/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type useFindLeadProps = {
  phoneNumber?: string;
  status?: string;
};

export const useFindLead = ({ phoneNumber, status }: useFindLeadProps) => {
  const queryParams = { phoneNumber, status };

  const queryInfo = useQuery({
    queryKey: ["leads", "search", queryParams],
    queryFn: () => findLead(queryParams),
    enabled: !!phoneNumber || !!status,
    placeholderData: keepPreviousData,
  });

  return {
    leads: queryInfo.data?.content || [],
    isLoading: queryInfo.isLoading,
    isFetching: queryInfo.isFetching,
    isError: queryInfo.isError,
    error: queryInfo.error,
  };
};
