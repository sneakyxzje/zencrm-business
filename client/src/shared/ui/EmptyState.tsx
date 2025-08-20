export default function EmptyState({
  title = "Không có dữ liệu",
  hint = "Thử thay đổi bộ lọc hoặc tìm kiếm khác.",
}: {
  title?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="h-16 w-16 rounded-2xl bg-[#27292b] flex items-center justify-center mb-3 border border-[#3f4245]">
        <svg
          className="w-8 h-8 text-[#90999a]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <p className="text-[#dcdcdc] font-medium">{title}</p>
      <p className="text-[#90999a] text-sm mt-1">{hint}</p>
    </div>
  );
}
