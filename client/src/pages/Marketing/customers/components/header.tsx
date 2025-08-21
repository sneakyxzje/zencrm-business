import { SearchPopup } from "@features/find-lead/ui/SearchLead";
import { motion } from "framer-motion";

type SortKey = "newest" | "oldest" | "status" | "assigned";

type HeaderProps = {
  stats: {
    total: number;
    unassigned: number;
    converted: number;
    newToday: number;
  };
  searchTerm: string;
  onSearch: (v: string) => void;
  sortBy: SortKey;
  onSortChange: (v: SortKey) => void;
  onAddClick: () => void;
  onSearchClick: () => void;
  searchOpen: boolean;
  onSearchOpen: (v: boolean) => void;
};

export default function Header({
  stats,
  searchTerm,
  onSearch,
  sortBy,
  onAddClick,
  searchOpen,
  onSearchClick,
  onSearchOpen,
}: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 pt-6"
    >
      <div className="rounded-3xl border border-[#3f4245] bg-[#2a2c2e]/80 backdrop-blur-md p-6 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#dcdcdc] flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f48024] to-[#ff8a00] shadow-[0_10px_30px_rgba(244,128,36,0.35)]">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.69l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5c.4.13.69.5.69.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
                </svg>
              </span>
              Customer Phone Management
            </h1>
          </div>
          {}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddClick}
            className="bg-[#f48024] cursor-pointer hover:bg-[#e06a00] text-white px-4 py-2 rounded-xl font-medium transition-all inline-flex items-center gap-2 shadow-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Thêm Số Điện Thoại
          </motion.button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-5">
          <StatCard label="Tổng" value={stats.total} />
          <StatCard label="Chưa phân bổ" value={stats.unassigned} accent />
          <StatCard label="Đã chuyển đổi" value={stats.converted} />
          <StatCard label="Mới hôm nay" value={stats.newToday} />
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-[#90999a]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Tìm kiếm số điện thoại, tên, sales..."
              className="w-full pl-10 pr-4 py-3 bg-[#27292b] border border-[#3f4245] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-transparent transition"
            />
            <span className="pointer-events-none absolute -inset-[1.5px] rounded-[14px] bg-gradient-to-r from-[#f48024]/0 via-[#f48024]/15 to-[#ff8a00]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSearchClick}
            className="bg-[#33373a] cursor-pointer hover:bg-[#3a3e42] text-white px-4 py-2 rounded-xl font-medium transition-all inline-flex items-center gap-2 border border-[#3f4245]"
          >
            Tra cứu
          </motion.button>
          <select
            value={sortBy}
            className="bg-[#27292b] border border-[#3f4245] rounded-xl px-4 py-3 text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024]"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="status">Trạng thái</option>
            <option value="assigned">Phân bổ</option>
          </select>
        </div>
        <SearchPopup open={searchOpen} onOpenChange={onSearchOpen} />
      </div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border ${
        accent
          ? "border-[#f48024]/40 bg-[#2a2c2e]"
          : "border-[#3f4245] bg-[#26282a]"
      } p-4 relative overflow-hidden`}
    >
      <div className="text-[11px] text-[#90999a]">{label}</div>
      <div className="text-2xl font-semibold text-[#dcdcdc] mt-1">{value}</div>
      {accent && (
        <div className="absolute -right-5 -bottom-5 h-16 w-16 rounded-full bg-gradient-to-br from-[#f48024] to-[#ff8a00] opacity-20" />
      )}
    </div>
  );
}
