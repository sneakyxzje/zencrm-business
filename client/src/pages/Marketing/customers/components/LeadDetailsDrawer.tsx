import { motion } from "framer-motion";
import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@entities/lead/ui/StatusBadge";
import InfoItem from "@shared/ui/InfoItem";
import AssignmentBadge from "@shared/ui/AssignmentBadge";
import { formatDate } from "@shared/lib/time";

export default function LeadDetailsDrawer({
  open,
  lead,
  onClose,
}: {
  open: boolean;
  lead: Lead | null;
  onClose: () => void;
}) {
  if (!open || !lead) return null;

  const assigned = !!lead.assigneeName;

  return (
    <motion.aside
      initial={{ x: 360, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 360, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-[#2a2c2e] border-l border-[#3f4245] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
    >
      <div className="p-6 flex items-center justify-between border-b border-[#3f4245]">
        <div>
          <h3 className="text-lg font-semibold text-[#dcdcdc]">
            Thông tin Lead
          </h3>
          <p className="text-[#90999a] text-xs">Chi tiết & thao tác nhanh</p>
        </div>
        <button
          onClick={onClose}
          className="text-[#90999a] hover:text-[#dcdcdc] p-2 rounded-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-5 overflow-y-auto">
        <div>
          <div className="text-[11px] text-[#90999a]">Số điện thoại</div>
          <div className="text-xl font-semibold text-[#dcdcdc]">
            {lead.phoneNumber || "Không rõ"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Ngày thêm" value={formatDate(lead.createdAt)} />
          <div>
            <div className="text-[11px] text-[#90999a] mb-1">
              Sales phụ trách
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-[#dcdcdc]">
                {lead.assigneeName ?? "Chưa phân bổ"}
              </div>
              <AssignmentBadge assigned={assigned} />
            </div>
          </div>
          <InfoItem
            label="Ngày nhận"
            value={lead.assignedAt ? formatDate(lead.assignedAt) : "Chưa có"}
            muted
          />
          <div>
            <div className="text-[11px] text-[#90999a] mb-1">Trạng thái</div>
            <StatusBadge status={lead.status} />
          </div>
        </div>

        {lead.note && (
          <div>
            <div className="text-[11px] text-[#90999a] mb-2">Ghi chú</div>
            <div className="bg-[#27292b] border border-[#3f4245] rounded-xl p-3 text-sm text-[#dcdcdc]">
              {lead.note}
            </div>
          </div>
        )}

        <div className="pt-2">
          <div className="text-[11px] text-[#90999a] mb-2">Thao tác nhanh</div>
          <div className="grid grid-cols-3 gap-3">
            <button className="h-10 rounded-xl bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]">
              Gọi
            </button>
            <button className="h-10 rounded-xl bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]">
              Giao Sales
            </button>
            <button className="h-10 rounded-xl bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234]">
              Ghi chú
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
