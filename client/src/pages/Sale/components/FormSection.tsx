import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  delay?: number;
};

export const FormSection = ({
  title,
  icon,
  children,
  delay = 0,
}: FormSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#2a2c2e] border border-[#3f4245] rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f48024] to-[#ff8a00] flex items-center justify-center flex-shrink-0">
          <div className="text-white w-6 h-6">{icon}</div>
        </div>
        <h2 className="text-xl font-semibold text-[#dcdcdc]">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};
