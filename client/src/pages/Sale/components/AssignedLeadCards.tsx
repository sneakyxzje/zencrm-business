import { AnimatePresence, motion } from "framer-motion";
import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@entities/lead/ui/StatusBadge";
import { time } from "@shared/lib/time";

export default function AssignedLeadCards({
  leads,
  onSelect,
}: {
  leads: Lead[];
  onSelect: (l: Lead) => void;
}) {
  return (
    <div className="md:hidden divide-y divide-[#3f4245]">
      {leads.length === 0 ? (
        <div className="px-4 py-12"> {/* EmptyState render ở trang cha */}</div>
      ) : (
        <AnimatePresence initial={false}>
          {leads.map((lead, idx) => (
            <motion.button
              key={lead.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, delay: idx * 0.02 }}
              onClick={() => onSelect(lead)}
              className="w-full text-left px-4 py-4 active:bg-[#26282a] focus:bg-[#26282a] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#f48024] to-[#ff8a00] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {lead.customerName
                    ? lead.customerName.charAt(0).toUpperCase()
                    : lead.phoneNumber.slice(-2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[#dcdcdc] font-medium truncate">
                      {lead.customerName || "Chưa có tên"}
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                  <div className="mt-1 text-[#90999a] text-sm truncate">
                    {lead.phoneNumber}
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-[12px] text-[#a7b0b1]">
                    <span>
                      Ngày tạo:{" "}
                      <span className="text-[#dcdcdc]">
                        {time(lead.createdAt)}
                      </span>
                    </span>
                    <span>
                      Nhận:{" "}
                      <span className="text-[#dcdcdc]">
                        {lead.assignedAt ? time(lead.assignedAt) : "Không rõ"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
