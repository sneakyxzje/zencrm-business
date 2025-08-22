import type { ToastItemProps } from "@shared/ui/toasts/model/types";
import { TOAST_CONFIG } from "@shared/ui/toasts/toasts.config";
import { motion } from "framer-motion";

export const ToastItems = ({
  type,
  title,
  message,
  onClose,
}: ToastItemProps) => {
  const config = TOAST_CONFIG[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`
        relative overflow-hidden rounded-xl border 
        max-w-md w-full p-5 backdrop-blur-sm min-h-[72px]
        ${config.colors.bg} ${config.colors.border}
        shadow-lg hover:shadow-xl transition-shadow duration-300
      `}
    >
      <div className="absolute bottom-0 left-0 h-0.5 bg-black/20 w-full">
        <motion.div
          className={`h-full ${config.colors.progress}`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 4, ease: "linear" }}
        />
      </div>

      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg
                      flex items-center justify-center
                      ${config.colors.iconBg}
                      ${config.colors.icon}
                      `}
        >
          {config.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-medium text-base leading-tight truncate pr-3">
              {title}
            </h4>
            <button
              className="flex-shrink-0 w-6 h-6 rounded-md bg-white/10 hover:bg-white/20
                           text-white/60 hover:text-white/90 transition-colors duration-200 
                           flex items-center justify-center"
              onClick={onClose}
            >
              <svg
                className="w-3.5 h-3.5"
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

          {message && (
            <p className="text-white/80 text-sm leading-relaxed">{message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
