import { motion } from "framer-motion";
import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@entities/lead/ui/StatusBadge";
import { formatDate } from "@shared/lib/time";

export default function LeadDetailsDrawer({
  open,
  lead,
  onClose,
  onCallClick,
}: {
  open: boolean;
  lead: Lead | null;
  onClose: () => void;
  onCallClick: (l: Lead) => void;
}) {
  if (!open || !lead) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-[#2a2c2e] border-l border-[#3f4245] shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#3f4245] bg-[#2a2c2e]">
        <div>
          <h2 className="text-lg font-semibold text-[#dcdcdc]">
            Thông tin khách hàng
          </h2>
          <p className="text-sm text-[#90999a]">Chi tiết và thao tác</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-[#90999a] hover:text-[#dcdcdc] hover:bg-[#3f4245] rounded-lg transition-all"
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

      {/* Content */}
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Customer Info */}
          <div className="bg-[#2a2c2e] rounded-lg p-4 border border-[#3f4245]">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl font-bold">
                  {(lead.customerName || "?").charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-medium text-[#dcdcdc] mb-1">
                {lead.customerName || "Chưa có tên"}
              </h3>
              <p className="text-[#90999a] text-sm">{lead.phoneNumber}</p>
            </div>

            <div className="flex justify-center">
              <StatusBadge status={lead.status} />
            </div>
          </div>

          {/* Date Information */}
          <div className="bg-[#2a2c2e] rounded-lg p-4 border border-[#3f4245]">
            <h4 className="text-sm font-medium text-[#90999a] mb-3 uppercase tracking-wide">
              Thông tin thời gian
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#90999a]">Ngày tạo:</span>
                <span className="text-sm text-[#dcdcdc] font-medium">
                  {formatDate(lead.createdAt)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#90999a]">Ngày nhận:</span>
                <span className="text-sm text-[#dcdcdc] font-medium">
                  {lead.assignedAt ? formatDate(lead.assignedAt) : "Chưa rõ"}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-[#2a2c2e] rounded-lg p-4 border border-[#3f4245]">
            <h4 className="text-sm font-medium text-[#90999a] mb-3 uppercase tracking-wide">
              Ghi chú
            </h4>
            <div className="bg-[#27292b] border border-[#3f4245] rounded-lg p-3">
              <p className="text-[#dcdcdc] text-sm leading-relaxed">
                {lead.note || "Chưa có ghi chú"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-[#3f4245] bg-[#2a2c2e] space-y-3">
          <button
            onClick={() => onCallClick(lead)}
            className="w-full py-3 bg-[#10b981] hover:bg-[#059669] text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>Gọi điện</span>
          </button>

          <button className="w-full py-3 bg-[#f48024] hover:bg-[#e06a00] text-white font-medium rounded-lg transition-colors">
            Cập nhật trạng thái
          </button>
        </div>
      </div>
    </motion.div>
  );
}
