export interface ChartData {
  timePoint: string;
  value: number;
}

export const processChartData = (apiData: ChartData[] | undefined | null) => {
  const result: ChartData[] = [];

  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);

    const monthStr = `${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}/${d.getFullYear()}`;

    const found = apiData?.find((item) => item.timePoint === monthStr);
    result.push({
      timePoint: monthStr,
      value: found ? found.value : 0,
    });
  }
  return result;
};
