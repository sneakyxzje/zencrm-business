import { getLeadGrowth, getLeadMetrics } from "@entities/lead/api";
import { getOrderGrowth, getOrderMetrics } from "@entities/order/api";
import { getAllUsers, getUserGrowth, getUserMetrics } from "@entities/user/api";
import { processChartData } from "@shared/utils/ChartData";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useAdminDashboard = () => {
  const usersQuery = useQuery({
    queryKey: ["admin", "total-users"],
    queryFn: () => getAllUsers({ page: 0, size: 10 }),
  });

  const userMetricsQuery = useQuery({
    queryKey: ["admin", "user-metrics"],
    queryFn: getUserMetrics,
  });

  const userGrowthQuery = useQuery({
    queryKey: ["admin", "user-growth"],
    queryFn: getUserGrowth,
  });

  const leadMetricsQuery = useQuery({
    queryKey: ["admin", "lead-metrics"],
    queryFn: getLeadMetrics,
  });

  const leadGrowthQuery = useQuery({
    queryKey: ["admin", "lead-growth"],
    queryFn: getLeadGrowth,
  });

  const orderMetricsQuery = useQuery({
    queryKey: ["admin", "order-metrics"],
    queryFn: getOrderMetrics,
  });

  const orderGrowthQuery = useQuery({
    queryKey: ["admin", "order-growth"],
    queryFn: getOrderGrowth,
  });

  const userChartData = useMemo(() => {
    return userGrowthQuery.data ? processChartData(userGrowthQuery.data) : [];
  }, [userGrowthQuery.data]);

  const leadChartData = useMemo(() => {
    return leadGrowthQuery.data ? processChartData(leadGrowthQuery.data) : [];
  }, [leadGrowthQuery.data]);

  const orderChartData = useMemo(() => {
    return orderGrowthQuery.data ? processChartData(orderGrowthQuery.data) : [];
  }, [orderGrowthQuery.data]);

  const isLoading =
    usersQuery.isLoading ||
    userMetricsQuery.isLoading ||
    userGrowthQuery.isLoading ||
    leadMetricsQuery.isLoading ||
    leadGrowthQuery.isLoading;

  const isError = usersQuery.isError || userMetricsQuery.isError;

  return {
    totalUser: usersQuery.data?.totalElements || 0,

    userStats: {
      current: userMetricsQuery.data?.currentCount || 0,
      percent: userMetricsQuery.data?.percentChange || 0,
    },

    userGrowth: userChartData,

    leadStats: {
      current: leadMetricsQuery.data?.currentCount || 0,
      percent: leadMetricsQuery.data?.percentChange || 0,
    },

    leadGrowth: leadChartData,
    orderStats: {
      current: orderMetricsQuery.data?.currentMonth || 0,
      percent: orderMetricsQuery.data?.percentChange || 0,
    },

    orderGrowth: orderChartData,
    isLoading,
    isError,
  };
};
