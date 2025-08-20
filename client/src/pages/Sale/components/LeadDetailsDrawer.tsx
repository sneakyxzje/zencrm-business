import { motion } from "framer-motion";
import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@entities/lead/ui/StatusBadge";
import InfoItem from "@shared/ui/InfoItem";
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
    <motion.aside
      initial={{ x: 360, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 360, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="fixed right-0 top-0 bottom-0 w-full md:max-w-md z-50 bg-[#2a2c2e] border-l border-[#3f4245] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
    >
      <div className="p-4 sm:p-6 border-b border-[#3f4245] flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-[#dcdcdc]">
            Thông tin khách hàng
          </h3>
          <p className="text-[#90999a] text-xs">Chi tiết và thao tác</p>
        </div>
        <button
          onClick={onClose}
          className="text-[#90999a] hover:text-[#dcdcdc] p-2 rounded-lg transition-colors"
          aria-label="Đóng chi tiết"
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

      <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
        <div className="text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-[#f48024] to-[#ff8a00] flex items-center justify-center text-white font-bold text-xl mb-3">
            {lead.customerName
              ? lead.customerName.charAt(0).toUpperCase()
              : lead.phoneNumber.slice(-2)}
          </div>
          <h4 className="text-lg sm:text-xl font-semibold text-[#dcdcdc]">
            {lead.customerName || "Chưa có tên"}
          </h4>
          <p className="text-[#90999a]">{lead.phoneNumber}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-[11px] text-[#90999a] mb-2">Trạng thái</div>
            <StatusBadge status={lead.status} />
          </div>
          <div className="text-center">
            <div className="text-[11px] text-[#90999a] mb-2">Ưu tiên</div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-gray-500/15 text-gray-300 border-gray-500/30">
              Không rõ
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <InfoItem label="Nguồn" value="Chưa rõ" />
          <InfoItem label="Ngày tạo" value={formatDate(lead.createdAt)} />
          <InfoItem
            label="Ngày nhận"
            value={lead.assignedAt ? formatDate(lead.assignedAt) : "Chưa rõ"}
          />
          <InfoItem label="Lần liên hệ cuối" value="Test" />
        </div>

        {lead.note && (
          <div>
            <div className="text-[11px] text-[#90999a] mb-2">Ghi chú</div>
            <div className="bg-[#27292b] border border-[#3f4245] rounded-xl p-3 text-sm text-[#dcdcdc]">
              {lead.note}
            </div>
          </div>
        )}

        <div className="space-y-3 pb-4">
          <div className="text-[11px] text-[#90999a] mb-2">Thao tác nhanh</div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onCallClick(lead)}
              className="h-10 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
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
              Gọi
            </button>
            <button className="h-10 rounded-xl bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] hover:bg-[#303234] transition-colors">
              Email
            </button>
          </div>
          <button className="w-full h-10 rounded-xl bg-[#f48024] hover:bg-[#e06a00] text-white transition-colors font-medium">
            Cập nhật trạng thái
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
