import { AnimatePresence, motion } from "framer-motion";
import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@entities/lead/ui/StatusBadge";
import { time } from "@shared/lib/time";

export default function LeadTable({
  leads,
  onRowClick,
}: {
  leads: Lead[];
  onRowClick: (l: Lead) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#26282a]/80 backdrop-blur sticky top-0 z-10">
          <tr>
            {[
              "Số điện thoại",
              "Tên khách hàng",
              "Ngày Tạo",
              "Sales phụ trách",
              "Ngày nhận",
              "Trạng thái",
            ].map((h) => (
              <th
                key={h}
                className="px-6 py-4 text-left text-[11px] font-semibold tracking-wider text-[#a7b0b1] uppercase"
              >
                <div className="inline-flex items-center gap-1.5">{h}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3f4245]">
          <AnimatePresence initial={false}>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16">
                  {/* EmptyState ở trang cha */}
                </td>
              </tr>
            ) : (
              leads.map((l, idx) => (
                <motion.tr
                  key={l.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, delay: idx * 0.02 }}
                  className="group cursor-pointer hover:bg-[#26282a]/60 transition-colors"
                  onClick={() => onRowClick(l)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-3 inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#f48024] to-[#ff8a00]" />
                      <div>
                        <div className="text-sm font-medium text-[#dcdcdc]">
                          {l.phoneNumber || "Không rõ"}
                        </div>
                        <div className="text-[11px] text-[#90999a]">
                          ID: {l.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#dcdcdc]">
                      {l.customerName ?? (
                        <span className="text-[#90999a] italic">
                          Chưa có tên
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#dcdcdc]">
                      {time(l.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#dcdcdc]">
                      {l.assigneeName && l.assigneeTeam ? (
                        `${l.assigneeName}_${l.assigneeTeam}`
                      ) : (
                        <span className="text-[#90999a] italic">
                          Chưa phân bổ
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#dcdcdc]">
                      {l.assignedAt ? (
                        time(l.assignedAt)
                      ) : (
                        <span className="text-[#90999a] italic">Chưa có</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={l.status} />
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
