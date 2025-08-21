import { motion } from "framer-motion";
import type { Lead } from "@entities/lead/model/types";
import { formatDate, time } from "@shared/lib/time";
import UpdateLeadForm from "@features/update-lead/ui/UpdateLeadForm";

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
            <h4 className="text-sm font-medium text-[#90999a] mb-3 uppercase tracking-wide">
              Thông tin Lead
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-sm text-[#90999a]">Tên khách hàng:</span>
                <span className="text-sm ml-2 text-[#dcdcdc] font-medium">
                  {lead.customerName}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-[#90999a]">Số điện thoại:</span>
                <span className="text-sm ml-2 text-[#dcdcdc] font-medium">
                  {lead.phoneNumber}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-[#90999a]">Sản phẩm:</span>
                <span className="text-sm ml-2 text-[#dcdcdc] font-medium">
                  {lead.product}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-[#90999a]">Ngày tạo:</span>
                <span className="text-sm ml-2 text-[#dcdcdc] font-medium">
                  {time(lead.createdAt)} ({formatDate(lead.createdAt)})
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-[#90999a]">Ngày nhận:</span>
                <span className="text-sm ml-2 text-[#dcdcdc] font-medium">
                  {lead.assignedAt
                    ? time(lead.createdAt) +
                      " " +
                      "(" +
                      formatDate(lead.createdAt) +
                      ")"
                    : "Chưa rõ"}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-[#90999a]">Địa chỉ:</span>
                <span className="text-sm ml-2 text-[#dcdcdc] font-medium">
                  {lead.address ? lead.address : "Không có"}
                </span>
              </div>
            </div>
          </div>

          <UpdateLeadForm leadId={lead.id} />
        </div>
      </div>
    </motion.div>
  );
}
