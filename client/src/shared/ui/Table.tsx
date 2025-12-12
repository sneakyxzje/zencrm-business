import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export type ColumnDef<T> = {
  header: string;
  cell: (item: T) => ReactNode;
  className?: string;
};

interface SharedTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function SharedTable<T extends { id: number | string }>({
  data,
  columns,
  onRowClick,
  emptyMessage = "Không có dữ liệu",
}: SharedTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#26282a]/80 backdrop-blur sticky top-0 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-6 py-4 text-left text-[11px] font-semibold tracking-wider text-[#a7b0b1] uppercase ${
                  col.className || ""
                }`}
              >
                <div className="inline-flex items-center gap-1.5">
                  {col.header}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#3f4245]">
          <AnimatePresence initial={false}>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center text-[#90999a] italic"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <motion.tr
                  key={item.id}
                  className={`group transition-colors ${
                    onRowClick ? "cursor-pointer hover:bg-[#26282a]/60" : ""
                  }`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      {col.cell(item)}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
