import { getLeadDetails } from "@entities/lead/api";
import { getLog } from "@entities/log/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useLeadDetail = (
  queryKeyScope: string,
  leadId: number,
  size?: number
) => {
  const [page, setPage] = useState(0);
  const leadQuery = useQuery({
    queryKey: [queryKeyScope, "detail", leadId],
    queryFn: () => getLeadDetails(leadId),
    enabled: !!leadId && !isNaN(leadId),
  });

  const logsQuery = useQuery({
    queryKey: [queryKeyScope, "detail-log", leadId, page, size],
    queryFn: () => getLog(leadId, page, size),
    placeholderData: (prev) => prev,
  });

  return {
    lead: leadQuery.data,
    logs: logsQuery.data?.content || [],
    totalPages: logsQuery.data?.totalPages || 0,

    isLoading: leadQuery.isLoading || logsQuery.isLoading,
    isError: leadQuery.isError || logsQuery.isError,
    page,
    setPage,
  };
};
