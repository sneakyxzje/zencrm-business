import { AnimatePresence, motion } from "framer-motion";

export default function CallModal({
  open,
  phone,
  customerName,
  notes,
  onNotesChange,
  onCancel,
  onComplete,
}: {
  open: boolean;
  phone: string;
  customerName?: string | null;
  notes: string;
  onNotesChange: (v: string) => void;
  onCancel: () => void;
  onComplete: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="w-full sm:max-w-md sm:mx-4 bg-[#2a2c2e] border border-[#3f4245] rounded-t-2xl sm:rounded-2xl p-5 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          >
            <div className="text-center mb-6">
              <div className="h-16 w-16 mx-auto rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 mb-4">
                <svg
                  className="w-8 h-8"
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
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#dcdcdc] mb-2">
                Gọi điện cho khách hàng
              </h3>
              <p className="text-[#90999a]">{phone}</p>
              <p className="text-[#dcdcdc] font-medium">
                {customerName || "Khách hàng"}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                  Ghi chú cuộc gọi
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => onNotesChange(e.target.value)}
                  placeholder="Nhập ghi chú về cuộc gọi..."
                  className="w-full px-4 py-3 bg-[#27292b] border border-[#3f4245] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-3 bg-[#27292b] border border-[#3f4245] text-[#dcdcdc] rounded-xl font-medium hover:bg-[#303234] transition-colors"
                >
                  Hủy
                </button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onComplete}
                  className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors shadow-lg"
                >
                  Hoàn thành
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
