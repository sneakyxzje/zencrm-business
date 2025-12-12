import { useMemo } from "react";
import { formatNumber } from "@shared/lib/normalize";

interface ChartItem {
  timePoint: string;
  value: number;
}

export const HorizontalBarChartCard = ({
  data,
  title,
  subtitle,
  colorTheme = "orange",
}: {
  data: ChartItem[];
  title?: string;
  subtitle?: string;
  colorTheme?: "orange" | "green";
}) => {
  const maxVal = useMemo(() => {
    if (!data || data.length === 0) return 1;
    const max = Math.max(...data.map((d) => d.value));
    return max === 0 ? 1 : max;
  }, [data]);

  const theme =
    colorTheme === "green"
      ? { from: "from-[#10b981]", to: "to-[#34d399]", text: "text-[#10b981]" }
      : { from: "from-[#f48024]", to: "to-[#ff8a00]", text: "text-[#f48024]" };

  return (
    <div className="border border-[#3f4245] bg-[#2a2c2e] rounded-2xl p-6 shadow-sm flex flex-col h-full hover:border-[#f48024]/30 transition-all">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-[#90999a] mt-1 font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end space-y-5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4 group/bar">
            <div className="w-16 text-xs font-semibold text-[#90999a] text-right font-mono">
              {item.timePoint}
            </div>

            <div className="flex-1 h-7 bg-[#1e2023]/50 rounded-full overflow-hidden relative p-1">
              <div
                className={`h-full bg-gradient-to-r ${theme.from} ${theme.to} rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out group-hover/bar:brightness-110 relative`}
                style={{
                  width: `${maxVal === 0 ? 0 : (item.value / maxVal) * 100}%`,
                  minWidth: item.value > 0 ? "30px" : "0px",
                }}
              >
                {item.value > 0 && (
                  <span className="text-white text-[10px] font-bold tabular-nums absolute right-2">
                    {formatNumber(item.value)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
