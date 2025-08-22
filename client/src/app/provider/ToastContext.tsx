import type { Toast } from "@shared/ui/toasts/model/types";
import { createContext, useContext } from "react";

interface ToastContexType {
  addToast: (toast: Omit<Toast, "id" | "progress">) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContexType | undefined>(
  undefined
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context == undefined) {
    throw new Error("useToast must be used within a Toast Provider");
  }
  return context;
};
