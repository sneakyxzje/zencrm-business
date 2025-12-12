import { motion } from "framer-motion";

export const InfoBlock = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | undefined | null;
  icon: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-[#27292b] border border-[#3f4245] rounded-xl p-4 hover:border-[#f48024]/30 transition-all duration-300"
  >
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[#f48024]">{icon}</div>
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-medium text-[#90999a] mb-1.5">
          {label}
        </label>
        <div className="text-sm text-[#dcdcdc] break-words">
          {value || (
            <span className="text-[#6b7280] italic">Chưa có thông tin</span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);
