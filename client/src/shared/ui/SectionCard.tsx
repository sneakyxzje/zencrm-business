import { motion } from "framer-motion";

export const SectionCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-[#2a2c2e] rounded-xl border border-[#3f4245] overflow-hidden"
  >
    <div className="px-5 py-4 border-b border-[#3f4245] bg-[#25272a]">
      <h3 className="text-base font-semibold text-[#dcdcdc] flex items-center gap-2">
        {icon}
        {title}
      </h3>
    </div>
    <div className="p-5">{children}</div>
  </motion.div>
);
