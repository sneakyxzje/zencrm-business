import { SearchPopup } from "@features/shared/find-lead/ui/SearchLead";
import { motion } from "framer-motion";

type SortKey = "newest" | "oldest" | "status" | "assigned";

type HeaderProps = {
  searchTerm: string;
  onSearch: (v: string) => void;
  sortBy?: SortKey | null;
  onSortChange?: (v: SortKey) => void;
  onAddClick?: () => void;
  onSearchClick?: () => void;
  searchOpen: boolean;
  onSearchOpen: (v: boolean) => void;
  title?: string;
  actionLabel?: string;
};

export default function Header({
  searchTerm,
  onSearch,
  onAddClick,
  searchOpen,
  onSearchClick,
  onSearchOpen,
  title,
  actionLabel,
}: HeaderProps) {
  return (
    <motion.div className="px-6 pt-6">
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#dcdcdc] flex items-center gap-3">
              {title}
            </h1>
          </div>
          {}
          {onAddClick && (
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
              {actionLabel?.toUpperCase()}
            </motion.button>
          )}
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
              placeholder="Tìm kiếm số điện thoại...."
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
        </div>
        <SearchPopup open={searchOpen} onOpenChange={onSearchOpen} />
      </div>
    </motion.div>
  );
}
