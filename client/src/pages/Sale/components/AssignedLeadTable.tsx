import { AnimatePresence, motion } from "framer-motion";
import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@entities/lead/ui/StatusBadge";
import { time } from "@shared/lib/time";

export default function AssignedLeadTable({
  leads,
  onSelect,
}: {
  leads: Lead[];
  onSelect: (l: Lead) => void;
}) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#26282a]/80 backdrop-blur sticky top-0 z-10">
          <tr>
            {[
              "Tên khách hàng",
              "Số điện thoại",
              "Địa chỉ",
              "Người lên số",
              "Trạng thái",
              "Ngày tạo",
              "Ngày nhận",
            ].map((h) => (
              <th
                key={h}
                className="px-6 py-3.5 text-left text-[11px] font-semibold tracking-wider text-[#a7b0b1] uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3f4245]">
          <AnimatePresence initial={false}>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16"></td>
              </tr>
            ) : (
              leads.map((lead, idx) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, delay: idx * 0.02 }}
                  className="group cursor-pointer hover:bg-[#26282a]/60 transition-colors"
                  onClick={() => onSelect(lead)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#dcdcdc] truncate max-w-[220px]">
                      {lead.customerName || "Chưa có tên"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-gray-500/15 text-gray-300 border-gray-500/30">
                      {lead.phoneNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-gray-500/15 text-gray-300 border-gray-500/30 max-w-[260px] truncate">
                      {lead.address ?? "Không có"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#dcdcdc]">
                      {(lead.createdByName ?? "") +
                        "_" +
                        (lead.createdByTeam ?? "")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#dcdcdc]">
                      {time(lead.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#dcdcdc]">
                      {lead.assignedAt ? time(lead.assignedAt) : "Không rõ"}
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
