import { ToastItems } from "@shared/ui/toasts/model/ToastItems";
import type { Toast } from "@shared/ui/toasts/model/types";
import { AnimatePresence } from "framer-motion";

type ToastProps = {
  toast: Toast[];
  onRemove: (id: string) => void;
};

export const ToastContainer = ({ toast, onRemove }: ToastProps) => {
  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {toast.map((toast) => (
          <ToastItems
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            progress={toast.progress}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
