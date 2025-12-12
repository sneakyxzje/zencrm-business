import { motion } from "framer-motion";

type FormActionsProps = {
  onCancel: () => void;
  isPending: boolean;
};

export const FormActions = ({ onCancel, isPending }: FormActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-6"
    >
      <button
        type="button"
        onClick={onCancel}
        className="w-full sm:w-auto px-6 py-3 bg-[#27292b] hover:bg-[#303234] border border-[#3f4245] text-[#dcdcdc] rounded-xl font-medium transition"
      >
        Hủy bỏ
      </button>
      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#f48024] to-[#ff8a00] text-white rounded-xl font-semibold shadow-lg hover:shadow-orange-500/25 transition disabled:opacity-50"
      >
        {isPending ? "Đang xử lý..." : "Tạo Đơn Hàng"}
      </button>
    </motion.div>
  );
};
