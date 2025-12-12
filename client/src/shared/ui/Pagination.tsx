interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPagesChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPagesChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-[#3f4245] text-sm text-[#a7b0b1]">
      <div className="inline-flex items-center gap-2">
        <span>
          Trang {currentPage + 1}/{totalPages}
        </span>
        <button
          disabled={currentPage === 0}
          onClick={() => onPagesChange(currentPage - 1)}
          className="h-8 px-3 rounded-lg bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]"
        >
          Trước
        </button>
        <button
          disabled={currentPage >= totalPages - 1}
          onClick={() => onPagesChange(currentPage + 1)}
          className="h-8 px-3 rounded-lg bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]"
        >
          Sau
        </button>
      </div>
    </div>
  );
};
