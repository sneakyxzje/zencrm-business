import { type LeadStatus } from "@entities/lead/model/types";
import { motion } from "framer-motion";

interface LeadActionButtonsProps {
  status: LeadStatus;
  onAction: (action: string) => void;
}

export const LeadActionButtons = ({
  status,
  onAction,
}: LeadActionButtonsProps) => {
  if (["NEW", "ASSIGNED", "PROCESSING"].includes(status)) {
    return (
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onAction("CLOSED")}
          className="px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-xl font-semibold text-sm transition-colors flex flex-col items-center justify-center gap-1"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Thất bại
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onAction("PROCESSING")}
          className="px-4 py-3 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border border-yellow-500/20 rounded-xl font-semibold text-sm transition-colors flex flex-col items-center justify-center gap-1"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Gọi lại sau
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onAction("READY_TO_ORDER")}
          className="px-4 py-3 bg-green-500 text-white hover:bg-green-600 rounded-xl font-bold text-sm shadow-lg shadow-green-500/20 transition-all flex flex-col items-center justify-center gap-1"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Chốt đơn
        </motion.button>
      </div>
    );
  }

  if (status === "READY_TO_ORDER") {
    return (
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction("CREATE_ORDER")}
          className="w-full py-4 bg-gradient-to-r cursor-pointer from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Tạo Đơn Hàng Ngay
        </motion.button>

        <button
          onClick={() => onAction("BACK_TO_PROCESS")}
          className="w-full text-sm text-[#90999a] hover:text-[#dcdcdc] underline decoration-dashed underline-offset-4"
        >
          Quay lại chăm sóc (Nếu khách đổi ý)
        </button>
      </div>
    );
  }

  if (status === "CLOSED") {
    return (
      <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-center">
        <p className="text-red-400 text-sm mb-3 font-medium">
          Lead này đã bị đánh dấu thất bại
        </p>
        <button
          onClick={() => onAction("PROCESSING")}
          className="px-4 py-2 bg-[#2d2d2d] border border-[#3f4245] text-[#dcdcdc] rounded-lg text-sm hover:bg-[#3f4245] transition-colors"
        >
          Chuyển về Processing
        </button>
      </div>
    );
  }

  if (["WIN", "SHIPPING"].includes(status)) {
    return (
      <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl flex items-center justify-center gap-2">
        <span className="text-green-400 font-medium">
          Đơn hàng đang được xử lý
        </span>
      </div>
    );
  }

  return null;
};
