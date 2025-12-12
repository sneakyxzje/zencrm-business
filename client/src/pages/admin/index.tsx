import { useAdminDashboard } from "@features/admin/dashboard/model/useAdminDashboard";
import { formatCurrency } from "@shared/lib/normalize";
import { HorizontalBarChartCard } from "@shared/ui/ChartCard";

export const AdminView = () => {
  const {
    totalUser,
    userStats,
    userGrowth,
    leadStats,
    leadGrowth,
    isLoading,
    orderStats,
    orderGrowth,
    isError,
  } = useAdminDashboard();
  const d = new Date();
  let month = d.getMonth() + 1;
  if (isLoading)
    return (
      <div className="p-10 text-center text-[#90999a]">Đang tải dữ liệu...</div>
    );
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Lỗi tải dữ liệu hệ thống.
      </div>
    );
  return (
    <main className="flex-1 overflow-y-auto text-[#dcdcdc] font-sans">
      <div className=" mx-auto p-8 space-y-8">
        <div className="flex justify-between items-center pb-6 border-b border-[#3f4245]">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Quản lý Hệ Thống
            </h1>
            <p className="text-[#90999a] text-sm mt-1">
              Tổng quan doanh số và nhân sự hệ thống
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[#3f4245] bg-[#2a2c2e] rounded-xl p-6 shadow-sm transition-all duration-200 hover:border-[#f48024]/50">
            <p className="text-sm text-[#90999a] font-medium uppercase tracking-wider">
              Tổng Nhân Sự
            </p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-4xl font-extrabold tracking-tight text-white">
                {totalUser}
              </p>
              <div className="flex flex-col items-end">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded bg-opacity-10 ${
                    userStats.percent >= 0
                      ? "bg-green-500 text-green-400"
                      : "bg-red-500 text-red-400"
                  }`}
                >
                  {userStats.percent > 0 ? "+" : ""}
                  {Number(userStats.percent.toFixed(1))}%
                </span>
                <span className="text-[10px] text-[#90999a] mt-1">
                  so với tháng trước
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#3f4245] bg-[#2a2c2e] rounded-xl p-6 shadow-sm transition-all duration-200 hover:border-[#f48024]/50">
            <p className="text-sm text-[#90999a] font-medium uppercase tracking-wider">
              Lead Mới (T{month})
            </p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-4xl font-extrabold tracking-tight text-[#f48024]">
                {leadStats.current}
              </p>
              <div className="flex flex-col items-end">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded bg-opacity-10 ${
                    leadStats.percent >= 0
                      ? "bg-green-500 text-green-400"
                      : "bg-red-500 text-red-400"
                  }`}
                >
                  {leadStats.percent > 0 ? "+" : ""}
                  {Number(leadStats.percent.toFixed(1))}%
                </span>
                <span className="text-[10px] text-[#90999a] mt-1">
                  so với tháng trước
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#3f4245] bg-[#2a2c2e] rounded-xl p-6 shadow-sm transition-all duration-200 hover:border-[#f48024]/50">
            <p className="text-sm text-[#90999a] font-medium uppercase tracking-wider">
              Doanh Thu tháng {month}
            </p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-3xl font-extrabold tracking-tight text-green-500">
                {formatCurrency(orderStats.current)}
              </p>
              <div className="flex flex-col items-end">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded bg-opacity-10 ${
                    orderStats.percent >= 0
                      ? "bg-green-500 text-green-400"
                      : "bg-red-500 text-red-400"
                  }`}
                >
                  {orderStats.percent > 0 ? "+" : ""}
                  {Number(orderStats.percent.toFixed(1))}%
                </span>
                <span className="text-[10px] text-[#90999a] mt-1">
                  so với tháng trước
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HorizontalBarChartCard
            data={userGrowth}
            title="Biểu Đồ Tăng Trưởng Nhân Sự"
            subtitle="Theo dõi số lượng nhân sự 6 tháng gần nhất"
          />
          <HorizontalBarChartCard
            data={leadGrowth}
            title="Biểu Đồ Lead"
            subtitle="Năng suất làm việc của công ty"
          />
        </div>

        <HorizontalBarChartCard
          data={orderGrowth}
          title="Biểu Đồ Doanh Số Trong 6 Tháng Gần Nhất"
          subtitle="Theo dõi doanh số của công ty"
        />
      </div>
    </main>
  );
};
